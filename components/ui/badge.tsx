import * as React from 'react'
import { cn } from '@/lib/utils'

function Badge({
  className,
  variant = 'default',
  ...props
}: React.ComponentProps<'span'> & { variant?: 'default' | 'gold' | 'outline' }) {
  return (
    <span
      data-slot="badge"
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap',
        variant === 'default' && 'bg-secondary text-secondary-foreground',
        variant === 'gold' && 'bg-gold-soft text-primary-foreground',
        variant === 'outline' && 'border border-border text-muted-foreground',
        className,
      )}
      {...props}
    />
  )
}

export { Badge }
