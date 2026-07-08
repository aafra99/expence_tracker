import { ALL_CATEGORIES, EXPENSE_CATEGORIES } from '../data/categories.js'

export default function CategoryFilter({
  value = 'all',
  onChange,
  includeIncome = false,
}) {
  const categories = includeIncome ? ALL_CATEGORIES : EXPENSE_CATEGORIES

  return (
    <select value={value} onChange={onChange} className="input-field py-3.5">
      <option value="all">All Categories</option>
      {categories.map((category) => (
        <option key={category.id} value={category.id}>
          {category.label}
        </option>
      ))}
    </select>
  )
}
