import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'

const CompleteTask = ({ data, employeeName }) => {
    const [userData, setUserData, updateTaskStatus] = useContext(AuthContext)

    return (
        <div className='flex-shrink-0 h-full w-[300px] p-6 bg-card rounded-2xl border border-main shadow-xl relative transition-all duration-300 hover:shadow-2xl border-t-8 border-t-emerald-500 opacity-80'>
            <div className='flex justify-between items-center mb-4'>
                <h3 className='bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border border-emerald-500/20'>{data.category}</h3>
                <h4 className='text-xs font-bold text-gray-400'>{data.taskDate}</h4>
            </div>
            <h2 className='text-xl font-black text-main leading-tight mb-2'>{data.taskTitle}</h2>
            <p className='text-sm text-gray-400 line-clamp-3 mb-6'>
                {data.taskDescription}
            </p>
            <div className='mt-auto text-center'>
                <span className='inline-block w-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-xl font-black py-3 text-[10px] uppercase tracking-widest shadow-inner'>COMPLETED</span>
            </div>
        </div>
    )
}

export default CompleteTask