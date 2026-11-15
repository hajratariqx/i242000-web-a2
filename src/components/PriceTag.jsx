import { formatCurrency } from '../utils/formatCurrency.js'

function PriceTag({ price, originalPrice }) {
  const onSale = originalPrice && originalPrice > price
  return (
    <p className="price">
      <span className="price__now">{formatCurrency(price)}</span>
      {onSale && (
        <>
          <span className="price__was">
            <span className="visually-hidden">Original price </span>
            <s>{formatCurrency(originalPrice)}</s>
          </span>
        </>
      )}
    </p>
  )
}

export default PriceTag
