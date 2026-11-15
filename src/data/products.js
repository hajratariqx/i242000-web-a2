// Local product data for Loom & Lane (fictional brand, fictional products).
// Rule 2 (eligibility): a product only offers the sizes listed as keys in `stock`.
// Rule 1 (availability): `stock[size]` is how many units of that size exist.
// Images: leave `images` empty to show a labelled placeholder. To use your own photos,
// put files in public/images/products/ and list paths like "/images/products/P001-1.jpg".
// See ASSET_GUIDE.md.

export const SIZE_ORDER = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

export const COLLECTIONS = [
  { id: 'eastern-wear', label: "Women's eastern wear", blurb: 'Lawn, cambric and chiffon, cut for everyday.' },
  { id: 'mens-essentials', label: "Men's essentials", blurb: 'Kurtas and shirts in quiet, wearable tones.' },
  { id: 'everyday-casuals', label: 'Everyday casuals', blurb: 'Co-ords and basics for university and work.' },
  { id: 'festive-edit', label: 'Festive edit', blurb: 'Embroidered pieces for weddings and dawats.' },
]

export const CATEGORIES = ['Suit', 'Kurta', 'Shirt', 'Co-ord set', 'Abaya', 'Waistcoat', 'Tee', 'Shalwar kameez']
export const STYLES = ['eastern', 'western', 'casual']
export const CITIES = ['Islamabad', 'Rawalpindi', 'Lahore', 'Karachi', 'Peshawar', 'Faisalabad', 'Multan']

export const products = [
  {
    id: 'P001', name: 'Ivory Embroidered Lawn 2-Piece', gender: 'women', style: 'eastern', category: 'Suit',
    collection: 'festive-edit', price: 7490, originalPrice: 8990, fabric: 'Premium lawn', color: 'Ivory',
    description: 'A two-piece lawn suit with tonal thread embroidery along the neckline and cuffs, paired with a straight trouser. Light enough for a long wedding afternoon.',
    stock: { XS: 2, S: 5, M: 6, L: 4, XL: 2 }, tags: ['embroidered', 'wedding', 'summer'],
    isNewArrival: true, isFeatured: true, images: ['/images/products/P11.JPG', '/images/products/P12.webp', '/images/products/P13.webp'],
  },
  {
    id: 'P002', name: 'Sage Printed Lawn Suit', gender: 'women', style: 'eastern', category: 'Suit',
    collection: 'eastern-wear', price: 4290, originalPrice: null, fabric: 'Printed lawn', color: 'Sage green',
    description: 'A soft sage block print on breathable lawn with a matching dupatta. Easy to wear from a lecture hall to a family lunch.',
    stock: { S: 6, M: 8, L: 5, XL: 3 }, tags: ['printed', 'dupatta', 'university'],
    isNewArrival: false, isFeatured: true, images: ['/images/products/P21.webp', '/images/products/P22.webp', '/images/products/P23.webp'],
  },
  {
    id: 'P003', name: 'Sand Linen Co-Ord Set', gender: 'women', style: 'casual', category: 'Co-ord set',
    collection: 'everyday-casuals', price: 5990, originalPrice: null, fabric: 'Linen blend', color: 'Sand',
    description: 'A relaxed linen-blend shirt and wide-leg trouser in a warm sand shade. Wear them together or split them across your wardrobe.',
    stock: { XS: 3, S: 4, M: 5, L: 2 }, tags: ['co-ord', 'linen', 'office'],
    isNewArrival: true, isFeatured: true, images: ['/images/products/P31.webp', '/images/products/P32.webp', '/images/products/P33.webp'],
  },
  {
    id: 'P004', name: 'Dusty Rose Cotton Kurta', gender: 'women', style: 'eastern', category: 'Kurta',
    collection: 'eastern-wear', price: 2990, originalPrice: null, fabric: 'Cotton', color: 'Dusty rose',
    description: 'A straight-cut cotton kurta with side slits and a simple round neck. Pairs with jeans, a trouser or a shalwar.',
    stock: { XS: 7, S: 9, M: 10, L: 8, XL: 5 }, tags: ['kurta', 'everyday', 'cotton'],
    isNewArrival: false, isFeatured: false, images: ['/images/products/P41.webp', '/images/products/P42.webp', '/images/products/P43.webp'],
  },
  {
    id: 'P005', name: 'Midnight Blue Chiffon Shirt', gender: 'women', style: 'eastern', category: 'Shirt',
    collection: 'festive-edit', price: 5490, originalPrice: 6490, fabric: 'Chiffon', color: 'Midnight blue',
    description: 'A fluid chiffon shirt with a lined body and delicate cuff detailing. Styled with a straight trouser for evening events.',
    stock: { S: 4, M: 3, L: 5, XL: 2 }, tags: ['chiffon', 'evening', 'festive'],
    isNewArrival: false, isFeatured: true, images: ['/images/products/P51.webp', '/images/products/P52.webp', '/images/products/P53.webp'],
  },
  {
    id: 'P006', name: 'Beige Everyday Pret Set', gender: 'women', style: 'casual', category: 'Co-ord set',
    collection: 'everyday-casuals', price: 4999, originalPrice: null, fabric: 'Cotton jersey', color: 'Beige',
    description: 'A stitched two-piece in soft beige with a boxy shirt and tapered trouser. Size M is currently sold out.',
    stock: { XS: 2, S: 3, M: 0, L: 4 }, tags: ['pret', 'two-piece', 'everyday'],
    isNewArrival: false, isFeatured: false, images: ['/images/products/P61.webp', '/images/products/P62.webp', '/images/products/P63.webp'],
  },
  {
    id: 'P007', name: 'Floral Printed Cambric Shirt', gender: 'women', style: 'eastern', category: 'Shirt',
    collection: 'eastern-wear', price: 2490, originalPrice: 3290, fabric: 'Cambric', color: 'Multi floral',
    description: 'A mid-length cambric shirt with a small botanical print. Mid-weight fabric that suits the cooler months.',
    stock: { S: 8, M: 10, L: 6, XL: 4 }, tags: ['floral', 'cambric', 'sale'],
    isNewArrival: false, isFeatured: false, images: ['/images/products/P71.webp', '/images/products/P72.webp', '/images/products/P73.webp'],
  },
  {
    id: 'P008', name: 'Black Minimalist Abaya', gender: 'women', style: 'eastern', category: 'Abaya',
    collection: 'eastern-wear', price: 6490, originalPrice: null, fabric: 'Crepe', color: 'Black',
    description: 'A clean open-front abaya in matte crepe with concealed snaps and wide sleeves. Offered in S, M and L only.',
    stock: { S: 3, M: 4, L: 2 }, tags: ['abaya', 'modest', 'minimal'],
    isNewArrival: false, isFeatured: false, images: ['/images/products/P81.webp', '/images/products/P82.webp', '/images/products/P83.webp'],
  },
  {
    id: 'P009', name: 'Classic White Cotton Kurta', gender: 'men', style: 'eastern', category: 'Kurta',
    collection: 'mens-essentials', price: 3490, originalPrice: null, fabric: 'Cotton', color: 'White',
    description: 'A crisp white kurta with a band collar and a three-button placket. The Friday and Eid staple, in a breathable weave.',
    stock: { S: 6, M: 9, L: 8, XL: 6, XXL: 3 }, tags: ['white', 'classic', 'eid'],
    isNewArrival: false, isFeatured: true, images: ['/images/products/P91.jpg', '/images/products/P92.jpg', '/images/products/P93.jpg'],
  },
  {
    id: 'P010', name: 'Charcoal Textured Kurta', gender: 'men', style: 'eastern', category: 'Kurta',
    collection: 'mens-essentials', price: 4490, originalPrice: null, fabric: 'Textured cotton', color: 'Charcoal',
    description: 'A charcoal kurta with a subtle woven texture and a modern straight hem. Offered from M upwards.',
    stock: { M: 5, L: 6, XL: 4, XXL: 2 }, tags: ['textured', 'winter', 'charcoal'],
    isNewArrival: false, isFeatured: false, images: ['/images/products/P101.jpg', '/images/products/P102.jpg', '/images/products/P103.jpg'],
  },
  {
    id: 'P011', name: 'Olive Casual Shalwar Kameez', gender: 'men', style: 'casual', category: 'Shalwar kameez',
    collection: 'mens-essentials', price: 4990, originalPrice: null, fabric: 'Wash and wear', color: 'Olive',
    description: 'A relaxed olive shalwar kameez in an easy-care fabric. Currently sold out in every size.',
    stock: { S: 0, M: 0, L: 0, XL: 0 }, tags: ['shalwar kameez', 'olive', 'easy care'],
    isNewArrival: false, isFeatured: false, images: ['/images/products/P111.jpg', '/images/products/P112.jpg', '/images/products/P113.jpg'],
  },
  {
    id: 'P012', name: 'Navy Blue Linen Shirt', gender: 'men', style: 'western', category: 'Shirt',
    collection: 'mens-essentials', price: 3990, originalPrice: null, fabric: 'Linen', color: 'Navy',
    description: 'A navy linen shirt with a soft collar and a curved hem. Wear it tucked in at the office or loose on the weekend.',
    stock: { S: 5, M: 6, L: 7, XL: 3 }, tags: ['linen', 'shirt', 'office'],
    isNewArrival: true, isFeatured: false, images: ['/images/products/P121.jpg', '/images/products/P122.jpg', '/images/products/P123.jpg'],
  },
  {
    id: 'P013', name: 'Sandstone Everyday Kurta', gender: 'men', style: 'eastern', category: 'Kurta',
    collection: 'mens-essentials', price: 3290, originalPrice: 3990, fabric: 'Cotton blend', color: 'Sandstone',
    description: 'A sandstone kurta in a soft cotton blend with a relaxed fit. Made to be worn on repeat.',
    stock: { S: 4, M: 6, L: 5, XL: 4, XXL: 2 }, tags: ['everyday', 'sale', 'cotton blend'],
    isNewArrival: false, isFeatured: false, images: ['/images/products/P131.jpg', '/images/products/P132.jpg', '/images/products/P133.jpg'],
  },
  {
    id: 'P014', name: 'Minimal Cotton Co-Ord Set', gender: 'men', style: 'casual', category: 'Co-ord set',
    collection: 'everyday-casuals', price: 5490, originalPrice: null, fabric: 'Cotton twill', color: 'Stone grey',
    description: 'A matching overshirt and trouser in stone-grey cotton twill. Only three pieces left in size M.',
    stock: { M: 3, L: 5, XL: 2 }, tags: ['co-ord', 'twill', 'minimal'],
    isNewArrival: false, isFeatured: true, images: ['/images/products/P141.jpg', '/images/products/P142.jpg', '/images/products/P143.jpg'],
  },
  {
    id: 'P015', name: 'Festive Embroidered Waistcoat', gender: 'men', style: 'eastern', category: 'Waistcoat',
    collection: 'festive-edit', price: 7990, originalPrice: null, fabric: 'Jacquard', color: 'Deep green',
    description: 'A fitted jacquard waistcoat with tonal embroidery and a satin lining. Layer it over a white kurta for shaadi season.',
    stock: { M: 2, L: 3, XL: 1 }, tags: ['waistcoat', 'wedding', 'festive'],
    isNewArrival: false, isFeatured: true, images: ['/images/products/P151.jpg', '/images/products/P152.jpg', '/images/products/P153.jpg'],
  },
  {
    id: 'P016', name: 'Relaxed Cotton Tee', gender: 'women', style: 'casual', category: 'Tee',
    collection: 'everyday-casuals', price: 1890, originalPrice: null, fabric: 'Combed cotton', color: 'Off white',
    description: 'A heavyweight combed-cotton tee with a relaxed shoulder and a clean neckline. A simple layer for any season.',
    stock: { XS: 10, S: 12, M: 12, L: 9, XL: 6 }, tags: ['tee', 'basics', 'cotton'],
    isNewArrival: true, isFeatured: false, images: ['/images/products/P161.webp', '/images/products/P162.webp', '/images/products/P163.webp'],
  },
]
