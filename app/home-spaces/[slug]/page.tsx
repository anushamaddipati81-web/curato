'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams, notFound } from 'next/navigation'
import { ArrowLeft, FolderPlus, Check } from 'lucide-react'
import { ProductImage } from '@/components/product-image'
import { ProductGrid } from '@/components/product-grid'
import { Button } from '@/components/ui/button'
import { useWorkspace } from '@/lib/workspace-context'
import { getSpaceBySlug, getProductById } from '@/lib/data'

export default function SpaceDetailPage() {
  const params = useParams<{ slug: string }>()
  const space = getSpaceBySlug(params.slug)
  const { createCollection } = useWorkspace()
  const [saved, setSaved] = useState(false)

  if (!space) notFound()

  const products = space.productIds.map((id) => getProductById(id)!).filter(Boolean)

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 lg:px-8 lg:py-12">
      <Link
        href="/home-spaces"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" /> All Home Spaces
      </Link>

      <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
        <div className="relative">
          <ProductImage
            category={space.name}
            tone={space.tone}
            className="aspect-16/6 w-full"
            iconClassName="size-20"
          />
        </div>
        <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-end sm:justify-between lg:p-8">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-widest text-primary">
              Curated collection
            </p>
            <h1 className="mt-1 font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {space.name}
            </h1>
            <p className="mt-1 text-base text-muted-foreground">{space.tagline}</p>
            <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
              {space.description}
            </p>
          </div>
          <Button
            className="shrink-0"
            variant={saved ? 'secondary' : 'default'}
            onClick={() => {
              if (!saved) {
                createCollection(space.name, space.description)
                setSaved(true)
              }
            }}
          >
            {saved ? <Check className="size-4" /> : <FolderPlus className="size-4" />}
            {saved ? 'Saved' : 'Save Collection'}
          </Button>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="mb-5 font-serif text-2xl font-semibold text-foreground">
          In this collection
        </h2>
        <ProductGrid products={products} />
      </div>
    </div>
  )
}
