import { FiInbox } from 'react-icons/fi'

export default function EmptyState({
  title = 'Nothing here yet',
  description = 'Start by adding your first transaction.',
  action,
  actionLabel = 'Get Started',
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/20 bg-white/5 px-6 py-14 text-center backdrop-blur-sm">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/20 to-indigo-500/20 text-violet-500">
        <FiInbox className="h-8 w-8" />
      </div>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-500 dark:text-slate-400">
        {description}
      </p>
      {action && (
        <button type="button" onClick={action} className="btn-primary mt-6">
          {actionLabel}
        </button>
      )}
    </div>
  )
}
