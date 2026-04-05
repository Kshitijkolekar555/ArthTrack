import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'

const AllTask = () => {

  const [userData] = useContext(AuthContext)


  return (
    <div className='bg-card p-5 rounded-xl mt-5 border border-main shadow-xl overflow-x-auto'>
      <div className='min-w-[600px] bg-emerald-500/10 mb-4 py-3 px-5 flex justify-between rounded-lg font-black text-xs uppercase tracking-widest text-emerald-500 border border-emerald-500/20'>
        <h2 className='w-1/6'>Employee</h2>
        <h3 className='w-1/6'>New</h3>
        <h5 className='w-1/6'>Active</h5>
        <h5 className='w-1/6'>Completed</h5>
        <h5 className='w-1/6'>Failed</h5>
        <h5 className='w-1/6'>Score</h5>
      </div>
      <div className='flex flex-col gap-2 min-w-[600px]'>
        {userData && userData.map(function (elem, idx) {
          const score = (elem.taskCounts.completed - (elem.taskCounts.failed * 0.5)).toFixed(1)
          return <div key={idx} className='bg-white/5 py-4 px-5 flex justify-between rounded-lg items-center border border-transparent hover:border-emerald-500/30 hover:bg-white/10 transition-all duration-300'>
            <h2 className='text-lg font-bold w-1/6 text-main'>{elem.firstName}</h2>
            <h3 className='text-lg font-medium w-1/6 text-blue-400'>{elem.taskCounts.newTask}</h3>
            <h5 className='text-lg font-medium w-1/6 text-yellow-400'>{elem.taskCounts.active}</h5>
            <h5 className='text-lg font-medium w-1/6 text-emerald-500'>{elem.taskCounts.completed}</h5>
            <h5 className='text-lg font-medium w-1/6 text-red-500'>{elem.taskCounts.failed}</h5>
            <h5 className='text-lg font-black w-1/6 text-purple-500'>{score}</h5>
          </div>
        })}
      </div>
    </div>
  )
}

export default AllTask