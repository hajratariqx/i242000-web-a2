import { Link } from 'react-router-dom'

// Use onAction for a button (for example "Clear all filters") or actionTo for a link.
function EmptyState({ title, message, actionLabel, onAction, actionTo }) {
  return (
    <div className="state">
      <h2>{title}</h2>
      <p>{message}</p>
      {actionLabel && onAction && (
        <button type="button" className="btn btn--primary" onClick={onAction}>{actionLabel}</button>
      )}
      {actionLabel && actionTo && (
        <Link className="btn btn--primary" to={actionTo}>{actionLabel}</Link>
      )}
    </div>
  )
}

export default EmptyState
