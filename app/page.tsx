'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Sparkles, FolderPlus, X, Shirt, Loader2, Lightbulb, Search } from 'lucide-react'
import { HeroSearch } from '@/components/hero-search'
import { SectionHeading } from '@/components/section-heading'
import { ProductGrid } from '@/components/product-grid'
import { SpaceCard } from '@/components/space-card'
import { CollectionCard } from '@/components/collection-card'
import { Button } from '@/components/ui/button'
import { useWorkspace } from '@/lib/workspace-context'
import { searchCatalog, type SearchResult } from '@/lib/search'
import {
  FASHION_CATEGORIES,
  HOME_SPACES,
  PRODUCTS,
  type Product,
} from '@/lib/data'

type Results = (SearchResult & { saved: boolean }) | null

export default function DashboardPage() {
  const { addSearch, createCollection, collections: savedCollections } = useWorkspace()
  const [results, setResults] = useState<Results>(null)
  const [loading, setLoading] = useState(false)
  const [suggestionResults, setSuggestionResults] = useState<Record<string, Product[]>>({})
  const [suggestionLoading, setSuggestionLoading] = useState<string | null>(null)

  async function handleSearch(query: string) {
    addSearch(query)
    setLoading(true)
    setResults(null)
    setSuggestionResults({})
    try {
      const result = await searchCatalog(query)
      setResults({ ...result, saved: false })
    } catch {
      setResults({
        label: query,
        summary: 'No results found. Try a different search.',
        products: [],
        suggestions: [],
        isRealData: false,
        saved: false,
      })
    } finally {
      setLoading(false)
    }
  }

  async function handleSuggestionSearch(suggestion: string) {
    if (suggestionResults[suggestion]) return
    setSuggestionLoading(suggestion)
    try {
      const result = await searchCatalog(suggestion)
      setSuggestionResults((prev) => ({
        ...prev,
        [suggestion]: result.products.slice(0, 3),
      }))
    } catch {
      setSuggestionResults((prev) => ({ ...prev, [suggestion]: [] }))
    } finally {
      setSuggestionLoading(null)
    }
  }

  const trending = PRODUCTS.slice(6, 12)

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 lg:px-8 lg:py-12">
      <section className="animate-fade-up">
        <p className="mb-2 flex items-center gap-2 text-sm font-medium text-primary">
          <Sparkles className="size-4" /> Welcome back, Aanya
        </p>
        <h1 className="text-balance font-serif text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          What would you like to create today?
        </h1>
        <p className="mt-3 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
          Describe a space or a look in your own words. Curato will gather beautiful products so you
          can compare, note, and curate them into collections.
        </p>

        <div className="mt-8">
          <HeroSearch onSearch={handleSearch} />
        </div>
      </section>

      {loading && (
        <div className="mt-16 flex flex-col items-center justify-center gap-3 text-muted-foreground">
          <Loader2 className="size-8 animate-spin text-primary" />
          <p className="text-sm">Searching for real products across the web...</p>
        </div>
      )}

      {!loading && results ? (
        <section className="mt-12 animate-fade-up">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-secondary/60 p-5">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-primary">
                {results.isRealData ? 'Real products found' : 'Curated for you'}
              </p>
              <h2 className="mt-1 font-serif text-2xl font-semibold text-foreground">
                {results.label}
              </h2>
              <p className="text-sm text-muted-foreground">{results.summary}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={results.saved ? 'secondary' : 'default'}
                onClick={() => {
                  if (!results.saved) {
                    createCollection(results.label, `Curated from your search: "${results.label}"`)
                    setResults({ ...results, saved: true })
                  }
                }}
              >
                <FolderPlus className="size-4" />
                {results.saved ? 'Saved to Collections' : 'Save as Collection'}
              </Button>
              <Button variant="outline" size="icon" aria-label="Clear results" onClick={() => setResults(null)}>
                <X className="size-4" />
              </Button>
            </div>
          </div>

          {results.products.length > 0 ? (
            <ProductGrid products={results.products} />
          ) : (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-card/60 px-6 py-20 text-center">
              <p className="text-pretty text-muted-foreground">
                No products found for this search. Try a more specific term.
              </p>
            </div>
          )}

          {results.suggestions.length > 0 && (
            <div className="mt-12">
              <div className="mb-5 flex items-center gap-2">
                <Lightbulb className="size-5 text-primary" />
                <h3 className="font-serif text-xl font-semibold text-foreground">
                  You might also need
                </h3>
              </div>
              <p className="mb-4 text-sm text-muted-foreground">
                Tap any suggestion to find matching products for your carousel.
              </p>
              <div className="space-y-6">
                {results.suggestions.map((suggestion) => (
                  <SuggestionBlock
                    key={suggestion}
                    label={suggestion}
                    products={suggestionResults[suggestion]}
                    onSearch={() => handleSuggestionSearch(suggestion)}
                    loading={suggestionLoading === suggestion}
                  />
                ))}
              </div>
            </div>
          )}
        </section>
      ) : !loading ? (
        <>
          <section className="mt-14">
            <SectionHeading
              title="Explore Fashion"
              subtitle="Browse curated categories for every occasion"
              href="/fashion"
            />
            <div className="flex flex-wrap gap-2.5">
              {FASHION_CATEGORIES.map((cat) => (
                <Link
                  key={cat}
                  href={`/fashion?category=${encodeURIComponent(cat)}`}
                  className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground shadow-sm transition-colors hover:border-primary/50 hover:bg-accent"
                >
                  <Shirt className="size-3.5 text-primary" />
                  {cat}
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-14">
            <SectionHeading
              title="Home Spaces"
              subtitle="Each space opens a complete curated collection"
              href="/home-spaces"
            />
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {HOME_SPACES.slice(0, 6).map((space) => (
                <SpaceCard key={space.slug} space={space} />
              ))}
            </div>
          </section>

          <section className="mt-14">
            <SectionHeading title="Trending picks" subtitle="Loved by curators this week" />
            <ProductGrid products={trending} />
          </section>

          <section className="mt-14">
            <SectionHeading
              title="Your Collections"
              subtitle="Pick up where you left off"
              href="/collections"
            />
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {savedCollections.slice(0, 3).map((collection) => (
                <CollectionCard key={collection.id} collection={collection} />
              ))}
            </div>
          </section>
        </>
      ) : null}
    </div>
  )
}

function SuggestionBlock({
  label,
  products,
  onSearch,
  loading,
}: {
  label: string
  products?: Product[]
  onSearch: () => void
  loading: boolean
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h4 className="font-serif text-lg font-semibold text-foreground">{label}</h4>
        {!products && (
          <Button variant="outline" size="sm" onClick={onSearch} disabled={loading}>
            {loading ? <Loader2 className="size-3.5 animate-spin" /> : <Search className="size-3.5" />}
            {loading ? 'Searching...' : 'Find products'}
          </Button>
        )}
      </div>
      {products && products.length > 0 && (
        <div className="mt-4">
          <ProductGrid products={products} />
        </div>
      )}
      {products && products.length === 0 && (
        <p className="mt-3 text-sm text-muted-foreground">No products found for {label}.</p>
      )}
    </div>
  )
}
