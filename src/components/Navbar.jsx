import { useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Menu, Search, ShoppingBag, X } from 'lucide-react'
import { useCart } from '../hooks/useCart.js'

const SHOP_LINKS = [
  { to: '/shop?new=1', label: 'New arrivals' },
  { to: '/shop?gender=women', label: 'Women' },
  { to: '/shop?gender=men', label: 'Men' },
  { to: '/shop', label: 'Collections' },
]

function Navbar() {
  const { itemCount } = useCart()
  const navigate = useNavigate()
  const { pathname, search } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchText, setSearchText] = useState('')

  const closeMenu = () => setMenuOpen(false)

  // Query links (/shop?gender=men) cannot use NavLink's built-in active check,
  // because NavLink ignores the query string. So we compare the full URL ourselves.
  const isCurrent = (to) => pathname + search === to

  function handleSearch(event) {
    event.preventDefault()
    const text = searchText.trim()
    navigate(text ? `/shop?q=${encodeURIComponent(text)}` : '/shop')
    setSearchOpen(false)
    closeMenu()
  }

  return (
    <header className="site-header">
      <div className="container site-header__bar">
        <button type="button" className="icon-btn nav-toggle" aria-expanded={menuOpen}
          aria-controls="main-nav" onClick={() => setMenuOpen((open) => !open)}>
          {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          <span className="visually-hidden">{menuOpen ? 'Close menu' : 'Open menu'}</span>
        </button>

        <Link to="/" className="wordmark" onClick={closeMenu}>Loom &amp; Lane</Link>

        <nav id="main-nav" className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main">
          <ul>
            <li><NavLink to="/" end onClick={closeMenu}>Home</NavLink></li>
            {SHOP_LINKS.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className={isCurrent(link.to) ? 'active' : ''}
                  aria-current={isCurrent(link.to) ? 'page' : undefined} onClick={closeMenu}>
                  {link.label}
                </Link>
              </li>
            ))}
            <li><NavLink to="/about" onClick={closeMenu}>About</NavLink></li>
          </ul>
        </nav>

        <div className="site-header__actions">
          <button type="button" className="icon-btn" aria-expanded={searchOpen}
            aria-controls="header-search" onClick={() => setSearchOpen((open) => !open)}>
            <Search size={22} aria-hidden="true" />
            <span className="visually-hidden">Search</span>
          </button>
          <Link to="/bag" className="icon-btn bag-link">
            <ShoppingBag size={22} aria-hidden="true" />
            <span className="bag-count" aria-hidden="true">{itemCount}</span>
            <span className="visually-hidden">Shopping bag, {itemCount} {itemCount === 1 ? 'item' : 'items'}</span>
          </Link>
        </div>
      </div>

      {searchOpen && (
        <form id="header-search" className="header-search container" role="search" onSubmit={handleSearch}>
          <label htmlFor="header-search-input" className="visually-hidden">Search products</label>
          <input id="header-search-input" type="search" value={searchText} autoFocus
            placeholder="Search for a kurta, lawn suit or linen shirt"
            onChange={(event) => setSearchText(event.target.value)} />
          <button type="submit" className="btn btn--primary">Search</button>
        </form>
      )}
    </header>
  )
}

export default Navbar
