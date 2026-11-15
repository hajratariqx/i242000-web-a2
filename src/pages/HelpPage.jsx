import { Link, useParams } from 'react-router-dom'
import NotFound from './NotFound.jsx'
import { DELIVERY_FEE, FREE_DELIVERY_THRESHOLD } from '../utils/businessRules.js'
import { formatCurrency } from '../utils/formatCurrency.js'

// Customer-care topics. Everything here is fictional.
const TOPICS = {
  delivery: {
    title: 'Delivery information',
    body: [
      `Delivery is ${formatCurrency(DELIVERY_FEE)} on orders below ${formatCurrency(FREE_DELIVERY_THRESHOLD)}. Orders of ${formatCurrency(FREE_DELIVERY_THRESHOLD)} or above are delivered free.`,
      'We would deliver to Islamabad, Rawalpindi, Lahore, Karachi, Peshawar, Faisalabad and Multan in 3 to 5 working days.',
      'The fee is calculated automatically from your bag total and is shown in your bag and at checkout before you confirm.',
      'This is a simulated shop, so nothing is actually dispatched.',
    ],
  },
  returns: {
    title: 'Returns and exchanges',
    body: [
      'In this fictional policy, unworn pieces with tags can be exchanged within 7 days of delivery.',
      'Sale pieces are marked clearly on the product page and in your bag.',
      'No real returns can be made, because no real orders are taken.',
    ],
  },
  contact: {
    title: 'Contact',
    body: [
      'Loom & Lane is a fictional label, so there is no real address, phone number or social account.',
      'For coursework questions, please use the contact details given by your instructor.',
    ],
  },
}

function HelpPage() {
  const { topic } = useParams()
  const content = TOPICS[topic]
  if (!content) return <NotFound />

  return (
    <div className="container page prose">
      <h1>{content.title}</h1>
      {content.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      <p><Link to="/shop">Back to the collection</Link></p>
    </div>
  )
}

export default HelpPage
