export default function TypeFilter({ value = 'all', onChange }) {
  return (
    <select value={value} onChange={onChange} className="input-field py-3.5">
      <option value="all">All Types</option>
      <option value="income">Income</option>
      <option value="expense">Expense</option>
    </select>
  )
}
