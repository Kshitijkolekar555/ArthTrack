import React from 'react'

const TaskListNumbers = ({ data }) => {
    return (
        <div className='flex mt-10 justify-between gap-5 flex-wrap'>

            <div className='rounded-xl w-full sm:w-[48%] lg:w-[18%] py-6 px-9 bg-card border-l-8 border-blue-400 shadow-lg transition-transform hover:scale-105 duration-300'>
                <h2 className='text-4xl font-black text-main'>{data.taskCounts.newTask}</h2>
                <h3 className='text-lg mt-0.5 font-bold text-blue-400 uppercase tracking-tight'>New Task</h3>
            </div>
            <div className='rounded-xl w-full sm:w-[48%] lg:w-[18%] py-6 px-9 bg-card border-l-8 border-emerald-500 shadow-lg transition-transform hover:scale-105 duration-300'>
                <h2 className='text-4xl font-black text-main'>{data.taskCounts.completed}</h2>
                <h3 className='text-lg mt-0.5 font-bold text-emerald-500 uppercase tracking-tight'>Completed</h3>
            </div>
            <div className='rounded-xl w-full sm:w-[48%] lg:w-[18%] py-6 px-9 bg-card border-l-8 border-yellow-400 shadow-lg transition-transform hover:scale-105 duration-300'>
                <h2 className='text-4xl font-black text-main'>{data.taskCounts.active}</h2>
                <h3 className='text-lg mt-0.5 font-bold text-yellow-400 uppercase tracking-tight'>In Progress</h3>
            </div>
            <div className='rounded-xl w-full sm:w-[48%] lg:w-[18%] py-6 px-9 bg-card border-l-8 border-red-500 shadow-lg transition-transform hover:scale-105 duration-300'>
                <h2 className='text-4xl font-black text-main'>{data.taskCounts.failed}</h2>
                <h3 className='text-lg mt-0.5 font-bold text-red-500 uppercase tracking-tight'>Failed</h3>
            </div>
            <div className='rounded-xl w-full sm:w-[48%] lg:w-[18%] py-6 px-9 bg-card border-l-8 border-purple-500 shadow-lg transition-transform hover:scale-105 duration-300'>
                <h2 className='text-4xl font-black text-main'>{(data.taskCounts.completed - (data.taskCounts.failed * 0.5)).toFixed(1)}</h2>
                <h3 className='text-lg mt-0.5 font-bold text-purple-500 uppercase tracking-tight'>Score</h3>
            </div>
        </div>
    )
}

export default TaskListNumbers