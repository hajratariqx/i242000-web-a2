// Loom & Lane business rules. Plain JavaScript with no React and no imports,
// so the same functions run in the app AND in the Node test runner.
//
// Rule 1 (availability): you cannot order more of a product-size than its stock.
// Rule 2 (eligibility):  you can only choose sizes the product actually offers.
// Rule 3 (pricing):      delivery is Rs. 250 below Rs. 5,000 and free from Rs. 5,000.

export const DELIVERY_FEE = 250
export const FREE_DELIVERY_THRESHOLD = 5000
export const LOW_STOCK_LIMIT = 3

// ---------- Rule 3: delivery ----------

export function calculateDeliveryFee(subtotal) {
  if (!Number.isFinite(subtotal) || subtotal <= 0) return 0 // empty bag: nothing to deliver
  return subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE
}

export function amountToFreeDelivery(subtotal) {
  return Math.max(FREE_DELIVERY_THRESHOLD - subtotal, 0)
}

// ---------- Rule 2: sizes ----------

export function isSizeOffered(product, size) {
  return Boolean(product) && Object.prototype.hasOwnProperty.call(product.stock, size)
}

export function getOfferedSizes(product) {
  return Object.keys(product.stock)
}

// ---------- Rule 1: stock ----------

export function getStock(product, size) {
  return isSizeOffered(product, size) ? product.stock[size] : 0
}

export function getTotalStock(product) {
  return Object.values(product.stock).reduce((sum, qty) => sum + qty, 0)
}

export function isSoldOut(product) {
  return getTotalStock(product) === 0
}

export function getSizeStockMessage(product, size) {
  const stock = getStock(product, size)
  if (stock === 0) return `Size ${size} is sold out`
  if (stock <= LOW_STOCK_LIMIT) return `Only ${stock} left in size ${size}`
  return `Size ${size} is in stock`
}

// Checks Rules 1 and 2 together before anything goes into the bag.
// quantityInBag = how many of this product-size the customer already has.
export function checkAddToBag({ product, size, quantity, quantityInBag = 0 }) {
  if (!product) return { ok: false, code: 'no-product', error: 'This product could not be found.' }
  if (!size) return { ok: false, code: 'no-size', error: 'Select a size before adding to your bag.' }
  if (!isSizeOffered(product, size)) {
    return { ok: false, code: 'bad-size', error: `Size ${size} is not offered for ${product.name}.` }
  }
  if (!Number.isInteger(quantity) || quantity < 1) {
    return { ok: false, code: 'bad-quantity', error: 'Choose a quantity of at least 1.' }
  }
  const stock = getStock(product, size)
  if (stock === 0) {
    return { ok: false, code: 'sold-out', error: `Size ${size} is sold out.` }
  }
  if (quantityInBag + quantity > stock) {
    const remaining = Math.max(stock - quantityInBag, 0)
    const error =
      quantityInBag === 0
        ? `Only ${stock} available in size ${size}. Reduce the quantity to ${stock} or fewer.`
        : remaining === 0
          ? `You already have all ${stock} available in size ${size} in your bag.`
          : `Only ${stock} available in size ${size}. You already have ${quantityInBag} in your bag, so you can add up to ${remaining} more.`
    return { ok: false, code: 'over-stock', error }
  }
  return { ok: true }
}

// ---------- Bag: checking saved or changed selections against current data ----------

// status "ok": nothing to fix. "reduced": quantity is above stock. "removed": cannot be bought.
export function resolveCartLine(item, products) {
  const product = products.find((p) => p.id === item.productId)
  if (!product) {
    return { item, product: null, status: 'removed', quantity: 0, message: 'This product is no longer available.' }
  }
  if (!isSizeOffered(product, item.size)) {
    return { item, product, status: 'removed', quantity: 0, message: `Size ${item.size} is not offered for this product.` }
  }
  const stock = getStock(product, item.size)
  if (stock === 0) {
    return { item, product, status: 'removed', quantity: 0, message: `Size ${item.size} is now sold out.` }
  }
  if (item.quantity > stock) {
    return {
      item, product, status: 'reduced', quantity: stock,
      message: `Only ${stock} left in size ${item.size}. Your quantity of ${item.quantity} will be reduced to ${stock}.`,
    }
  }
  return { item, product, status: 'ok', quantity: item.quantity, message: '' }
}

export function reconcileCart(items, products) {
  const fixed = []
  items.forEach((item) => {
    const line = resolveCartLine(item, products)
    if (line.status !== 'removed') fixed.push({ ...item, quantity: line.quantity })
  })
  return fixed
}

export function calculateTotals(lines) {
  const usable = lines.filter((line) => line.status !== 'removed')
  const subtotal = usable.reduce((sum, line) => sum + line.product.price * line.quantity, 0)
  const savings = usable.reduce((sum, line) => {
    const original = line.product.originalPrice ?? line.product.price
    return sum + (original - line.product.price) * line.quantity
  }, 0)
  const deliveryFee = calculateDeliveryFee(subtotal)
  return {
    itemCount: usable.reduce((sum, line) => sum + line.quantity, 0),
    subtotal,
    savings,
    deliveryFee,
    total: subtotal + deliveryFee,
  }
}
