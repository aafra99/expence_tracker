import { motion } from 'framer-motion'

export default function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center mesh-bg"
    >
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
          className="mx-auto h-14 w-14 rounded-2xl border-2 border-violet-500/30 border-t-violet-500"
        />
        <p className="mt-6 text-sm font-medium text-slate-600 dark:text-slate-300">
          Loading Expense Tracker Pro...
        </p>
      </div>
    </motion.div>
  )
}
