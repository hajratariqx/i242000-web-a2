// Safe wrappers around localStorage / sessionStorage.
// Any failure (blocked storage, invalid JSON) falls back to the default value.

function getStore(area) {
  if (typeof window === 'undefined') return null
  return area === 'session' ? window.sessionStorage : window.localStorage
}

export function loadJSON(key, fallback, area = 'local') {
  try {
    const store = getStore(area)
    if (!store) return fallback
    const raw = store.getItem(key)
    return raw === null ? fallback : JSON.parse(raw)
  } catch {
    return fallback
  }
}

export function saveJSON(key, value, area = 'local') {
  try {
    const store = getStore(area)
    if (store) store.setItem(key, JSON.stringify(value))
  } catch {
    // Storage can be full or blocked. The app still works without saving.
  }
}

// A saved bag line must have a text product id, a text size and a whole quantity >= 1.
function isValidCartItem(item) {
  return (
    item !== null &&
    typeof item === 'object' &&
    typeof item.productId === 'string' &&
    typeof item.size === 'string' &&
    Number.isInteger(item.quantity) &&
    item.quantity >= 1
  )
}

// Reads the saved bag. Anything that is not a clean array of valid lines is thrown away.
export function loadCartItems(key) {
  const saved = loadJSON(key, [])
  if (!Array.isArray(saved)) return []
  return saved.filter(isValidCartItem).map(({ productId, size, quantity }) => ({ productId, size, quantity }))
}

// Where the most recent simulated order is kept (sessionStorage, cleared when the tab closes).
export const LAST_ORDER_KEY = 'loomlane.lastOrder'
