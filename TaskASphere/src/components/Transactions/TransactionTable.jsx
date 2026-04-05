import React, { useState } from 'react'
import { useFinance } from '../../context/FinanceContext'
import { SearchX } from 'lucide-react'
import EditModal from './EditModal'

const fmtDate = (d) =>
  new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })

// receives already-filtered transactions as prop
function TransactionTable({ transactions }) {
  const { role, deleteTransaction, setFilters } = useFinance()
  const [sortBy, setSortBy] = useState('date-desc')
  const [editingTx, setEditingTx] = useState(null)

  const sorted = [...transactions].sort((a, b) => {
    if (sortBy === 'date-desc')   return new Date(b.date) - new Date(a.date)
    if (sortBy === 'date-asc')    return new Date(a.date) - new Date(b.date)
    if (sortBy === 'amount-desc') return b.amount - a.amount
    if (sortBy === 'amount-asc')  return a.amount - b.amount
    return 0
  })

  const handleDelete = (id) => {
    if (window.confirm('Delete this transaction?')) deleteTransaction(id)
  }

  if (sorted.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 bg-zinc-900/30 border border-dashed border-zinc-800 rounded-3xl">
        <div className="p-5 bg-zinc-900 border border-zinc-800 rounded-2xl mb-6 shadow-xl">
          <SearchX className="w-10 h-10 text-zinc-600" />
        </div>
        <h3 className="text-white font-bold text-lg mb-2">No results found</h3>
        <p className="text-zinc-500 text-sm mb-8 text-center max-w-[280px] leading-relaxed">
          Try adjusting your search terms or filters to find what you're looking for.
        </p>
        <button 
          onClick={() => setFilters({
            type: '',
            category: '',
            search: '',
            dateFrom: '',
            dateTo: '',
          })}
          className="text-xs px-6 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl transition-all font-semibold border border-zinc-700 hover:border-zinc-500 shadow-lg active:scale-95"
        >
          Clear all filters
        </button>
      </div>
    )
  }

  return (
    <>
      {/* edit modal rendered here so it's above the table */}
      {editingTx && <EditModal tx={editingTx} onClose={() => setEditingTx(null)} />}

      <div className="flex justify-between items-center mb-3">
        <p className="text-xs text-zinc-500">{sorted.length} results</p>
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          className="bg-zinc-800 border border-zinc-700 rounded px-2 py-1 text-xs text-zinc-300 focus:outline-none"
        >
          <option value="date-desc">Newest first</option>
          <option value="date-asc">Oldest first</option>
          <option value="amount-desc">Highest amount</option>
          <option value="amount-asc">Lowest amount</option>
        </select>
      </div>

      <div className="bg-zinc-900 border border-zinc-700 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-700 text-left">
              <th className="px-4 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wide">Date</th>
              <th className="px-4 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wide">Description</th>
              <th className="px-4 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wide">Category</th>
              <th className="px-4 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wide">Type</th>
              <th className="px-4 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wide text-right">Amount</th>
              {/* action column — only takes space when admin */}
              {role === 'admin' && (
                <th className="px-4 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wide text-center">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {sorted.map((tx, idx) => (
              <tr
                key={tx.id}
                className={`hover:bg-zinc-800/50 transition-colors ${idx < sorted.length - 1 ? 'border-b border-zinc-800' : ''}`}
              >
                <td className="px-4 py-3 text-zinc-400 text-xs whitespace-nowrap">{fmtDate(tx.date)}</td>
                <td className="px-4 py-3 text-zinc-300">{tx.description}</td>
                <td className="px-4 py-3">
                  <span className="bg-zinc-800 text-zinc-400 text-xs px-2 py-0.5 rounded">{tx.category}</span>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium
                    ${tx.type === 'income' ? 'bg-emerald-900/40 text-emerald-400' : 'bg-red-900/40 text-red-400'}`}
                  >
                    {tx.type}
                  </span>
                </td>
                <td className={`px-4 py-3 text-right font-medium
                  ${tx.type === 'income' ? 'text-emerald-400' : 'text-red-400'}`}
                >
                  {tx.type === 'income' ? '+' : '-'}₹{tx.amount.toLocaleString('en-IN')}
                </td>

                {role === 'admin' && (
                  <td className="px-4 py-3 text-center">
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => setEditingTx(tx)}
                        className="text-xs text-zinc-400 hover:text-blue-400 transition-colors px-1.5 py-0.5 rounded hover:bg-blue-900/20"
                        title="Edit"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDelete(tx.id)}
                        className="text-xs text-zinc-400 hover:text-red-400 transition-colors px-1.5 py-0.5 rounded hover:bg-red-900/20"
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default TransactionTable
