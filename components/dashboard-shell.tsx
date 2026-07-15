'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, Sparkles, Bell } from 'lucide-react'
import { AppSidebar } from '@/components/app-sidebar'
import { WorkspaceSidebar } from '@/components/workspace-sidebar'

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-dvh bg-background">
      <AppSidebar open={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="flex lg:pl-72">
        <div className="flex min-h-dvh min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-border bg-background/80 px-4 py-3 backdrop-blur-md lg:px-8">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="flex size-9 items-center justify-center rounded-xl border border-border text-foreground lg:hidden"
            >
              <Menu className="size-5" />
            </button>

            <Link href="/" className="flex items-center gap-2 lg:hidden">
              <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Sparkles className="size-4" strokeWidth={1.75} />
              </span>
              <span className="font-serif text-xl font-semibold text-foreground">Curato</span>
            </Link>

            <div className="hidden text-sm text-muted-foreground lg:block">
              Your personal curation workspace
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Notifications"
                className="flex size-9 items-center justify-center rounded-xl border border-border text-muted-foreground hover:text-foreground"
              >
                <Bell className="size-4.5" />
              </button>
              <span className="flex size-9 items-center justify-center rounded-full bg-accent font-serif text-sm font-semibold text-accent-foreground">
                A
              </span>
            </div>
          </header>

          <main className="flex-1">{children}</main>
        </div>

        <WorkspaceSidebar />
      </div>
    </div>
  )
}
