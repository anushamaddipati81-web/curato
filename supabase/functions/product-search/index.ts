import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

function normalizeQuery(query: string): string {
  return query.toLowerCase().trim().replace(/\s+/g, " ");
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
  cushion: ["Throw Blanket", "Rug", "Curtains", "Vase", "Candle"],
  "cushion cover": ["Throw Blanket", "Rug", "Curtains", "Vase", "Candle"],
  dress: ["Heels", "Handbag", "Earrings", "Watch", "Sunglasses"],
  lamp: ["Bulb", "Candle", "Vase", "Photo Frame", "Book"],
  planter: ["Plant", "Soil", "Watering Can", "Garden Tool", "Plant Stand"],
  rug: ["Cushion", "Throw", "Coffee Table", "Floor Lamp", "Vase"],
  watch: ["Strap", "Watch Box", "Sunglasses", "Wallet", "Belt"],
  bag: ["Wallet", "Keychain", "Sunglasses", "Scarf", "Gloves"],
  coffee: ["Coffee Mug", "Coffee Beans", "French Press", "Coasters", "Tray"],
  tea: ["Tea Cup", "Tea Pot", "Coasters", "Tray", "Biscuits"],
  sofa: ["Cushion", "Throw", "Rug", "Coffee Table", "Floor Lamp"],
  bed: ["Bedsheet", "Pillow", "Blanket", "Bedside Lamp", "Curtains"],
  dining: ["Dinner Plate", "Glass", "Coasters", "Table Mat", "Cutlery"],
  kitchen: ["Cookware", "Knife", "Cutting Board", "Storage Jar", "Apron"],
  bathroom: ["Towel", "Shower Curtain", "Bath Mat", "Soap Dispenser", "Mirror"],
};

function getSuggestions(query: string): string[] {
  const q = query.toLowerCase();
  for (const [key, suggestions] of Object.entries(SUGGESTION_MAP)) {
    if (q.includes(key)) return suggestions;
  }
  return [];
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

    const suggestions = getSuggestions(queryParam);

    return new Response(
      JSON.stringify({
        query: queryParam,
        products: [],
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
