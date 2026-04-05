import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { useFinance } from '../../context/FinanceContext'

function BalanceChart() {
  const { transactions } = useFinance()

  // Group transactions by month
  const monthMap = {}
  transactions.forEach(t => {
    const d   = new Date(t.date)
    const key = d.toLocaleString('default', { month: 'short', year: '2-digit' }) // e.g. "Oct 24"
    if (!monthMap[key]) monthMap[key] = { month: key, income: 0, expense: 0 }
    if (t.type === 'income')  monthMap[key].income  += t.amount
    else                      monthMap[key].expense += t.amount
  })

  const data = Object.values(monthMap).map(m => ({
    ...m,
    balance: m.income - m.expense,
  }))

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null
    return (
      <div className="bg-zinc-800 border border-zinc-700 rounded p-2 text-xs">
        <p className="text-zinc-300 font-medium mb-1">{label}</p>
        {payload.map(p => (
          <p key={p.name} style={{ color: p.color }}>
            {p.name}: ₹{p.value.toLocaleString('en-IN')}
          </p>
        ))}
      </div>
    )
  }

  return (
    <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-4">
      <p className="text-sm text-zinc-400 mb-4">Monthly Overview</p>
      <ResponsiveContainer width="100%" height={210}>
        <LineChart data={data} margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
          <XAxis dataKey="month" tick={{ fill: '#a1a1aa', fontSize: 11 }} />
          <YAxis tick={{ fill: '#a1a1aa', fontSize: 11 }} tickFormatter={v => '₹' + (v / 1000) + 'k'} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: '12px', color: '#a1a1aa' }} />
          <Line type="monotone" dataKey="income"  stroke="#34d399" strokeWidth={2} dot={false} name="Income" />
          <Line type="monotone" dataKey="expense" stroke="#f87171" strokeWidth={2} dot={false} name="Expense" />
          <Line type="monotone" dataKey="balance" stroke="#60a5fa" strokeWidth={2} dot={false} name="Balance" strokeDasharray="5 5" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default BalanceChart
