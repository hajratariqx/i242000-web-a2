import { Link, useParams } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'
import EmptyState from '../components/EmptyState.jsx'
import OrderSummary from '../components/OrderSummary.jsx'
import { formatCurrency } from '../utils/formatCurrency.js'
import { LAST_ORDER_KEY, loadJSON } from '../utils/storage.js'

function OrderConfirmation() {
  const { orderId } = useParams()
  const order = loadJSON(LAST_ORDER_KEY, null, 'session')

  // Opening an old or made-up link (or refreshing after the tab was closed) has no order to show.
  if (!order || order.id !== orderId) {
    return (
      <div className="container page">
        <EmptyState title="We could not find that order"
          message="Simulated orders are only kept while this browser tab stays open."
          actionLabel="Continue shopping" actionTo="/shop" />
      </div>
    )
  }

  const { customer } = order
  return (
    <div className="container page confirmation">
      <header className="confirmation__head">
        <CheckCircle size={40} aria-hidden="true" />
        <h1>Thank you, {customer.fullName.split(' ')[0]}.</h1>
        <p>Your simulated order <strong>{order.id}</strong> is confirmed. No real order was placed, charged or dispatched.</p>
      </header>

      <div className="confirmation__grid">
        <section aria-labelledby="items-heading" className="confirmation__card">
          <h2 id="items-heading">Your pieces</h2>
          <ul className="summary__items">
            {order.lines.map((line) => (
              <li key={`${line.productId}-${line.size}`}>
                <span>{line.name}, size {line.size}, quantity {line.quantity}</span>
                <span>{formatCurrency(line.lineTotal)}</span>
              </li>
            ))}
          </ul>
          <OrderSummary totals={order.totals} />
        </section>

        <section aria-labelledby="delivery-heading" className="confirmation__card">
          <h2 id="delivery-heading">Delivery</h2>
          <address>
            {customer.fullName}<br />
            {customer.address}<br />
            {customer.city}<br />
            {customer.phone}
          </address>
          {customer.notes && <p>Instructions: {customer.notes}</p>}
          <p><strong>Simulated status:</strong> Order received. Not a real order.</p>
          <p><strong>Total:</strong> {formatCurrency(order.totals.total)}</p>
          <Link to="/shop" className="btn btn--primary">Continue shopping</Link>
        </section>
      </div>
    </div>
  )
}

export default OrderConfirmation
