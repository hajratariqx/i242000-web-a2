// Context object + hook for the shopping bag. The provider lives in context/CartContext.jsx.
import { createContext, useContext } from 'react'

export const CartContext = createContext(null)

export function useCart() {
  const value = useContext(CartContext)
  if (!value) throw new Error('useCart must be used inside <CartProvider>')
  return value
}
