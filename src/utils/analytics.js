import { EXPENSE_CATEGORIES } from '../data/categories.js'

export function getCategoryMeta(categoryId) {
  return EXPENSE_CATEGORIES.find((category) => category.id === categoryId)
}

export function getMonthKey(dateString) {
  const date = new Date(`${dateString}T00:00:00`)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
}

export function getCurrentMonthKey() {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
}

export function filterByMonth(transactions, monthKey) {
  return transactions.filter((transaction) => getMonthKey(transaction.date) === monthKey)
}

export function sumByType(transactions, type) {
  return transactions
    .filter((transaction) => transaction.type === type)
    .reduce((total, transaction) => total + transaction.amount, 0)
}

export function getTotals(transactions) {
  const income = sumByType(transactions, 'income')
  const expenses = sumByType(transactions, 'expense')

  return {
    income,
    expenses,
    balance: income - expenses,
  }
}

export function getMonthlyExpenseTotal(transactions, monthKey = getCurrentMonthKey()) {
  return filterByMonth(transactions, monthKey)
    .filter((transaction) => transaction.type === 'expense')
    .reduce((total, transaction) => total + transaction.amount, 0)
}

export function getBudgetUsagePercent(monthlyExpenses, budgetGoal) {
  if (!budgetGoal || budgetGoal <= 0) {
    return 0
  }

  return Math.min(100, (monthlyExpenses / budgetGoal) * 100)
}

export function getExpenseCategoryBreakdown(transactions, monthKey = getCurrentMonthKey()) {
  const monthExpenses = filterByMonth(transactions, monthKey).filter(
    (transaction) => transaction.type === 'expense',
  )

  const totals = monthExpenses.reduce((acc, transaction) => {
    acc[transaction.category] = (acc[transaction.category] ?? 0) + transaction.amount
    return acc
  }, {})

  return EXPENSE_CATEGORIES.map((category) => ({
    id: category.id,
    label: category.label,
    color: category.color,
    amount: totals[category.id] ?? 0,
  })).filter((category) => category.amount > 0)
}

export function getMonthlyTrend(transactions, monthCount = 7) {
  const labels = []
  const incomeData = []
  const expenseData = []
  const now = new Date()

  for (let index = monthCount - 1; index >= 0; index -= 1) {
    const date = new Date(now.getFullYear(), now.getMonth() - index, 1)
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
    const monthTransactions = filterByMonth(transactions, monthKey)

    labels.push(date.toLocaleString(undefined, { month: 'short' }))
    incomeData.push(sumByType(monthTransactions, 'income'))
    expenseData.push(sumByType(monthTransactions, 'expense'))
  }

  return { labels, incomeData, expenseData }
}

export function getAverageDailySpend(transactions, monthKey = getCurrentMonthKey()) {
  const monthExpenses = filterByMonth(transactions, monthKey).filter(
    (transaction) => transaction.type === 'expense',
  )

  if (monthExpenses.length === 0) {
    return 0
  }

  const [year, month] = monthKey.split('-').map(Number)
  const daysInMonth = new Date(year, month, 0).getDate()
  const total = monthExpenses.reduce((sum, transaction) => sum + transaction.amount, 0)

  return total / daysInMonth
}

export function getTopExpenseCategory(transactions, monthKey = getCurrentMonthKey()) {
  const breakdown = getExpenseCategoryBreakdown(transactions, monthKey)

  if (breakdown.length === 0) {
    return 'N/A'
  }

  return breakdown.sort((a, b) => b.amount - a.amount)[0].label
}

export function getSavingsRate(transactions, monthKey = getCurrentMonthKey()) {
  const monthTransactions = filterByMonth(transactions, monthKey)
  const income = sumByType(monthTransactions, 'income')
  const expenses = sumByType(monthTransactions, 'expense')

  if (income <= 0) {
    return 0
  }

  return Math.max(0, ((income - expenses) / income) * 100)
}

export function getBalanceTrend(transactions) {
  const now = new Date()
  const currentKey = getCurrentMonthKey()
  const previousDate = new Date(now.getFullYear(), now.getMonth() - 1, 1)
  const previousKey = `${previousDate.getFullYear()}-${String(previousDate.getMonth() + 1).padStart(2, '0')}`

  const currentNet =
    sumByType(filterByMonth(transactions, currentKey), 'income') -
    sumByType(filterByMonth(transactions, currentKey), 'expense')
  const previousNet =
    sumByType(filterByMonth(transactions, previousKey), 'income') -
    sumByType(filterByMonth(transactions, previousKey), 'expense')

  if (previousNet === 0) {
    return currentNet >= 0 ? 100 : -100
  }

  return ((currentNet - previousNet) / Math.abs(previousNet)) * 100
}

export function filterTransactions(transactions, { search = '', category = 'all', type = 'all' } = {}) {
  const query = search.trim().toLowerCase()

  return transactions.filter((transaction) => {
    const matchesSearch =
      !query ||
      transaction.title.toLowerCase().includes(query) ||
      transaction.category.toLowerCase().includes(query)
    const matchesCategory = category === 'all' || transaction.category === category
    const matchesType = type === 'all' || transaction.type === type

    return matchesSearch && matchesCategory && matchesType
  })
}
