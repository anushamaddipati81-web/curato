'use client'

import { Heart, ExternalLink, Star } from 'lucide-react'
import { ProductImage } from '@/components/product-image'
import { Button } from '@/components/ui/button'
import { useWorkspace } from '@/lib/workspace-context'
import { cn, formatINR } from '@/lib/utils'
import type { Product } from '@/lib/data'

export function ProductCard({ product }: { product: Product }) {
  const { toggleFavorite, isFavorite } = useWorkspace()
  const fav = isFavorite(product.id)

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
      <div className="relative">
        <ProductImage
          category={product.category}
          tone={product.tone}
          className="aspect-4/3 w-full"
          iconClassName="size-14"
          image={product.image}
          alt={product.title}
        />
        <button
          onClick={() => toggleFavorite(product.id)}
          className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm transition-colors hover:bg-background"
          aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart className={cn('size-4', fav ? 'fill-destructive text-destructive' : 'text-foreground/60')} />
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <p className="text-xs font-medium text-muted-foreground">{product.brand}</p>
            <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-foreground">
              {product.title}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Star className="size-3.5 fill-amber-400 text-amber-400" />
          <span className="font-medium text-foreground">{product.rating}</span>
          <span>({product.reviews.toLocaleString('en-IN')})</span>
          <span className="text-border">|</span>
          <span>{product.platform}</span>
        </div>

        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-lg font-semibold text-foreground">{formatINR(product.price)}</span>
          {product.url ? (
            <Button
              variant="outline"
              size="icon-sm"
              aria-label="Open product"
              onClick={() => window.open(product.url, '_blank', 'noopener,noreferrer')}
            >
              <ExternalLink className="size-3.5" />
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  )
}
