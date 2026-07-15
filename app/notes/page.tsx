'use client'

import { useState } from 'react'
import { Plus, X, NotebookPen } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useWorkspace } from '@/lib/workspace-context'

const TAGS = ['Fashion', 'Home Spaces', 'Collections', 'General']

export default function NotesPage() {
  const { notes, addNote } = useWorkspace()
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [tag, setTag] = useState('General')

  function handleAdd() {
    if (!title.trim()) return
    addNote({ title: title.trim(), body: body.trim(), tag })
    setTitle('')
    setBody('')
    setTag('General')
    setOpen(false)
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 lg:px-8 lg:py-12">
      <PageHeader
        eyebrow="Notes"
        title="Research notes"
        description="Capture ideas, budgets, measurements, and comparisons as you research. Keep everything in one calm place."
      >
        <Button onClick={() => setOpen((v) => !v)}>
          <Plus className="size-4" /> New Note
        </Button>
      </PageHeader>

      {open && (
        <div className="mt-8 animate-fade-up rounded-3xl border border-border bg-card p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-serif text-xl font-semibold text-foreground">Add a note</h2>
            <Button variant="ghost" size="icon-sm" aria-label="Close" onClick={() => setOpen(false)}>
              <X className="size-4" />
            </Button>
          </div>
          <div className="flex flex-col gap-4">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Note title"
            />
            <Textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Write your thoughts..."
            />
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-muted-foreground">Tag:</span>
              {TAGS.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTag(t)}
                  className={
                    tag === t
                      ? 'rounded-full bg-primary/15 px-3 py-1 text-xs font-medium text-foreground'
                      : 'rounded-full border border-border bg-secondary px-3 py-1 text-xs text-muted-foreground hover:text-foreground'
                  }
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAdd}>Save Note</Button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {notes.map((note) => (
          <article
            key={note.id}
            className="flex flex-col rounded-3xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="flex size-9 items-center justify-center rounded-xl bg-accent text-primary">
                <NotebookPen className="size-4" strokeWidth={1.75} />
              </span>
              <span className="text-xs text-muted-foreground">{note.date}</span>
            </div>
            <h3 className="font-serif text-lg font-semibold text-foreground">{note.title}</h3>
            <p className="mt-1.5 flex-1 text-pretty text-sm leading-relaxed text-muted-foreground">
              {note.body}
            </p>
            <div className="mt-4">
              <Badge variant="gold">{note.tag}</Badge>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
