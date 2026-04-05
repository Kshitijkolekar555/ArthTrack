import React, { useContext } from 'react';
import { NotificationContext } from '../../context/NotificationContext';

const NotificationDropdown = ({ isOpen, onClose, currentUserId }) => {
    const { notifications, markAsRead, clearNotifications } = useContext(NotificationContext);

    if (!isOpen) return null;

    const userNotifications = notifications ? notifications.filter(n => n.userId === currentUserId || n.userId === 'admin') : [];

    return (
        <div className="absolute right-0 mt-3 w-80 bg-card border border-main rounded-2xl shadow-2xl z-50 overflow-hidden animate-fade-in translate-y-0 opacity-100">
            <div className="p-4 border-b border-main flex justify-between items-center bg-white/5">
                <h3 className="text-main font-black text-xs uppercase tracking-widest">Notifications</h3>
                <button onClick={clearNotifications} className="text-[10px] font-black uppercase tracking-tighter text-gray-500 hover:text-red-500 transition-colors">Clear All</button>
            </div>
            <div className="max-h-80 overflow-y-auto no-scrollbar">
                {userNotifications.length === 0 ? (
                    <div className="p-10 text-center text-gray-500 text-xs font-bold uppercase tracking-widest">
                        <div className="mb-2 opacity-20">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                            </svg>
                        </div>
                        Inbox Empty
                    </div>
                ) : (
                    userNotifications.map((n) => (
                        <div
                            key={n.id}
                            onClick={() => markAsRead(n.id)}
                            className={`p-4 border-b border-main cursor-pointer hover:bg-white/5 transition-all duration-300 ${!n.read ? 'bg-emerald-500/5' : ''}`}
                        >
                            <p className={`text-sm mb-1 leading-snug ${!n.read ? 'text-main font-bold' : 'text-gray-400'}`}>{n.message}</p>
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] text-gray-500 font-black uppercase tracking-tighter">{n.time}</span>
                                {!n.read && <div className="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default NotificationDropdown;
