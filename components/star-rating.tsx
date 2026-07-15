import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

export function StarRating({
  rating,
  className,
}: {
  rating: number
  className?: string
}) {
  return (
    <span className={cn('inline-flex items-center gap-1', className)}>
      <Star className="size-3.5 fill-primary text-primary" strokeWidth={1.5} />
      <span className="font-medium text-foreground">{rating.toFixed(1)}</span>
    </span>
  )
}
