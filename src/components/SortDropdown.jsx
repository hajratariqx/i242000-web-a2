import { SORT_OPTIONS } from '../utils/shopFilters.js'

function SortDropdown({ value, onChange }) {
  return (
    <div className="sort">
      <label htmlFor="shop-sort">Sort by</label>
      <select id="shop-sort" value={value} onChange={(event) => onChange(event.target.value)}>
        {SORT_OPTIONS.map((option) => (
          <option key={option.id} value={option.id}>{option.label}</option>
        ))}
      </select>
    </div>
  )
}

export default SortDropdown
