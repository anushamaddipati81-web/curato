import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { type HomeSpace } from '@/lib/data'
import { ProductImage } from '@/components/product-image'

export function SpaceCard({ space }: { space: HomeSpace }) {
  return (
    <Link
      href={`/home-spaces/${space.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
    >
      <div className="relative">
        <ProductImage
          category={space.name}
          tone={space.tone}
          className="aspect-16/10 w-full"
          iconClassName="size-16"
        />
        <span className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-card/90 text-foreground shadow-sm backdrop-blur transition-transform group-hover:scale-105">
          <ArrowUpRight className="size-4.5" />
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-5">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-lg font-semibold text-foreground">{space.name}</h3>
          <span className="text-xs text-muted-foreground">{space.productIds.length} items</span>
        </div>
        <p className="text-sm text-muted-foreground">{space.tagline}</p>
      </div>
    </Link>
  )
}
