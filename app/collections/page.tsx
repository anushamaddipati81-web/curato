'use client'

import { useState } from 'react'
import { Plus, X } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { CollectionCard } from '@/components/collection-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useWorkspace } from '@/lib/workspace-context'

export default function CollectionsPage() {
  const { savedCollections, createCollection } = useWorkspace()
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const suggestions = [
    'Minimal Living Room',
    'Balcony Inspiration',
    'Office Outfit Ideas',
    'Housewarming Gifts',
  ]

  function handleCreate() {
    if (!name.trim()) return
    createCollection(name.trim(), description.trim())
    setName('')
    setDescription('')
    setOpen(false)
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 lg:px-8 lg:py-12">
      <PageHeader
        eyebrow="Collections"
        title="Your curated collections"
        description="Group products into beautiful collections you can compare, refine, and share when they're ready."
      >
        <Button onClick={() => setOpen((v) => !v)}>
          <Plus className="size-4" /> New Collection
        </Button>
      </PageHeader>

      {open && (
        <div className="mt-8 animate-fade-up rounded-3xl border border-border bg-card p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-serif text-xl font-semibold text-foreground">
              Create a collection
            </h2>
            <Button variant="ghost" size="icon-sm" aria-label="Close" onClick={() => setOpen(false)}>
              <X className="size-4" />
            </Button>
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                Collection name
              </label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Cozy Coffee Corner"
              />
              <div className="mt-2 flex flex-wrap gap-2">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setName(s)}
                    className="rounded-full border border-border bg-secondary px-3 py-1 text-xs text-muted-foreground hover:text-foreground"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                Description
              </label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What's the vibe of this collection?"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreate}>Create Collection</Button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {savedCollections.map((collection) => (
          <CollectionCard key={collection.id} collection={collection} />
        ))}
      </div>
    </div>
  )
}
