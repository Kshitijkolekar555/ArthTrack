import React from 'react'
import { useFinance } from '../../context/FinanceContext'

function FilterBar() {
  const { filters, setFilters, categories } = useFinance()

  const update = (key, value) => setFilters(prev => ({ ...prev, [key]: value }))

  const clear = () => setFilters({ type: '', category: '', search: '', dateFrom: '', dateTo: '' })

  // fills dateFrom + dateTo with current month's range
  const thisMonth = () => {
    const now = new Date()
    const from = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().slice(0, 10)
    const to   = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().slice(0, 10)
    setFilters(prev => ({ ...prev, dateFrom: from, dateTo: to }))
  }

  const hasFilters = filters.type || filters.category || filters.search || filters.dateFrom || filters.dateTo

  return (
    <div className="mb-4 space-y-2">
      {/* Row 1: search + type + category + clear */}
      <div className="flex gap-3 flex-wrap items-center">
        <input
          type="text"
          placeholder="Search..."
          value={filters.search}
          onChange={e => update('search', e.target.value)}
          className="bg-zinc-800 border border-zinc-700 rounded px-3 py-1.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 w-44"
        />

        <select
          value={filters.type}
          onChange={e => update('type', e.target.value)}
          className="bg-zinc-800 border border-zinc-700 rounded px-3 py-1.5 text-sm text-zinc-300 focus:outline-none focus:border-zinc-500"
        >
          <option value="">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select
          value={filters.category}
          onChange={e => update('category', e.target.value)}
          className="bg-zinc-800 border border-zinc-700 rounded px-3 py-1.5 text-sm text-zinc-300 focus:outline-none focus:border-zinc-500"
        >
          <option value="">All Categories</option>
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>

        {hasFilters && (
          <button
            onClick={clear}
            className="text-xs text-zinc-500 hover:text-zinc-300 underline underline-offset-2"
          >
            clear filters
          </button>
        )}
      </div>

      {/* Row 2: date range + "This Month" shortcut */}
      <div className="flex gap-3 flex-wrap items-center">
        <div className="flex items-center gap-2">
          <label className="text-xs text-zinc-500">From</label>
          <input
            type="date"
            value={filters.dateFrom}
            onChange={e => update('dateFrom', e.target.value)}
            className="bg-zinc-800 border border-zinc-700 rounded px-3 py-1.5 text-sm text-zinc-300 focus:outline-none focus:border-zinc-500"
            style={{ colorScheme: 'dark' }}
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-xs text-zinc-500">To</label>
          <input
            type="date"
            value={filters.dateTo}
            onChange={e => update('dateTo', e.target.value)}
            className="bg-zinc-800 border border-zinc-700 rounded px-3 py-1.5 text-sm text-zinc-300 focus:outline-none focus:border-zinc-500"
            style={{ colorScheme: 'dark' }}
          />
        </div>
        <button
          onClick={thisMonth}
          className="text-xs px-3 py-1.5 border border-zinc-700 text-zinc-400 rounded hover:bg-zinc-800 hover:text-zinc-200 transition-colors"
        >
          This Month
        </button>
      </div>
    </div>
  )
}

export default FilterBar
