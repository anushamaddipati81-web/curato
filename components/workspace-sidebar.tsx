'use client'

import Link from 'next/link'
import { FolderHeart, Heart, NotebookPen, Clock, ChevronRight } from 'lucide-react'
import { useWorkspace } from '@/lib/workspace-context'
import { getProductById } from '@/lib/data'

export function WorkspaceSidebar() {
  const { savedCollections, favorites, notes, recentSearches } = useWorkspace()

  return (
    <aside className="hidden w-80 shrink-0 border-l border-border bg-sidebar/60 xl:block">
      <div className="sticky top-0 flex h-dvh flex-col gap-6 overflow-y-auto px-5 py-6">
        <div>
          <h2 className="font-serif text-xl font-semibold text-foreground">Workspace</h2>
          <p className="text-xs text-muted-foreground">Your curation at a glance</p>
        </div>

        <Section
          icon={<FolderHeart className="size-4 text-primary" />}
          title="Saved Collections"
          href="/collections"
          count={savedCollections.length}
        >
          {savedCollections.slice(0, 3).map((c) => (
            <Row key={c.id} label={c.name} meta={`${c.productIds.length} items`} tone={c.cover} />
          ))}
        </Section>

        <Section
          icon={<Heart className="size-4 text-primary" />}
          title="Favorites"
          href="/favorites"
          count={favorites.length}
        >
          {favorites.slice(0, 3).map((id) => {
            const p = getProductById(id)
            if (!p) return null
            return <Row key={id} label={p.title} meta={p.brand} tone={p.tone} />
          })}
        </Section>

        <Section
          icon={<NotebookPen className="size-4 text-primary" />}
          title="Research Notes"
          href="/notes"
          count={notes.length}
        >
          {notes.slice(0, 3).map((n) => (
            <Row key={n.id} label={n.title} meta={n.tag} />
          ))}
        </Section>

        <div>
          <div className="mb-2 flex items-center gap-2">
            <Clock className="size-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Recent Searches</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {recentSearches.slice(0, 5).map((s) => (
              <span
                key={s}
                className="rounded-full bg-card px-3 py-1 text-xs text-muted-foreground shadow-sm"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </aside>
  )
}

function Section({
  icon,
  title,
  href,
  count,
  children,
}: {
  icon: React.ReactNode
  title: string
  href: string
  count: number
  children: React.ReactNode
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon}
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
          <span className="rounded-full bg-secondary px-1.5 text-xs text-muted-foreground">
            {count}
          </span>
        </div>
        <Link
          href={href}
          className="flex items-center text-xs text-muted-foreground hover:text-foreground"
        >
          View <ChevronRight className="size-3.5" />
        </Link>
      </div>
      <div className="space-y-1.5">{children}</div>
    </div>
  )
}

function Row({ label, meta, tone }: { label: string; meta: string; tone?: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-card px-3 py-2 shadow-sm">
      <span
        className="size-8 shrink-0 rounded-lg"
        style={{ backgroundColor: tone ?? 'oklch(0.93 0.024 80)' }}
      />
      <div className="min-w-0">
        <p className="truncate text-xs font-medium text-foreground">{label}</p>
        <p className="truncate text-[11px] text-muted-foreground">{meta}</p>
      </div>
    </div>
  )
}
