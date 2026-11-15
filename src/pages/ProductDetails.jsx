import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ProductGallery from '../components/ProductGallery.jsx'
import PriceTag from '../components/PriceTag.jsx'
import SizeSelector from '../components/SizeSelector.jsx'
import QuantitySelector from '../components/QuantitySelector.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import LoadingState from '../components/LoadingState.jsx'
import ErrorState from '../components/ErrorState.jsx'
import EmptyState from '../components/EmptyState.jsx'
import { useProducts } from '../hooks/useProducts.js'
import { useCart } from '../hooks/useCart.js'
import {
  DELIVERY_FEE, FREE_DELIVERY_THRESHOLD, getSizeStockMessage, getStock, isSoldOut,
} from '../utils/businessRules.js'
import { formatCurrency } from '../utils/formatCurrency.js'

function ProductDetails() {
  const { id } = useParams() // the :id part of /product/:id
  const { products, status, error, reload } = useProducts()
  const { addItem, quantityInBag } = useCart()
  const [size, setSize] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [feedback, setFeedback] = useState(null) // { type: 'success' | 'error', text }

  if (status === 'loading') return <div className="container page"><LoadingState message="Loading this piece" /></div>
  if (status === 'error') {
    return <div className="container page"><ErrorState title="This piece did not load" message={error} onRetry={reload} /></div>
  }

  const product = products.find((p) => p.id === id)
  if (!product) {
    return (
      <div className="container page">
        <EmptyState title="We could not find that piece"
          message={`There is no product with the code "${id}". It may have been removed, or the link may be wrong.`}
          actionLabel="Back to the collection" actionTo="/shop" />
      </div>
    )
  }

  const soldOut = isSoldOut(product)
  // How many more the customer can still add for the chosen size (stock minus what is in the bag).
  const stockForSize = size ? getStock(product, size) : 0
  const inBag = size ? quantityInBag(product.id, size) : 0
  const maxQuantity = Math.max(stockForSize - inBag, 0)
  const shownQuantity = Math.min(quantity, Math.max(maxQuantity, 1))

  const related = products
    .filter((p) => p.id !== product.id && p.gender === product.gender)
    .sort((a, b) => Number(b.style === product.style) - Number(a.style === product.style))
    .slice(0, 4)

  function handleSizeSelect(next) {
    setSize(next)
    setFeedback(null)
  }

  function handleAdd() {
    const result = addItem(product, size, shownQuantity)
    if (result.ok) {
      setFeedback({ type: 'success', text: `${shownQuantity} × ${product.name}, size ${size}, added to your bag.` })
      setQuantity(1)
    } else {
      setFeedback({ type: 'error', text: result.error })
    }
  }

  return (
    <div className="container page">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link to="/shop">The collection</Link> / <span>{product.name}</span>
      </nav>

      <div className="product-layout">
        <ProductGallery key={product.id} product={product} />

        <div className="product-info">
          <h1 className="product-info__name">{product.name}</h1>
          <p className="product-info__code">Product code {product.id}</p>
          <PriceTag price={product.price} originalPrice={product.originalPrice} />
          <p className="product-info__desc">{product.description || 'No description is available for this piece yet.'}</p>

          <dl className="spec-list">
            <div><dt>Fabric</dt><dd>{product.fabric}</dd></div>
            <div><dt>Colour</dt><dd>{product.color}</dd></div>
            <div><dt>Category</dt><dd>{product.category}</dd></div>
          </dl>

          {soldOut ? (
            <p className="stock-note stock-note--out" role="status">This piece is sold out in every size.</p>
          ) : (
            <>
              <SizeSelector product={product} selected={size} onSelect={handleSizeSelect} />
              <p className="size-status" role="status">
                {size ? getSizeStockMessage(product, size) : 'Select a size to see how many are left.'}
                {size && inBag > 0 && ` You have ${inBag} in your bag.`}
              </p>
              <p className="size-guide-link"><Link to="/size-guide">View the size guide</Link></p>

              <div className="buy-row">
                <QuantitySelector value={shownQuantity} min={1} max={Math.max(maxQuantity, 1)} onChange={setQuantity}
                  disabled={!size || maxQuantity === 0} />
                <button type="button" className="btn btn--primary btn--grow" onClick={handleAdd}
                  disabled={Boolean(size) && maxQuantity === 0}>
                  Add to bag
                </button>
              </div>

              <div aria-live="polite" className="feedback-region">
                {feedback && (
                  <p className={feedback.type === 'success' ? 'feedback feedback--success' : 'feedback feedback--error'}>
                    {feedback.text}{' '}
                    {feedback.type === 'success' && <Link to="/bag">View bag</Link>}
                  </p>
                )}
              </div>
            </>
          )}

          <div className="info-box">
            <h2>Delivery</h2>
            <p>
              Delivery is {formatCurrency(DELIVERY_FEE)} below {formatCurrency(FREE_DELIVERY_THRESHOLD)} and free from{' '}
              {formatCurrency(FREE_DELIVERY_THRESHOLD)}. Estimated 3 to 5 working days to major cities (simulated).
            </p>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="section" aria-labelledby="related-heading">
          <h2 id="related-heading">You may also like</h2>
          <ProductGrid products={related} viewMode="compact" />
        </section>
      )}
    </div>
  )
}

export default ProductDetails
