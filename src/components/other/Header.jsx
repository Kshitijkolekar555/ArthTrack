import React, { useContext, useState } from 'react'
import { setLocalStorage } from '../../utils/localStorage'
import { NotificationContext } from '../../context/NotificationContext'
import NotificationDropdown from './NotificationDropdown'

const Header = (props) => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const { notifications } = useContext(NotificationContext)

  const unreadCount = notifications ? notifications.filter(n =>
    !n.read && (n.userId === (props.data?.firstName || 'admin'))
  ).length : 0

  const logOutUser = () => {
    localStorage.setItem('loggedInUser', '')
    props.changeUser('')
  }

  return (
    <div className='flex items-center justify-between py-4 mb-6 border-b border-main/50'>
      <div className="flex items-center gap-4">
        <button
          onClick={props.onMenuClick}
          className="md:hidden p-2 text-main bg-card border border-main rounded-lg hover:bg-white/5"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h1 className='text-sm font-bold text-main/70 uppercase tracking-widest hidden sm:block'>Welcome back, <br />
          <span className='text-xl sm:text-3xl font-black text-main drop-shadow-sm'>{props.data?.firstName || 'Admin'} 👋</span>
        </h1>
        <h1 className='text-xl sm:text-3xl font-black text-main drop-shadow-sm sm:hidden'>{props.data?.firstName || 'Admin'} 👋</h1>
      </div>

      <div className='flex items-center gap-6'>
        <div className='relative'>
          <button
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className='relative p-3 bg-white/5 border border-main rounded-full text-gray-500 hover:text-emerald-500 hover:bg-emerald-500/10 transition-all duration-300 group'
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            {unreadCount > 0 && (
              <span className='absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-[10px] font-black text-white bg-emerald-500 rounded-full border-2 border-main animate-pulse shadow-lg'>
                {unreadCount}
              </span>
            )}
          </button>
          <NotificationDropdown
            isOpen={isNotificationsOpen}
            onClose={() => setIsNotificationsOpen(false)}
            currentUserId={props.data?.firstName || 'admin'}
          />
        </div>
      </div>
    </div>
  )
}

export default Header