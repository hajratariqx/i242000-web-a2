# Frontend decisions

One decision per investigated problem.
Reference sites: Sapphire PK, Limelight, URG. Observations are in `research/EVIDENCE.md`.

## Decision 1: Size is visible and usable on the listing (information hierarchy and mobile layout)

| Field | Entry |
|---|---|
| **Problem** | On the reference listings, cards show image, name and price but no sizes; URG's filter has no size option. Customers must open products to check their size. |
| **Decision** | Every card shows the sizes offered, with sold-out sizes struck through and labelled for screen readers. The filter panel has a "Size in stock" filter that only matches products with that size in stock. |
| **Alternative** | Show sizes only on hover or in a Quick View. |
| **Reason** | Hover does not exist on phones, and our customers are mostly on mobile. Showing sizes on the card answers the main question without a click. |
| **Tradeoff** | Cards are busier. In compact mode the chips shrink, and the filter needs a drawer on small screens. |
| **Code location** | `components/ProductCard.jsx` (size chips), `components/FilterSidebar.jsx` (size filter, mobile drawer), `utils/shopFilters.js` (`filterProducts`), `styles/layout.css` (`.filters` drawer) |
| **Evidence** | `/screenshots/ll-A-cards-390.png, /screenshots/ll-A-size-filter.png`. Steps: open `/shop`, see chips on cards; press XXL in Filters; only 3 products remain. |

## Decision 2: Delivery cost and the free-delivery rule are shown early (pricing and fulfilment)

| Field | Entry |
|---|---|
| **Problem** | On URG, the Rs. 99 shipping fee first appears at checkout; on Sapphire, shipping (Rs. 249) and extra lines show in the checkout summary, and no free-shipping rule was found. |
| **Decision** | One function, `calculateDeliveryFee`, drives the announcement bar, the product page, the bag and checkout. The bag summary shows the fee and how much more is needed for free delivery. |
| **Alternative** | Show the fee only at the final checkout step. |
| **Reason** | The total the customer sees in the bag is the total they pay, so there is no surprise at the end. The "add Rs. X more" line helps larger orders. |
| **Tradeoff** | More text on several screens, and all of it must stay consistent, which is why it comes from one function and two constants. |
| **Code location** | `utils/businessRules.js` (`calculateDeliveryFee`, `amountToFreeDelivery`), `components/OrderSummary.jsx`, `components/AnnouncementBar.jsx`, `pages/ProductDetails.jsx`, `pages/ShoppingBag.jsx` |
| **Evidence** | `/screenshots/ll-C-bag-fee.png, /screenshots/ll-C-bag-free.png`. Steps: add P004 size S; the bag shows Rs. 250 and "Add Rs. 2,010 more"; add more until the fee shows Free. |

## Decision 3: The card-size preference is remembered (interaction and state)

| Field | Entry |
|---|---|
| **Problem** | On URG, choosing the compact card view reset to large cards after a refresh. |
| **Decision** | The choice of "larger" or "compact" cards is saved in localStorage and checked when restored; invalid saved values fall back to the default. The shop's search and filters are also kept per URL for the tab, so Back from a product keeps them. |
| **Alternative** | Put the view in the URL (`?view=compact`). |
| **Reason** | It is a personal display preference, not part of what is being shared. localStorage keeps it across visits without cluttering links. |
| **Tradeoff** | It is per device and per browser, and saved data must be validated in case it is old or edited. |
| **Code location** | `hooks/useLocalStorageState.js`, `pages/Shop.jsx` (`viewMode`, `storageKey`), `utils/storage.js` |
| **Evidence** | `/screenshots/ll-D-compact.png, /screenshots/ll-D-after-refresh.png`. Steps: open `/shop`, choose compact cards, refresh; compact view is still selected. |
