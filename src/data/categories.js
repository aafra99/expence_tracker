export const EXPENSE_CATEGORIES = [
  { id: 'food', label: 'Food', color: '#f97316' },
  { id: 'transport', label: 'Transport', color: '#3b82f6' },
  { id: 'shopping', label: 'Shopping', color: '#a855f7' },
  { id: 'bills', label: 'Bills', color: '#ef4444' },
  { id: 'entertainment', label: 'Entertainment', color: '#ec4899' },
  { id: 'other', label: 'Other', color: '#64748b' },
]

export const INCOME_CATEGORIES = [
  { id: 'salary', label: 'Salary', color: '#22c55e' },
  { id: 'freelance', label: 'Freelance', color: '#14b8a6' },
  { id: 'investment', label: 'Investment', color: '#6366f1' },
  { id: 'other', label: 'Other', color: '#64748b' },
]

export const ALL_CATEGORIES = [...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES]
