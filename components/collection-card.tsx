import Link from 'next/link'
import { FolderOpen, ArrowRight } from 'lucide-react'
import { useWorkspace, type Collection } from '@/lib/workspace-context'
import { PRODUCTS } from '@/lib/data'
import { ProductImage } from '@/components/product-image'

export function CollectionCard({ collection }: { collection: Collection }) {
  const previewProducts = collection.productIds
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter(Boolean)
    .slice(0, 3)

  return (
    <Link
      href={`/collections#${collection.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="flex items-center gap-3 border-b border-border p-4">
        <div className="flex size-10 items-center justify-center rounded-xl bg-secondary">
          <FolderOpen className="size-5 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="font-serif text-lg font-semibold text-foreground">{collection.name}</h3>
          <p className="line-clamp-1 text-xs text-muted-foreground">{collection.description}</p>
        </div>
        <ArrowRight className="size-4 text-primary" />
      </div>
      <div className="flex gap-2 p-4">
        {previewProducts.length > 0 ? (
          previewProducts.map((p) => (
            <ProductImage
              key={p!.id}
              category={p!.category}
              tone={p!.tone}
              className="size-16 rounded-lg"
              iconClassName="size-6"
              image={p!.image}
              alt={p!.title}
            />
          ))
        ) : (
          <div className="flex h-16 items-center text-xs text-muted-foreground">No products yet</div>
        )}
      </div>
    </Link>
  )
}
