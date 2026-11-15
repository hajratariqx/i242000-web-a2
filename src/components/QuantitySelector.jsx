import { Minus, Plus } from 'lucide-react'

// Callback prop: the parent decides what a change means. This component only reports clicks.
function QuantitySelector({ value, min = 1, max, onChange, label = 'Quantity', disabled = false }) {
  return (
    <div className="qty" role="group" aria-label={label}>
      <button type="button" className="qty__btn" onClick={() => onChange(value - 1)}
        disabled={disabled || value <= min} aria-label={`Decrease ${label.toLowerCase()}`}>
        <Minus size={16} aria-hidden="true" />
      </button>
      <output className="qty__value" aria-live="polite">{value}</output>
      <button type="button" className="qty__btn" onClick={() => onChange(value + 1)}
        disabled={disabled || value >= max} aria-label={`Increase ${label.toLowerCase()}`}>
        <Plus size={16} aria-hidden="true" />
      </button>
    </div>
  )
}

export default QuantitySelector
