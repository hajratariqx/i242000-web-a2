// Route table. Every page lives in src/pages and shares the Layout (header, footer).
import { Route, Routes, useLocation } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Shop from './pages/Shop.jsx'
import ProductDetails from './pages/ProductDetails.jsx'
import ShoppingBag from './pages/ShoppingBag.jsx'
import Checkout from './pages/Checkout.jsx'
import OrderConfirmation from './pages/OrderConfirmation.jsx'
import About from './pages/About.jsx'
import SizeGuide from './pages/SizeGuide.jsx'
import HelpPage from './pages/HelpPage.jsx'
import NotFound from './pages/NotFound.jsx'

// Giving Shop a key based on the URL query means a link such as /shop?gender=men
// starts the page with the right filters even if the customer is already on /shop.
function ShopRoute() {
  const { search } = useLocation()
  return <Shop key={search} />
}

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<ShopRoute />} />
        <Route path="product/:id" element={<ProductDetails />} />
        <Route path="bag" element={<ShoppingBag />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="order-confirmation/:orderId" element={<OrderConfirmation />} />
        <Route path="about" element={<About />} />
        <Route path="size-guide" element={<SizeGuide />} />
        <Route path="help/:topic" element={<HelpPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
