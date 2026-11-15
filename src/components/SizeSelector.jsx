import { SIZE_ORDER } from '../data/products.js'
import { getStock, LOW_STOCK_LIMIT } from '../utils/businessRules.js'

// Rule 2: only the sizes this product offers are shown. Rule 1: sold-out sizes are disabled.
function SizeSelector({ product, selected, onSelect, name = 'size' }) {
  const sizes = SIZE_ORDER.filter((size) => size in product.stock)

  return (
    <fieldset className="size-selector">
      <legend>Size</legend>
      <div className="size-selector__options">
        {sizes.map((size) => {
          const stock = getStock(product, size)
          const id = `${name}-${size}`
          return (
            <div className="size-option" key={size}>
              <input type="radio" id={id} name={name} value={size} checked={selected === size}
                disabled={stock === 0} onChange={() => onSelect(size)} />
              <label htmlFor={id}>{size}</label>
              <span className="size-option__note">
                {stock === 0 ? 'Sold out' : stock <= LOW_STOCK_LIMIT ? `${stock} left` : '\u00A0'}
              </span>
            </div>
          )
        })}
      </div>
    </fieldset>
  )
}

export default SizeSelector
