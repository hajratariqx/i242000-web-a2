import { Search } from 'lucide-react'

function SearchBar({ value, onChange }) {
  return (
    <div className="searchbar">
      <label htmlFor="shop-search" className="visually-hidden">Search products</label>
      <Search size={18} aria-hidden="true" />
      <input id="shop-search" type="search" value={value} placeholder="Search kurta, lawn, linen…"
        onChange={(event) => onChange(event.target.value)} />
    </div>
  )
}

export default SearchBar
