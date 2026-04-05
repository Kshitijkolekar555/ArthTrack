import React, { useState } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Sidebar from './components/Layout/Sidebar'
import Header from './components/Layout/Header'
import DashboardPage from './components/Dashboard/DashboardPage'
import TransactionsPage from './components/Transactions/TransactionsPage'
import InsightsPage from './components/Insights/InsightsPage'
import LoginPage from './components/Auth/LoginPage'
import RegisterPage from './components/Auth/RegisterPage'
import LandingPage from './components/Auth/LandingPage'
import ProtectedRoute from './components/Auth/ProtectedRoute'
import { useAuth } from './context/AuthContext'

function App() {
  const [sidebarOpen, setSidebarOpen]   = useState(false)
  const location = useLocation()
  const { isAuthenticated } = useAuth()

  // Helper to determine active page from URL
  const getActivePage = () => {
    const path = location.pathname.substring(1) || 'dashboard'
    return path
  }

  const activePage = getActivePage()

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protected Dashboard Layout */}
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <div className="flex h-screen bg-zinc-950 text-white overflow-hidden relative font-sans">
              {/* Mobile overlay */}
              {sidebarOpen && (
                <div
                  className="fixed inset-0 bg-black/60 z-30 md:hidden backdrop-blur-sm transition-opacity"
                  onClick={() => setSidebarOpen(false)}
                />
              )}

              <Sidebar
                activePage={activePage}
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
              />

              <div className="flex-1 flex flex-col overflow-hidden">
                <Header
                  activePage={activePage}
                  onMenuClick={() => setSidebarOpen(prev => !prev)}
                />
                <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-zinc-950/50">
                  <Routes>
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/transactions" element={<TransactionsPage />} />
                    <Route path="/insights" element={<InsightsPage />} />
                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                  </Routes>
                </main>
              </div>
            </div>
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default App