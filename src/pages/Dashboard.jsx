import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BalanceCard from '../components/BalanceCard.jsx'
import CategoryFilter from '../components/CategoryFilter.jsx'
import ExpenseCard from '../components/ExpenseCard.jsx'
import GlassCard from '../components/GlassCard.jsx'
import IncomeCard from '../components/IncomeCard.jsx'
import SearchBar from '../components/SearchBar.jsx'
import TransactionList from '../components/TransactionList.jsx'
import { useCurrency } from '../hooks/useCurrency.js'
import { useTransactions } from '../hooks/useTransactions.js'
import { filterTransactions, getBalanceTrend } from '../utils/analytics.js'

export default function Dashboard() {
  const navigate = useNavigate()
  const { formatAmount } = useCurrency()
  const {
    transactions,
    budgetGoal,
    budgetUsedPercent,
    monthlyExpenses,
    totals,
    deleteTransaction,
  } = useTransactions()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')

  const filteredTransactions = useMemo(
    () => filterTransactions(transactions, { search, category }),
    [transactions, search, category],
  )

  const balanceTrend = useMemo(() => getBalanceTrend(transactions), [transactions])

  function handleEdit(transaction) {
    navigate('/add', { state: { transaction } })
  }

  function handleDelete(transaction) {
    if (window.confirm(`Delete "${transaction.title}"?`)) {
      deleteTransaction(transaction.id)
    }
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      {budgetUsedPercent >= 80 && (
        <div
          className={`rounded-2xl border px-5 py-4 text-sm font-medium backdrop-blur-md ${
            budgetUsedPercent >= 100
              ? 'border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-300'
              : 'border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300'
          }`}
        >
          {budgetUsedPercent >= 100
            ? `Budget exceeded! You've spent ${formatAmount(monthlyExpenses)} of your ${formatAmount(budgetGoal)} limit.`
            : `Budget alert: ${budgetUsedPercent.toFixed(0)}% of your monthly budget used.`}
        </div>
      )}

      <div className="grid gap-5 md:grid-cols-3">
        <BalanceCard balance={totals.balance} trend={balanceTrend} />
        <IncomeCard income={totals.income} />
        <ExpenseCard expenses={totals.expenses} />
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_auto]">
        <SearchBar value={search} onChange={(event) => setSearch(event.target.value)} />
        <CategoryFilter
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          includeIncome
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <GlassCard delay={0.15}>
          <TransactionList
            transactions={filteredTransactions.slice(0, 5)}
            title="Recent Transactions"
            onEdit={handleEdit}
            onDelete={handleDelete}
            emptyAction={() => navigate('/add')}
            emptyActionLabel="Add Transaction"
          />
        </GlassCard>

        <GlassCard delay={0.2}>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            Budget Overview
          </h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Monthly spending limit</p>
          <p className="mt-5 text-4xl font-extrabold text-violet-600 dark:text-violet-300">
            {formatAmount(budgetGoal)}
          </p>
          <div className="mt-6 h-3 overflow-hidden rounded-full bg-white/20">
            <div
              className={`h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 transition-all duration-500 ${
                budgetUsedPercent >= 100 ? 'from-rose-500 to-orange-500' : ''
              }`}
              style={{ width: `${Math.min(budgetUsedPercent, 100)}%` }}
            />
          </div>
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
            {budgetUsedPercent.toFixed(0)}% of budget used
          </p>

          <div className="mt-8 space-y-4 rounded-2xl bg-white/5 p-4">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 dark:text-slate-400">Remaining</span>
              <span className="font-semibold text-slate-900 dark:text-white">
                {formatAmount(Math.max(budgetGoal - monthlyExpenses, 0))}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 dark:text-slate-400">Transactions</span>
              <span className="font-semibold text-slate-900 dark:text-white">
                {transactions.length}
              </span>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
