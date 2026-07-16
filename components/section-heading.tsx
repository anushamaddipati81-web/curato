import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function SectionHeading({
  title,
  subtitle,
  href,
}: {
  title: string
  subtitle?: string
  href?: string
}) {
  return (
    <div className="mb-5 flex items-end justify-between">
      <div>
        <h2 className="font-serif text-2xl font-semibold tracking-tight text-foreground">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {href && (
        <Link
          href={href}
          className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          View all <ArrowRight className="size-3.5" />
        </Link>
      )}
    </div>
  )
}
