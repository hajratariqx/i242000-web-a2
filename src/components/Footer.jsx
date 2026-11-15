import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <p className="wordmark wordmark--footer">Loom &amp; Lane</p>
          <p>A fictional Pakistani fashion label. Contemporary eastern and western pieces for everyday life.</p>
          <p className="footer-note">This website is an academic frontend project. Nothing here is a real shop.</p>
        </div>
        <nav aria-label="Shop">
          <h2>Shop</h2>
          <ul>
            <li><Link to="/shop?new=1">New arrivals</Link></li>
            <li><Link to="/shop?gender=women">Women</Link></li>
            <li><Link to="/shop?gender=men">Men</Link></li>
            <li><Link to="/shop?collection=festive-edit">Festive edit</Link></li>
          </ul>
        </nav>
        <nav aria-label="Customer care">
          <h2>Customer care</h2>
          <ul>
            <li><Link to="/help/delivery">Delivery information</Link></li>
            <li><Link to="/help/returns">Returns and exchanges</Link></li>
            <li><Link to="/size-guide">Size guide</Link></li>
            <li><Link to="/help/contact">Contact</Link></li>
          </ul>
        </nav>
        <div>
          <h2>Follow</h2>
          <ul>
            <li>Instagram (placeholder)</li>
            <li>Facebook (placeholder)</li>
            <li>TikTok (placeholder)</li>
          </ul>
        </div>
      </div>
      <p className="container footer-copy">© 2026 Loom &amp; Lane. A fictional brand created for coursework.</p>
    </footer>
  )
}

export default Footer
