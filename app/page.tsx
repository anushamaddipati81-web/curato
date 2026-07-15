'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Sparkles, FolderPlus, X, Shirt } from 'lucide-react'
import { HeroSearch } from '@/components/hero-search'
import { SectionHeading } from '@/components/section-heading'
import { ProductGrid } from '@/components/product-grid'
import { SpaceCard } from '@/components/space-card'
import { CollectionCard } from '@/components/collection-card'
import { Button } from '@/components/ui/button'
import { useWorkspace } from '@/lib/workspace-context'
import { searchCatalog } from '@/lib/search'
import {
  FASHION_CATEGORIES,
  HOME_SPACES,
  PRODUCTS,
  type Product,
} from '@/lib/data'

type Results = { label: string; summary: string; products: Product[] } | null

export default function DashboardPage() {
  const { addSearch, createCollection, savedCollections } = useWorkspace()
  const [results, setResults] = useState<Results>(null)
  const [saved, setSaved] = useState(false)

  function handleSearch(query: string) {
    addSearch(query)
    setResults(searchCatalog(query))
    setSaved(false)
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

      {results ? (
        <section className="mt-12 animate-fade-up">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-secondary/60 p-5">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-primary">
                Curated for you
              </p>
              <h2 className="mt-1 font-serif text-2xl font-semibold text-foreground">
                {results.label}
              </h2>
              <p className="text-sm text-muted-foreground">{results.summary}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={saved ? 'secondary' : 'default'}
                onClick={() => {
                  if (!saved) {
                    createCollection(results.label, `Curated from your search: "${results.label}"`)
                    setSaved(true)
                  }
                }}
              >
                <FolderPlus className="size-4" />
                {saved ? 'Saved to Collections' : 'Save as Collection'}
              </Button>
              <Button variant="outline" size="icon" aria-label="Clear results" onClick={() => setResults(null)}>
                <X className="size-4" />
              </Button>
            </div>
          </div>
          <ProductGrid products={results.products} />
        </section>
      ) : (
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
      )}
    </div>
  )
}
