import { Link } from 'react-router-dom'
import ImageWithFallback from '../components/ImageWithFallback.jsx'

function About() {
  return (
    <div className="container page">
      <header className="page-head">
        <h1>About Loom &amp; Lane</h1>
        <p>A fictional Pakistani label, created for a university web programming project.</p>
      </header>
      <div className="about-grid">
        <div className="about-media">
          <ImageWithFallback src="/images/hero/H1.jpg" alt="Loom & Lane studio" label="[ABOUT IMAGE PLACEHOLDER — STUDIO]" />
        </div>
        <div className="prose">
          <h2>Where the name comes from</h2>
          <p>A loom is where cloth begins. A lane is where it goes: to campus, the office, a cousin's mehndi. Loom &amp; Lane imagines clothing that respects both.</p>
          <h2>What we make</h2>
          <p>Eastern, western and casual pieces for women and men, in breathable fabrics suited to Pakistani weather. We keep the silhouettes simple and the colours quiet, so each piece works with what you already own.</p>
          <h2>Who it is for</h2>
          <p>Young adults and working professionals who want comfortable, good-quality clothes for university, work and semi-formal events.</p>
          <p className="field__hint">Loom &amp; Lane is not a real business. All products, prices and policies on this site are invented for coursework.</p>
          <Link to="/shop" className="btn btn--primary">Browse the collection</Link>
        </div>
      </div>
    </div>
  )
}

export default About
