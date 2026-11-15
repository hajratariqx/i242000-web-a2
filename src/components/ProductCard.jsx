import { Link } from 'react-router-dom'
import ImageWithFallback from './ImageWithFallback.jsx'
import PriceTag from './PriceTag.jsx'
import { SIZE_ORDER } from '../data/products.js'
import { getStock, getTotalStock, isSoldOut } from '../utils/businessRules.js'

// Problem A fix: every card shows which sizes exist and which are sold out,
// so customers do not have to open each product to check.
function ProductCard({ product }) {
  const sizes = SIZE_ORDER.filter((size) => size in product.stock)
  const soldOut = isSoldOut(product)
  const fewLeft = !soldOut && getTotalStock(product) <= 5
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0

  return (
    <article className="product-card">
      <Link to={`/product/${product.id}`} className="product-card__media" tabIndex={-1} aria-hidden="true">
        <ImageWithFallback
          src={product.images[0]}
          alt={`${product.name}, ${product.color}`}
          label={`[PRODUCT IMAGE PLACEHOLDER — PRODUCT ID: ${product.id}]`}
        />
        <span className="badges">
          {product.isNewArrival && <span className="badge">New</span>}
          {discount > 0 && <span className="badge badge--sale">{discount}% off</span>}
        </span>
      </Link>
      <div className="product-card__body">
        <p className="product-card__meta">{product.category}, {product.fabric}</p>
        <h3 className="product-card__name">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>
        <PriceTag price={product.price} originalPrice={product.originalPrice} />
        <ul className="size-chips" aria-label="Sizes offered">
          {sizes.map((size) => {
            const out = getStock(product, size) === 0
            return (
              <li key={size} className={out ? 'is-out' : ''}>
                {size}
                {out && <span className="visually-hidden"> (sold out)</span>}
              </li>
            )
          })}
        </ul>
        {soldOut && <p className="stock-note stock-note--out">Sold out</p>}
        {fewLeft && <p className="stock-note stock-note--low">Few pieces left</p>}
      </div>
    </article>
  )
}

export default ProductCard
