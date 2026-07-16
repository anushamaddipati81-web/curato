/*
# Create product_search_cache table

1. New Tables
- `product_search_cache`
  - `id` (uuid, primary key)
  - `query` (text, the normalized search query, indexed)
  - `products` (jsonb, array of product objects)
  - `suggestions` (jsonb, array of suggestion query strings)
  - `created_at` (timestamptz, default now())
  - `expires_at` (timestamptz, cached result expiry, default 24h)
2. Security
- Enable RLS on `product_search_cache`.
- Allow anon + authenticated full CRUD (single-tenant, no-auth app; data is intentionally shared/public).
*/

CREATE TABLE IF NOT EXISTS product_search_cache (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  query text NOT NULL,
  products jsonb NOT NULL DEFAULT '[]'::jsonb,
  suggestions jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  expires_at timestamptz DEFAULT now() + interval '24 hours'
);

CREATE INDEX IF NOT EXISTS idx_product_search_cache_query ON product_search_cache (query);

ALTER TABLE product_search_cache ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_product_search_cache" ON product_search_cache;
CREATE POLICY "anon_select_product_search_cache"
ON product_search_cache FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_product_search_cache" ON product_search_cache;
CREATE POLICY "anon_insert_product_search_cache"
ON product_search_cache FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_product_search_cache" ON product_search_cache;
CREATE POLICY "anon_update_product_search_cache"
ON product_search_cache FOR UPDATE
TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_product_search_cache" ON product_search_cache;
CREATE POLICY "anon_delete_product_search_cache"
ON product_search_cache FOR DELETE
TO anon, authenticated USING (true);
