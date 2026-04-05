import React, { useState } from 'react'
import { useFinance } from '../../context/FinanceContext'

const CATEGORIES = ['Salary', 'Freelance', 'Food', 'Rent', 'Transport', 'Entertainment', 'Shopping', 'Utilities', 'Other']

// Simple modal that appears when admin clicks edit on a row
function EditModal({ tx, onClose }) {
  const { editTransaction } = useFinance()

  const [form, setForm] = useState({
    description: tx.description,
    amount:      tx.amount,
    category:    tx.category,
    type:        tx.type,
    date:        tx.date,
  })
  const [error, setError] = useState('')

  const update = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    if (!form.description.trim() || !form.amount || Number(form.amount) <= 0) {
      setError('All fields required. Amount must be > 0.')
      return
    }
    editTransaction(tx.id, form)
    onClose()
  }

  return (
    // dark backdrop
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={onClose}>
      <div
        className="bg-zinc-900 border border-zinc-700 rounded-lg p-5 w-full max-w-md mx-4"
        onClick={e => e.stopPropagation()} // don't close when clicking inside
      >
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm font-medium text-white">Edit Transaction</p>
          <button onClick={onClose} className="text-zinc-500 hover:text-zinc-200 text-xl leading-none">×</button>
        </div>

        {error && <p className="text-red-400 text-xs mb-3">{error}</p>}

        <form onSubmit={submit} className="grid grid-cols-2 gap-3">
          <div className="col-span-2">
            <label className="text-xs text-zinc-500 block mb-1">Description</label>
            <input
              name="description"
              value={form.description}
              onChange={update}
              className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-zinc-500"
            />
          </div>

          <div>
            <label className="text-xs text-zinc-500 block mb-1">Amount (₹)</label>
            <input
              name="amount"
              type="number"
              min="1"
              value={form.amount}
              onChange={update}
              className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-zinc-500"
            />
          </div>

          <div>
            <label className="text-xs text-zinc-500 block mb-1">Date</label>
            <input
              name="date"
              type="date"
              value={form.date}
              onChange={update}
              className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-sm text-zinc-300 focus:outline-none focus:border-zinc-500"
              style={{ colorScheme: 'dark' }}
            />
          </div>

          <div>
            <label className="text-xs text-zinc-500 block mb-1">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={update}
              className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-sm text-zinc-300 focus:outline-none focus:border-zinc-500"
            >
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label className="text-xs text-zinc-500 block mb-1">Type</label>
            <select
              name="type"
              value={form.type}
              onChange={update}
              className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-sm text-zinc-300 focus:outline-none focus:border-zinc-500"
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>

          <div className="col-span-2 flex gap-2 justify-end mt-1">
            <button type="button" onClick={onClose} className="text-xs px-3 py-1.5 text-zinc-500 hover:text-zinc-200">
              Cancel
            </button>
            <button type="submit" className="text-xs px-4 py-1.5 bg-zinc-700 hover:bg-zinc-600 text-white rounded transition-colors">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditModal
