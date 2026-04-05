import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const DUMMY_USERS = [
  {
    email: 'admin@arthtrack.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin',
    avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=10b981&color=fff',
  },
  {
    email: 'viewer@arthtrack.com',
    password: 'viewer123',
    name: 'Viewer User',
    role: 'viewer',
    avatar: 'https://ui-avatars.com/api/?name=Viewer+User&background=6366f1&color=fff',
  },
  {
    email: 'editor@arthtrack.com',
    password: 'editor123',
    name: 'Editor User',
    role: 'editor',
    avatar: 'https://ui-avatars.com/api/?name=Editor+User&background=f59e0b&color=fff',
  }
];

// Helper to get registered users from localStorage
function getRegisteredUsers() {
  try {
    const saved = localStorage.getItem('arthtrack_registered_users');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

// Helper to save a new registered user
function saveRegisteredUser(userData) {
  const users = getRegisteredUsers();
  // Avoid duplicates by email
  const filtered = users.filter(u => u.email.toLowerCase() !== userData.email.toLowerCase());
  filtered.push(userData);
  localStorage.setItem('arthtrack_registered_users', JSON.stringify(filtered));
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('arthtrack_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Check dummy users first, then registered users
        const allUsers = [...DUMMY_USERS, ...getRegisteredUsers()];
        const foundUser = allUsers.find(u => u.email.toLowerCase() === email.toLowerCase());

        if (!foundUser) {
          setLoading(false);
          reject(new Error('NOT_FOUND'));
          return;
        }

        if (foundUser.password !== password) {
          setLoading(false);
          reject(new Error('INVALID_PASSWORD'));
          return;
        }

        const userData = {
          id: foundUser.id || foundUser.email,
          email: foundUser.email,
          name: foundUser.name,
          role: foundUser.role,
          avatar: foundUser.avatar,
        };

        setUser(userData);
        localStorage.setItem('arthtrack_user', JSON.stringify(userData));
        setLoading(false);
        resolve(userData);
      }, 1000);
    });
  };

  const register = async (userData) => {
    setLoading(true);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Check if email already exists
        const allUsers = [...DUMMY_USERS, ...getRegisteredUsers()];
        const exists = allUsers.find(u => u.email.toLowerCase() === userData.email.toLowerCase());
        if (exists) {
          setLoading(false);
          reject(new Error('EMAIL_EXISTS'));
          return;
        }

        const newUser = {
          ...userData,
          id: Date.now().toString(),
          role: 'admin',
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=10b981&color=fff`,
        };

        // Persist credentials so user can log back in later
        saveRegisteredUser(newUser);

        // Also log the user in immediately
        const sessionData = {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          role: newUser.role,
          avatar: newUser.avatar,
        };
        setUser(sessionData);
        localStorage.setItem('arthtrack_user', JSON.stringify(sessionData));
        setLoading(false);
        resolve(sessionData);
      }, 1200);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('arthtrack_user');
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('arthtrack_user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
