'use client'

import { SectionHeading } from '@/components/section-heading'
import { useWorkspace } from '@/lib/workspace-context'

export default function NotesPage() {
  const { notes, favorites } = useWorkspace()

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 lg:px-8 lg:py-12">
      <SectionHeading
        title="Notes"
        subtitle="Jot down ideas and reminders for your carousels"
      />

      {Object.keys(notes).length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-card/60 px-6 py-20 text-center">
          <p className="text-pretty text-muted-foreground">
            No notes yet. Notes you add to products will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {Object.entries(notes).map(([id, note]) => (
            <div key={id} className="rounded-2xl border border-border bg-card p-5">
              <p className="text-sm text-muted-foreground">Product: {id}</p>
              <p className="mt-2 text-foreground">{note}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
