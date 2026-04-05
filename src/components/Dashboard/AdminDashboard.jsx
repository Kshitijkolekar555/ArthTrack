import React, { useState, useContext } from 'react'
import Header from '../other/Header'
import CreateTask from '../other/CreateTask'
import AllTask from '../other/AllTask'
import Sidebar from '../other/Sidebar'
import Analytics from '../other/Analytics'
import TaskListNumbers from '../other/TaskListNumbers'
import { AuthContext } from '../../context/AuthProvider'

const AdminDashboard = (props) => {
    const [activeTab, setActiveTab] = useState('dashboard')
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [userData] = useContext(AuthContext)

    // Calculate aggregate stats for Admin Dashboard overview
    const aggregateData = userData ? {
        taskCounts: {
            newTask: userData.reduce((acc, emp) => acc + emp.taskCounts.newTask, 0),
            completed: userData.reduce((acc, emp) => acc + emp.taskCounts.completed, 0),
            active: userData.reduce((acc, emp) => acc + emp.taskCounts.active, 0),
            failed: userData.reduce((acc, emp) => acc + emp.taskCounts.failed, 0),
        }
    } : null;

    return (
        <div className='flex h-screen w-full overflow-hidden transition-all duration-300 relative' style={{ backgroundColor: 'var(--bg-color)' }}>
            <Sidebar
                userRole="admin"
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
            <div className='flex-1 p-4 md:p-7 md:pl-72 h-full overflow-y-auto no-scrollbar w-full'>
                <Header
                    changeUser={props.changeUser}
                    onMenuClick={() => setIsSidebarOpen(true)}
                />

                {activeTab === 'dashboard' && (
                    <div className="animate-fade-in">
                        {aggregateData && <TaskListNumbers data={aggregateData} />}
                        <CreateTask />
                    </div>
                )}

                {activeTab === 'employees' && (
                    <div className="animate-fade-in">
                        <AllTask />
                    </div>
                )}

                {activeTab === 'analytics' && (
                    <div className="animate-fade-in">
                        <Analytics userRole="admin" />
                    </div>
                )}
            </div>
        </div>
    )
}

export default AdminDashboard