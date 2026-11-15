// Context object + hook for product data. The provider lives in context/ProductsContext.jsx.
import { createContext, useContext } from 'react'

export const ProductsContext = createContext(null)

export function useProducts() {
  const value = useContext(ProductsContext)
  if (!value) throw new Error('useProducts must be used inside <ProductsProvider>')
  return value
}
