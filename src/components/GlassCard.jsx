import { motion } from 'framer-motion'

export default function GlassCard({ children, className = '', hover = false, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: 'easeOut' }}
      whileHover={hover ? { y: -4, transition: { duration: 0.2 } } : undefined}
      className={`glass rounded-3xl p-6 ${hover ? 'cursor-default transition-shadow hover:shadow-2xl hover:shadow-indigo-500/10' : ''} ${className}`}
    >
      {children}
    </motion.div>
  )
}
