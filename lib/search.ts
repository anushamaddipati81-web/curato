import { PRODUCTS, type Product } from '@/lib/data'

export type SearchResult = {
  label: string
  summary: string
  products: Product[]
  suggestions: string[]
  isRealData: boolean
}

// Maps natural-language keywords to categories/spaces in the catalog (fallback).
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

const SUGGESTION_MAP: Record<string, string[]> = {
  kurti: ['Palazzo', 'Dupatta', 'Earrings', 'Sandals', 'Handbag'],
  kurta: ['Palazzo', 'Dupatta', 'Earrings', 'Sandals', 'Handbag'],
  mug: ['Tea Pot', 'Tray', 'Candle', 'Plant', 'Coasters'],
  'coffee mug': ['Tea Pot', 'Tray', 'Candle', 'Plant', 'Coasters'],
  chair: ['Cushion', 'Throw', 'Side Table', 'Floor Lamp', 'Rug'],
  'balcony chair': ['Cushion', 'Throw', 'Planter', 'Floor Lamp', 'Rug'],
  desk: ['Task Chair', 'Desk Lamp', 'Organizer', 'Notebook', 'Plant'],
  'study desk': ['Task Chair', 'Desk Lamp', 'Organizer', 'Notebook', 'Plant'],
  cushion: ['Cushion Cover', 'Throw Blanket', 'Rug', 'Curtains', 'Vase'],
  'cushion cover': ['Throw Blanket', 'Rug', 'Curtains', 'Vase', 'Candle'],
  dress: ['Heels', 'Handbag', 'Earrings', 'Watch', 'Sunglasses'],
  lamp: ['Bulb', 'Candle', 'Vase', 'Photo Frame', 'Book'],
  planter: ['Plant', 'Soil', 'Watering Can', 'Garden Tool', 'Plant Stand'],
  rug: ['Cushion', 'Throw', 'Coffee Table', 'Floor Lamp', 'Vase'],
  saree: ['Blouse', 'Peticoat', 'Jewellery', 'Sandals', 'Handbag'],
  watch: ['Strap', 'Watch Box', 'Sunglasses', 'Wallet', 'Belt'],
  bag: ['Wallet', 'Keychain', 'Sunglasses', 'Scarf', 'Gloves'],
  coffee: ['Coffee Mug', 'Coffee Beans', 'French Press', 'Coasters', 'Tray'],
  tea: ['Tea Cup', 'Tea Pot', 'Coasters', 'Tray', 'Biscuits'],
  sofa: ['Cushion', 'Throw', 'Rug', 'Coffee Table', 'Floor Lamp'],
  bed: ['Bedsheet', 'Pillow', 'Blanket', 'Bedside Lamp', 'Curtains'],
  dining: ['Dinner Plate', 'Glass', 'Coasters', 'Table Mat', 'Cutlery'],
  kitchen: ['Cookware', 'Knife', 'Cutting Board', 'Storage Jar', 'Apron'],
  bathroom: ['Towel', 'Shower Curtain', 'Bath Mat', 'Soap Dispenser', 'Mirror'],
}

function parseBudget(query: string): number | null {
  const match = query.replace(/,/g, '').match(/(?:under|below|within)\s*(?:₹|rs\.?|inr)?\s*(\d{2,6})/i)
  if (match) return Number(match[1])
  const bare = query.replace(/,/g, '').match(/(?:₹|rs\.?|inr)\s*(\d{2,6})/i)
  if (bare) return Number(bare[1])
  return null
}

function getSuggestions(query: string): string[] {
  const q = query.toLowerCase()
  for (const [key, suggestions] of Object.entries(SUGGESTION_MAP)) {
    if (q.includes(key)) return suggestions
  }
  return []
}

function localSearch(query: string): { label: string; products: Product[] } {
  const q = query.toLowerCase().trim()
  let matched: Product[] = []
  let label = query.trim()

  for (const entry of KEYWORD_MAP) {
    if (entry.keywords.some((k) => q.includes(k))) {
      matched.push(...PRODUCTS.filter((p) => entry.categories.includes(p.category)))
      label = entry.label
      break
    }
  }

  if (matched.length === 0) {
    matched = PRODUCTS.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q),
    )
  }

  if (matched.length === 0) {
    matched = PRODUCTS.slice(0, 8)
  }

  const seen = new Set<string>()
  const products = matched.filter((p) => (seen.has(p.id) ? false : (seen.add(p.id), true)))
  return { label, products }
}

export async function searchCatalog(query: string): Promise<SearchResult> {
  const budget = parseBudget(query)
  const suggestions = getSuggestions(query)

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase env not configured')
    }

    const apiUrl = `${supabaseUrl}/functions/v1/product-search?q=${encodeURIComponent(query)}`
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) throw new Error(`Search failed (${response.status})`)

    const data = await response.json()

    if (data.error || !data.products || data.products.length === 0) {
      throw new Error(data.error || 'No products found')
    }

    let products: Product[] = data.products

    if (budget) {
      const within = products.filter((p) => p.price <= budget)
      if (within.length > 0) products = within
    }

    const summary = budget
      ? `${products.length} real products under \u20B9${budget.toLocaleString('en-IN')}`
      : `${products.length} real products from across the web`

    return {
      label: query.trim(),
      summary,
      products,
      suggestions: data.suggestions || suggestions,
      isRealData: true,
    }
  } catch {
    // Fall back to local catalog search
    const { label, products: localProducts } = localSearch(query)
    let products = localProducts

    if (budget) {
      const within = products.filter((p) => p.price <= budget)
      if (within.length > 0) products = within
    }

    const summary = budget
      ? `${products.length} curated picks under \u20B9${budget.toLocaleString('en-IN')}`
      : `${products.length} curated picks for you`

    return {
      label,
      summary,
      products,
      suggestions,
      isRealData: false,
    }
  }
}
