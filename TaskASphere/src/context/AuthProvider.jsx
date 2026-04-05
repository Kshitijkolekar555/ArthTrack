import React, { createContext, useEffect, useState } from 'react'
import { getLocalStorage, setLocalStorage } from '../utils/localStorage'

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    // localStorage.clear()

    const [userData, setUserData] = useState(null)

    useEffect(() => {
        let data = getLocalStorage()

        // Force reset if data is missing or using old schema (no status or firstName)
        const isOldSchema = data && data.employees && data.employees[0] &&
            (!data.employees[0].firstName || (data.employees[0].tasks[0] && data.employees[0].tasks[0].active !== undefined));

        if (!data || !data.employees || isOldSchema) {
            console.log("Initializing/Resetting LocalStorage data...")
            setLocalStorage()
            data = getLocalStorage()
        }
        setUserData(data.employees)
    }, [])

    useEffect(() => {
        if (userData) {
            localStorage.setItem('employees', JSON.stringify(userData))
        }
    }, [userData])

    const updateTaskStatus = (employeeName, taskTitle, newStatus) => {
        const updatedData = userData.map(emp => {
            if (emp.firstName === employeeName) {
                // Update task status
                const updatedTasks = emp.tasks.map(task =>
                    task.taskTitle === taskTitle ? { ...task, status: newStatus } : task
                );

                // Recalculate task counts
                const taskCounts = {
                    active: updatedTasks.filter(t => t.status === 'in-progress').length,
                    newTask: updatedTasks.filter(t => t.status === 'new').length,
                    completed: updatedTasks.filter(t => t.status === 'completed').length,
                    failed: updatedTasks.filter(t => t.status === 'failed').length
                };

                return { ...emp, tasks: updatedTasks, taskCounts };
            }
            return emp;
        });

        // Update state and persistence
        setUserData(updatedData);
        localStorage.setItem('employees', JSON.stringify(updatedData));
    };

    const registerEmployee = (firstName, email, password) => {
        if (!userData) return false;

        // Simple check for existing email
        if (userData.some(emp => emp.email === email)) {
            return false; // Email already registered
        }

        const newEmployee = {
            id: userData.length > 0 ? Math.max(...userData.map(e => e.id)) + 1 : 1,
            firstName,
            email,
            password,
            taskCounts: {
                active: 0,
                newTask: 0,
                completed: 0,
                failed: 0
            },
            tasks: []
        };

        const updatedData = [...userData, newEmployee];
        setUserData(updatedData);
        localStorage.setItem('employees', JSON.stringify(updatedData));
        return true;
    };


    return (
        <AuthContext.Provider value={[userData, setUserData, updateTaskStatus, registerEmployee]}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider