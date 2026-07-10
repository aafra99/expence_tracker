import { motion } from 'framer-motion'
import { FiArrowUpRight } from 'react-icons/fi'
import { useCurrency } from '../hooks/useCurrency.js'
import GlassCard from './GlassCard.jsx'

export default function ExpenseCard({ expenses = 0, delay = 0.1 }) {
  const { formatAmount } = useCurrency()
  return (
    <GlassCard hover delay={delay} className="bg-gradient-to-br from-rose-500/12 to-orange-500/8">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium tracking-wide text-slate-500 uppercase dark:text-slate-400">
            Total Expenses
          </p>
          <motion.p
            key={expenses}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 text-3xl font-bold text-rose-600 dark:text-rose-400"
          >
            {formatAmount(expenses)}
          </motion.p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-500/20 text-rose-600 shadow-lg shadow-rose-500/10 dark:text-rose-300">
          <FiArrowUpRight className="h-6 w-6" />
        </div>
      </div>
    </GlassCard>
  )
}
