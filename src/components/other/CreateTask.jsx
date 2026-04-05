import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthProvider'
import { NotificationContext } from '../../context/NotificationContext'

const CreateTask = () => {

    const [userData, setUserData] = useContext(AuthContext)
    const { addNotification } = useContext(NotificationContext)

    const [taskTitle, setTaskTitle] = useState('')
    const [taskDescription, setTaskDescription] = useState('')
    const [taskDate, setTaskDate] = useState('')
    const [asignTo, setAsignTo] = useState('')
    const [category, setCategory] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()

        const task = {
            taskTitle,
            taskDescription,
            taskDate,
            category,
            status: 'new'
        }

        const employee = userData.find((emp) => emp.firstName === asignTo)

        if (!employee) {
            alert("Employee not found!")
            return
        }

        const data = [...userData]

        const updatedData = data.map((elem) => {
            if (elem.firstName === asignTo) {
                return {
                    ...elem,
                    tasks: [...elem.tasks, task],
                    taskCounts: {
                        ...elem.taskCounts,
                        newTask: elem.taskCounts.newTask + 1
                    }
                }
            }
            return elem
        })

        setUserData(updatedData)

        // Side effects
        addNotification(`New task assigned: ${taskTitle}`, asignTo)
        addNotification(`Task "${taskTitle}" assigned to ${asignTo}`, 'admin')

        import('../../utils/emailService').then(({ sendEmailNotification }) => {
            sendEmailNotification(employee.firstName, employee.email, taskTitle, taskDescription)
                .catch(err => console.error("Email notification failed", err))
        })

        setTaskTitle('')
        setCategory('')
        setAsignTo('')
        setTaskDate('')
        setTaskDescription('')
    }

    return (
        <div className='p-4 md:p-6 bg-card mt-5 rounded-xl border border-main shadow-xl'>
            <form onSubmit={(e) => {
                submitHandler(e)
            }}
                className='flex flex-col lg:flex-row w-full items-start justify-between gap-6 lg:gap-0'
            >
                <div className='w-full md:w-1/2'>
                    <div>
                        <h3 className='text-xs font-black uppercase tracking-wider text-gray-500 mb-2'>Task Title</h3>
                        <input
                            value={taskTitle}
                            onChange={(e) => {
                                setTaskTitle(e.target.value)
                            }}
                            className='text-sm py-2 px-3 w-full md:w-4/5 rounded-lg outline-none bg-white/5 border border-main mb-6 text-main focus:border-emerald-500/50 transition-all' type="text" placeholder='Make a UI design'
                        />
                    </div>
                    <div>
                        <h3 className='text-xs font-black uppercase tracking-wider text-gray-500 mb-2'>Date</h3>
                        <input
                            value={taskDate}
                            onChange={(e) => {
                                setTaskDate(e.target.value)
                            }}
                            className='text-sm py-2 px-3 w-full md:w-4/5 rounded-lg outline-none bg-white/5 border border-main mb-6 text-main focus:border-emerald-500/50 transition-all' type="date" />
                    </div>
                    <div className='relative w-full md:w-4/5 mb-6'>
                        <h3 className='text-xs font-black uppercase tracking-wider text-gray-500 mb-2'>Assign to</h3>
                        <div className="relative w-full">
                            <select
                                value={asignTo}
                                onChange={(e) => {
                                    setAsignTo(e.target.value)
                                }}
                                className='w-full text-sm py-2 px-3 rounded-lg outline-none bg-white/5 border border-main text-main focus:border-emerald-500/50 transition-all appearance-none cursor-pointer'
                                required
                            >
                                <option value="" disabled className='bg-card text-gray-500'>Select an employee</option>
                                {userData && userData.map((emp) => (
                                    <option key={emp.id} value={emp.firstName} className='bg-card text-main'>
                                        {emp.firstName}
                                    </option>
                                ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-emerald-500">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3 className='text-xs font-black uppercase tracking-wider text-gray-500 mb-2'>Category</h3>
                        <input
                            value={category}
                            onChange={(e) => {
                                setCategory(e.target.value)
                            }}
                            className='text-sm py-2 px-3 w-full md:w-4/5 rounded-lg outline-none bg-white/5 border border-main mb-6 text-main focus:border-emerald-500/50 transition-all' type="text" placeholder='design, dev, etc' />
                    </div>
                </div>

                <div className='w-full md:w-2/5 flex flex-col items-start'>
                    <h3 className='text-xs font-black uppercase tracking-wider text-gray-500 mb-2'>Description</h3>
                    <textarea value={taskDescription}
                        onChange={(e) => {
                            setTaskDescription(e.target.value)
                        }} className='w-full h-44 text-sm py-3 px-4 rounded-xl outline-none bg-white/5 border border-main text-main focus:border-emerald-500/50 transition-all resize-none' name="" id=""></textarea>
                    <button className='bg-emerald-500 py-4 hover:bg-emerald-600 px-5 rounded-xl text-sm font-bold mt-6 w-full text-white shadow-lg shadow-emerald-500/20 transition-all active:scale-[0.98]'>Create Task</button>
                </div>

            </form>
        </div>
    )
}

export default CreateTask