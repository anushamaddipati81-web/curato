import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface ProductResult {
  id: string;
  title: string;
  brand: string;
  price: number;
  rating: number;
  reviews: number;
  platform: string;
  category: string;
  domain: string;
  tone: string;
  image: string;
  url: string;
}

interface CachedEntry {
  products: ProductResult[];
  suggestions: string[];
}

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

const TAVILY_API_KEY = Deno.env.get("TAVILY_API_KEY") ?? "";

function normalizeQuery(query: string): string {
  return query.toLowerCase().trim().replace(/\s+/g, " ");
}

function extractPrice(text: string): number | null {
  const match = text.match(/(?:₹|rs\.?|inr)\s*([\d,]+)/i);
  if (match) return parseInt(match[1].replace(/,/g, ""), 10);
  return null;
}

function extractPlatform(url: string): string {
  try {
    const hostname = new URL(url).hostname.replace(/^www\./, "");
    if (hostname.includes("amazon")) return "Amazon";
  if (hostname.includes("flipkart")) return "Flipkart";
  if (hostname.includes("myntra")) return "Myntra";
  if (hostname.includes("ajio")) return "Ajio";
  if (hostname.includes("nykaa")) return "Nykaa";
  if (hostname.includes("pepperfry")) return "Pepperfry";
  if (hostname.includes("urbanladder")) return "Urban Ladder";
  if (hostname.includes("fabindia")) return "FabIndia";
  if (hostname.includes("nestasia")) return "Nestasia";
  if (hostname.includes("ellementry")) return "Ellementry";
  if (hostname.includes("woodenstreet")) return "Wooden Street";
  if (hostname.includes("chumbak")) return "Chumbak";
  if (hostname.includes("wakefit")) return "Wakefit";
  if (hostname.includes("jaipurrugs")) return "Jaipur Rugs";
  if (hostname.includes("ugaoo")) return "Ugaoo";
  return hostname.charAt(0).toUpperCase() + hostname.slice(1);
  } catch {
    return "Online Store";
  }
}

function extractBrand(title: string, platform: string): string {
  const knownBrands = [
    "Libas", "W", "FabIndia", "Biba", "Vero Moda", "AND", "Sassafras",
    "ONLY", "H&M", "Levi's", "Roadster", "Lavie", "Bata", "Fossil",
    "Zara", "Mango", "Milton", "Nestasia", "Ellementry", "Chumbak",
    "Philips", "Wakefit", "Green Soul", "Urban Ladder", "Pepperfry",
    "Wooden Street", "Jaipur Rugs", "Ugaoo", "InstaCuppa", "House of Quirk",
    "Spaces", "Amazon Basics", "Fabuliv", "The Decor Kart", "Wonderchef",
    "Global Desi", "Chemistry", "Zaveri Pearls", "Blueberry", "Hopscotch",
    "Vincent Chase", "anayna", "Aramya", "KALINI", "Anouk", "GULMOHAR JAIPUR",
  ];
  for (const brand of knownBrands) {
    if (title.toLowerCase().includes(brand.toLowerCase())) return brand;
  }
  const words = title.split(/\s+/);
  if (words.length >= 2 && platform !== "Amazon") return words.slice(0, 2).join(" ");
  return platform;
}

function inferDomain(query: string): "fashion" | "home" {
  const fashionKeywords = ["kurti", "kurta", "dress", "top", "shirt", "jeans", "palazzo", "shrug", "jacket", "handbag", "sandals", "earrings", "jewellery", "watch", "sunglasses", "footwear", "co-ord", "anarkali", "dupatta", "saree", "blazer", "t-shirt"];
  const q = query.toLowerCase();
  return fashionKeywords.some((k) => q.includes(k)) ? "fashion" : "home";
}

function inferCategory(query: string): string {
  const q = query.toLowerCase();
  const categoryMap: Record<string, string[]> = {
    "Kurtis": ["kurti", "kurta"],
    "Dresses": ["dress", "gown"],
    "Tops": ["top", "peplum"],
    "T-Shirts": ["t-shirt", "tshirt"],
    "Jeans": ["jeans", "denim"],
    "Palazzos": ["palazzo"],
    "Shrugs": ["shrug"],
    "Jackets": ["jacket", "blazer"],
    "Handbags": ["handbag", "bag", "tote"],
    "Footwear": ["sandals", "shoes", "footwear", "slippers", "heels"],
    "Jewellery": ["earrings", "jhumka", "necklace", "jewellery", "jewelry"],
    "Watches": ["watch"],
    "Sunglasses": ["sunglasses", "sunglass"],
    "Living Room": ["sofa", "armchair", "couch", "floor lamp", "rug", "living room"],
    "Bedroom": ["bedsheet", "duvet", "pillow", "bedside", "bedroom", "blanket", "quilt"],
    "Dining Area": ["dinner plate", "dining", "table mat", "coaster"],
    "Kitchen": ["cookware", "kitchen", "kettle", "pan", "pot"],
    "Coffee Corner": ["coffee mug", "coffee cup", "mug", "coffee"],
    "Tea Corner": ["tea cup", "tea pot", "tea kettle", "tea"],
    "Reading Corner": ["reading chair", "reading lamp", "bookshelf"],
    "Study Desk": ["study desk", "desk", "table", "task chair", "office chair"],
    "Balcony": ["balcony", "bistro", "outdoor chair", "planter"],
    "Garden": ["garden", "planter", "plant", "solar light"],
    "Entrance": ["console", "entryway", "entrance", "shoe rack"],
    "Bathroom": ["bathroom", "towel", "bath", "shower curtain"],
    "Cushion Cover": ["cushion cover", "cushion", "pillow cover"],
  };
  for (const [cat, keywords] of Object.entries(categoryMap)) {
    if (keywords.some((k) => q.includes(k))) return cat;
  }
  return "General";
}

function getTone(query: string): string {
  const tones = [
    "oklch(0.93 0.03 80)", "oklch(0.9 0.04 60)", "oklch(0.91 0.03 130)",
    "oklch(0.9 0.035 40)", "oklch(0.92 0.025 100)", "oklch(0.89 0.04 20)",
    "oklch(0.91 0.03 200)",
  ];
  let hash = 0;
  for (let i = 0; i < query.length; i++) hash = ((hash << 5) - hash + query.charCodeAt(i)) | 0;
  return tones[Math.abs(hash) % tones.length];
}

function parseProductsFromResults(results: any[], query: string): ProductResult[] {
  const domain = inferDomain(query);
  const category = inferCategory(query);
  const tone = getTone(query);
  const products: ProductResult[] = [];
  let counter = 0;

  for (const result of results) {
    if (!result.url || !result.title) continue;
    const platform = extractPlatform(result.url);
    const price = extractPrice(result.content || "") ?? extractPrice(result.title || "");
    if (!price) continue;

    const title = result.title.replace(/\s*[|–-]\s*.*$/, "").trim();
    const brand = extractBrand(title, platform);
    const ratingMatch = (result.content || "").match(/(\d\.\d)\s*[★☆]/);
    const rating = ratingMatch ? parseFloat(ratingMatch[1]) : 4.0 + (counter % 8) * 0.1;
    const reviewsMatch = (result.content || "").match(/(\d+)\s*(?:reviews?|ratings?)/i);
    const reviews = reviewsMatch ? parseInt(reviewsMatch[1], 10) : 100 + counter * 50;

    counter++;
    products.push({
      id: `search_${Date.now()}_${counter}`,
      title,
      brand,
      price,
      rating: Math.round(rating * 10) / 10,
      reviews,
      platform,
      category,
      domain,
      tone,
      image: result.image || "",
      url: result.url,
    });
  }

  return products;
}

const SUGGESTION_MAP: Record<string, string[]> = {
  kurti: ["Palazzo", "Dupatta", "Earrings", "Sandals", "Handbag"],
  kurta: ["Palazzo", "Dupatta", "Earrings", "Sandals", "Handbag"],
  mug: ["Tea Pot", "Tray", "Candle", "Plant", "Coasters"],
  "coffee mug": ["Tea Pot", "Tray", "Candle", "Plant", "Coasters"],
  chair: ["Cushion", "Throw", "Side Table", "Floor Lamp", "Rug"],
  "balcony chair": ["Cushion", "Throw", "Planter", "Floor Lamp", "Rug"],
  desk: ["Task Chair", "Desk Lamp", "Organizer", "Notebook", "Plant"],
  "study desk": ["Task Chair", "Desk Lamp", "Organizer", "Notebook", "Plant"],
  cushion: ["Cushion Cover", "Throw Blanket", "Rug", "Curtains", "Vase"],
  "cushion cover": ["Throw Blanket", "Rug", "Curtains", "Vase", "Candle"],
  dress: ["Heels", "Handbag", "Earrings", "Watch", "Sunglasses"],
  lamp: ["Bulb", "Candle", "Vase", "Photo Frame", "Book"],
  planter: ["Plant", "Soil", "Watering Can", "Garden Tool", "Plant Stand"],
  rug: ["Cushion", "Throw", "Coffee Table", "Floor Lamp", "Vase"],
  saree: ["Blouse", "Peticoat", "Jewellery", "Sandals", "Handbag"],
  watch: ["Strap", "Watch Box", "Sunglasses", "Wallet", "Belt"],
  bag: ["Wallet", "Keychain", "Sunglasses", "Scarf", "Gloves"],
  "coffee": ["Coffee Mug", "Coffee Beans", "French Press", "Coasters", "Tray"],
  "tea": ["Tea Cup", "Tea Pot", "Coasters", "Tray", "Biscuits"],
  "sofa": ["Cushion", "Throw", "Rug", "Coffee Table", "Floor Lamp"],
  "bed": ["Bedsheet", "Pillow", "Blanket", "Bedside Lamp", "Curtains"],
  "dining": ["Dinner Plate", "Glass", "Coasters", "Table Mat", "Cutlery"],
  "kitchen": ["Cookware", "Knife", "Cutting Board", "Storage Jar", "Apron"],
  "bathroom": ["Towel", "Shower Curtain", "Bath Mat", "Soap Dispenser", "Mirror"],
};

function getSuggestions(query: string): string[] {
  const q = query.toLowerCase();
  for (const [key, suggestions] of Object.entries(SUGGESTION_MAP)) {
    if (q.includes(key)) return suggestions;
  }
  return [];
}

async function tavilySearch(query: string): Promise<any[]> {
  if (!TAVILY_API_KEY) return [];

  const sites = [
    "amazon.in", "flipkart.com", "myntra.com", "ajio.com", "nykaa.com",
    "pepperfry.com", "urbanladder.com", "fabindia.com", "nestasia.com",
    "ellementry.com", "woodenstreet.com", "chumbak.com",
  ];

  const response = await fetch("https://api.tavily.com/search", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      api_key: TAVILY_API_KEY,
      query: `${query} buy online India price`,
      search_depth: "advanced",
      include_images: true,
      include_image_descriptions: true,
      max_results: 15,
      include_domains: sites,
    }),
  });

  if (!response.ok) return [];
  const data = await response.json();
  return data.results || [];
}

function matchImagesToResults(results: any[], images: string[]): any[] {
  if (!images || images.length === 0) return results;
  return results.map((result, i) => ({
    ...result,
    image: result.image || images[i % Math.min(images.length, 8)] || "",
  }));
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const queryParam = url.searchParams.get("q") ?? "";

    if (!queryParam) {
      return new Response(
        JSON.stringify({ error: "Missing query parameter 'q'" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const normalized = normalizeQuery(queryParam);

    // Check cache first
    const { data: cached } = await supabase
      .from("product_search_cache")
      .select("products, suggestions, expires_at")
      .eq("query", normalized)
      .maybeSingle();

    if (cached && new Date(cached.expires_at) > new Date()) {
      return new Response(
        JSON.stringify({
          query: queryParam,
          products: cached.products,
          suggestions: cached.suggestions,
          cached: true,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // Search Tavily for real products
    const tavilyResults = await tavilySearch(queryParam);
    let products = parseProductsFromResults(tavilyResults, queryParam);

    // If we got results with images from Tavily, match them
    if (tavilyResults.length > 0) {
      const tavilyResponse = tavilyResults as any;
      const images = (tavilyResponse as any).images || [];
      products = matchImagesToResults(products, images);
    }

    const suggestions = getSuggestions(queryParam);

    // Cache the results
    if (products.length > 0) {
      const cacheEntry = {
        query: normalized,
        products: JSON.parse(JSON.stringify(products)),
        suggestions,
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      };

      await supabase
        .from("product_search_cache")
        .upsert(cacheEntry, { onConflict: "query" });
    }

    return new Response(
      JSON.stringify({
        query: queryParam,
        products,
        suggestions,
        cached: false,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
