import {
  Armchair,
  Coffee,
  Shirt,
  Sofa,
  Watch,
  Gem,
  Footprints,
  ShoppingBag,
  Glasses,
  BookOpen,
  Lamp,
  UtensilsCrossed,
  CookingPot,
  Leaf,
  Bath,
  DoorOpen,
  Sparkles,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const ICON_MAP: Record<string, typeof Shirt> = {
  Kurtis: Shirt,
  Dresses: Shirt,
  'Co-ord Sets': Shirt,
  Tops: Shirt,
  'T-Shirts': Shirt,
  Jeans: Shirt,
  Palazzos: Shirt,
  Shrugs: Shirt,
  Jackets: Shirt,
  Handbags: ShoppingBag,
  Footwear: Footprints,
  Jewellery: Gem,
  'Hair Accessories': Sparkles,
  "Children's Accessories": Sparkles,
  Watches: Watch,
  Sunglasses: Glasses,
  'Living Room': Sofa,
  Bedroom: Lamp,
  'Dining Area': UtensilsCrossed,
  Kitchen: CookingPot,
  'Coffee Corner': Coffee,
  'Tea Corner': Coffee,
  'Reading Corner': BookOpen,
  'Study Desk': Lamp,
  Balcony: Leaf,
  Garden: Leaf,
  Entrance: DoorOpen,
  Bathroom: Bath,
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
