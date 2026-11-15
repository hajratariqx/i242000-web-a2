// Loads products through the mock async loader and shares them with every page.
// Also holds the demo controls' state (simulated failure, changed stock).
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { loadProducts } from '../data/mockApi.js'
import { ProductsContext } from '../hooks/useProducts.js'
import { loadJSON, saveJSON } from '../utils/storage.js'

// Demo controls appear only when the page is opened with ?demo=1 (remembered for the tab).
function isDemoRequested() {
  if (typeof window === 'undefined') return false
  const fromUrl = new URLSearchParams(window.location.search).get('demo') === '1'
  if (fromUrl) saveJSON('loomlane.demo', true, 'session')
  return fromUrl || loadJSON('loomlane.demo', false, 'session') === true
}

export function ProductsProvider({ children }) {
  const [baseProducts, setBaseProducts] = useState([])
  const [status, setStatus] = useState('loading') // 'loading' | 'ready' | 'error'
  const [error, setError] = useState('')
  const [reloadKey, setReloadKey] = useState(0)
  const [stockOverrides, setStockOverrides] = useState({}) // { "P006:M": 5 }
  const failNextLoad = useRef(false)
  const [demoEnabled] = useState(isDemoRequested)

  useEffect(() => {
    let cancelled = false // cleanup flag: ignore the result if the effect re-runs or unmounts
    const shouldFail = failNextLoad.current

    async function run() {
      try {
        const data = await loadProducts({ shouldFail })
        if (cancelled) return
        setBaseProducts(data)
        setError('')
        setStatus('ready')
      } catch (err) {
        if (cancelled) return
        setError(err.message)
        setStatus('error')
      } finally {
        if (!cancelled) failNextLoad.current = false
      }
    }
    run()

    return () => {
      cancelled = true
    }
  }, [reloadKey])

  const reload = useCallback(() => {
    setStatus('loading')
    setReloadKey((key) => key + 1)
  }, [])

  const simulateLoadFailure = useCallback(() => {
    failNextLoad.current = true
    reload()
  }, [reload])

  // Derived value: the base data with any demo stock changes applied on top.
  const products = useMemo(
    () =>
      baseProducts.map((product) => {
        const stock = { ...product.stock }
        Object.keys(stock).forEach((size) => {
          const key = `${product.id}:${size}`
          if (key in stockOverrides) stock[size] = stockOverrides[key]
        })
        return { ...product, stock }
      }),
    [baseProducts, stockOverrides],
  )

  const setStockOverride = useCallback((productId, size, quantity) => {
    setStockOverrides((prev) => ({ ...prev, [`${productId}:${size}`]: quantity }))
  }, [])

  const resetStockOverrides = useCallback(() => setStockOverrides({}), [])

  const value = useMemo(
    () => ({
      products, status, error, reload, demoEnabled,
      simulateLoadFailure, setStockOverride, resetStockOverrides,
    }),
    [products, status, error, reload, demoEnabled, simulateLoadFailure, setStockOverride, resetStockOverrides],
  )

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
}
