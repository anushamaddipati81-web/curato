/*
# Add unique constraint on product_search_cache query column

1. Changes
- Add UNIQUE constraint on the `query` column of `product_search_cache` so that `ON CONFLICT (query)` upserts work.
*/

CREATE UNIQUE INDEX IF NOT EXISTS idx_product_search_cache_query_unique
ON product_search_cache (query);
