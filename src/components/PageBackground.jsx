import { motion } from 'framer-motion'

export default function PageBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="mesh-bg absolute inset-0" />
      <motion.div
        animate={{ scale: [1, 1.08, 1], opacity: [0.35, 0.5, 0.35] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl"
      />
      <motion.div
        animate={{ scale: [1, 1.12, 1], opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute -right-16 top-40 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl"
      />
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-10 left-1/3 h-64 w-64 rounded-full bg-fuchsia-500/15 blur-3xl"
      />
    </div>
  )
}
