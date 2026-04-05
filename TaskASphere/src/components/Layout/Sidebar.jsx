import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useFinance } from '../../context/FinanceContext'
import { useAuth } from '../../context/AuthContext'
import { useSettings } from '../../context/SettingsContext'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  LayoutDashboard, 
  ReceiptText, 
  BarChart3, 
  LogOut, 
  ChevronLeft,
  ChevronRight,
  Sparkles
} from 'lucide-react'

const navItems = [
  { id: 'dashboard',    label: 'Overview',     path: '/dashboard',    icon: LayoutDashboard },
  { id: 'transactions', label: 'Transactions', path: '/transactions', icon: ReceiptText },
  { id: 'insights',     label: 'Insights',     path: '/insights',     icon: BarChart3 },
]

function Sidebar({ isOpen, onClose }) {
  const { user, logout } = useAuth()
  const { settings, updateSettings } = useSettings()
  const location = useLocation()
  
  const isCollapsed = settings.sidebarCollapsed
  const activePage = location.pathname.substring(1) || 'dashboard'

  const toggleCollapse = () => {
    updateSettings({ sidebarCollapsed: !isCollapsed })
  }

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? '80px' : '256px' }}
      className={`
        fixed md:static inset-y-0 left-0 z-40
        bg-zinc-900 border-r border-zinc-800 flex flex-col py-6 px-3 shrink-0
        transition-all duration-300 ease-in-out shadow-2xl
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}
    >
      {/* Brand */}
      <div className={`mb-10 flex items-center gap-3 ${isCollapsed ? 'justify-center' : 'px-2'}`}>
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 shrink-0">
          <Sparkles className="text-white w-6 h-6" />
        </div>
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-xl font-bold text-white tracking-tight">ArthTrack</h1>
            <p className="text-[10px] text-emerald-500 font-semibold uppercase tracking-widest leading-none mt-1">Powered by Zorvyn</p>
          </motion.div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1.5">
        {navItems.map(item => {
          const Icon = item.icon
          const isActive = activePage === item.id || (item.id === 'dashboard' && activePage === '')
          
          return (
            <Link
              key={item.id}
              to={item.path}
              onClick={onClose}
              title={isCollapsed ? item.label : ''}
              className={`group w-full py-3 rounded-xl text-sm flex items-center gap-3 transition-all duration-200
                ${isCollapsed ? 'justify-center px-0' : 'px-3'}
                ${isActive
                  ? 'bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800 border border-transparent'
                }`}
            >
              <Icon className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 shrink-0 ${isActive ? 'text-emerald-500' : 'text-zinc-500 group-hover:text-zinc-300'}`} />
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  {item.label}
                </motion.span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Collapse Toggle (Desktop only) */}
      <button 
        onClick={toggleCollapse}
        className="hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-white absolute -right-4 top-20 z-50 shadow-xl"
      >
        {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>

      {/* User & Logout */}
      <div className={`border-t border-zinc-800 pt-6 mt-6 ${isCollapsed ? 'items-center' : ''}`}>
        <div className={`flex items-center gap-3 px-1 mb-6 ${isCollapsed ? 'justify-center' : ''}`}>
          <img 
            src={user?.avatar} 
            alt={user?.name} 
            className="w-10 h-10 rounded-full border border-zinc-700 p-0.5 bg-zinc-800 shrink-0"
          />
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="overflow-hidden"
            >
              <p className="text-sm font-medium text-white truncate">{user?.name}</p>
              <p className="text-[10px] text-zinc-500 truncate uppercase font-bold tracking-tighter">Verified User</p>
            </motion.div>
          )}
        </div>
        
        <button
          onClick={logout}
          title={isCollapsed ? 'Sign Out' : ''}
          className={`w-full flex items-center gap-3 py-3 rounded-xl text-sm text-zinc-400 hover:text-red-400 hover:bg-red-500/5 transition-all group ${isCollapsed ? 'justify-center px-0' : 'px-3'}`}
        >
          <LogOut className="w-5 h-5 text-zinc-500 group-hover:text-red-400 transition-colors shrink-0" />
          {!isCollapsed && <span>Sign Out</span>}
        </button>

        {!isCollapsed && (
          <div className="mt-8 px-3">
            <div className="p-3 rounded-2xl bg-zinc-950/50 border border-zinc-800 text-[10px] text-zinc-600 font-medium leading-relaxed">
              <p className="text-zinc-500 mb-1 font-bold uppercase tracking-widest text-[9px]">Submission Details</p>
              Zorvyn Frontend Intern Assignment
              <br />
              <span className="text-zinc-700">Author: Kshitij Kolekar</span>
            </div>
          </div>
        )}
      </div>
    </motion.aside>
  )
}

export default Sidebar
