import { useEffect, useState } from 'react'
import { FiBell, FiDollarSign, FiGlobe, FiShield, FiTrash2 } from 'react-icons/fi'
import GlassCard from '../components/GlassCard.jsx'
import ThemeToggle from '../components/ThemeToggle.jsx'
import { useCurrency } from '../hooks/useCurrency.js'
import { useTheme } from '../hooks/useTheme.js'
import { useTransactions } from '../hooks/useTransactions.js'
import { SUPPORTED_CURRENCIES } from '../utils/currencies.js'

export default function Settings() {
  const { theme } = useTheme()
  const { currency, setCurrency, formatAmount } = useCurrency()
  const { budgetGoal, setBudgetGoal, clearAllData, resetDemoData, transactions } =
    useTransactions()
  const [budgetInput, setBudgetInput] = useState(String(budgetGoal))
  const [showBudgetEditor, setShowBudgetEditor] = useState(false)

  useEffect(() => {
    setBudgetInput(String(budgetGoal))
  }, [budgetGoal])

  function handleBudgetSave() {
    setBudgetGoal(budgetInput)
    setShowBudgetEditor(false)
  }

  function handleClearData() {
    if (
      window.confirm(
        'This will permanently delete all transactions and reset your budget. Continue?',
      )
    ) {
      clearAllData()
      setBudgetInput('500')
    }
  }

  function handleResetDemo() {
    resetDemoData()
    setBudgetInput('500')
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <GlassCard>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Appearance
            </h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Customize how the app looks
            </p>
          </div>
          <ThemeToggle />
        </div>
        <p className="mt-5 rounded-2xl bg-white/5 px-4 py-3 text-sm text-slate-600 dark:text-slate-300">
          Current theme: <span className="font-semibold capitalize">{theme}</span>
        </p>
      </GlassCard>

      <GlassCard hover>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/20 to-indigo-500/20 text-violet-600 dark:text-violet-300">
              <FiDollarSign className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">Budget Goal</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Monthly limit: {formatAmount(budgetGoal)}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowBudgetEditor((current) => !current)}
            className="btn-secondary px-4 py-2"
          >
            Edit Budget
          </button>
        </div>

        {showBudgetEditor && (
          <div className="mt-5 flex gap-3">
            <input
              type="number"
              min="1"
              step="1"
              value={budgetInput}
              onChange={(event) => setBudgetInput(event.target.value)}
              className="input-field flex-1"
            />
            <button type="button" onClick={handleBudgetSave} className="btn-primary px-6">
              Save
            </button>
          </div>
        )}
      </GlassCard>

      <GlassCard hover>
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/20 to-indigo-500/20 text-violet-600 dark:text-violet-300">
            <FiBell className="h-5 w-5" />
          </div>
          <div>
            <p className="font-semibold text-slate-900 dark:text-white">Notifications</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Alerts appear when you exceed 80% of your budget
            </p>
          </div>
        </div>
      </GlassCard>

      <GlassCard hover>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/20 to-indigo-500/20 text-violet-600 dark:text-violet-300">
              <FiGlobe className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">Currency</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Display amounts in your preferred currency
              </p>
            </div>
          </div>
          <select
            value={currency}
            onChange={(event) => setCurrency(event.target.value)}
            className="input-field w-full sm:w-64"
            aria-label="Select currency"
          >
            {SUPPORTED_CURRENCIES.map((item) => (
              <option key={item.code} value={item.code}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
      </GlassCard>

      <GlassCard hover>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/20 to-indigo-500/20 text-violet-600 dark:text-violet-300">
              <FiShield className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">Data & Privacy</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {transactions.length} transactions stored locally in your browser
              </p>
            </div>
          </div>
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <button type="button" onClick={handleResetDemo} className="btn-secondary px-4 py-2">
            Load Demo Data
          </button>
          <button
            type="button"
            onClick={handleClearData}
            className="inline-flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-2 text-sm font-medium text-rose-500 transition hover:bg-rose-500/15"
          >
            <FiTrash2 className="h-4 w-4" />
            Clear All Data
          </button>
        </div>
      </GlassCard>

      <GlassCard className="text-center">
        <p className="text-sm text-slate-500 dark:text-slate-400">Expense Tracker Pro v1.0.0</p>
        <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
          Built for your college presentation
        </p>
      </GlassCard>
    </div>
  )
}
