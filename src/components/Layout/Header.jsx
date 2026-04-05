import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { useFinance } from '../../context/FinanceContext'
import { Bell, Search, User as UserIcon, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const titles = {
  dashboard:    'Financial Overview',
  transactions: 'Transaction History',
  insights:     'Smart Insights',
}

function Header({ activePage, onMenuClick }) {
  const { user, logout } = useAuth()
  const { role, setRole, filters, setFilters } = useFinance()
  const navigate = useNavigate()

  const handleSearchChange = (e) => {
    const value = e.target.value
    setFilters(prev => ({ ...prev, search: value }))
    // If we're not on transactions or dashboard, redirect to transactions to show results
    if (activePage !== 'transactions' && activePage !== 'dashboard' && value.trim() !== '') {
      navigate('/transactions')
    }
  }

  return (
    <header className="border-b border-zinc-800 px-4 md:px-8 py-4 flex items-center justify-between bg-zinc-950/50 backdrop-blur-md shrink-0 z-20">
      <div className="flex items-center gap-4">
        {/* Hamburger Menu — only visible on mobile */}
        <button
          onClick={onMenuClick}
          className="md:hidden text-zinc-400 hover:text-white p-2 hover:bg-zinc-800 rounded-lg transition-colors"
          aria-label="Toggle Menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </button>
        <div>
          <h2 className="font-bold text-white text-lg tracking-tight">{titles[activePage] || 'ArthTrack Suite'}</h2>
          <p className="text-[10px] text-zinc-500 font-medium uppercase tracking-widest hidden md:block">Welcome back, {user?.name.split(' ')[0]}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-5">
        {/* Role Toggle — Only visible for Admin users */}
        {user?.role === 'admin' && (
          <div className="hidden sm:flex bg-zinc-900 p-1 rounded-xl border border-zinc-800 mr-2 shadow-inner">
            <button 
              onClick={() => setRole('viewer')}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${role === 'viewer' ? 'bg-zinc-800 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              Viewer
            </button>
            <button 
              onClick={() => setRole('admin')}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${role === 'admin' ? 'bg-emerald-600 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              Admin
            </button>
          </div>
        )}

        {/* Search Bar - Desktop - Hidden on Dashboard as per request */}
        {activePage !== 'dashboard' && (
          <div className="hidden lg:flex items-center bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-1.5 w-64 group focus-within:border-emerald-500/50 transition-all">
            <Search className="w-4 h-4 text-zinc-500 group-focus-within:text-emerald-500" />
            <input 
              type="text" 
              placeholder="Search records..." 
              value={filters.search}
              onChange={handleSearchChange}
              className="bg-transparent border-none focus:ring-0 text-xs text-white placeholder:text-zinc-600 w-full"
            />
          </div>
        )}

        <button className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors relative group">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full border-2 border-zinc-950 group-hover:scale-110 transition-transform"></span>
        </button>

        <div className="h-8 w-px bg-zinc-800 mx-1 hidden md:block"></div>

        <div className="flex items-center gap-3 pl-1">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-semibold text-white leading-none">{user?.name}</p>
            <p className="text-[10px] text-zinc-500 mt-1 capitalize">{user?.role}</p>
          </div>
          <button className="flex items-center gap-2 group">
            <img 
              src={user?.avatar} 
              alt={user?.name} 
              className="w-10 h-10 rounded-xl border border-zinc-700 p-0.5 group-hover:border-emerald-500/50 transition-colors shadow-lg"
            />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
