import { FiMenu } from 'react-icons/fi'
import { useLocation } from 'react-router-dom'
import { PAGE_TITLES } from '../data/navigation.js'
import ThemeToggle from './ThemeToggle.jsx'

export default function Navbar({ onMenuClick }) {
  const { pathname } = useLocation()
  const title = PAGE_TITLES[pathname] ?? 'Expense Tracker Pro'

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-white/15 bg-white/15 px-4 backdrop-blur-2xl dark:bg-slate-950/40 sm:px-6 lg:h-[4.5rem]">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-xl border border-white/20 p-2.5 text-slate-600 transition hover:bg-white/10 lg:hidden dark:text-slate-300"
          aria-label="Open sidebar"
        >
          <FiMenu className="h-6 w-6" />
        </button>

        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">{title}</h1>
          <p className="hidden text-sm text-slate-500 dark:text-slate-400 sm:block">
            Manage your money with confidence
          </p>
        </div>
      </div>

      <ThemeToggle />
    </header>
  )
}
