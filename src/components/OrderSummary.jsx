import { amountToFreeDelivery, DELIVERY_FEE, FREE_DELIVERY_THRESHOLD } from '../utils/businessRules.js'
import { formatCurrency } from '../utils/formatCurrency.js'

// Problem C fix: delivery cost, the free-delivery rule and how far the customer is from it
// are shown in the bag and in checkout, before the final step.
// `lines` is optional: pass the usable bag lines to list the items too (checkout).
function OrderSummary({ totals, lines }) {
  const { subtotal, savings, deliveryFee, total, itemCount } = totals
  const hasItems = subtotal > 0

  return (
    <section className="summary" aria-labelledby="summary-heading">
      <h2 id="summary-heading">Order summary</h2>

      {lines && (
        <ul className="summary__items">
          {lines.filter((l) => l.status !== 'removed').map((line) => (
            <li key={`${line.item.productId}-${line.item.size}`}>
              <span>{line.product.name}, size {line.item.size}, quantity {line.quantity}</span>
              <span>{formatCurrency(line.product.price * line.quantity)}</span>
            </li>
          ))}
        </ul>
      )}

      <dl className="summary__rows">
        <div><dt>Items</dt><dd>{itemCount}</dd></div>
        <div><dt>Subtotal</dt><dd>{formatCurrency(subtotal)}</dd></div>
        {savings > 0 && <div><dt>You save</dt><dd>{formatCurrency(savings)}</dd></div>}
        <div>
          <dt>Delivery</dt>
          <dd>{!hasItems ? '–' : deliveryFee === 0 ? 'Free' : formatCurrency(deliveryFee)}</dd>
        </div>
        <div className="summary__total"><dt>Total</dt><dd>{formatCurrency(total)}</dd></div>
      </dl>

      <p className="summary__rule">
        {hasItems && deliveryFee > 0
          ? `Add ${formatCurrency(amountToFreeDelivery(subtotal))} more to get free delivery. `
          : hasItems
            ? 'This order qualifies for free delivery. '
            : ''}
        Delivery is {formatCurrency(DELIVERY_FEE)} below {formatCurrency(FREE_DELIVERY_THRESHOLD)} and free from {formatCurrency(FREE_DELIVERY_THRESHOLD)}.
      </p>
    </section>
  )
}

export default OrderSummary
