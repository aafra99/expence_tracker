import { motion } from 'framer-motion'
import { FiCreditCard, FiTrendingDown, FiTrendingUp } from 'react-icons/fi'
import GlassCard from './GlassCard.jsx'
import { formatCurrency } from '../utils/formatters.js'

export default function BalanceCard({ balance = 0, trend = 0, delay = 0 }) {
  const isPositive = trend >= 0

  return (
    <GlassCard
      hover
      delay={delay}
      className="relative overflow-hidden bg-gradient-to-br from-violet-500/15 via-indigo-500/10 to-blue-500/10"
    >
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-violet-400/20 blur-3xl" />
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-sm font-medium tracking-wide text-slate-500 uppercase dark:text-slate-400">
            Total Balance
          </p>
          <motion.p
            key={balance}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white"
          >
            {formatCurrency(balance)}
          </motion.p>
          <p className={`mt-2 inline-flex items-center gap-1 text-xs font-semibold ${isPositive ? 'text-emerald-500' : 'text-rose-500'}`}>
            {isPositive ? <FiTrendingUp className="h-3.5 w-3.5" /> : <FiTrendingDown className="h-3.5 w-3.5" />}
            {isPositive ? '+' : ''}
            {trend.toFixed(1)}% from last month
          </p>
        </div>
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/25 to-indigo-500/25 text-violet-600 shadow-lg shadow-violet-500/10 dark:text-violet-300">
          <FiCreditCard className="h-7 w-7" />
        </div>
      </div>
    </GlassCard>
  )
}
