import { useState } from 'react'

// Shows a real image when `src` exists and loads. Otherwise shows a labelled placeholder
// that keeps the same shape, so the layout never collapses.
function ImageWithFallback({ src, alt, label }) {
  const [failed, setFailed] = useState(false)

  if (!src || failed) {
    return (
      <div className="img-placeholder" role="img" aria-label={alt}>
        <span>{label}</span>
      </div>
    )
  }
  return <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} />
}

export default ImageWithFallback
