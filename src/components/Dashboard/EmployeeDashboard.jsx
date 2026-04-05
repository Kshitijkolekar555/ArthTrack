import React, { useState } from 'react'
import Header from '../other/Header'
import TaskListNumbers from '../other/TaskListNumbers'
import TaskList from '../TaskList/TaskList'
import Sidebar from '../other/Sidebar'
import Analytics from '../other/Analytics'

const EmployeeDashboard = (props) => {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className='flex h-screen w-full overflow-hidden transition-all duration-300 relative' style={{ backgroundColor: 'var(--bg-color)' }}>
      <Sidebar
        userRole="employee"
        changeUser={props.changeUser}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className='flex-1 p-4 md:p-10 md:pl-72 h-full overflow-y-auto no-scrollbar w-full'>
        <Header
          changeUser={props.changeUser}
          data={props.data}
          onMenuClick={() => setIsSidebarOpen(true)}
        />

        {activeTab === 'dashboard' && (
          <div className="animate-fade-in">
            <TaskListNumbers data={props.data} />
            <TaskList data={props.data} />
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="animate-fade-in">
            <Analytics userRole="employee" data={props.data} />
          </div>
        )}
      </div>
    </div>
  )
}

export default EmployeeDashboard