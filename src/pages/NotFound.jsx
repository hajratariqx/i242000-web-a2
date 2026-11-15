import EmptyState from '../components/EmptyState.jsx'

function NotFound() {
  return (
    <div className="container page">
      <EmptyState title="This page does not exist"
        message="The link may be broken or the page may have moved. Try the collection instead."
        actionLabel="Go to the collection" actionTo="/shop" />
    </div>
  )
}

export default NotFound
