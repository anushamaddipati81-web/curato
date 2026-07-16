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
  image?: string
  url?: string
}

export const FASHION_CATEGORIES = [
  'Kurtis',
  'Dresses',
  'Tops',
  'T-Shirts',
  'Jeans',
  'Palazzos',
  'Shrugs',
  'Jackets',
  'Handbags',
  'Footwear',
  'Jewellery',
  'Watches',
  'Sunglasses',
]

export type HomeSpace = {
  slug: string
  name: string
  description: string
  image: string
  categories: string[]
}

export const HOME_SPACES: HomeSpace[] = [
  { slug: 'living-room', name: 'Living Room', description: 'Sofas, lamps, and accents for a cozy lounge', image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800', categories: ['Living Room'] },
  { slug: 'bedroom', name: 'Bedroom', description: 'Bedsheets, lamps, and organizers for restful nights', image: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800', categories: ['Bedroom'] },
  { slug: 'dining-area', name: 'Dining Area', description: 'Dinnerware and table decor for every meal', image: 'https://images.pexels.com/photos/1580595/pexels-photo-1580595.jpeg?auto=compress&cs=tinysrgb&w=800', categories: ['Dining Area'] },
  { slug: 'kitchen', name: 'Kitchen', description: 'Cookware and storage for a functional kitchen', image: 'https://images.pexels.com/photos/263041/pexels-photo-263041.jpeg?auto=compress&cs=tinysrgb&w=800', categories: ['Kitchen'] },
  { slug: 'coffee-corner', name: 'Coffee Corner', description: 'Mugs, kettles, and accessories for coffee lovers', image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800', categories: ['Coffee Corner'] },
  { slug: 'tea-corner', name: 'Tea Corner', description: 'Tea pots, cups, and cozies for tea enthusiasts', image: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=800', categories: ['Tea Corner'] },
  { slug: 'reading-corner', name: 'Reading Corner', description: 'Comfortable chairs and lamps for reading nooks', image: 'https://images.pexels.com/photos/1666071/pexels-photo-1666071.jpeg?auto=compress&cs=tinysrgb&w=800', categories: ['Reading Corner'] },
  { slug: 'study-desk', name: 'Study Desk', description: 'Desks, chairs, and organizers for productivity', image: 'https://images.pexels.com/photos/6669865/pexels-photo-6669865.jpeg?auto=compress&cs=tinysrgb&w=800', categories: ['Study Desk'] },
  { slug: 'balcony', name: 'Balcony', description: 'Outdoor chairs and planters for a cozy balcony', image: 'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=800', categories: ['Balcony'] },
  { slug: 'garden', name: 'Garden', description: 'Planters, tools, and decor for your garden', image: 'https://images.pexels.com/photos/1089168/pexels-photo-1089168.jpeg?auto=compress&cs=tinysrgb&w=800', categories: ['Garden'] },
  { slug: 'entrance', name: 'Entrance', description: 'Console tables and decor for a welcoming entry', image: 'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=800', categories: ['Entrance'] },
  { slug: 'bathroom', name: 'Bathroom', description: 'Towels, mats, and organizers for a spa-like bath', image: 'https://images.pexels.com/photos/6621337/pexels-photo-6621337.jpeg?auto=compress&cs=tinysrgb&w=800', categories: ['Bathroom'] },
]

const TONES = [
  'oklch(0.93 0.03 80)',
  'oklch(0.9 0.04 60)',
  'oklch(0.91 0.03 130)',
  'oklch(0.9 0.035 40)',
  'oklch(0.92 0.025 100)',
  'oklch(0.89 0.04 20)',
  'oklch(0.91 0.03 200)',
  'oklch(0.89 0.04 50)',
]

function toneForCategory(category: string): string {
  let hash = 0
  for (let i = 0; i < category.length; i++) hash = ((hash << 5) - hash + category.charCodeAt(i)) | 0
  return TONES[Math.abs(hash) % TONES.length]
}

const FASHION_PRODUCTS: Omit<Product, 'tone'>[] = [
  { id: 'f1', title: 'Floral Printed Cotton Kurti', brand: 'Libas', price: 899, rating: 4.3, reviews: 2451, platform: 'Myntra', category: 'Kurtis', domain: 'fashion' },
  { id: 'f2', title: 'Embroidered Anarkali Kurta', brand: 'Biba', price: 1499, rating: 4.5, reviews: 890, platform: 'Amazon', category: 'Kurtis', domain: 'fashion' },
  { id: 'f3', title: 'White Cotton Straight Kurta', brand: 'FabIndia', price: 1189, rating: 4.6, reviews: 340, platform: 'FabIndia', category: 'Kurtis', domain: 'fashion' },
  { id: 'f4', title: 'Wrap Midi Dress', brand: 'Vero Moda', price: 1299, rating: 4.2, reviews: 1520, platform: 'Myntra', category: 'Dresses', domain: 'fashion' },
  { id: 'f5', title: 'Floral Summer Dress', brand: 'AND', price: 2499, rating: 4.4, reviews: 670, platform: 'Myntra', category: 'Dresses', domain: 'fashion' },
  { id: 'f6', title: 'Peplum Top', brand: 'Sassafras', price: 699, rating: 4.1, reviews: 430, platform: 'Flipkart', category: 'Tops', domain: 'fashion' },
  { id: 'f7', title: 'Oversized Cotton T-Shirt', brand: 'H&M', price: 799, rating: 4.3, reviews: 3200, platform: 'Myntra', category: 'T-Shirts', domain: 'fashion' },
  { id: 'f8', title: 'High-Waist Skinny Jeans', brand: "Levi's", price: 2999, rating: 4.5, reviews: 1800, platform: 'Amazon', category: 'Jeans', domain: 'fashion' },
  { id: 'f9', title: 'Solid Ethnic Palazzos', brand: 'Libas', price: 899, rating: 4.3, reviews: 1520, platform: 'Myntra', category: 'Palazzos', domain: 'fashion' },
  { id: 'f10', title: 'Crochet Shrug', brand: 'Roadster', price: 599, rating: 4.0, reviews: 890, platform: 'Myntra', category: 'Shrugs', domain: 'fashion' },
  { id: 'f11', title: 'Quilted Tote Handbag', brand: 'Lavie', price: 2299, rating: 4.5, reviews: 1180, platform: 'Myntra', category: 'Handbags', domain: 'fashion' },
  { id: 'f12', title: 'Braided Flat Sandals', brand: 'Bata', price: 1299, rating: 4.2, reviews: 760, platform: 'Amazon', category: 'Footwear', domain: 'fashion' },
  { id: 'f13', title: 'Kundan Jhumka Earrings', brand: 'Zaveri Pearls', price: 799, rating: 4.6, reviews: 3120, platform: 'Amazon', category: 'Jewellery', domain: 'fashion' },
  { id: 'f14', title: 'Classic Analog Watch', brand: 'Fossil', price: 4995, rating: 4.7, reviews: 2100, platform: 'Amazon', category: 'Watches', domain: 'fashion' },
  { id: 'f15', title: 'Aviator Sunglasses', brand: 'Mango', price: 1499, rating: 4.3, reviews: 540, platform: 'Myntra', category: 'Sunglasses', domain: 'fashion' },
]

const HOME_PRODUCTS: Omit<Product, 'tone'>[] = [
  { id: 'h1', title: '3-Seater Fabric Sofa', brand: 'Urban Ladder', price: 24999, rating: 4.4, reviews: 180, platform: 'Urban Ladder', category: 'Living Room', domain: 'home' },
  { id: 'h2', title: 'Arched Floor Lamp', brand: 'Pepperfry', price: 4599, rating: 4.3, reviews: 92, platform: 'Pepperfry', category: 'Living Room', domain: 'home' },
  { id: 'h3', title: 'Cotton Bedsheet Set', brand: 'Spaces', price: 1299, rating: 4.4, reviews: 3400, platform: 'Amazon', category: 'Bedroom', domain: 'home' },
  { id: 'h4', title: 'Bedside Table Lamp', brand: 'Philips', price: 1899, rating: 4.2, reviews: 560, platform: 'Amazon', category: 'Bedroom', domain: 'home' },
  { id: 'h5', title: 'Ceramic Dinner Plate Set of 6', brand: 'Nestasia', price: 1499, rating: 4.5, reviews: 1240, platform: 'Nestasia', category: 'Dining Area', domain: 'home' },
  { id: 'h6', title: 'Non-Stick Cookware Set', brand: 'Wonderchef', price: 3999, rating: 4.4, reviews: 890, platform: 'Amazon', category: 'Kitchen', domain: 'home' },
  { id: 'h7', title: 'Ceramic Coffee Mug Set', brand: 'Nestasia', price: 999, rating: 4.6, reviews: 2100, platform: 'Amazon', category: 'Coffee Corner', domain: 'home' },
  { id: 'h8', title: 'Glass Teapot with Infuser', brand: 'Nestasia', price: 1290, rating: 4.5, reviews: 240, platform: 'Nestasia', category: 'Tea Corner', domain: 'home' },
  { id: 'h9', title: 'Reading Chair with Cushion', brand: 'Urban Ladder', price: 8999, rating: 4.3, reviews: 140, platform: 'Urban Ladder', category: 'Reading Corner', domain: 'home' },
  { id: 'h10', title: 'Solid Wood Study Table', brand: 'Pepperfry', price: 7499, rating: 4.5, reviews: 610, platform: 'Pepperfry', category: 'Study Desk', domain: 'home' },
  { id: 'h11', title: 'Balcony Chair Set of 2', brand: 'Urban Ladder', price: 5999, rating: 4.4, reviews: 180, platform: 'Urban Ladder', category: 'Balcony', domain: 'home' },
  { id: 'h12', title: 'Terracotta Planter Set', brand: 'Ugaoo', price: 1199, rating: 4.5, reviews: 500, platform: 'Amazon', category: 'Garden', domain: 'home' },
  { id: 'h13', title: 'Wooden Console Table', brand: 'Pepperfry', price: 6999, rating: 4.3, reviews: 210, platform: 'Pepperfry', category: 'Entrance', domain: 'home' },
  { id: 'h14', title: 'Cotton Bath Towel Set', brand: 'Spaces', price: 999, rating: 4.4, reviews: 2800, platform: 'Amazon', category: 'Bathroom', domain: 'home' },
  { id: 'h15', title: 'Scented Candle Set of 3', brand: 'Nestasia', price: 899, rating: 4.5, reviews: 670, platform: 'Amazon', category: 'Coffee Corner', domain: 'home' },
]

export const PRODUCTS: Product[] = [...FASHION_PRODUCTS, ...HOME_PRODUCTS].map((p) => ({
  ...p,
  tone: toneForCategory(p.category),
}))
