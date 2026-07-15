import { PageHeader } from '@/components/page-header'
import { SpaceCard } from '@/components/space-card'
import { HOME_SPACES } from '@/lib/data'

export default function HomeSpacesPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 lg:px-8 lg:py-12">
      <PageHeader
        eyebrow="Home Spaces"
        title="Curated collections for every corner"
        description="Each space opens a complete, thoughtfully curated collection — not a random product feed. Explore, save, and make it your own."
      />
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {HOME_SPACES.map((space) => (
          <SpaceCard key={space.slug} space={space} />
        ))}
      </div>
    </div>
  )
}
