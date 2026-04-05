import React from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { useFinance } from '../../context/FinanceContext'

const COLORS = ['#60a5fa', '#34d399', '#f87171', '#fbbf24', '#a78bfa', '#fb923c', '#2dd4bf', '#94a3b8']

function SpendingChart() {
  const { transactions } = useFinance()

  // Sum expenses by category
  const catMap = {}
  transactions
    .filter(t => t.type === 'expense')
    .forEach(t => {
      catMap[t.category] = (catMap[t.category] || 0) + t.amount
    })

  const data = Object.entries(catMap).map(([name, value]) => ({ name, value }))

  if (data.length === 0) {
    return (
      <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-4 flex items-center justify-center" style={{ height: 270 }}>
        <p className="text-zinc-500 text-sm">No expense data yet</p>
      </div>
    )
  }

  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) return null
    return (
      <div className="bg-zinc-800 border border-zinc-700 rounded p-2 text-xs">
        <p className="text-zinc-300">{payload[0].name}</p>
        <p className="text-white font-medium">₹{payload[0].value.toLocaleString('en-IN')}</p>
      </div>
    )
  }

  return (
    <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-4">
      <p className="text-sm text-zinc-400 mb-2">Spending by Category</p>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data}
            innerRadius={55}
            outerRadius={82}
            paddingAngle={3}
            dataKey="value"
            stroke="none"
          >
            {data.map((_, idx) => (
              <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '11px', color: '#a1a1aa' }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default SpendingChart
