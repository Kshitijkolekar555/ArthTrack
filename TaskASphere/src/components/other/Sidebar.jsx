import React from 'react';

const Sidebar = ({ userRole, changeUser, activeTab, setActiveTab, isOpen, setIsOpen }) => {
    const [theme, setTheme] = React.useState('dark');

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        document.body.classList.toggle('light-theme');
    };

    const logOutUser = () => {
        localStorage.setItem('loggedInUser', '');
        changeUser('');
    };

    return (
        <div className={`h-screen w-64 bg-card border-r border-main flex flex-col justify-between p-6 fixed left-0 top-0 z-40 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
            <div>
                <div className="flex items-center justify-between mb-10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center font-bold text-xl text-white">
                            T
                        </div>
                        <h1 className="text-xl font-bold text-main tracking-tight">TaskASphere</h1>
                    </div>
                    {/* Mobile Close Button */}
                    <button
                        onClick={() => setIsOpen && setIsOpen(false)}
                        className="md:hidden text-main/50 hover:text-main"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <nav className="flex flex-col gap-2">
                    <div
                        onClick={() => setActiveTab('dashboard')}
                        className={`p-3 rounded-lg font-medium cursor-pointer flex items-center gap-3 transition-all ${activeTab === 'dashboard' ? 'bg-emerald-500/10 text-emerald-500' : 'text-gray-500 hover:bg-emerald-500/5 hover:text-emerald-500'}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        Dashboard
                    </div>
                    {userRole === 'admin' ? (
                        <div
                            onClick={() => setActiveTab('employees')}
                            className={`p-3 rounded-lg font-medium cursor-pointer flex items-center gap-3 transition-all ${activeTab === 'employees' ? 'bg-emerald-500/10 text-emerald-500' : 'text-gray-500 hover:bg-emerald-500/5 hover:text-emerald-500'}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            Employees
                        </div>
                    ) : null}
                    <div
                        onClick={() => setActiveTab('analytics')}
                        className={`p-3 rounded-lg font-medium cursor-pointer flex items-center gap-3 transition-all ${activeTab === 'analytics' ? 'bg-emerald-500/10 text-emerald-500' : 'text-gray-500 hover:bg-emerald-500/5 hover:text-emerald-500'}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                        </svg>
                        Analytics
                    </div>
                </nav>
            </div>

            <div className="flex flex-col gap-4">
                <button
                    onClick={toggleTheme}
                    className="w-full bg-gray-500/10 border border-main hover:bg-gray-500/20 p-3 rounded-lg flex items-center justify-center gap-3 transition-all"
                >
                    {theme === 'dark' ? (
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                            </svg>
                            <span className="text-sm font-medium text-main">Light Mode</span>
                        </>
                    ) : (
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                            <span className="text-sm font-medium text-main">Dark Mode</span>
                        </>
                    )}
                </button>

                <button
                    onClick={logOutUser}
                    className="w-full bg-red-600/10 text-red-500 hover:bg-red-600 hover:text-white p-3 rounded-lg font-bold transition-all flex items-center justify-center gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Log Out
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
