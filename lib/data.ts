export type Product = {
  id: string
  title: string
  brand: string
  price: number
  rating: number
  reviews: number
  platform: string
  category: string
  domain: 'fashion' | 'home'
  tone: string
}

export type HomeSpace = {
  slug: string
  name: string
  tagline: string
  description: string
  tone: string
  productIds: string[]
}

export type Collection = {
  id: string
  name: string
  description: string
  domain: 'fashion' | 'home' | 'mixed'
  cover: string
  productIds: string[]
}

export type Note = {
  id: string
  title: string
  body: string
  tag: string
  date: string
}

export const NAV_ITEMS = [
  { label: 'Dashboard', href: '/', icon: 'layout-dashboard' },
  { label: 'Fashion', href: '/fashion', icon: 'shirt' },
  { label: 'Home Spaces', href: '/home-spaces', icon: 'sofa' },
  { label: 'Collections', href: '/collections', icon: 'folder-heart' },
  { label: 'Favorites', href: '/favorites', icon: 'heart' },
  { label: 'Notes', href: '/notes', icon: 'notebook-pen' },
  { label: 'Workspace', href: '/workspace', icon: 'panels-top-left' },
  { label: 'Settings', href: '/settings', icon: 'settings' },
] as const

export const FASHION_CATEGORIES = [
  'Kurtis',
  'Dresses',
  'Co-ord Sets',
  'Tops',
  'T-Shirts',
  'Jeans',
  'Palazzos',
  'Shrugs',
  'Jackets',
  'Handbags',
  'Footwear',
  'Jewellery',
  'Hair Accessories',
  "Children's Accessories",
  'Watches',
  'Sunglasses',
]

export const HOME_SPACE_NAMES = [
  'Living Room',
  'Bedroom',
  'Dining Area',
  'Kitchen',
  'Coffee Corner',
  'Tea Corner',
  'Reading Corner',
  'Study Desk',
  'Balcony',
  'Garden',
  'Entrance',
  'Bathroom',
]

export const EXAMPLE_SEARCHES = [
  'Cozy Coffee Corner',
  'Relaxing Balcony',
  'Elegant Living Room',
  'Minimal Bedroom',
  'Beautiful Dining Table',
  'Productive Study Desk',
  'Reading Corner',
  'Tea Corner',
  'Office Outfit',
  'College Outfit',
  'Festive Look',
  'Travel Outfit',
]

export const RECENT_SEARCHES = [
  'Complete ethnic outfit under ₹1500',
  'Cozy balcony',
  'Modern coffee corner',
  'Minimal bedroom',
  'Elegant living room',
]

export const PLATFORMS = ['Myntra', 'Amazon', 'Ajio', 'Nykaa', 'Pepperfry', 'Urban Ladder', 'Flipkart']

const TONES = [
  'oklch(0.93 0.03 80)',
  'oklch(0.9 0.04 60)',
  'oklch(0.91 0.03 130)',
  'oklch(0.9 0.035 40)',
  'oklch(0.92 0.025 100)',
  'oklch(0.89 0.04 20)',
  'oklch(0.91 0.03 200)',
]

let counter = 0
function makeProduct(
  title: string,
  brand: string,
  price: number,
  rating: number,
  reviews: number,
  category: string,
  domain: 'fashion' | 'home',
): Product {
  counter += 1
  return {
    id: `p${counter}`,
    title,
    brand,
    price,
    rating,
    reviews,
    platform: PLATFORMS[counter % PLATFORMS.length],
    category,
    domain,
    tone: TONES[counter % TONES.length],
  }
}

export const PRODUCTS: Product[] = [
  // Fashion
  makeProduct('Chikankari Cotton Kurti', 'Libas', 1299, 4.5, 2148, 'Kurtis', 'fashion'),
  makeProduct('Block Print A-line Kurti', 'W for Woman', 1099, 4.3, 1320, 'Kurtis', 'fashion'),
  makeProduct('Floral Midi Wrap Dress', 'Vero Moda', 1899, 4.6, 980, 'Dresses', 'fashion'),
  makeProduct('Linen Slip Dress', 'AND', 2499, 4.4, 512, 'Dresses', 'fashion'),
  makeProduct('Printed Co-ord Set', 'Sassafras', 1699, 4.2, 764, 'Co-ord Sets', 'fashion'),
  makeProduct('Linen Shirt & Trouser Set', 'FabIndia', 3299, 4.7, 341, 'Co-ord Sets', 'fashion'),
  makeProduct('Ruffled Peplum Top', 'ONLY', 899, 4.1, 1560, 'Tops', 'fashion'),
  makeProduct('Cotton Boxy T-Shirt', 'H&M', 599, 4.3, 3402, 'T-Shirts', 'fashion'),
  makeProduct('High-Rise Straight Jeans', 'Levi\u2019s', 2799, 4.6, 5210, 'Jeans', 'fashion'),
  makeProduct('Flared Palazzo Pants', 'Global Desi', 1199, 4.2, 890, 'Palazzos', 'fashion'),
  makeProduct('Sheer Longline Shrug', 'Chemistry', 999, 4.0, 430, 'Shrugs', 'fashion'),
  makeProduct('Oversized Denim Jacket', 'Roadster', 1999, 4.4, 2100, 'Jackets', 'fashion'),
  makeProduct('Quilted Tote Handbag', 'Lavie', 2299, 4.5, 1180, 'Handbags', 'fashion'),
  makeProduct('Braided Flat Sandals', 'Bata', 1299, 4.2, 760, 'Footwear', 'fashion'),
  makeProduct('Kundan Jhumka Earrings', 'Zaveri Pearls', 799, 4.6, 3120, 'Jewellery', 'fashion'),
  makeProduct('Satin Claw Hair Clips', 'Blueberry', 349, 4.3, 640, 'Hair Accessories', 'fashion'),
  makeProduct('Kids Floral Headband Set', 'Hopscotch', 449, 4.4, 210, "Children's Accessories", 'fashion'),
  makeProduct('Minimal Analog Watch', 'Fossil', 6995, 4.7, 890, 'Watches', 'fashion'),
  makeProduct('Oversized Cat-Eye Sunglasses', 'Vincent Chase', 1299, 4.3, 1540, 'Sunglasses', 'fashion'),
  makeProduct('Embroidered Anarkali Kurti', 'Biba', 1799, 4.5, 990, 'Kurtis', 'fashion'),
  makeProduct('Bodycon Knit Dress', 'Zara', 2990, 4.4, 430, 'Dresses', 'fashion'),
  makeProduct('Structured Blazer', 'Mango', 4499, 4.6, 260, 'Jackets', 'fashion'),

  // Home
  makeProduct('Boucle Accent Armchair', 'Urban Ladder', 14999, 4.6, 320, 'Living Room', 'home'),
  makeProduct('Arched Floor Lamp', 'Pepperfry', 4599, 4.4, 180, 'Living Room', 'home'),
  makeProduct('Handwoven Jute Rug', 'Jaipur Rugs', 5999, 4.7, 210, 'Living Room', 'home'),
  makeProduct('Linen Duvet Cover Set', 'Nestasia', 3499, 4.5, 410, 'Bedroom', 'home'),
  makeProduct('Rattan Bedside Table', 'The Decor Kart', 3999, 4.3, 96, 'Bedroom', 'home'),
  makeProduct('Ceramic Dinner Plate Set', 'Ellementry', 2799, 4.6, 540, 'Dining Area', 'home'),
  makeProduct('Mango Wood Dining Bench', 'Wooden Street', 8999, 4.5, 130, 'Dining Area', 'home'),
  makeProduct('Matte Cookware Trio', 'Wonderchef', 3299, 4.4, 780, 'Kitchen', 'home'),
  makeProduct('Stoneware Coffee Mug Set', 'Chumbak', 999, 4.5, 1240, 'Coffee Corner', 'home'),
  makeProduct('Pour-Over Coffee Dripper', 'InstaCuppa', 1299, 4.3, 560, 'Coffee Corner', 'home'),
  makeProduct('Cast Iron Tea Kettle', 'Ellementry', 2499, 4.6, 320, 'Tea Corner', 'home'),
  makeProduct('Ceramic Tea Cup & Saucer', 'Nestasia', 899, 4.5, 480, 'Tea Corner', 'home'),
  makeProduct('Cane Reading Chair', 'Urban Ladder', 11999, 4.5, 140, 'Reading Corner', 'home'),
  makeProduct('Warm LED Reading Lamp', 'Philips', 1899, 4.4, 920, 'Reading Corner', 'home'),
  makeProduct('Minimal Oak Study Desk', 'Wakefit', 7499, 4.5, 610, 'Study Desk', 'home'),
  makeProduct('Ergonomic Task Chair', 'Green Soul', 8999, 4.6, 2100, 'Study Desk', 'home'),
  makeProduct('Foldable Balcony Bistro Set', 'Pepperfry', 6499, 4.3, 220, 'Balcony', 'home'),
  makeProduct('Hanging Macrame Planter', 'Fabuliv', 699, 4.4, 340, 'Balcony', 'home'),
  makeProduct('Terracotta Garden Planter Trio', 'Ugaoo', 1199, 4.5, 500, 'Garden', 'home'),
  makeProduct('Solar Pathway Lights', 'Amazon Basics', 1499, 4.2, 1300, 'Garden', 'home'),
  makeProduct('Console Entryway Table', 'Wooden Street', 9499, 4.5, 88, 'Entrance', 'home'),
  makeProduct('Woven Storage Basket Set', 'Nestasia', 1799, 4.4, 260, 'Entrance', 'home'),
  makeProduct('Bamboo Bath Caddy', 'House of Quirk', 1099, 4.3, 470, 'Bathroom', 'home'),
  makeProduct('Waffle Weave Towel Set', 'Spaces', 1599, 4.6, 810, 'Bathroom', 'home'),
]

function idsFor(category: string, extra: string[] = []) {
  return [...PRODUCTS.filter((p) => p.category === category).map((p) => p.id), ...extra]
}

export const HOME_SPACES: HomeSpace[] = [
  {
    slug: 'living-room',
    name: 'Living Room',
    tagline: 'Warm, inviting, effortlessly elegant',
    description:
      'A curated living room collection balancing soft textures, natural materials, and quiet luxury for a calm, welcoming space.',
    tone: 'oklch(0.92 0.03 80)',
    productIds: idsFor('Living Room'),
  },
  {
    slug: 'bedroom',
    name: 'Bedroom',
    tagline: 'Restful, minimal, softly layered',
    description: 'Everything for a serene, hotel-like bedroom with breathable linens and natural wood accents.',
    tone: 'oklch(0.91 0.03 60)',
    productIds: idsFor('Bedroom'),
  },
  {
    slug: 'dining-area',
    name: 'Dining Area',
    tagline: 'Gather, dine, and slow down',
    description: 'A dining collection made for long meals and good company, from artisan ceramics to solid wood seating.',
    tone: 'oklch(0.91 0.035 40)',
    productIds: idsFor('Dining Area'),
  },
  {
    slug: 'kitchen',
    name: 'Kitchen',
    tagline: 'Functional beauty for everyday cooking',
    description: 'Thoughtful kitchen essentials that look as good as they perform.',
    tone: 'oklch(0.92 0.03 120)',
    productIds: idsFor('Kitchen'),
  },
  {
    slug: 'coffee-corner',
    name: 'Coffee Corner',
    tagline: 'Your own little café at home',
    description: 'Create a cozy coffee ritual with warm mugs, a pour-over setup, and soft styling touches.',
    tone: 'oklch(0.89 0.04 50)',
    productIds: idsFor('Coffee Corner'),
  },
  {
    slug: 'tea-corner',
    name: 'Tea Corner',
    tagline: 'A calm ritual, beautifully set',
    description: 'A serene tea nook with cast iron kettles, delicate cups, and gentle warmth.',
    tone: 'oklch(0.92 0.03 100)',
    productIds: idsFor('Tea Corner'),
  },
  {
    slug: 'reading-corner',
    name: 'Reading Corner',
    tagline: 'Curl up with your next chapter',
    description: 'A quiet reading nook built around a comfortable chair and warm, focused light.',
    tone: 'oklch(0.9 0.035 70)',
    productIds: idsFor('Reading Corner'),
  },
  {
    slug: 'study-desk',
    name: 'Study Desk',
    tagline: 'Focused, tidy, and inspiring',
    description: 'A productive workspace with clean-lined furniture and ergonomic comfort.',
    tone: 'oklch(0.91 0.03 200)',
    productIds: idsFor('Study Desk'),
  },
  {
    slug: 'balcony',
    name: 'Balcony',
    tagline: 'A tiny outdoor escape',
    description: 'Turn any balcony into a relaxing retreat with compact seating and lush greenery.',
    tone: 'oklch(0.91 0.035 135)',
    productIds: idsFor('Balcony'),
  },
  {
    slug: 'garden',
    name: 'Garden',
    tagline: 'Grow something beautiful',
    description: 'Planters, lighting, and details to bring your garden to life.',
    tone: 'oklch(0.9 0.04 140)',
    productIds: idsFor('Garden'),
  },
  {
    slug: 'entrance',
    name: 'Entrance',
    tagline: 'A warm first impression',
    description: 'Style your entryway with a console, storage, and welcoming accents.',
    tone: 'oklch(0.91 0.03 30)',
    productIds: idsFor('Entrance'),
  },
  {
    slug: 'bathroom',
    name: 'Bathroom',
    tagline: 'Spa-like calm, every day',
    description: 'Soft towels and natural materials for a restorative bathroom retreat.',
    tone: 'oklch(0.92 0.025 210)',
    productIds: idsFor('Bathroom'),
  },
]

export const COLLECTIONS: Collection[] = [
  {
    id: 'c1',
    name: 'Minimal Living Room',
    description: 'Neutral tones and clean silhouettes for a calm living space.',
    domain: 'home',
    cover: 'oklch(0.92 0.03 80)',
    productIds: idsFor('Living Room'),
  },
  {
    id: 'c2',
    name: 'Balcony Inspiration',
    description: 'Compact seating and greenery for a relaxing outdoor nook.',
    domain: 'home',
    cover: 'oklch(0.91 0.035 135)',
    productIds: idsFor('Balcony'),
  },
  {
    id: 'c3',
    name: 'Office Outfit Ideas',
    description: 'Polished, comfortable pieces for the workweek.',
    domain: 'fashion',
    cover: 'oklch(0.9 0.03 60)',
    productIds: ['p22', 'p8', 'p9', 'p18'],
  },
  {
    id: 'c4',
    name: 'Coffee Corner',
    description: 'Everything for a cozy at-home coffee ritual.',
    domain: 'home',
    cover: 'oklch(0.89 0.04 50)',
    productIds: idsFor('Coffee Corner'),
  },
  {
    id: 'c5',
    name: 'Tea Corner',
    description: 'A serene tea nook, softly styled.',
    domain: 'home',
    cover: 'oklch(0.92 0.03 100)',
    productIds: idsFor('Tea Corner'),
  },
  {
    id: 'c6',
    name: 'Housewarming Gifts',
    description: 'Thoughtful, giftable pieces for a new home.',
    domain: 'mixed',
    cover: 'oklch(0.91 0.03 40)',
    productIds: ['p9c', 'p32', 'p37', 'p44'].filter((id) => PRODUCTS.some((p) => p.id === id)),
  },
]

export const NOTES: Note[] = [
  {
    id: 'n1',
    title: 'Living room palette',
    body: 'Stick to warm neutrals — oat, sand, soft clay. Add one boucle texture and a jute rug for warmth.',
    tag: 'Home Spaces',
    date: 'Jun 12',
  },
  {
    id: 'n2',
    title: 'Festive look budget',
    body: 'Anarkali kurti + kundan jhumkas keeps the whole look under ₹2600. Compare Biba vs Libas for fit.',
    tag: 'Fashion',
    date: 'Jun 10',
  },
  {
    id: 'n3',
    title: 'Coffee corner shelf',
    body: 'Need a small floating shelf for mugs. Pour-over + stoneware mugs already saved. Add a mini plant.',
    tag: 'Collections',
    date: 'Jun 8',
  },
  {
    id: 'n4',
    title: 'Study desk setup',
    body: 'Oak desk + green soul chair. Measure wall width before ordering — max 120cm.',
    tag: 'Home Spaces',
    date: 'Jun 5',
  },
]

export function getProductById(id: string) {
  return PRODUCTS.find((p) => p.id === id)
}

export function getSpaceBySlug(slug: string) {
  return HOME_SPACES.find((s) => s.slug === slug)
}

export function formatPrice(price: number) {
  return `\u20B9${price.toLocaleString('en-IN')}`
}
