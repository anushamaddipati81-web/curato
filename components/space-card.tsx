import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { HomeSpace } from '@/lib/data'

export function SpaceCard({ space }: { space: HomeSpace }) {
  return (
    <Link
      href={`/home-spaces/${space.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-4/3 overflow-hidden">
        <img
          src={space.image}
          alt={space.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 p-4">
          <h3 className="font-serif text-lg font-semibold text-white">{space.name}</h3>
        </div>
      </div>
      <div className="flex items-center justify-between p-4">
        <p className="line-clamp-1 text-sm text-muted-foreground">{space.description}</p>
        <ArrowRight className="size-4 shrink-0 text-primary" />
      </div>
    </Link>
  )
}
