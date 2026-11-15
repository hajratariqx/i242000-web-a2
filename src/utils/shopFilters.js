// Pure functions for searching, filtering and sorting products.
// Search, filters and sorting all run on the same list, so they always work together.
import { getStock, isSoldOut } from './businessRules.js'

export const DEFAULT_FILTERS = {
  gender: 'all', style: 'all', collection: 'all', category: 'all',
  size: 'all', price: 'all', inStockOnly: false, newOnly: false,
}

export const PRICE_RANGES = [
  { id: 'all', label: 'Any price', min: 0, max: Infinity },
  { id: 'under-3000', label: 'Under Rs. 3,000', min: 0, max: 2999 },
  { id: '3000-5000', label: 'Rs. 3,000 to Rs. 4,999', min: 3000, max: 4999 },
  { id: '5000-7000', label: 'Rs. 5,000 to Rs. 6,999', min: 5000, max: 6999 },
  { id: 'over-7000', label: 'Rs. 7,000 and above', min: 7000, max: Infinity },
]

export const SORT_OPTIONS = [
  { id: 'featured', label: 'Featured' },
  { id: 'newest', label: 'Newest' },
  { id: 'price-asc', label: 'Price: low to high' },
  { id: 'price-desc', label: 'Price: high to low' },
  { id: 'name', label: 'Alphabetical' },
]

export function matchesQuery(product, query) {
  const text = query.trim().toLowerCase() // leading and trailing spaces are ignored
  if (!text) return true
  const haystack = [
    product.name, product.description, product.category, product.collection.replace(/-/g, ' '),
    product.fabric, product.color, product.gender, product.style, ...product.tags,
  ].join(' ').toLowerCase()
  return text.split(/\s+/).every((word) => haystack.includes(word))
}

export function filterProducts(products, query, filters) {
  const range = PRICE_RANGES.find((r) => r.id === filters.price) ?? PRICE_RANGES[0]
  return products.filter((product) => {
    if (!matchesQuery(product, query)) return false
    if (filters.gender !== 'all' && product.gender !== filters.gender) return false
    if (filters.style !== 'all' && product.style !== filters.style) return false
    if (filters.collection !== 'all' && product.collection !== filters.collection) return false
    if (filters.category !== 'all' && product.category !== filters.category) return false
    if (filters.size !== 'all' && getStock(product, filters.size) === 0) return false // size must be in stock
    if (product.price < range.min || product.price > range.max) return false
    if (filters.inStockOnly && isSoldOut(product)) return false
    if (filters.newOnly && !product.isNewArrival) return false
    return true
  })
}

export function sortProducts(products, sortId) {
  const sorted = [...products] // copy: never mutate the original array
  if (sortId === 'price-asc') sorted.sort((a, b) => a.price - b.price)
  else if (sortId === 'price-desc') sorted.sort((a, b) => b.price - a.price)
  else if (sortId === 'name') sorted.sort((a, b) => a.name.localeCompare(b.name))
  else if (sortId === 'newest') sorted.sort((a, b) => Number(b.isNewArrival) - Number(a.isNewArrival) || b.id.localeCompare(a.id))
  else sorted.sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured)) // featured first, stable for ties
  return sorted
}

export function countActiveFilters(filters) {
  return Object.keys(DEFAULT_FILTERS).filter((key) => filters[key] !== DEFAULT_FILTERS[key]).length
}

// Builds starting filters from URL parameters like /shop?gender=women&new=1
export function filtersFromParams(params) {
  const filters = { ...DEFAULT_FILTERS }
  ;['gender', 'style', 'collection', 'category', 'size', 'price'].forEach((key) => {
    const value = params.get(key)
    if (value) filters[key] = value
  })
  if (params.get('new') === '1') filters.newOnly = true
  return filters
}
