import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'
import { NotificationContext } from '../../context/NotificationContext'

const AcceptTask = ({ data, employeeName }) => {
    const [userData, setUserData, updateTaskStatus] = useContext(AuthContext)
    const { addNotification } = useContext(NotificationContext)

    const isOverdue = new Date(data.taskDate) < new Date() && data.status !== 'completed'

    return (
        <div className={`flex-shrink-0 h-full w-[300px] p-6 bg-card rounded-2xl border border-main shadow-xl relative transition-all duration-300 hover:shadow-2xl border-t-8 border-t-yellow-400 ${isOverdue ? 'ring-4 ring-red-500/50 animation-pulse' : ''}`}>
            {isOverdue && (
                <span className='absolute -top-3 -right-3 bg-red-600 text-[#fff] text-[10px] font-black px-3 py-1.5 rounded-full shadow-lg z-10 animate-pulse'>
                    OVERDUE
                </span>
            )}
            <div className='flex justify-between items-center mb-4'>
                <h3 className='bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border border-emerald-500/20'>{data.category}</h3>
                <h4 className='text-xs font-bold text-gray-400'>{data.taskDate}</h4>
            </div>
            <h2 className='text-xl font-black text-main leading-tight mb-2'>{data.taskTitle}</h2>
            <p className='text-sm text-gray-400 line-clamp-3 mb-6'>
                {data.taskDescription}
            </p>
            <div className='mt-auto flex gap-3'>
                <button
                    onClick={() => {
                        updateTaskStatus(employeeName, data.taskTitle, 'completed')
                        addNotification(`You completed the task: ${data.taskTitle}`, employeeName)
                        addNotification(`${employeeName} completed the task: ${data.taskTitle}`, 'admin')
                    }}
                    className='flex-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold py-3 text-[10px] shadow-lg shadow-emerald-500/20 active:scale-95 transition-all'>
                    Complete
                </button>
                <button
                    onClick={() => {
                        updateTaskStatus(employeeName, data.taskTitle, 'failed')
                        addNotification(`You failed the task: ${data.taskTitle}`, employeeName)
                        addNotification(`${employeeName} failed the task: ${data.taskTitle}`, 'admin')
                    }}
                    className='flex-1 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white border border-red-500/20 rounded-xl font-bold py-3 text-[10px] active:scale-95 transition-all'>
                    Fail
                </button>
            </div>
        </div>
    )
}

export default AcceptTask