import React from 'react'
import { useFinance } from '../../context/FinanceContext'
import FilterBar from './FilterBar'
import TransactionTable from './TransactionTable'

// CSV export — no library needed
function exportToCSV(transactions) {
  const header = 'Date,Description,Category,Type,Amount'
  const rows = transactions.map(t =>
    `${t.date},"${t.description}",${t.category},${t.type},${t.amount}`
  )
  const csv  = [header, ...rows].join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url  = URL.createObjectURL(blob)
  const a    = document.createElement('a')
  a.href     = url
  a.download = 'transactions.csv'
  a.click()
  URL.revokeObjectURL(url)
}

function TransactionsPage() {
  const { transactions, filters } = useFinance()

  // Apply all filters here so both the summary row and the table use the same data
  const filtered = transactions.filter(t => {
    if (filters.type     && t.type     !== filters.type)     return false
    if (filters.category && t.category !== filters.category) return false
    if (filters.dateFrom && t.date     <  filters.dateFrom)  return false
    if (filters.dateTo   && t.date     >  filters.dateTo)    return false
    if (filters.search) {
      const q = filters.search.toLowerCase()
      if (!t.description.toLowerCase().includes(q) && !t.category.toLowerCase().includes(q)) return false
    }
    return true
  })

  // Summary for the filtered set
  const totalIncome  = filtered.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0)
  const totalExpense = filtered.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0)
  const isFiltered   = filters.type || filters.category || filters.search || filters.dateFrom || filters.dateTo

  return (
    <div>
      <FilterBar />

      {/* Filtered summary row — only shows when a filter is active */}
      {isFiltered && filtered.length > 0 && (
        <div className="flex gap-6 mb-4 px-1 text-sm text-zinc-400 border-b border-zinc-800 pb-3">
          <span className="text-zinc-500">{filtered.length} transactions</span>
          {totalIncome  > 0 && <span className="text-emerald-400">+₹{totalIncome.toLocaleString('en-IN')} income</span>}
          {totalExpense > 0 && <span className="text-red-400">–₹{totalExpense.toLocaleString('en-IN')} expenses</span>}
          {filtered.length > 0 && (
            <span className={`ml-auto font-medium ${totalIncome - totalExpense >= 0 ? 'text-blue-400' : 'text-red-400'}`}>
              Net: {totalIncome - totalExpense >= 0 ? '+' : ''}₹{(totalIncome - totalExpense).toLocaleString('en-IN')}
            </span>
          )}
        </div>
      )}

      {/* Export button — top right above the table */}
      <div className="flex justify-end mb-3">
        <button
          onClick={() => exportToCSV(filtered)}
          className="text-xs px-3 py-1.5 border border-zinc-700 text-zinc-400 rounded hover:bg-zinc-800 hover:text-zinc-200 transition-colors"
          title="Download filtered transactions as CSV"
        >
          ↓ Export CSV
        </button>
      </div>

      <TransactionTable transactions={filtered} />
    </div>
  )
}

export default TransactionsPage
