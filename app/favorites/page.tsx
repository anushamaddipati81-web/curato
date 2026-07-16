'use client'

import { Heart } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { ProductGrid } from '@/components/product-grid'
import { useWorkspace } from '@/lib/workspace-context'
import { PRODUCTS } from '@/lib/data'

export default function FavoritesPage() {
  const { favorites } = useWorkspace()

  const products = favorites
    .map((f) => PRODUCTS.find((p) => p.id === f.id))
    .filter(Boolean) as typeof PRODUCTS

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 lg:px-8 lg:py-12">
      <SectionHeading
        title="Favorites"
        subtitle="Products you've saved for later"
      />

      {products.length > 0 ? (
        <ProductGrid products={products} />
      ) : (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-card/60 px-6 py-20 text-center">
          <Heart className="size-12 text-muted-foreground" />
          <p className="mt-4 text-pretty text-muted-foreground">
            No favorites yet. Tap the heart icon on any product to save it here.
          </p>
        </div>
      )}
    </div>
  )
}
