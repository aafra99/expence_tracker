import { FiSearch } from 'react-icons/fi'

export default function SearchBar({ value = '', onChange, placeholder = 'Search transactions...' }) {
  return (
    <div className="relative">
      <FiSearch className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
      <input
        type="search"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="input-field py-3.5 pl-12"
      />
    </div>
  )
}
