import { motion } from 'framer-motion'
import { FiArrowDownLeft } from 'react-icons/fi'
import GlassCard from './GlassCard.jsx'
import { formatCurrency } from '../utils/formatters.js'

export default function IncomeCard({ income = 0, delay = 0.05 }) {
  return (
    <GlassCard hover delay={delay} className="bg-gradient-to-br from-emerald-500/12 to-teal-500/8">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium tracking-wide text-slate-500 uppercase dark:text-slate-400">
            Total Income
          </p>
          <motion.p
            key={income}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 text-3xl font-bold text-emerald-600 dark:text-emerald-400"
          >
            {formatCurrency(income)}
          </motion.p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-600 shadow-lg shadow-emerald-500/10 dark:text-emerald-300">
          <FiArrowDownLeft className="h-6 w-6" />
        </div>
      </div>
    </GlassCard>
  )
}
