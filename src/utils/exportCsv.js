import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '../data/categories.js'

function getCategoryLabel(categoryId) {
  const category = [...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES].find(
    (item) => item.id === categoryId,
  )
  return category?.label ?? categoryId
}

export function exportTransactionsToCsv(transactions, filename = 'expense-tracker-export.csv') {
  const headers = ['Date', 'Type', 'Title', 'Category', 'Amount']
  const rows = transactions.map((transaction) => [
    transaction.date,
    transaction.type,
    transaction.title,
    getCategoryLabel(transaction.category),
    transaction.amount.toFixed(2),
  ])

  const csvContent = [headers, ...rows]
    .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    .join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}
