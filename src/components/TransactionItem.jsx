import { FiEdit2, FiTrash2 } from 'react-icons/fi'
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '../data/categories.js'
import { useCurrency } from '../hooks/useCurrency.js'
import { formatDate } from '../utils/formatters.js'

function getCategoryLabel(categoryId) {
  const category = [...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES].find(
    (item) => item.id === categoryId,
  )
  return category?.label ?? categoryId
}

function getCategoryColor(categoryId) {
  const category = [...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES].find(
    (item) => item.id === categoryId,
  )
  return category?.color ?? '#64748b'
}

export default function TransactionItem({ transaction, onEdit, onDelete }) {
  const { formatAmount } = useCurrency()
  const isIncome = transaction.type === 'income'

  return (
    <div className="group flex flex-col gap-4 rounded-2xl border border-white/15 bg-white/8 p-4 backdrop-blur-md transition-all duration-300 hover:border-white/25 hover:bg-white/12 hover:shadow-lg sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-sm font-bold text-white shadow-lg"
          style={{ backgroundColor: getCategoryColor(transaction.category) }}
        >
          {getCategoryLabel(transaction.category).slice(0, 1)}
        </div>
        <div>
          <p className="font-semibold text-slate-900 dark:text-white">{transaction.title}</p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {getCategoryLabel(transaction.category)} · {formatDate(transaction.date)}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 sm:justify-end">
        <span
          className={`text-xl font-bold ${isIncome ? 'text-emerald-500' : 'text-rose-500'}`}
        >
          {isIncome ? '+' : '-'}
          {formatAmount(transaction.amount)}
        </span>

        <div className="flex items-center gap-2 opacity-100 transition-opacity sm:opacity-70 sm:group-hover:opacity-100">
          <button
            type="button"
            onClick={() => onEdit?.(transaction)}
            className="rounded-xl border border-white/20 p-2.5 text-slate-500 transition hover:border-violet-400/40 hover:bg-violet-500/10 hover:text-violet-500"
            aria-label={`Edit ${transaction.title}`}
          >
            <FiEdit2 className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => onDelete?.(transaction)}
            className="rounded-xl border border-white/20 p-2.5 text-slate-500 transition hover:border-rose-400/40 hover:bg-rose-500/10 hover:text-rose-500"
            aria-label={`Delete ${transaction.title}`}
          >
            <FiTrash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
