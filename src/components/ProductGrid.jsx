import ProductCard from './ProductCard.jsx'

// viewMode is "comfortable" (larger cards) or "compact" (more cards per row).
function ProductGrid({ products, viewMode = 'comfortable' }) {
  return (
    <ul className={`product-grid product-grid--${viewMode}`}>
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  )
}

export default ProductGrid
