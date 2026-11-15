import { X } from 'lucide-react'
import { CATEGORIES, COLLECTIONS, SIZE_ORDER, STYLES } from '../data/products.js'
import { PRICE_RANGES } from '../utils/shopFilters.js'

// Problem A fix: customers can narrow the list by size (only sizes that are in stock match).
// onChange(name, value) is a callback prop: Shop owns the filter state.
function FilterSidebar({ filters, onChange, onClear, activeCount, open, onClose }) {
  return (
    <aside className={`filters ${open ? 'is-open' : ''}`} aria-label="Filters">
      <div className="filters__head">
        <h2>Filters</h2>
        <button type="button" className="icon-btn filters__close" onClick={onClose} aria-label="Close filters">
          <X size={20} aria-hidden="true" />
        </button>
      </div>

      <fieldset>
        <legend>For</legend>
        {['all', 'women', 'men'].map((value) => (
          <label className="choice" key={value}>
            <input type="radio" name="gender" value={value} checked={filters.gender === value}
              onChange={() => onChange('gender', value)} />
            {value === 'all' ? 'Everyone' : value === 'women' ? 'Women' : 'Men'}
          </label>
        ))}
      </fieldset>

      <fieldset>
        <legend>Style</legend>
        {['all', ...STYLES].map((value) => (
          <label className="choice" key={value}>
            <input type="radio" name="style" value={value} checked={filters.style === value}
              onChange={() => onChange('style', value)} />
            {value === 'all' ? 'All styles' : value[0].toUpperCase() + value.slice(1)}
          </label>
        ))}
      </fieldset>

      <div className="field">
        <label htmlFor="filter-collection">Collection</label>
        <select id="filter-collection" value={filters.collection} onChange={(e) => onChange('collection', e.target.value)}>
          <option value="all">All collections</option>
          {COLLECTIONS.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
        </select>
      </div>

      <div className="field">
        <label htmlFor="filter-category">Category</label>
        <select id="filter-category" value={filters.category} onChange={(e) => onChange('category', e.target.value)}>
          <option value="all">All categories</option>
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <fieldset>
        <legend>Size in stock</legend>
        <div className="size-filter">
          {SIZE_ORDER.map((size) => (
            <button type="button" key={size} className={`chip ${filters.size === size ? 'is-selected' : ''}`}
              aria-pressed={filters.size === size}
              onClick={() => onChange('size', filters.size === size ? 'all' : size)}>
              {size}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="field">
        <label htmlFor="filter-price">Price</label>
        <select id="filter-price" value={filters.price} onChange={(e) => onChange('price', e.target.value)}>
          {PRICE_RANGES.map((r) => <option key={r.id} value={r.id}>{r.label}</option>)}
        </select>
      </div>

      <label className="choice">
        <input type="checkbox" checked={filters.inStockOnly} onChange={(e) => onChange('inStockOnly', e.target.checked)} />
        Hide sold-out pieces
      </label>
      <label className="choice">
        <input type="checkbox" checked={filters.newOnly} onChange={(e) => onChange('newOnly', e.target.checked)} />
        New arrivals only
      </label>

      <button type="button" className="btn btn--secondary btn--block" onClick={onClear} disabled={activeCount === 0}>
        Clear all filters
      </button>
      <button type="button" className="btn btn--primary btn--block filters__apply" onClick={onClose}>
        Show results
      </button>
    </aside>
  )
}

export default FilterSidebar
