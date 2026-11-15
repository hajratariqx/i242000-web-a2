# Loom & Lane

A fictional contemporary Pakistani clothing label, built as **CS4032 Web Programming, Assignment 02** (Fall 2026).

- **Student:** `Hajra Tariq` | **Roll no:** `i24-2000` | **Section:** `CY-5A`
- **GitHub:** `https://github.com/hajratariqx/i242000-web-a2/`
- **Deployment:** `<VERCEL URL>`
- **Final commit:** `<HASH>`

> This is an academic frontend simulation. Orders are not real, no payment is taken, and all products, prices and policies are invented.

## What it is

An online shop for eastern, western and casual clothing for women and men, aimed at young adults and working professionals in Pakistan. Delivery covers a fictional list of major cities. Prices are in PKR.
Main customer task: find a piece in the right size and order it with a clear final price. Business goal: a completed (simulated) order.

## Tech

React 19, JavaScript (no TypeScript), Vite, React Router DOM, lucide-react (icons), custom CSS, localStorage / sessionStorage, Node's built-in test runner. No backend, no UI kit.

## Commands

| Purpose | Command |
|---|---|
| Install | `npm install` |
| Develop | `npm run dev` (opens at http://localhost:5173) |
| Build | `npm run build` |
| Preview the build | `npm run preview` |
| Test the business rules | `node --test` (or `npm test`) |
| Lint | `npm run lint` |

## Routes

| Path | Page |
|---|---|
| `/` | Home: hero, collections, new arrivals, promo, simulated newsletter |
| `/shop` | Search, filters, sort, product grid (`?gender=`, `?collection=`, `?new=1`, `?q=` pre-fill it) |
| `/product/:id` | Gallery, size and quantity, add to bag, related pieces |
| `/bag` | Bag with quantity controls and summary |
| `/checkout` | Validated delivery form and live summary |
| `/order-confirmation/:orderId` | Simulated confirmation |
| `/about`, `/size-guide`, `/help/:topic` | Content (`delivery`, `returns`, `contact`) |
| `*` | Not-found page |

## Business rules (one per category)

| # | Rule | Where the customer sees it | What the app does | Boundary |
|---|---|---|---|---|
| 1 Availability | Quantity of a product-size cannot exceed its stock | Size chips ("2 left", "Sold out"), quantity control, bag | Plus button stops at the limit; add is rejected with a specific message | Stock 3: 3 passes, 4 fails; stock 0 is blocked |
| 2 Eligibility | Only sizes a product offers can be chosen; a size is required | Size selector shows only offered sizes | Add is rejected without a size; unsupported size is rejected | Offers S/M/L: M passes, XXL rejected |
| 3 Pricing | Delivery Rs. 250 below Rs. 5,000; free from Rs. 5,000 | Announcement bar, product page, bag, checkout | Fee recalculated on every bag change | Rs. 4,999 pays 250; Rs. 5,000 is free |

All three live in `src/utils/businessRules.js` (no React inside) and are used by the app and by `tests/businessRules.test.js`.

## Storage

- **localStorage `loomlane.bag.v1`:** the bag as `{ productId, size, quantity }`. Invalid or corrupt data is discarded; valid lines are re-checked against current products and stock.
- **localStorage `loomlane.viewMode`:** the card-size choice on the shop page.
- **sessionStorage:** the last simulated order (confirmation page), the filters of each shop URL (so Back keeps them), and the demo-panel flag.

## Mock loading, failure and retry

`src/data/mockApi.js` returns the local products after a short delay. The shop, product, bag and checkout pages show a loading state, an error state and a **Try again** button.
To trigger a failure: open the site with `?demo=1`, open **Demo controls (development only)** at the bottom left, press **Simulate a loading failure**, then press **Try again**. Normal visitors never see this panel.

## Reproducing edge cases

| Case | How |
|---|---|
| Invalid product ID | Open `/product/NOPE` |
| Invalid route | Open `/anything` |
| Out-of-stock product | Open `/product/P011` |
| Sold-out size | Open `/product/P006`: size M is disabled |
| Stock boundary | `/product/P014`, size M (stock 3): quantity stops at 3 |
| Size not offered | Product pages only list offered sizes; `checkAddToBag` rejects others (see tests) |
| Delivery boundary | Rs. 4,999 is `P006` alone (fee Rs. 250). Rs. 5,000 is covered by the test file |
| Empty bag / empty checkout | Open `/bag` or `/checkout` with an empty bag |
| No search results | Search `zzzz`, then **Reset filters** |
| Spaces in search | Search `  linen ` |
| Invalid checkout input | Submit empty; enter `abc` as email or `123` as phone; other fields are kept |
| Stock changes after adding | Add P014 size M x3, open `?demo=1`, set P014 M to 1 or 0, open `/bag`: a note appears and **Update my bag** fixes it |
| Corrupt saved bag | In DevTools console: `localStorage.setItem('loomlane.bag.v1','{bad')` then reload `/bag` |
| Restored unavailable item | Console: `localStorage.setItem('loomlane.bag.v1', JSON.stringify([{productId:'P011',size:'M',quantity:1}]))` then reload `/bag` |
| Loading failure | See the section above |
| Missing image | In products.js change one image path to a wrong name; the labelled placeholder appears |

## Simulated operations

The checkout, order number, order status, delivery estimate and newsletter sign-up are simulations. No data leaves the browser. Please use made-up details.

## Known limitations

- Images are third-party and not owned by the author; see ASSET_GUIDE.md.
- Google Fonts need an internet connection; fallback fonts are specified.
- The confirmation page only works while the tab that placed the order is open.
- Not tested with a screen reader; keyboard use and labels follow standard HTML.

## Concept map

| Concept | File | Where |
|---|---|---|
| `useState` | `context/CartContext.jsx` | Bag state |
| `useState` (controlled inputs) | `pages/Checkout.jsx` | Form values, errors, submitting |
| `useState` (filters, search, sort) | `pages/Shop.jsx` | Shop controls |
| Functional update | `context/CartContext.jsx`, `pages/Shop.jsx` | `setItems(prev => ...)`, `setFilters(prev => ...)` |
| Immutable object/array updates | `context/CartContext.jsx`, `pages/Checkout.jsx` | Spread syntax, `map`, `filter` |
| `useEffect` + cleanup | `context/ProductsContext.jsx` | Async load with a `cancelled` flag |
| `useEffect` (storage sync) | `context/CartContext.jsx`, `hooks/useLocalStorageState.js` | Save to localStorage |
| Context | `hooks/useCart.js`, `hooks/useProducts.js` | Shared bag and product data |
| Props | `components/ProductCard.jsx` | `product` |
| Callback props | `components/QuantitySelector.jsx`, `FilterSidebar.jsx` | `onChange` |
| Conditional rendering | `pages/Shop.jsx`, `components/BagItem.jsx` | Loading, error, empty, issue states |
| Lists and keys | `components/ProductGrid.jsx` | `key={product.id}` |
| Derived values | `pages/Shop.jsx`, `utils/businessRules.js` | `useMemo` filtered list, totals |
| `useParams` | `pages/ProductDetails.jsx`, `OrderConfirmation.jsx` | `:id`, `:orderId` |
| `useNavigate` | `pages/Checkout.jsx`, `components/Navbar.jsx` | Go to confirmation, search |
| `Link` / `NavLink` | `components/Navbar.jsx` | Navigation |
| Array methods | `utils/shopFilters.js`, `businessRules.js` | `filter`, `sort`, `reduce`, `find`, `every` |
| Destructuring / spread | `utils/storage.js`, `Checkout.jsx` | Throughout |
| async/await + try/catch | `data/mockApi.js`, `context/ProductsContext.jsx` | Mock loader |
| JSON + storage | `utils/storage.js` | `JSON.parse` / `stringify`, safe fallbacks |
| `node:test` | `tests/businessRules.test.js` | Rule tests |

## Folders

```
src/components   reusable UI pieces       src/pages    one file per route
src/context      shared state providers   src/hooks    context hooks + useLocalStorageState
src/data         products + mock loader   src/utils    business rules, filters, validation, storage
src/styles       CSS (variables, global, layout, components)
tests            node:test file           research     screenshots + EVIDENCE.md
```
