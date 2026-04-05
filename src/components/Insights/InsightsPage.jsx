import React, { useState } from 'react'
import { useFinance } from '../../context/FinanceContext'

const fmt = (n) => '₹' + n.toLocaleString('en-IN')

const monthLabel = (key) => {
  if (!key) return '—'
  const [year, month] = key.split('-')
  return new Date(year, month - 1).toLocaleString('default', { month: 'long', year: 'numeric' })
}

function InsightsPage() {
  const { transactions, budgets, setBudget, role } = useFinance()
  const [editingBudget, setEditingBudget] = useState(null) // category whose budget is being edited
  const [budgetInput, setBudgetInput]     = useState('')

  if (transactions.length === 0) {
    return <p className="text-zinc-500 text-sm">No data yet.</p>
  }

  // --- Expense by category (all time) ---
  const expByCategory = {}
  transactions
    .filter(t => t.type === 'expense')
    .forEach(t => {
      expByCategory[t.category] = (expByCategory[t.category] || 0) + t.amount
    })

  const sortedCats  = Object.entries(expByCategory).sort((a, b) => b[1] - a[1])
  const topCategory = sortedCats[0]
  const totalExpense = sortedCats.reduce((s, [, v]) => s + v, 0)

  // --- Monthly expense + income ---
  const monthlyExp = {}
  const monthlyInc = {}
  transactions.forEach(t => {
    const key = t.date.slice(0, 7)
    if (t.type === 'expense') monthlyExp[key] = (monthlyExp[key] || 0) + t.amount
    if (t.type === 'income')  monthlyInc[key] = (monthlyInc[key] || 0) + t.amount
  })

  const months    = Object.keys(monthlyExp).sort()
  const lastMonth = months[months.length - 1]
  const prevMonth = months[months.length - 2]
  const lastSpend = monthlyExp[lastMonth] || 0
  const prevSpend = monthlyExp[prevMonth] || 0
  const diff      = lastSpend - prevSpend
  const diffPct   = prevSpend > 0 ? ((diff / prevSpend) * 100).toFixed(1) : null

  const lastIncome  = monthlyInc[lastMonth] || 0
  const savingsRate = lastIncome > 0
    ? (((lastIncome - lastSpend) / lastIncome) * 100).toFixed(0)
    : null

  // --- Budget: monthly expense per category for lastMonth ---
  const monthlyByCat = {}
  transactions
    .filter(t => t.type === 'expense' && t.date.slice(0, 7) === lastMonth)
    .forEach(t => {
      monthlyByCat[t.category] = (monthlyByCat[t.category] || 0) + t.amount
    })

  const saveBudget = (cat) => {
    const val = Number(budgetInput)
    if (val > 0) setBudget(cat, val)
    setEditingBudget(null)
    setBudgetInput('')
  }

  return (
    <div className="space-y-4 max-w-2xl">
      <p className="text-xs text-zinc-500 uppercase tracking-wider font-medium">Spending Insights</p>

      {/* Top category */}
      {topCategory && (
        <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-4">
          <p className="text-xs text-zinc-500 mb-1">Highest Spending Category</p>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-white">{topCategory[0]}</span>
            <span className="text-red-400 font-medium text-sm">{fmt(topCategory[1])}</span>
          </div>
          <p className="text-xs text-zinc-600 mt-1">across all transactions</p>
        </div>
      )}

      {/* Monthly comparison */}
      {prevMonth && lastMonth && (
        <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-4">
          <p className="text-xs text-zinc-500 mb-3">Monthly Expense Comparison</p>
          <div className="flex gap-8 items-end">
            <div>
              <p className="text-xs text-zinc-500">{monthLabel(prevMonth)}</p>
              <p className="text-lg font-bold text-zinc-300">{fmt(prevSpend)}</p>
            </div>
            <div>
              <p className="text-xs text-zinc-500">{monthLabel(lastMonth)}</p>
              <p className="text-lg font-bold text-zinc-300">{fmt(lastSpend)}</p>
            </div>
            {diffPct !== null && (
              <div className="ml-auto text-right">
                <p className="text-xs text-zinc-500">Change</p>
                <p className={`text-lg font-bold ${diff > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                  {diff > 0 ? '+' : ''}{diffPct}%
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Savings rate */}
      {savingsRate !== null && (
        <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-4">
          <p className="text-xs text-zinc-500 mb-1">Savings Rate — {monthLabel(lastMonth)}</p>
          <p className={`text-2xl font-bold ${Number(savingsRate) >= 20 ? 'text-emerald-400' : 'text-yellow-400'}`}>
            {savingsRate}%
          </p>
          <p className="text-xs text-zinc-600 mt-1">
            {Number(savingsRate) >= 20 ? 'Good savings this month' : 'Could cut some expenses'}
          </p>
        </div>
      )}

      {/* Budget warnings — per category for current month */}
      <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-4">
        <div className="flex justify-between items-center mb-3">
          <p className="text-xs text-zinc-500">Budget Tracker — {monthLabel(lastMonth)}</p>
          {role === 'admin' && (
            <p className="text-xs text-zinc-600">click a category to set budget</p>
          )}
        </div>
        <div className="space-y-4">
          {sortedCats.map(([cat, _allTime]) => {
            const spent  = monthlyByCat[cat] || 0
            const budget = budgets[cat]
            const pct    = budget ? Math.min((spent / budget) * 100, 100) : 0
            const over   = budget && spent > budget
            const near   = budget && !over && pct >= 80

            return (
              <div key={cat}>
                <div className="flex justify-between text-xs mb-1">
                  <button
                    className={`text-left ${role === 'admin' ? 'hover:text-white cursor-pointer' : 'cursor-default'} ${over ? 'text-red-400' : near ? 'text-yellow-400' : 'text-zinc-400'}`}
                    onClick={() => {
                      if (role !== 'admin') return
                      setEditingBudget(cat)
                      setBudgetInput(budgets[cat] || '')
                    }}
                  >
                    {cat}
                    {over && ' 🚨'}
                    {near && !over && ' ⚠️'}
                  </button>
                  <span className="text-zinc-500">
                    {fmt(spent)}{budget ? ` / ${fmt(budget)}` : ' (no budget set)'}
                  </span>
                </div>

                {/* inline budget input when editing */}
                {editingBudget === cat && (
                  <div className="flex gap-2 mb-2">
                    <input
                      type="number"
                      value={budgetInput}
                      onChange={e => setBudgetInput(e.target.value)}
                      placeholder="Set monthly budget..."
                      className="flex-1 bg-zinc-800 border border-zinc-600 rounded px-2 py-1 text-xs text-white focus:outline-none"
                      autoFocus
                    />
                    <button onClick={() => saveBudget(cat)} className="text-xs px-2 py-1 bg-zinc-700 text-white rounded hover:bg-zinc-600">Save</button>
                    <button onClick={() => setEditingBudget(null)} className="text-xs px-2 py-1 text-zinc-500 hover:text-zinc-300">×</button>
                  </div>
                )}

                {budget ? (
                  <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${over ? 'bg-red-500' : near ? 'bg-yellow-500' : 'bg-blue-500'}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                ) : (
                  // no budget set — just show a grey bar
                  <div className="h-1.5 bg-zinc-800 rounded-full" />
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* All-time category breakdown */}
      <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-4">
        <p className="text-xs text-zinc-500 mb-3">All Categories (Total Spend)</p>
        <div className="space-y-3">
          {sortedCats.map(([cat, amt]) => {
            const pct = totalExpense > 0 ? ((amt / totalExpense) * 100).toFixed(0) : 0
            return (
              <div key={cat}>
                <div className="flex justify-between text-xs text-zinc-400 mb-1">
                  <span>{cat}</span>
                  <span>{fmt(amt)} ({pct}%)</span>
                </div>
                <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: `${pct}%` }} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default InsightsPage
