import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import AnnouncementBar from './AnnouncementBar.jsx'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import DemoPanel from './DemoPanel.jsx'
import { useProducts } from '../hooks/useProducts.js'

function Layout() {
  const { pathname } = useLocation()
  const { demoEnabled } = useProducts()

  // Effect: start each new page at the top (query-only changes keep the scroll position).
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <AnnouncementBar />
      <Navbar />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
      {demoEnabled && <DemoPanel />}
    </>
  )
}

export default Layout
