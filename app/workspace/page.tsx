'use client'

import Link from 'next/link'
import {
  FolderHeart,
  Heart,
  NotebookPen,
  Clock,
  ChevronRight,
  Sparkles,
} from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { useWorkspace } from '@/lib/workspace-context'
import { getProductById } from '@/lib/data'

export default function WorkspacePage() {
  const { savedCollections, favorites, notes, recentSearches } = useWorkspace()

  const stats = [
    { label: 'Collections', value: savedCollections.length, icon: FolderHeart },
    { label: 'Favorites', value: favorites.length, icon: Heart },
    { label: 'Notes', value: notes.length, icon: NotebookPen },
    { label: 'Searches', value: recentSearches.length, icon: Clock },
  ]

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Workspace"
        title="Your curation studio"
        description="A single place to track everything you are researching, saving, and shaping into collections."
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-border bg-card p-4 shadow-sm"
          >
            <s.icon className="size-5 text-primary" />
            <p className="mt-3 font-serif text-2xl font-semibold text-foreground">
              {s.value}
            </p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Saved Collections" href="/collections" icon={FolderHeart}>
          {savedCollections.slice(0, 5).map((c) => (
            <Row
              key={c.id}
              label={c.name}
              meta={`${c.productIds.length} items`}
              tone={c.cover}
            />
          ))}
        </Panel>

        <Panel title="Favorites" href="/favorites" icon={Heart}>
          {favorites.slice(0, 5).map((id) => {
            const p = getProductById(id)
            if (!p) return null
            return <Row key={id} label={p.title} meta={p.brand} tone={p.tone} />
          })}
        </Panel>

        <Panel title="Research Notes" href="/notes" icon={NotebookPen}>
          {notes.slice(0, 5).map((n) => (
            <Row key={n.id} label={n.title} meta={n.tag} />
          ))}
        </Panel>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="mb-3 flex items-center gap-2">
            <Clock className="size-4 text-primary" />
            <h3 className="font-serif text-lg font-semibold text-foreground">
              Recent Searches
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((s) => (
              <Link
                key={s}
                href={`/?q=${encodeURIComponent(s)}`}
                className="flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-xs text-secondary-foreground transition-colors hover:bg-primary/10"
              >
                <Sparkles className="size-3 text-primary" />
                {s}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function Panel({
  title,
  href,
  icon: Icon,
  children,
}: {
  title: string
  href: string
  icon: React.ElementType
  children: React.ReactNode
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className="size-4 text-primary" />
          <h3 className="font-serif text-lg font-semibold text-foreground">{title}</h3>
        </div>
        <Link
          href={href}
          className="flex items-center text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          View all <ChevronRight className="size-3.5" />
        </Link>
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  )
}

function Row({ label, meta, tone }: { label: string; meta: string; tone?: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-secondary/50 px-3 py-2">
      <span
        className="size-9 shrink-0 rounded-lg"
        style={{ backgroundColor: tone ?? 'oklch(0.93 0.024 80)' }}
      />
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-foreground">{label}</p>
        <p className="truncate text-xs text-muted-foreground">{meta}</p>
      </div>
    </div>
  )
}
