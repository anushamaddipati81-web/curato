'use client'

import { Suspense, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { PageHeader } from '@/components/page-header'
import { ProductGrid } from '@/components/product-grid'
import { FASHION_CATEGORIES, PRODUCTS } from '@/lib/data'
import { cn } from '@/lib/utils'

function FashionContent() {
  const searchParams = useSearchParams()
  const initial = searchParams.get('category') ?? 'All'
  const [selected, setSelected] = useState(initial)

  const filters = ['All', ...FASHION_CATEGORIES]
  const products = useMemo(
    () =>
      selected === 'All'
        ? PRODUCTS.filter((p) => p.domain === 'fashion')
        : PRODUCTS.filter((p) => p.category === selected),
    [selected],
  )

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 lg:px-8 lg:py-12">
      <PageHeader
        eyebrow="Fashion"
        title="Discover pieces worth curating"
        description="Browse curated fashion categories for every mood and occasion. Save your favorites and add research notes as you compare."
      />

      <div className="mt-8 flex flex-wrap gap-2">
        {filters.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelected(cat)}
            className={cn(
              'rounded-full border px-4 py-2 text-sm font-medium transition-colors',
              selected === cat
                ? 'border-primary bg-primary/15 text-foreground'
                : 'border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground',
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        {products.length} {products.length === 1 ? 'product' : 'products'}
        {selected !== 'All' && ` in ${selected}`}
      </p>

      <div className="mt-5">
        <ProductGrid products={products} />
      </div>
    </div>
  )
}

export default function FashionPage() {
  return (
    <Suspense>
      <FashionContent />
    </Suspense>
  )
}
