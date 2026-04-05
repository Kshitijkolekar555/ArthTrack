import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const SettingsContext = createContext();

const currencies = [
  { code: 'INR', symbol: '₹', label: 'Indian Rupee' },
  { code: 'USD', symbol: '$', label: 'US Dollar' },
  { code: 'EUR', symbol: '€', label: 'Euro' },
  { code: 'GBP', symbol: '£', label: 'British Pound' },
];

export function SettingsProvider({ children }) {
  const { user } = useAuth();
  
  // Settings Key unique to user
  const settingsKey = user ? `arthtrack_settings_${user.id}` : null;

  const [settings, setSettingsState] = useState({
    currency: currencies[0], // Default INR
    sidebarCollapsed: false,
    theme: 'dark',
    notificationsEnabled: true,
  });

  // Load settings when user changes
  useEffect(() => {
    if (!user || !settingsKey) return;

    try {
      const saved = localStorage.getItem(settingsKey);
      if (saved) {
        setSettingsState(JSON.parse(saved));
      }
    } catch (err) {
      console.error("Error loading settings:", err);
    }
  }, [user, settingsKey]);

  // Save settings on change
  useEffect(() => {
    if (settingsKey) {
      localStorage.setItem(settingsKey, JSON.stringify(settings));
    }
  }, [settings, settingsKey]);

  const updateSettings = (updates) => {
    setSettingsState(prev => ({ ...prev, ...updates }));
  };

  const formatCurrency = (amount) => {
    return `${settings.currency.symbol}${Number(amount).toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}`;
  };

  return (
    <SettingsContext.Provider value={{ 
      settings, 
      updateSettings, 
      currencies,
      formatCurrency
    }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
