import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import FormField from '../components/FormField.jsx'
import OrderSummary from '../components/OrderSummary.jsx'
import LoadingState from '../components/LoadingState.jsx'
import ErrorState from '../components/ErrorState.jsx'
import EmptyState from '../components/EmptyState.jsx'
import { useCart } from '../hooks/useCart.js'
import { useProducts } from '../hooks/useProducts.js'
import { CITIES } from '../data/products.js'
import { CHECKOUT_FIELDS, validateCheckout, validateField } from '../utils/validation.js'
import { LAST_ORDER_KEY, saveJSON } from '../utils/storage.js'

const EMPTY_FORM = { fullName: '', email: '', phone: '', city: '', address: '', notes: '' }
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function Checkout() {
  const { items, lines, totals, hasIssues, clearBag } = useCart()
  const { status, error, reload } = useProducts()
  const navigate = useNavigate()
  const [values, setValues] = useState(EMPTY_FORM) // controlled inputs: React state is the source of truth
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  if (items.length === 0) {
    return (
      <div className="container page">
        <EmptyState title="Your bag is empty" message="Add a piece to your bag before checking out."
          actionLabel="Start shopping" actionTo="/shop" />
      </div>
    )
  }
  if (status === 'loading') return <div className="container page"><LoadingState message="Preparing checkout" /></div>
  if (status === 'error') {
    return <div className="container page"><ErrorState title="Checkout could not start" message={error} onRetry={reload} /></div>
  }

  function handleChange(event) {
    const { name, value } = event.target
    setValues((prev) => ({ ...prev, [name]: value })) // new object: never mutate state
    // Once a field has shown an error, re-check it while the customer types so the message clears.
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }))
  }

  function handleBlur(event) {
    const { name, value } = event.target
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (hasIssues || submitting) return

    const found = validateCheckout(values)
    setErrors(found)
    const firstBad = CHECKOUT_FIELDS.find((name) => found[name])
    if (firstBad) {
      document.getElementById(firstBad)?.focus() // all the valid values stay in the form
      return
    }

    setSubmitting(true)
    await wait(900) // simulated "placing the order" delay
    const order = {
      id: `LL-${Math.floor(100000 + Math.random() * 900000)}`,
      placedAt: new Date().toISOString(),
      customer: { ...values },
      lines: lines
        .filter((line) => line.status !== 'removed')
        .map((line) => ({
          productId: line.product.id, name: line.product.name, size: line.item.size,
          quantity: line.quantity, unitPrice: line.product.price, lineTotal: line.product.price * line.quantity,
        })),
      totals,
    }
    saveJSON(LAST_ORDER_KEY, order, 'session')
    clearBag()
    navigate(`/order-confirmation/${order.id}`)
  }

  const errorCount = Object.values(errors).filter(Boolean).length

  return (
    <div className="container page">
      <header className="page-head"><h1>Checkout</h1></header>

      <p className="banner banner--info">
        This is a simulated checkout for a university project. No payment is taken and nothing is sent.
        Please use made-up details.
      </p>

      {hasIssues && (
        <div className="banner banner--warning" role="alert">
          <p>Something in your bag changed. <Link to="/bag">Review your bag</Link> before you place the order.</p>
        </div>
      )}

      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit} noValidate>
          {errorCount > 0 && (
            <p className="banner banner--error" role="alert">
              Please fix {errorCount} {errorCount === 1 ? 'field' : 'fields'} below. Everything else you entered is kept.
            </p>
          )}
          <h2>Delivery details</h2>
          <FormField id="fullName" label="Full name" required autoComplete="name"
            value={values.fullName} onChange={handleChange} onBlur={handleBlur} error={errors.fullName} />
          <FormField id="email" label="Email address" type="email" required autoComplete="email"
            value={values.email} onChange={handleChange} onBlur={handleBlur} error={errors.email} />
          <FormField id="phone" label="Mobile number" type="tel" required autoComplete="tel" inputMode="tel"
            placeholder="0300 1234567" hint="We would use this to confirm delivery (simulated)."
            value={values.phone} onChange={handleChange} onBlur={handleBlur} error={errors.phone} />
          <FormField id="city" label="City" as="select" required options={CITIES}
            value={values.city} onChange={handleChange} onBlur={handleBlur} error={errors.city} />
          <FormField id="address" label="Delivery address" as="textarea" required autoComplete="street-address"
            hint="House or flat number, street and area."
            value={values.address} onChange={handleChange} onBlur={handleBlur} error={errors.address} />
          <FormField id="notes" label="Delivery instructions" as="textarea"
            value={values.notes} onChange={handleChange} onBlur={handleBlur} error={errors.notes} />

          <h2>Payment</h2>
          <p className="field__hint">Cash on delivery (simulated). We never ask for card or bank details.</p>

          <button type="submit" className="btn btn--primary btn--block" disabled={submitting || hasIssues}>
            {submitting ? 'Placing your order…' : 'Confirm order (simulated)'}
          </button>
        </form>

        <div className="checkout-side">
          <OrderSummary totals={totals} lines={lines} />
          <Link to="/bag" className="text-link">Edit bag</Link>
        </div>
      </div>
    </div>
  )
}

export default Checkout
