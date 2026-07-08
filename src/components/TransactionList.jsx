import { motion } from 'framer-motion'
import EmptyState from './EmptyState.jsx'
import TransactionItem from './TransactionItem.jsx'

export default function TransactionList({
  transactions = [],
  title = 'Recent Transactions',
  onEdit,
  onDelete,
  emptyAction,
  emptyActionLabel,
}) {
  return (
    <section className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">{title}</h2>
        <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-slate-500 dark:text-slate-400">
          {transactions.length} items
        </span>
      </div>

      {transactions.length === 0 ? (
        <EmptyState
          title="No transactions found"
          description="Try adjusting your search or filters, or add a new transaction to get started."
          action={emptyAction}
          actionLabel={emptyActionLabel}
        />
      ) : (
        <ul className="space-y-3">
          {transactions.map((transaction, index) => (
            <motion.li
              key={transaction.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.04, duration: 0.25 }}
            >
              <TransactionItem
                transaction={transaction}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            </motion.li>
          ))}
        </ul>
      )}
    </section>
  )
}
