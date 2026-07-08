import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import LoadingScreen from './LoadingScreen.jsx'
import Navbar from './Navbar.jsx'
import PageBackground from './PageBackground.jsx'
import Sidebar from './Sidebar.jsx'
import { useSidebar } from '../hooks/useSidebar.js'

export default function Layout() {
  const sidebar = useSidebar()
  const location = useLocation()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <PageBackground />
      <AnimatePresence>{loading && <LoadingScreen />}</AnimatePresence>

      <div className="relative min-h-screen lg:flex">
        <Sidebar isOpen={sidebar.isOpen} onClose={sidebar.close} />

        <div className="flex min-h-screen flex-1 flex-col lg:pl-72">
          <Navbar onMenuClick={sidebar.open} />

          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </>
  )
}
