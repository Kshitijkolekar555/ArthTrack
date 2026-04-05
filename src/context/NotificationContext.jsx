import React, { createContext, useContext, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Info, AlertCircle } from 'lucide-react';

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [notification, setNotification] = useState(null);
  const timerRef = useRef(null);

  function notify(msg, action) {
    if (timerRef.current) clearTimeout(timerRef.current);
    setNotification({ msg, action });
    timerRef.current = setTimeout(() => setNotification(null), 5000);
  }

  function close() {
    setNotification(null);
    if (timerRef.current) clearTimeout(timerRef.current);
  }

  return (
    <NotificationContext.Provider value={{ notification, notify, close }}>
      {children}
      <AnimatePresence>
        {notification && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-8 right-8 z-[100] min-w-[320px]"
          >
            <div className="bg-zinc-900/90 backdrop-blur-xl border border-zinc-800 p-4 rounded-2xl shadow-2xl flex items-center gap-4 relative overflow-hidden group">
              {/* Animated Progress Bar */}
              <motion.div 
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: 5, ease: 'linear' }}
                className="absolute bottom-0 left-0 h-1 bg-emerald-500/50"
              />

              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
              </div>

              <div className="flex-1">
                <p className="text-sm font-semibold text-white">{notification.msg}</p>
                {notification.action && (
                  <button
                    onClick={() => {
                      notification.action.onUndo();
                      close();
                    }}
                    className="text-xs text-emerald-400 font-bold hover:text-emerald-300 transition-colors mt-1 flex items-center gap-1"
                  >
                    Undo Changes
                  </button>
                )}
              </div>

              <button 
                onClick={close} 
                className="p-1.5 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-lg transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  return useContext(NotificationContext);
}
