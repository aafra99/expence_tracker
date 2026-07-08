import { useEffect, useMemo, useState } from 'react'
import { FiArrowDownLeft, FiArrowUpRight } from 'react-icons/fi'
import { useLocation, useNavigate } from 'react-router-dom'
import GlassCard from '../components/GlassCard.jsx'
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '../data/categories.js'
import { useTransactions } from '../hooks/useTransactions.js'

export default function AddTransaction() {
  const navigate = useNavigate()
  const location = useLocation()
  const { addTransaction, updateTransaction } = useTransactions()
  const editingTransaction = location.state?.transaction

  const [type, setType] = useState('income')
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('salary')
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10))
  const [error, setError] = useState('')

  const categories = useMemo(
    () => (type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES),
    [type],
  )

  useEffect(() => {
    if (editingTransaction) {
      setType(editingTransaction.type)
      setTitle(editingTransaction.title)
      setAmount(String(editingTransaction.amount))
      setCategory(editingTransaction.category)
      setDate(editingTransaction.date)
    }
  }, [editingTransaction])

  useEffect(() => {
    if (!editingTransaction) {
      setCategory(type === 'income' ? 'salary' : 'food')
    }
  }, [type, editingTransaction])

  function handleSubmit(event) {
    event.preventDefault()
    setError('')

    const parsedAmount = Number.parseFloat(amount)
    if (!title.trim()) {
      setError('Please enter a title.')
      return
    }
    if (Number.isNaN(parsedAmount) || parsedAmount <= 0) {
      setError('Please enter a valid amount greater than 0.')
      return
    }

    const payload = {
      type,
      title: title.trim(),
      amount: parsedAmount,
      category,
      date,
    }

    if (editingTransaction) {
      updateTransaction(editingTransaction.id, payload)
    } else {
      addTransaction(payload)
    }

    navigate('/reports')
  }

  return (
    <div className="mx-auto max-w-2xl">
      <GlassCard>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          {editingTransaction ? 'Edit Transaction' : 'Add Transaction'}
        </h2>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          {editingTransaction
            ? 'Update your income or expense entry'
            : 'Record a new income or expense entry'}
        </p>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setType('income')}
              className={`flex items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-semibold transition-all duration-300 ${
                type === 'income'
                  ? 'border-2 border-emerald-500/50 bg-emerald-500/15 text-emerald-600 shadow-lg shadow-emerald-500/10 dark:text-emerald-400'
                  : 'border border-white/20 text-slate-600 hover:bg-white/10 dark:text-slate-300'
              }`}
            >
              <FiArrowDownLeft className="h-4 w-4" />
              Income
            </button>
            <button
              type="button"
              onClick={() => setType('expense')}
              className={`flex items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-semibold transition-all duration-300 ${
                type === 'expense'
                  ? 'border-2 border-rose-500/50 bg-rose-500/15 text-rose-600 shadow-lg shadow-rose-500/10 dark:text-rose-400'
                  : 'border border-white/20 text-slate-600 hover:bg-white/10 dark:text-slate-300'
              }`}
            >
              <FiArrowUpRight className="h-4 w-4" />
              Expense
            </button>
          </div>

          <label className="block space-y-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
            Title
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="e.g. Grocery shopping"
              className="input-field font-normal"
              required
            />
          </label>

          <label className="block space-y-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
            Amount
            <input
              type="number"
              min="0.01"
              step="0.01"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              placeholder="0.00"
              className="input-field font-normal"
              required
            />
          </label>

          <label className="block space-y-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
            Category
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="input-field font-normal"
            >
              {categories.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>

          <label className="block space-y-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
            Date
            <input
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              className="input-field font-normal"
              required
            />
          </label>

          {error && (
            <p className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-500">
              {error}
            </p>
          )}

          <div className="grid gap-3 sm:grid-cols-2">
            <button type="button" onClick={() => navigate(-1)} className="btn-secondary py-3.5">
              Cancel
            </button>
            <button type="submit" className="btn-primary py-3.5">
              {editingTransaction ? 'Update Transaction' : 'Save Transaction'}
            </button>
          </div>
        </form>
      </GlassCard>
    </div>
  )
}
