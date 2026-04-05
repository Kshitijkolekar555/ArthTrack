import React, { useState } from 'react';
import Login from './Login';
import SignUp from './SignUp';

const AuthView = ({ handleLogin }) => {
    const [isLoginView, setIsLoginView] = useState(true);

    return (
        <div
            className="relative h-screen w-full bg-cover bg-center flex items-center justify-center animate-fade-in"
            style={{
                backgroundImage:
                    "url('https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=1600&q=80')"
            }}
        >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/60"></div>

            <div className="relative z-10">
                {isLoginView ? (
                    <Login handleLogin={handleLogin} toggleView={() => setIsLoginView(false)} />
                ) : (
                    <SignUp toggleView={() => setIsLoginView(true)} />
                )}
            </div>
        </div>
    );
};

export default AuthView;
