import React from 'react'
import AcceptTask from './AcceptTask'
import NewTask from './NewTask'
import CompleteTask from './CompleteTask'
import FailedTask from './FailedTask'

const TaskList = ({ data }) => {
    return (
        <div id='tasklist' className='h-[50%] overflow-x-auto flex items-center justify-start gap-5 flex-nowrap w-full py-1 mt-16'>
            {data.tasks.map((elem, idx) => {
                if (elem.status === 'in-progress') {
                    return <AcceptTask key={idx} data={elem} employeeName={data.firstName} />
                }
                if (elem.status === 'new') {
                    return <NewTask key={idx} data={elem} employeeName={data.firstName} />
                }
                if (elem.status === 'completed') {
                    return <CompleteTask key={idx} data={elem} employeeName={data.firstName} />
                }
                if (elem.status === 'failed') {
                    return <FailedTask key={idx} data={elem} employeeName={data.firstName} />
                }
            })}
        </div>
    )
}

export default TaskList