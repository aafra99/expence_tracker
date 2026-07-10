import { NavLink } from 'react-router-dom'
import { FiX } from 'react-icons/fi'
import { NAV_ITEMS } from '../data/navigation.js'
import { useCurrency } from '../hooks/useCurrency.js'
import { useTransactions } from '../hooks/useTransactions.js'
import { APP_NAME } from '../utils/constants.js'

function SidebarContent({ onNavigate }) {
  const { formatAmount } = useCurrency()
  const { budgetGoal, budgetUsedPercent, monthlyExpenses } = useTransactions()

  return (
    <>
      <div className="flex h-20 items-center gap-3 border-b border-white/10 px-6">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 text-lg font-bold text-white shadow-lg">
          💰
        </div>
        <div>
          <p className="text-sm font-bold text-slate-900 dark:text-white">{APP_NAME}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">Smart finance manager</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {NAV_ITEMS.map(({ path, label, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            end={path === '/dashboard'}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-violet-500/20 to-indigo-500/20 text-violet-700 shadow-sm dark:text-violet-300'
                  : 'text-slate-600 hover:bg-white/10 dark:text-slate-300'
              }`
            }
          >
            <Icon className="h-5 w-5" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-white/10 p-4">
        <div className="rounded-xl bg-gradient-to-br from-violet-500/10 to-indigo-500/10 p-4">
          <p className="text-xs font-medium text-slate-700 dark:text-slate-200">Budget Goal</p>
          <p className="mt-1 text-lg font-bold text-violet-600 dark:text-violet-300">
            {formatAmount(budgetGoal)} / mo
          </p>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/20">
            <div
              className={`h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 ${
                budgetUsedPercent >= 100 ? 'from-rose-500 to-orange-500' : ''
              }`}
              style={{ width: `${Math.min(budgetUsedPercent, 100)}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            {budgetUsedPercent.toFixed(0)}% used · {formatAmount(monthlyExpenses)} spent
          </p>
        </div>
      </div>
    </>
  )
}

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm transition-opacity lg:hidden ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={`glass-strong fixed inset-y-0 left-0 z-50 flex w-72 flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Sidebar navigation"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-5 rounded-lg p-2 text-slate-500 hover:bg-white/10 lg:hidden"
          aria-label="Close sidebar"
        >
          <FiX className="h-5 w-5" />
        </button>

        <SidebarContent onNavigate={onClose} />
      </aside>
    </>
  )
}
