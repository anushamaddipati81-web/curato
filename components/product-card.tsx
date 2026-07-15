'use client'

import { useState } from 'react'
import { Heart, StickyNote, ExternalLink, Check } from 'lucide-react'
import { type Product, formatPrice } from '@/lib/data'
import { useWorkspace } from '@/lib/workspace-context'
import { ProductImage } from '@/components/product-image'
import { StarRating } from '@/components/star-rating'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

export function ProductCard({ product }: { product: Product }) {
  const { isFavorite, toggleFavorite, productNotes, setProductNote } = useWorkspace()
  const [notesOpen, setNotesOpen] = useState(false)
  const [draft, setDraft] = useState(productNotes[product.id] ?? '')
  const saved = isFavorite(product.id)
  const hasNote = Boolean(productNotes[product.id])

  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <div className="relative">
        <ProductImage
          category={product.category}
          tone={product.tone}
          className="aspect-4/3 w-full"
          iconClassName="size-14"
        />
        <button
          type="button"
          onClick={() => toggleFavorite(product.id)}
          aria-label={saved ? 'Remove from favorites' : 'Save to favorites'}
          aria-pressed={saved}
          className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-card/90 text-foreground shadow-sm backdrop-blur transition-transform hover:scale-105"
        >
          <Heart className={cn('size-4', saved && 'fill-primary text-primary')} strokeWidth={1.75} />
        </button>
        <span className="absolute left-3 top-3 rounded-full bg-card/85 px-2.5 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
          {product.platform}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {product.brand}
        </p>
        <h3 className="text-pretty text-sm font-semibold leading-snug text-foreground">
          {product.title}
        </h3>

        <div className="mt-1 flex items-center justify-between">
          <span className="font-serif text-lg font-semibold text-foreground">
            {formatPrice(product.price)}
          </span>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <StarRating rating={product.rating} />
            <span>({product.reviews.toLocaleString('en-IN')})</span>
          </div>
        </div>

        {notesOpen && (
          <div className="mt-1 animate-fade-up">
            <Textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Add a research note about this product..."
              className="min-h-20 text-xs"
            />
            <div className="mt-2 flex justify-end gap-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  setDraft(productNotes[product.id] ?? '')
                  setNotesOpen(false)
                }}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  setProductNote(product.id, draft)
                  setNotesOpen(false)
                }}
              >
                <Check className="size-3.5" /> Save note
              </Button>
            </div>
          </div>
        )}

        <div className="mt-auto flex items-center gap-2 pt-3">
          <Button
            variant={saved ? 'secondary' : 'outline'}
            size="sm"
            className="flex-1"
            onClick={() => toggleFavorite(product.id)}
          >
            <Heart className={cn('size-3.5', saved && 'fill-primary text-primary')} />
            {saved ? 'Saved' : 'Save'}
          </Button>
          <Button
            variant={hasNote ? 'secondary' : 'outline'}
            size="icon-sm"
            aria-label="Add notes"
            onClick={() => setNotesOpen((v) => !v)}
          >
            <StickyNote className="size-3.5" />
          </Button>
          <Button variant="outline" size="icon-sm" aria-label="Open product">
            <ExternalLink className="size-3.5" />
          </Button>
        </div>
      </div>
    </article>
  )
}
