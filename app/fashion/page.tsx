'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense, useMemo } from 'react'
import { Shirt } from 'lucide-react'
import { ProductGrid } from '@/components/product-grid'
import { SectionHeading } from '@/components/section-heading'
import { FASHION_CATEGORIES, PRODUCTS } from '@/lib/data'

function FashionContent() {
  const searchParams = useSearchParams()
  const activeCategory = searchParams.get('category')

  const products = useMemo(() => {
    if (activeCategory) {
      return PRODUCTS.filter((p) => p.domain === 'fashion' && p.category === activeCategory)
    }
    return PRODUCTS.filter((p) => p.domain === 'fashion')
  }, [activeCategory])

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 lg:px-8 lg:py-12">
      <SectionHeading
        title="Fashion"
        subtitle="Curated clothing and accessories for every occasion"
      />

      <div className="mb-8 flex flex-wrap gap-2.5">
        <a
          href="/fashion"
          className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
            !activeCategory
              ? 'border-primary bg-primary text-primary-foreground'
              : 'border-border bg-card text-foreground hover:bg-accent'
          }`}
        >
          All
        </a>
        {FASHION_CATEGORIES.map((cat) => (
          <a
            key={cat}
            href={`/fashion?category=${encodeURIComponent(cat)}`}
            className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              activeCategory === cat
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-card text-foreground hover:bg-accent'
            }`}
          >
            <Shirt className="size-3.5" />
            {cat}
          </a>
        ))}
      </div>

      <ProductGrid products={products} />
    </div>
  )
}

export default function FashionPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-6xl px-4 py-12">Loading...</div>}>
      <FashionContent />
    </Suspense>
  )
}
