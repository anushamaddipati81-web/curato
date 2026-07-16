'use client'

import { useState } from 'react'
import { Search, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const SUGGESTED_SEARCHES = [
  'White Kurti',
  'Coffee Mug',
  'Balcony Chair',
  'Study Desk',
  'Cushion Cover',
]

export function HeroSearch({ onSearch }: { onSearch: (query: string) => void }) {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!query.trim()) return
    setLoading(true)
    onSearch(query.trim())
    setTimeout(() => setLoading(false), 500)
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-2 shadow-sm transition-shadow focus-within:shadow-md">
          <div className="flex flex-1 items-center gap-3 pl-3">
            {loading ? (
              <Loader2 className="size-5 animate-spin text-primary" />
            ) : (
              <Search className="size-5 text-muted-foreground" />
            )}
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for a product, space, or look..."
              className="flex-1 bg-transparent py-2 text-base text-foreground placeholder:text-muted-foreground focus:outline-none"
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className={cn(
              'rounded-xl bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-opacity',
              (loading || !query.trim()) && 'opacity-50',
            )}
          >
            Search
          </button>
        </div>
      </form>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="text-xs font-medium text-muted-foreground">Try:</span>
        {SUGGESTED_SEARCHES.map((s) => (
          <button
            key={s}
            onClick={() => {
              setQuery(s)
              onSearch(s)
            }}
            className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-primary/50 hover:bg-accent"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  )
}
