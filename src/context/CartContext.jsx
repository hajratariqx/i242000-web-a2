// The shopping bag. It stores only { productId, size, quantity } and looks everything else up
// from the current product data, so price or stock changes are always reflected.
import { useCallback, useEffect, useMemo, useState } from 'react'
import { CartContext } from '../hooks/useCart.js'
import { useProducts } from '../hooks/useProducts.js'
import { calculateTotals, checkAddToBag, reconcileCart, resolveCartLine } from '../utils/businessRules.js'
import { loadCartItems, saveJSON } from '../utils/storage.js'

const CART_KEY = 'loomlane.bag.v1'

export function CartProvider({ children }) {
  const { products, status } = useProducts()
  const [items, setItems] = useState(() => loadCartItems(CART_KEY)) // restore the saved bag

  // Effect: keep localStorage in sync with the bag.
  useEffect(() => {
    saveJSON(CART_KEY, items)
  }, [items])

  // Derived values (not stored in state).
  const lines = useMemo(
    () => (status === 'ready' ? items.map((item) => resolveCartLine(item, products)) : []),
    [items, products, status],
  )
  const totals = useMemo(() => calculateTotals(lines), [lines])
  const hasIssues = lines.some((line) => line.status !== 'ok')
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  const sameLine = (productId, size) => (item) => item.productId === productId && item.size === size

  const quantityInBag = useCallback(
    (productId, size) => items.find(sameLine(productId, size))?.quantity ?? 0,
    [items],
  )

  const addItem = useCallback(
    (product, size, quantity) => {
      const result = checkAddToBag({ product, size, quantity, quantityInBag: quantityInBag(product.id, size) })
      if (!result.ok) return result
      setItems((prev) =>
        prev.some(sameLine(product.id, size))
          ? prev.map((item) => (sameLine(product.id, size)(item) ? { ...item, quantity: item.quantity + quantity } : item))
          : [...prev, { productId: product.id, size, quantity }],
      )
      return result
    },
    [quantityInBag],
  )

  const removeItem = useCallback((productId, size) => {
    setItems((prev) => prev.filter((item) => !sameLine(productId, size)(item)))
  }, [])

  // Sets the quantity of one line. Zero or less removes it. Above stock is rejected.
  const setQuantity = useCallback(
    (productId, size, quantity) => {
      if (quantity < 1) {
        removeItem(productId, size)
        return { ok: true }
      }
      const product = products.find((p) => p.id === productId)
      const result = checkAddToBag({ product, size, quantity, quantityInBag: 0 })
      if (!result.ok) return result
      setItems((prev) => prev.map((item) => (sameLine(productId, size)(item) ? { ...item, quantity } : item)))
      return result
    },
    [products, removeItem],
  )

  // Applies the corrections explained on the bag page (remove unavailable lines, lower quantities).
  const fixBag = useCallback(() => {
    setItems((prev) => reconcileCart(prev, products))
  }, [products])

  const clearBag = useCallback(() => setItems([]), [])

  const value = useMemo(
    () => ({ items, lines, totals, hasIssues, itemCount, quantityInBag, addItem, removeItem, setQuantity, fixBag, clearBag }),
    [items, lines, totals, hasIssues, itemCount, quantityInBag, addItem, removeItem, setQuantity, fixBag, clearBag],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
