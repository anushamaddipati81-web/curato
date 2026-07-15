'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Shirt,
  Sofa,
  FolderHeart,
  Heart,
  NotebookPen,
  PanelsTopLeft,
  Settings,
  Sparkles,
  X,
} from 'lucide-react'
import { NAV_ITEMS } from '@/lib/data'
import { cn } from '@/lib/utils'

const ICONS = {
  'layout-dashboard': LayoutDashboard,
  shirt: Shirt,
  sofa: Sofa,
  'folder-heart': FolderHeart,
  heart: Heart,
  'notebook-pen': NotebookPen,
  'panels-top-left': PanelsTopLeft,
  settings: Settings,
} as const

export function AppSidebar({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const pathname = usePathname()

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          aria-hidden
        />
      )}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-sidebar-border bg-sidebar transition-transform duration-300 lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex items-center justify-between px-6 py-6">
          <Link href="/" className="flex items-center gap-2.5" onClick={onClose}>
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Sparkles className="size-4.5" strokeWidth={1.75} />
            </span>
            <span className="font-serif text-2xl font-semibold tracking-tight text-foreground">
              Curato
            </span>
          </Link>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-accent lg:hidden"
          >
            <X className="size-4.5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-2">
          {NAV_ITEMS.map((item) => {
            const Icon = ICONS[item.icon]
            const active =
              item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  'flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors',
                  active
                    ? 'bg-primary/15 text-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground',
                )}
              >
                <Icon
                  className={cn('size-4.5', active ? 'text-primary' : '')}
                  strokeWidth={1.75}
                />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="p-4">
          <div className="rounded-2xl border border-border bg-card p-4">
            <p className="font-serif text-base font-semibold text-foreground">
              Curate with intention
            </p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              Save products, add research notes, and build beautiful collections before you share.
            </p>
          </div>
        </div>
      </aside>
    </>
  )
}
