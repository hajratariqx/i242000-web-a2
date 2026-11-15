import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Truck } from 'lucide-react'
import ImageWithFallback from '../components/ImageWithFallback.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import LoadingState from '../components/LoadingState.jsx'
import ErrorState from '../components/ErrorState.jsx'
import { useProducts } from '../hooks/useProducts.js'
import { validateField } from '../utils/validation.js'
import { DELIVERY_FEE, FREE_DELIVERY_THRESHOLD } from '../utils/businessRules.js'
import { formatCurrency } from '../utils/formatCurrency.js'

// To use real photos, put them in public/images/ and set the path, e.g. '/images/hero/hero.jpg'.
// Leave '' to show the labelled placeholder. See ASSET_GUIDE.md.
const HERO_IMAGE = '/images/hero/H1.jpg'

const COLLECTION_CARDS = [
  { to: '/shop?collection=eastern-wear', title: "Women's eastern wear", image: '/images/collections/C1.jpg', label: "[COLLECTION IMAGE PLACEHOLDER — WOMEN'S EASTERN WEAR]" },
  { to: '/shop?collection=mens-essentials', title: "Men's essentials", image: '/images/collections/C2.jpg', label: "[MEN'S COLLECTION IMAGE PLACEHOLDER]" },
  { to: '/shop?collection=everyday-casuals', title: 'Everyday casuals', image: '/images/collections/C3.jpg', label: '[COLLECTION IMAGE PLACEHOLDER — EVERYDAY CASUALS]' },
  { to: '/shop?collection=festive-edit', title: 'Festive edit', image: '/images/collections/C4.jpg', label: '[COLLECTION IMAGE PLACEHOLDER — FESTIVE EDIT]' },
  { to: '/shop?new=1', title: 'New arrivals', image: '/images/collections/C5.jpg', label: '[COLLECTION IMAGE PLACEHOLDER — NEW ARRIVALS]' },
]

function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  function handleSubmit(event) {
    event.preventDefault() // stop the browser from reloading the page
    const message = validateField('email', email)
    setError(message)
    setDone(!message)
  }

  return (
    <form className="newsletter" onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label htmlFor="newsletter-email">Email address</label>
        <input id="newsletter-email" type="email" value={email} placeholder="i242000@isb.nu.edu.pk"
          aria-invalid={error ? 'true' : undefined} aria-describedby="newsletter-msg"
          onChange={(event) => { setEmail(event.target.value); setDone(false) }} />
      </div>
      <button type="submit" className="btn btn--primary">Join the list</button>
      <p id="newsletter-msg" className={error ? 'field__error' : 'field__hint'} role="status">
        {error || (done ? 'Thank you. This is a simulation, so nothing was sent or saved.' : 'Simulated sign-up: no email is stored or sent.')}
      </p>
    </form>
  )
}

function Home() {
  const { products, status, error, reload } = useProducts()
  const newArrivals = products.filter((p) => p.isNewArrival).slice(0, 4)

  return (
    <>
      <section className="hero">
        <div className="container hero__grid">
          <div className="hero__text">
            <h1>Everyday, beautifully considered.</h1>
            <p>Contemporary essentials, thoughtfully designed for the way you live. Soft lawn, honest cotton and linen, cut for Pakistani days.</p>
            <div className="hero__actions">
              <Link to="/shop" className="btn btn--primary">Shop now</Link>
              <Link to="/shop?collection=festive-edit" className="btn btn--secondary">See the festive edit</Link>
            </div>
          </div>
          <div className="hero__media">
            <ImageWithFallback src={HERO_IMAGE} alt="A model wearing a Loom & Lane summer look"
              label="[HERO IMAGE PLACEHOLDER — WOMEN'S SUMMER EDITORIAL]" />
          </div>
        </div>
      </section>

      <section className="section container" aria-labelledby="collections-heading">
        <h2 id="collections-heading">Shop by collection</h2>
        <ul className="collection-grid">
          {COLLECTION_CARDS.map((card) => (
            <li key={card.to}>
              <Link to={card.to} className="collection-card">
                <div className="collection-card__media">
                  <ImageWithFallback src={card.image} alt={card.title} label={card.label} />
                </div>
                <span className="collection-card__title">{card.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="section container" aria-labelledby="new-heading">
        <div className="section__head">
          <h2 id="new-heading">New arrivals</h2>
          <Link to="/shop?new=1" className="text-link">View all new arrivals</Link>
        </div>
        {status === 'loading' && <LoadingState />}
        {status === 'error' && <ErrorState title="The collection did not load" message={error} onRetry={reload} />}
        {status === 'ready' && <ProductGrid products={newArrivals} viewMode="comfortable" />}
      </section>

      <section className="editorial">
        <div className="container editorial__grid">
          <div className="editorial__media">
            <ImageWithFallback src="/images/lookbook/L1.jpg" alt="Lookbook photograph" label="[LOOKBOOK IMAGE PLACEHOLDER — EDITORIAL]" />
          </div>
          <div className="editorial__text">
            <h2>Made for moments, made to last.</h2>
            <p>We start with the fabric. Breathable lawn for June in Islamabad, textured cotton for winter evenings, linen that softens with every wash.</p>
            <p>Each piece is cut to move between lecture hall, office and family dinner, and to look better the more you wear it.</p>
            <Link to="/about" className="text-link">Read our story</Link>
          </div>
        </div>
      </section>

      <section className="promo container" aria-labelledby="promo-heading">
        <Truck size={28} aria-hidden="true" />
        <div>
          <h2 id="promo-heading">Delivery that rewards a full bag</h2>
          <p>Delivery is {formatCurrency(DELIVERY_FEE)} below {formatCurrency(FREE_DELIVERY_THRESHOLD)}. From {formatCurrency(FREE_DELIVERY_THRESHOLD)} it is free, to every major city we cover.</p>
        </div>
        <Link to="/help/delivery" className="btn btn--secondary">Delivery details</Link>
      </section>

      <section className="section container newsletter-section" aria-labelledby="news-heading">
        <h2 id="news-heading">New pieces, first</h2>
        <p>Join the list for new collections and festive drops.</p>
        <NewsletterForm />
      </section>
    </>
  )
}

export default Home
