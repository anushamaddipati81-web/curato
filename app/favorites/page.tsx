'use client'

import Link from 'next/link'
import { HeartCrack } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { ProductGrid } from '@/components/product-grid'
import { buttonVariants } from '@/components/ui/button'
import { useWorkspace } from '@/lib/workspace-context'
import { getProductById } from '@/lib/data'

export default function FavoritesPage() {
  const { favorites } = useWorkspace()
  const products = favorites.map((id) => getProductById(id)).filter(Boolean) as NonNullable<
    ReturnType<typeof getProductById>
  >[]

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 lg:px-8 lg:py-12">
      <PageHeader
        eyebrow="Favorites"
        title="Everything you've saved"
        description="Your hand-picked products, all in one place. Add them to collections or jot down research notes."
      />

      {products.length > 0 ? (
        <div className="mt-8">
          <ProductGrid products={products} />
        </div>
      ) : (
        <div className="mt-12 flex flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-card/60 px-6 py-20 text-center">
          <span className="flex size-14 items-center justify-center rounded-2xl bg-accent text-primary">
            <HeartCrack className="size-6" strokeWidth={1.5} />
          </span>
          <h2 className="mt-4 font-serif text-2xl font-semibold text-foreground">
            No favorites yet
          </h2>
          <p className="mt-2 max-w-sm text-pretty text-muted-foreground">
            Tap the heart on any product to save it here for later.
          </p>
          <Link href="/fashion" className={buttonVariants({ size: 'lg', className: 'mt-6' })}>
            Start exploring
          </Link>
        </div>
      )}
    </div>
  )
}
