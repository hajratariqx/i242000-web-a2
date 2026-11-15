// Formats a number as Pakistani rupees, e.g. 4999 -> "Rs. 4,999".
export function formatCurrency(amount) {
  const value = Number.isFinite(amount) ? amount : 0
  return `Rs. ${Math.round(value).toLocaleString('en-US')}`
}
