import { useState } from 'react'
import { Link } from 'react-router-dom'
import BagItem from '../components/BagItem.jsx'
import OrderSummary from '../components/OrderSummary.jsx'
import LoadingState from '../components/LoadingState.jsx'
import ErrorState from '../components/ErrorState.jsx'
import EmptyState from '../components/EmptyState.jsx'
import { useCart } from '../hooks/useCart.js'
import { useProducts } from '../hooks/useProducts.js'

function ShoppingBag() {
  const { items, lines, totals, hasIssues, setQuantity, removeItem, fixBag } = useCart()
  const { status, error, reload } = useProducts()
  const [message, setMessage] = useState('')

  if (items.length === 0) {
    return (
      <div className="container page">
        <EmptyState title="Your bag is empty" message="Pieces you add will appear here, with delivery and totals."
          actionLabel="Start shopping" actionTo="/shop" />
      </div>
    )
  }
  if (status === 'loading') return <div className="container page"><LoadingState message="Checking your bag against current stock" /></div>
  if (status === 'error') {
    return <div className="container page"><ErrorState title="We could not check your bag" message={error} onRetry={reload} /></div>
  }

  function handleQuantityChange(item, next) {
    const result = setQuantity(item.productId, item.size, next)
    setMessage(result.ok ? '' : result.error)
  }

  const canCheckout = !hasIssues && totals.itemCount > 0

  return (
    <div className="container page">
      <header className="page-head"><h1>Your bag</h1></header>

      {hasIssues && (
        <div className="banner banner--warning" role="alert">
          <p>Some pieces in your bag changed since you added them. Review the notes below, then update your bag to continue.</p>
          <button type="button" className="btn btn--primary" onClick={fixBag}>Update my bag</button>
        </div>
      )}
      <div aria-live="polite">{message && <p className="feedback feedback--error">{message}</p>}</div>

      <div className="bag-layout">
        <ul className="bag-list">
          {lines.map((line) => (
            <BagItem key={`${line.item.productId}-${line.item.size}`} line={line}
              onQuantityChange={handleQuantityChange}
              onRemove={(item) => removeItem(item.productId, item.size)} />
          ))}
        </ul>

        <div className="bag-side">
          <OrderSummary totals={totals} />
          {canCheckout ? (
            <Link to="/checkout" className="btn btn--primary btn--block">Proceed to checkout</Link>
          ) : (
            <button type="button" className="btn btn--primary btn--block" disabled>Proceed to checkout</button>
          )}
          <Link to="/shop" className="btn btn--secondary btn--block">Continue shopping</Link>
        </div>
      </div>
    </div>
  )
}

export default ShoppingBag
