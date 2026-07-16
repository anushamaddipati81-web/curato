import {
  Armchair,
  Coffee,
  Shirt,
  Watch,
  Eye,
  ShoppingBag,
  Footprints,
  Gem,
  Lamp,
  Sprout,
  BookOpen,
  Sofa,
  Bed,
  Utensils,
  Bath,
  DoorOpen,
  Sparkles,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const ICON_MAP: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  'Kurtis': Shirt,
  'Dresses': Shirt,
  'Tops': Shirt,
  'T-Shirts': Shirt,
  'Jeans': Shirt,
  'Palazzos': Shirt,
  'Shrugs': Shirt,
  'Jackets': Shirt,
  'Handbags': ShoppingBag,
  'Footwear': Footprints,
  'Jewellery': Gem,
  'Watches': Watch,
  'Sunglasses': Eye,
  'Living Room': Sofa,
  'Bedroom': Bed,
  'Dining Area': Utensils,
  'Kitchen': Utensils,
  'Coffee Corner': Coffee,
  'Tea Corner': Coffee,
  'Reading Corner': BookOpen,
  'Study Desk': BookOpen,
  'Balcony': Armchair,
  'Garden': Sprout,
  'Entrance': DoorOpen,
  'Bathroom': Bath,
  'Cushion Cover': Sparkles,
}

export function ProductImage({
  category,
  tone,
  className,
  iconClassName,
  image,
  alt,
}: {
  category: string
  tone: string
  className?: string
  iconClassName?: string
  image?: string
  alt?: string
}) {
  const Icon = ICON_MAP[category] ?? Armchair

  if (image) {
    return (
      <div
        className={cn('relative flex items-center justify-center overflow-hidden bg-muted', className)}
      >
        <img
          src={image}
          alt={alt ?? category}
          className="h-full w-full object-cover"
          loading="lazy"
          onError={(e) => {
            const target = e.currentTarget
            target.style.display = 'none'
            const parent = target.parentElement
            if (parent) parent.style.backgroundColor = tone
          }}
        />
      </div>
    )
  }

  return (
    <div
      className={cn('relative flex items-center justify-center overflow-hidden', className)}
      style={{ backgroundColor: tone }}
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'radial-gradient(circle at 30% 25%, rgba(255,255,255,0.55), transparent 55%)',
        }}
      />
      <Icon className={cn('relative text-foreground/35', iconClassName)} strokeWidth={1.25} />
    </div>
  )
}
