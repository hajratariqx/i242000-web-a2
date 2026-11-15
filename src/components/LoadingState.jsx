function LoadingState({ message = 'Loading the collection' }) {
  return (
    <div className="state" role="status">
      <span className="spinner" aria-hidden="true" />
      <p>{message}…</p>
    </div>
  )
}

export default LoadingState
