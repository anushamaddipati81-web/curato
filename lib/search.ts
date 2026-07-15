import { PRODUCTS, type Product } from '@/lib/data'

type Intent = {
  label: string
  summary: string
  products: Product[]
}

// Maps natural-language keywords to categories/spaces in the catalog.
const KEYWORD_MAP: { keywords: string[]; categories: string[]; label: string }[] = [
  { keywords: ['coffee'], categories: ['Coffee Corner'], label: 'Coffee Corner' },
  { keywords: ['tea'], categories: ['Tea Corner'], label: 'Tea Corner' },
  { keywords: ['balcony'], categories: ['Balcony', 'Garden'], label: 'Relaxing Balcony' },
  { keywords: ['garden', 'plant'], categories: ['Garden', 'Balcony'], label: 'Garden' },
  { keywords: ['living', 'lounge'], categories: ['Living Room'], label: 'Elegant Living Room' },
  { keywords: ['bedroom', 'bed'], categories: ['Bedroom'], label: 'Minimal Bedroom' },
  { keywords: ['dining', 'dinner', 'table'], categories: ['Dining Area'], label: 'Dining Area' },
  { keywords: ['kitchen', 'cook'], categories: ['Kitchen'], label: 'Kitchen' },
  { keywords: ['reading', 'book'], categories: ['Reading Corner'], label: 'Reading Corner' },
  { keywords: ['study', 'desk', 'work', 'productive'], categories: ['Study Desk'], label: 'Productive Study Desk' },
  { keywords: ['entrance', 'entry', 'foyer'], categories: ['Entrance'], label: 'Entrance' },
  { keywords: ['bathroom', 'bath', 'spa'], categories: ['Bathroom'], label: 'Bathroom' },
  {
    keywords: ['ethnic', 'festive', 'festival', 'traditional'],
    categories: ['Kurtis', 'Jewellery', 'Footwear'],
    label: 'Festive Look',
  },
  {
    keywords: ['office', 'formal', 'work outfit'],
    categories: ['Jackets', 'Jeans', 'Watches', 'Handbags'],
    label: 'Office Outfit',
  },
  {
    keywords: ['college', 'casual'],
    categories: ['T-Shirts', 'Jeans', 'Footwear', 'Tops'],
    label: 'College Outfit',
  },
  {
    keywords: ['travel', 'trip'],
    categories: ['Co-ord Sets', 'Sunglasses', 'Handbags', 'Footwear'],
    label: 'Travel Outfit',
  },
  { keywords: ['dress'], categories: ['Dresses'], label: 'Dresses' },
  { keywords: ['kurti', 'kurta'], categories: ['Kurtis'], label: 'Kurtis' },
]

function parseBudget(query: string): number | null {
  const match = query.replace(/,/g, '').match(/(?:under|below|within)\s*(?:₹|rs\.?|inr)?\s*(\d{2,6})/i)
  if (match) return Number(match[1])
  const bare = query.replace(/,/g, '').match(/(?:₹|rs\.?|inr)\s*(\d{2,6})/i)
  if (bare) return Number(bare[1])
  return null
}

export function searchCatalog(query: string): Intent {
  const q = query.toLowerCase().trim()
  const budget = parseBudget(q)

  let matched: Product[] = []
  let label = query.trim()

  for (const entry of KEYWORD_MAP) {
    if (entry.keywords.some((k) => q.includes(k))) {
      matched.push(...PRODUCTS.filter((p) => entry.categories.includes(p.category)))
      label = entry.label
      break
    }
  }

  // Fall back to fuzzy match on titles/brands/categories
  if (matched.length === 0) {
    matched = PRODUCTS.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q),
    )
  }

  if (matched.length === 0) {
    // Show a gentle default rather than an empty state
    matched = PRODUCTS.slice(0, 8)
  }

  if (budget) {
    const within = matched.filter((p) => p.price <= budget)
    if (within.length > 0) matched = within
  }

  // De-duplicate
  const seen = new Set<string>()
  const products = matched.filter((p) => (seen.has(p.id) ? false : (seen.add(p.id), true)))

  const summary = budget
    ? `${products.length} curated picks under \u20B9${budget.toLocaleString('en-IN')}`
    : `${products.length} curated picks for you`

  return { label, summary, products }
}
