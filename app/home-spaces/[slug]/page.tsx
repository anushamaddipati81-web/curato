import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { ProductGrid } from '@/components/product-grid'
import { Button } from '@/components/ui/button'
import { HOME_SPACES, PRODUCTS } from '@/lib/data'

export function generateStaticParams() {
  return HOME_SPACES.map((space) => ({ slug: space.slug }))
}

export default async function SpaceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const space = HOME_SPACES.find((s) => s.slug === slug)

  if (!space) notFound()

  const products = PRODUCTS.filter((p) => space.categories.includes(p.category))

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 lg:px-8 lg:py-12">
      <Link href="/home-spaces">
        <Button variant="ghost" size="sm" className="mb-4">
          <ArrowLeft className="size-4" /> Back to Spaces
        </Button>
      </Link>

      <div className="relative mb-8 overflow-hidden rounded-3xl">
        <img
          src={space.image}
          alt={space.name}
          className="h-64 w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6">
          <h1 className="font-serif text-3xl font-semibold text-white">{space.name}</h1>
          <p className="mt-1 text-sm text-white/80">{space.description}</p>
        </div>
      </div>

      <ProductGrid products={products} />
    </div>
  )
}
