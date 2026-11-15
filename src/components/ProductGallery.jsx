import { useState } from 'react'
import ImageWithFallback from './ImageWithFallback.jsx'

// With no photos yet, three labelled placeholder slots keep the gallery interaction working.
function ProductGallery({ product }) {
  const slots = product.images.length > 0 ? product.images : [null, null, null]
  const [index, setIndex] = useState(0)

  return (
    <div className="gallery">
      <div className="gallery__main">
        <ImageWithFallback
          key={`${product.id}-${index}`}
          src={slots[index]}
          alt={`${product.name}, ${product.color}, view ${index + 1}`}
          label={`[PRODUCT GALLERY PLACEHOLDER — ${product.id}, VIEW ${index + 1}]`}
        />
      </div>
      <ul className="gallery__thumbs" aria-label="Product views">
        {slots.map((src, i) => (
          <li key={i}>
            <button type="button" className={i === index ? 'is-selected' : ''} onClick={() => setIndex(i)}
              aria-label={`Show view ${i + 1}`} aria-pressed={i === index}>
              <ImageWithFallback src={src} alt="" label={`View ${i + 1}`} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProductGallery
