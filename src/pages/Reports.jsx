import { useMemo, useState } from 'react'
import { FiDownload } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import CategoryFilter from '../components/CategoryFilter.jsx'
import GlassCard from '../components/GlassCard.jsx'
import SearchBar from '../components/SearchBar.jsx'
import TransactionList from '../components/TransactionList.jsx'
import TypeFilter from '../components/TypeFilter.jsx'
import { useCurrency } from '../hooks/useCurrency.js'
import { useTransactions } from '../hooks/useTransactions.js'
import { filterTransactions } from '../utils/analytics.js'
import { exportTransactionsToCsv } from '../utils/exportCsv.js'

export default function Reports() {
  const navigate = useNavigate()
  const { currency } = useCurrency()
  const { transactions, deleteTransaction } = useTransactions()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [type, setType] = useState('all')

  const filteredTransactions = useMemo(
    () => filterTransactions(transactions, { search, category, type }),
    [transactions, search, category, type],
  )

  function handleEdit(transaction) {
    navigate('/add', { state: { transaction } })
  }

  function handleDelete(transaction) {
    if (window.confirm(`Delete "${transaction.title}"?`)) {
      deleteTransaction(transaction.id)
    }
  }

  function handleExport() {
    exportTransactionsToCsv(filteredTransactions, currency)
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <GlassCard>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Transaction Reports
            </h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Search, filter, and export your financial data
            </p>
          </div>

          <button
            type="button"
            onClick={handleExport}
            disabled={filteredTransactions.length === 0}
            className="btn-primary"
          >
            <FiDownload className="h-4 w-4" />
            Export CSV
          </button>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_auto_auto]">
          <SearchBar value={search} onChange={(event) => setSearch(event.target.value)} />
          <CategoryFilter
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            includeIncome
          />
          <TypeFilter value={type} onChange={(event) => setType(event.target.value)} />
        </div>
      </GlassCard>

      <GlassCard delay={0.1}>
        <TransactionList
          transactions={filteredTransactions}
          title="All Transactions"
          onEdit={handleEdit}
          onDelete={handleDelete}
          emptyAction={() => navigate('/add')}
          emptyActionLabel="Add Transaction"
        />
      </GlassCard>
    </div>
  )
}
