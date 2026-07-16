import { SpaceCard } from '@/components/space-card'
import { SectionHeading } from '@/components/section-heading'
import { HOME_SPACES } from '@/lib/data'

export default function HomeSpacesPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 lg:px-8 lg:py-12">
      <SectionHeading
        title="Home Spaces"
        subtitle="Explore curated collections for every corner of your home"
      />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {HOME_SPACES.map((space) => (
          <SpaceCard key={space.slug} space={space} />
        ))}
      </div>
    </div>
  )
}
