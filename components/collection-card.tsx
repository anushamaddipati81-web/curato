import { FolderHeart } from 'lucide-react'
import { type Collection, getProductById } from '@/lib/data'

export function CollectionCard({ collection }: { collection: Collection }) {
  const previews = collection.productIds
    .map((id) => getProductById(id))
    .filter(Boolean)
    .slice(0, 3)

  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <div className="grid grid-cols-3 gap-1 p-1.5" style={{ backgroundColor: collection.cover }}>
        {[0, 1, 2].map((i) => {
          const p = previews[i]
          return (
            <div
              key={i}
              className="aspect-square rounded-xl"
              style={{ backgroundColor: p ? p.tone : 'oklch(0.96 0.01 80 / 0.5)' }}
            />
          )
        })}
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-5">
        <div className="flex items-center gap-2">
          <FolderHeart className="size-4 text-primary" />
          <h3 className="font-serif text-lg font-semibold text-foreground">{collection.name}</h3>
        </div>
        <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
          {collection.description}
        </p>
        <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
          <span className="capitalize">{collection.domain}</span>
          <span>{collection.productIds.length} items</span>
        </div>
      </div>
    </article>
  )
}
