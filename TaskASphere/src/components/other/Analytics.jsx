import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const Analytics = ({ userRole, data }) => {
    const [userData] = useContext(AuthContext);

    // Theme Colors for Recharts
    const COLORS = ['#3b82f6', '#eab308', '#10b981', '#ef4444']; // Blue(New), Yellow(Active), Emerald(Completed), Red(Failed)

    // Admin Analytics Calculation
    const getAdminStats = () => {
        if (!userData) return null;
        const totalEmployees = userData.length;
        const newTasks = userData.reduce((acc, emp) => acc + emp.taskCounts.newTask, 0);
        const activeTasks = userData.reduce((acc, emp) => acc + emp.taskCounts.active, 0);
        const completedTasks = userData.reduce((acc, emp) => acc + emp.taskCounts.completed, 0);
        const failedTasks = userData.reduce((acc, emp) => acc + emp.taskCounts.failed, 0);
        const totalTasks = newTasks + activeTasks + completedTasks + failedTasks;

        const avgScore = totalEmployees > 0
            ? (userData.reduce((acc, emp) => acc + (emp.taskCounts.completed - emp.taskCounts.failed * 0.5), 0) / totalEmployees).toFixed(2)
            : 0;

        const sortedEmployees = [...userData].sort((a, b) => {
            const scoreA = a.taskCounts.completed - a.taskCounts.failed * 0.5;
            const scoreB = b.taskCounts.completed - b.taskCounts.failed * 0.5;
            return scoreB - scoreA;
        });

        const pieData = [
            { name: 'New Tasks', value: newTasks },
            { name: 'Active Tasks', value: activeTasks },
            { name: 'Completed Tasks', value: completedTasks },
            { name: 'Failed Tasks', value: failedTasks },
        ];

        return { totalEmployees, totalTasks, newTasks, activeTasks, completedTasks, failedTasks, avgScore, leaderboard: sortedEmployees, pieData };
    };

    // Employee Analytics Calculation
    const getEmployeeStats = () => {
        if (!data) return null;
        const total = data.tasks.length;
        const newTasks = data.taskCounts.newTask;
        const completed = data.taskCounts.completed;
        const failed = data.taskCounts.failed;
        const inProgress = data.taskCounts.active;
        const score = completed - failed * 0.5;
        const completionRate = total > 0 ? ((completed / total) * 100).toFixed(0) : 0;

        const pieData = [
            { name: 'New Tasks', value: newTasks },
            { name: 'Active Tasks', value: inProgress },
            { name: 'Completed Tasks', value: completed },
            { name: 'Failed Tasks', value: failed },
        ];

        return { total, completed, failed, inProgress, newTasks, score, completionRate, pieData };
    };

    const adminStats = userRole === 'admin' ? getAdminStats() : null;
    const empStats = userRole === 'employee' ? getEmployeeStats() : null;

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-card border border-main p-3 rounded-lg shadow-2xl">
                    <p className="text-main font-bold text-sm">{`${payload[0].name} : ${payload[0].value}`}</p>
                </div>
            );
        }
        return null;
    };

    if (userRole === 'admin' && adminStats) {
        return (
            <div className="mt-10 animate-fade-in">
                <h2 className="text-sm font-black uppercase tracking-[0.2em] mb-6 text-gray-500 border-l-4 border-emerald-500 pl-4">Organization Overview</h2>

                <div className="flex flex-col lg:flex-row gap-6 mb-10 h-auto lg:h-64">
                    <div className="w-full lg:w-1/3 h-64 lg:h-auto bg-card rounded-xl border border-main shadow-lg flex flex-col items-center justify-center p-4">
                        <h3 className="text-xs font-black uppercase tracking-widest text-gray-500 w-full text-left">Task Distribution</h3>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={adminStats.pieData}
                                    innerRadius={55}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {adminStats.pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="bg-card p-6 rounded-xl border border-main shadow-lg flex flex-col justify-center hover:shadow-emerald-500/5 transition-all">
                            <p className="text-gray-500 text-[10px] font-black mb-1 uppercase tracking-widest">Avg Productivity</p>
                            <h3 className="text-4xl font-black text-emerald-500">{adminStats.avgScore}</h3>
                        </div>
                        <div className="bg-card p-6 rounded-xl border border-main shadow-lg flex flex-col justify-center">
                            <p className="text-gray-500 text-[10px] font-black mb-1 uppercase tracking-widest">Total Tasks</p>
                            <h3 className="text-4xl font-black text-main">{adminStats.totalTasks}</h3>
                        </div>
                        <div className="bg-card p-6 rounded-xl border border-main shadow-lg flex flex-col justify-center">
                            <p className="text-gray-500 text-[10px] font-black mb-1 uppercase tracking-widest">Completion Rate</p>
                            <h3 className="text-4xl font-black text-emerald-400">
                                {adminStats.totalTasks > 0 ? ((adminStats.completedTasks / adminStats.totalTasks) * 100).toFixed(0) : 0}%
                            </h3>
                        </div>
                        <div className="bg-card p-6 rounded-xl border border-main shadow-lg flex flex-col justify-center">
                            <p className="text-gray-500 text-[10px] font-black mb-1 uppercase tracking-widest">Failed Rate</p>
                            <h3 className="text-4xl font-black text-red-500">
                                {adminStats.totalTasks > 0 ? ((adminStats.failedTasks / adminStats.totalTasks) * 100).toFixed(0) : 0}%
                            </h3>
                        </div>
                    </div>
                </div>

                <h2 className="text-sm font-black uppercase tracking-[0.2em] mb-6 text-gray-500 border-l-4 border-emerald-500 pl-4">Performance Leaderboard</h2>
                <div className="bg-card rounded-xl border border-main overflow-x-auto shadow-2xl">
                    <div className="grid grid-cols-4 p-4 bg-white/5 font-black uppercase text-[10px] tracking-widest text-gray-500 min-w-[600px]">
                        <span>Employee</span>
                        <span>Productivity</span>
                        <span>Completion</span>
                        <span>Performance</span>
                    </div>
                    {adminStats.leaderboard.map((emp, idx) => {
                        const score = (emp.taskCounts.completed - emp.taskCounts.failed * 0.5).toFixed(1);
                        const rate = emp.tasks.length > 0 ? (emp.taskCounts.completed / emp.tasks.length) * 100 : 0;
                        return (
                            <div key={idx} className="grid grid-cols-4 p-4 border-t border-main items-center hover:bg-white/5 transition-colors min-w-[600px]">
                                <span className="font-bold text-main text-lg">{emp.firstName}</span>
                                <span className="text-emerald-400 font-black text-xl">{score}</span>
                                <span className="text-gray-400 font-bold">{rate.toFixed(0)}%</span>
                                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-emerald-500 transition-all duration-1000 shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                                        style={{ width: `${Math.min(100, (rate))}%` }}
                                    ></div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    if (userRole === 'employee' && empStats) {
        return (
            <div className="mt-10 animate-fade-in">
                <h2 className="text-sm font-black uppercase tracking-[0.2em] mb-6 text-gray-500 border-l-4 border-emerald-500 pl-4">Your Performance</h2>
                <div className="flex flex-col md:flex-row gap-6 mb-10 h-auto md:h-64">
                    <div className="w-full md:w-1/3 h-48 md:h-auto bg-card p-6 rounded-2xl border border-main relative flex flex-col justify-center items-center group shadow-2xl">
                        <p className="text-gray-500 text-[10px] font-black w-full text-left uppercase tracking-widest absolute top-6 left-6">Productivity</p>
                        <h3 className="text-7xl font-black text-emerald-500 drop-shadow-lg">{empStats.score.toFixed(1)}</h3>
                    </div>

                    <div className="w-full md:w-1/3 h-64 md:h-auto bg-card rounded-2xl border border-main shadow-2xl flex flex-col items-center justify-center p-4">
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-500 w-full text-left ml-4">Task Breakdown</h3>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={empStats.pieData}
                                    innerRadius={55}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {empStats.pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="w-full md:w-1/3 bg-card p-6 rounded-2xl border border-main shadow-2xl flex flex-col justify-center">
                        <div className="mb-4">
                            <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-1">Task Completion</p>
                            <h3 className="text-5xl font-black text-main">{empStats.completionRate}%</h3>
                        </div>
                        <div className="w-full bg-white/5 border border-main h-4 rounded-full overflow-hidden p-0.5 shadow-inner">
                            <div
                                className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full transition-all duration-1000 shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                                style={{ width: `${empStats.completionRate}%` }}
                            ></div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                    <div className="bg-card p-6 rounded-xl border border-main text-center shadow-lg group hover:border-blue-400/50 transition-all">
                        <p className="text-blue-400 text-[10px] font-black uppercase tracking-widest mb-2 group-hover:scale-110 transition-transform">Total Assigned</p>
                        <h4 className="text-3xl font-black text-main">{empStats.total}</h4>
                    </div>
                    <div className="bg-card p-6 rounded-xl border border-main text-center shadow-lg">
                        <p className="text-yellow-400 text-xs font-black uppercase mb-2">Currently Active</p>
                        <h4 className="text-3xl font-bold text-main">{empStats.inProgress}</h4>
                    </div>
                    <div className="bg-card p-6 rounded-xl border border-main text-center shadow-lg">
                        <p className="text-emerald-500 text-xs font-black uppercase mb-2">Efficiency</p>
                        <h4 className="text-3xl font-bold text-main font-mono">
                            {(empStats.total > 0 ? (empStats.completed / (empStats.completed + empStats.failed || 1) * 100) : 0).toFixed(1)}%
                        </h4>
                    </div>
                </div>
            </div>
        );
    }

    return null;
};

export default Analytics;
