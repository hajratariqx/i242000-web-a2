import { Link } from 'react-router-dom'
import { Trash2 } from 'lucide-react'
import ImageWithFallback from './ImageWithFallback.jsx'
import QuantitySelector from './QuantitySelector.jsx'
import { getStock } from '../utils/businessRules.js'
import { formatCurrency } from '../utils/formatCurrency.js'

// One line in the bag. `line` comes from resolveCartLine(): it carries the product,
// a status (ok / reduced / removed) and a message that explains any problem.
function BagItem({ line, onQuantityChange, onRemove }) {
  const { item, product, status, message } = line
  const hasIssue = status !== 'ok'

  if (!product) {
    return (
      <li className="bag-item bag-item--issue">
        <div className="bag-item__info">
          <p className="bag-item__name">Product {item.productId}</p>
          <p className="inline-alert" role="alert">{message}</p>
        </div>
        <button type="button" className="text-btn" onClick={() => onRemove(item)}>Remove</button>
      </li>
    )
  }

  const stock = getStock(product, item.size)
  const lineTotal = status === 'removed' ? 0 : product.price * line.quantity

  return (
    <li className={`bag-item ${hasIssue ? 'bag-item--issue' : ''}`}>
      <Link to={`/product/${product.id}`} className="bag-item__media" tabIndex={-1} aria-hidden="true">
        <ImageWithFallback src={product.images[0]} alt={product.name}
          label={`[IMAGE PLACEHOLDER — ${product.id}]`} />
      </Link>
      <div className="bag-item__info">
        <h3 className="bag-item__name"><Link to={`/product/${product.id}`}>{product.name}</Link></h3>
        <p className="bag-item__meta">Size {item.size}, {formatCurrency(product.price)} each</p>
        {hasIssue && <p className="inline-alert" role="alert">{message}</p>}
        {status !== 'removed' && (
          <QuantitySelector value={item.quantity} min={1} max={stock}
            label={`Quantity for ${product.name} size ${item.size}`}
            onChange={(next) => onQuantityChange(item, next)} />
        )}
      </div>
      <div className="bag-item__side">
        <p className="bag-item__total">{formatCurrency(lineTotal)}</p>
        <button type="button" className="text-btn" onClick={() => onRemove(item)}
          aria-label={`Remove ${product.name} size ${item.size}`}>
          <Trash2 size={16} aria-hidden="true" /> Remove
        </button>
      </div>
    </li>
  )
}

export default BagItem
