import React, { useState, useEffect } from 'react'
import { useFinance } from '../../context/FinanceContext'

const CATEGORIES = ['Salary', 'Freelance', 'Food', 'Rent', 'Transport', 'Entertainment', 'Shopping', 'Utilities', 'Other']

function AddTransactionForm() {
  const { addTransaction } = useFinance()

  const [open, setOpen] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    description: '',
    amount: '',
    category: 'Food',
    type: 'expense',
    date: new Date().toISOString().slice(0, 10),
  })

  // Ctrl+N or Cmd+N opens the form
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault()
        setOpen(true)
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])


  const update = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    if (!form.description.trim() || !form.amount || Number(form.amount) <= 0) {
      setError('Fill in all fields. Amount must be > 0.')
      return
    }
    addTransaction(form)
    setForm({ description: '', amount: '', category: 'Food', type: 'expense', date: new Date().toISOString().slice(0, 10) })
    setError('')
    setOpen(false)
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="text-sm px-4 py-2 bg-zinc-800 border border-zinc-700 text-zinc-300 rounded hover:bg-zinc-700 hover:text-white transition-colors"
      >
        + Add Transaction <kbd className="ml-1 text-xs text-zinc-500 font-mono bg-zinc-700 px-1 rounded">⌃N</kbd>
      </button>
    )
  }

  return (
    <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm font-medium text-white">New Transaction</p>
        <button onClick={() => { setOpen(false); setError('') }} className="text-zinc-500 hover:text-zinc-200 text-xl leading-none">×</button>
      </div>

      {error && <p className="text-red-400 text-xs mb-3">{error}</p>}

      <form onSubmit={submit} className="grid grid-cols-2 gap-3">
        <div className="col-span-2">
          <label className="text-xs text-zinc-500 block mb-1">Description</label>
          <input
            name="description"
            value={form.description}
            onChange={update}
            placeholder="e.g. Grocery shopping"
            className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-500"
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
            placeholder="0"
            className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-500"
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
          <button
            type="button"
            onClick={() => { setOpen(false); setError('') }}
            className="text-xs px-3 py-1.5 text-zinc-500 hover:text-zinc-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="text-xs px-4 py-1.5 bg-zinc-700 hover:bg-zinc-600 text-white rounded transition-colors"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddTransactionForm
