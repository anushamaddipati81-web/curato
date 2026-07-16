'use client'

import { useWorkspace } from '@/lib/workspace-context'
import { SectionHeading } from '@/components/section-heading'
import { ProductGrid } from '@/components/product-grid'
import { PRODUCTS } from '@/lib/data'

export default function WorkspacePage() {
  const { recentSearches, collections, favorites } = useWorkspace()

  const favoriteProducts = favorites
    .map((f) => PRODUCTS.find((p) => p.id === f.id))
    .filter(Boolean) as typeof PRODUCTS

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 lg:px-8 lg:py-12">
      <SectionHeading
        title="Workspace"
        subtitle="Everything you're working on in one place"
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="text-sm text-muted-foreground">Recent Searches</p>
          <p className="mt-1 text-2xl font-semibold text-foreground">{recentSearches.length}</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="text-sm text-muted-foreground">Collections</p>
          <p className="mt-1 text-2xl font-semibold text-foreground">{collections.length}</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="text-sm text-muted-foreground">Favorites</p>
          <p className="mt-1 text-2xl font-semibold text-foreground">{favorites.length}</p>
        </div>
      </div>

      {recentSearches.length > 0 && (
        <div className="mt-8">
          <h3 className="mb-3 font-serif text-lg font-semibold text-foreground">Recent Searches</h3>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((s, i) => (
              <span key={i} className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground">
                {s}
              </span>
            ))}
          </div>
        </div>
      )}

      {favoriteProducts.length > 0 && (
        <div className="mt-8">
          <h3 className="mb-4 font-serif text-lg font-semibold text-foreground">Favorite Products</h3>
          <ProductGrid products={favoriteProducts} />
        </div>
      )}
    </div>
  )
}
