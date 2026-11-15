import { DELIVERY_FEE, FREE_DELIVERY_THRESHOLD } from '../utils/businessRules.js'
import { formatCurrency } from '../utils/formatCurrency.js'

function AnnouncementBar() {
  return (
    <div className="announcement">
      <p>
        Complimentary delivery on orders of {formatCurrency(FREE_DELIVERY_THRESHOLD)} or above.
        Below that, delivery is {formatCurrency(DELIVERY_FEE)}.
      </p>
    </div>
  )
}

export default AnnouncementBar
