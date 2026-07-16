'use client'

import { SectionHeading } from '@/components/section-heading'
import { useWorkspace } from '@/lib/workspace-context'

export default function SettingsPage() {
  const { recentSearches, collections, favorites } = useWorkspace()

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 lg:px-8 lg:py-12">
      <SectionHeading
        title="Settings"
        subtitle="Your Curato workspace overview"
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="text-sm text-muted-foreground">Recent Searches</p>
          <p className="mt-1 text-2xl font-semibold text-foreground">{recentSearches.length}</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="text-sm text-muted-foreground">Collections</p>
          <p className="mt-1 text-2xl font-semibold text-foreground">{collections.length}</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="text-sm text-muted-foreground">Favorites</p>
          <p className="mt-1 text-2xl font-semibold text-foreground">{favorites.length}</p>
        </div>
      </div>

      {recentSearches.length > 0 && (
        <div className="mt-8">
          <h3 className="mb-3 font-serif text-lg font-semibold text-foreground">Recent Searches</h3>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((s, i) => (
              <span key={i} className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground">
                {s}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8 rounded-2xl border border-border bg-secondary/60 p-5">
        <p className="text-sm text-muted-foreground">
          Curato is a personal tool for discovering products and creating Instagram carousels.
          No account needed — your data stays in your browser.
        </p>
      </div>
    </div>
  )
}
