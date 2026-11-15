import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Grid3x3, LayoutGrid, SlidersHorizontal } from 'lucide-react'
import ProductGrid from '../components/ProductGrid.jsx'
import SearchBar from '../components/SearchBar.jsx'
import SortDropdown from '../components/SortDropdown.jsx'
import FilterSidebar from '../components/FilterSidebar.jsx'
import LoadingState from '../components/LoadingState.jsx'
import ErrorState from '../components/ErrorState.jsx'
import EmptyState from '../components/EmptyState.jsx'
import { useProducts } from '../hooks/useProducts.js'
import { useLocalStorageState } from '../hooks/useLocalStorageState.js'
import { loadJSON, saveJSON } from '../utils/storage.js'
import {
  countActiveFilters, DEFAULT_FILTERS, filterProducts, filtersFromParams, SORT_OPTIONS, sortProducts,
} from '../utils/shopFilters.js'

const isViewMode = (value) => value === 'comfortable' || value === 'compact'

function Shop() {
  const { products, status, error, reload } = useProducts()
  const { search } = useLocation()

  // Starting state: use what the customer had on this page before (kept for the tab, so
  // Back from a product page restores it), otherwise build it from the URL (/shop?gender=men).
  const storageKey = `loomlane.shop:${search}`
  const [initial] = useState(() => {
    const saved = loadJSON(storageKey, null, 'session')
    const params = new URLSearchParams(search)
    if (saved && typeof saved === 'object') {
      return {
        query: String(saved.query ?? ''),
        filters: { ...DEFAULT_FILTERS, ...saved.filters },
        sort: SORT_OPTIONS.some((o) => o.id === saved.sort) ? saved.sort : 'featured',
      }
    }
    return { query: params.get('q') ?? '', filters: filtersFromParams(params), sort: 'featured' }
  })

  const [query, setQuery] = useState(initial.query)
  const [filters, setFilters] = useState(initial.filters)
  const [sort, setSort] = useState(initial.sort)
  const [filtersOpen, setFiltersOpen] = useState(false)
  // Problem D fix: the card size choice is saved in localStorage and survives a refresh.
  const [viewMode, setViewMode] = useLocalStorageState('loomlane.viewMode', 'comfortable', isViewMode)

  useEffect(() => {
    saveJSON(storageKey, { query, filters, sort }, 'session')
  }, [storageKey, query, filters, sort])

  // Derived value: recalculated from state on every render, never stored.
  const visible = useMemo(
    () => sortProducts(filterProducts(products, query, filters), sort),
    [products, query, filters, sort],
  )
  const activeCount = countActiveFilters(filters) + (query.trim() ? 1 : 0)

  // Functional update: the new filters depend on the previous ones, so unrelated filters stay.
  function handleFilterChange(name, value) {
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  function clearAll() {
    setFilters({ ...DEFAULT_FILTERS })
    setQuery('')
  }

  return (
    <div className="container page">
      <header className="page-head">
        <h1>The collection</h1>
        <p>Eastern, western and casual pieces for women and men.</p>
      </header>

      {status === 'loading' && <LoadingState />}
      {status === 'error' && <ErrorState title="The collection did not load" message={error} onRetry={reload} />}
      {status === 'ready' && products.length === 0 && (
        <EmptyState title="The collection is empty" message="There are no pieces to show yet. Please check back soon." />
      )}

      {status === 'ready' && products.length > 0 && (
        <div className="shop-layout">
          <FilterSidebar filters={filters} onChange={handleFilterChange} onClear={clearAll}
            activeCount={activeCount} open={filtersOpen} onClose={() => setFiltersOpen(false)} />

          <div className="shop-main">
            <div className="toolbar">
              <SearchBar value={query} onChange={setQuery} />
              <div className="toolbar__row">
                <button type="button" className="btn btn--secondary filters-toggle" aria-expanded={filtersOpen}
                  onClick={() => setFiltersOpen(true)}>
                  <SlidersHorizontal size={16} aria-hidden="true" /> Filters{activeCount > 0 ? ` (${activeCount})` : ''}
                </button>
                <SortDropdown value={sort} onChange={setSort} />
                <div className="view-toggle" role="group" aria-label="Card size">
                  <button type="button" aria-pressed={viewMode === 'comfortable'} onClick={() => setViewMode('comfortable')}>
                    <LayoutGrid size={18} aria-hidden="true" />
                    <span className="visually-hidden">Larger cards</span>
                  </button>
                  <button type="button" aria-pressed={viewMode === 'compact'} onClick={() => setViewMode('compact')}>
                    <Grid3x3 size={18} aria-hidden="true" />
                    <span className="visually-hidden">Compact cards</span>
                  </button>
                </div>
              </div>
            </div>

            <p className="result-count" role="status">
              {visible.length} {visible.length === 1 ? 'piece' : 'pieces'}
              {activeCount > 0 && (
                <button type="button" className="text-btn" onClick={clearAll}>Clear all</button>
              )}
            </p>

            {visible.length === 0 ? (
              <EmptyState title="No pieces found"
                message="Try adjusting your filters or search, or explore our latest collection."
                actionLabel="Reset filters" onAction={clearAll} />
            ) : (
              <ProductGrid products={visible} viewMode={viewMode} />
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Shop
