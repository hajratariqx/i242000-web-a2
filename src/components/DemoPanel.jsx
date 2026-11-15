import { useState } from 'react'
import { useProducts } from '../hooks/useProducts.js'
import { SIZE_ORDER } from '../data/products.js'

// Development-only controls for the viva and testing. Visible only with ?demo=1 in the URL.
function DemoPanel() {
  const { products, status, simulateLoadFailure, setStockOverride, resetStockOverrides } = useProducts()
  const [productId, setProductId] = useState('P014')
  const [size, setSize] = useState('M')
  const [quantity, setQuantity] = useState(0)

  const product = products.find((p) => p.id === productId)
  const sizes = product ? SIZE_ORDER.filter((s) => s in product.stock) : []

  return (
    <details className="demo-panel">
      <summary>Demo controls (development only)</summary>
      <div className="demo-panel__body">
        <button type="button" className="btn btn--secondary" onClick={simulateLoadFailure}>
          Simulate a loading failure
        </button>
        <p className="field__hint">The next load fails once. Use "Try again" on the error to recover.</p>

        <h3>Change stock</h3>
        {status !== 'ready' ? (
          <p className="field__hint">Wait for products to finish loading.</p>
        ) : (
          <>
            <div className="field">
              <label htmlFor="demo-product">Product</label>
              <select id="demo-product" value={productId} onChange={(e) => {
                setProductId(e.target.value)
                const next = products.find((p) => p.id === e.target.value)
                setSize(Object.keys(next.stock)[0])
              }}>
                {products.map((p) => <option key={p.id} value={p.id}>{p.id} {p.name}</option>)}
              </select>
            </div>
            <div className="field">
              <label htmlFor="demo-size">Size</label>
              <select id="demo-size" value={size} onChange={(e) => setSize(e.target.value)}>
                {sizes.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="field">
              <label htmlFor="demo-qty">New stock quantity</label>
              <input id="demo-qty" type="number" min="0" value={quantity}
                onChange={(e) => setQuantity(Math.max(0, Number(e.target.value) || 0))} />
            </div>
            <button type="button" className="btn btn--primary" onClick={() => setStockOverride(productId, size, quantity)}>
              Apply stock change
            </button>
            <button type="button" className="text-btn" onClick={resetStockOverrides}>Reset all stock</button>
          </>
        )}
      </div>
    </details>
  )
}

export default DemoPanel
