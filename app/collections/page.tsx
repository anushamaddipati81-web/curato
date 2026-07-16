'use client'

import { useState } from 'react'
import { FolderPlus, Trash2, Plus } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { ProductGrid } from '@/components/product-grid'
import { Button } from '@/components/ui/button'
import { useWorkspace } from '@/lib/workspace-context'
import { PRODUCTS } from '@/lib/data'

export default function CollectionsPage() {
  const { collections, createCollection, deleteCollection, addProductToCollection, removeProductFromCollection } = useWorkspace()
  const [showCreate, setShowCreate] = useState(false)
  const [newName, setNewName] = useState('')
  const [newDesc, setNewDesc] = useState('')

  function handleCreate() {
    if (!newName.trim()) return
    createCollection(newName.trim(), newDesc.trim() || 'My curated collection')
    setNewName('')
    setNewDesc('')
    setShowCreate(false)
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 lg:px-8 lg:py-12">
      <SectionHeading
        title="Your Collections"
        subtitle="Organize products into themed collections for your carousels"
      />

      <div className="mb-6">
        {showCreate ? (
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Collection name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <input
                type="text"
                placeholder="Description (optional)"
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                className="rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <div className="flex gap-2">
                <Button onClick={handleCreate} disabled={!newName.trim()}>
                  Create
                </Button>
                <Button variant="outline" onClick={() => setShowCreate(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <Button onClick={() => setShowCreate(true)}>
            <Plus className="size-4" /> New Collection
          </Button>
        )}
      </div>

      {collections.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-card/60 px-6 py-20 text-center">
          <FolderPlus className="size-12 text-muted-foreground" />
          <p className="mt-4 text-pretty text-muted-foreground">
            No collections yet. Create one to start organizing products for your carousels.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {collections.map((collection) => {
            const products = collection.productIds
              .map((id) => PRODUCTS.find((p) => p.id === id))
              .filter(Boolean) as typeof PRODUCTS

            return (
              <div key={collection.id} id={collection.id} className="rounded-2xl border border-border bg-card p-5">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-foreground">{collection.name}</h3>
                    <p className="text-sm text-muted-foreground">{collection.description}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    aria-label="Delete collection"
                    onClick={() => deleteCollection(collection.id)}
                  >
                    <Trash2 className="size-4 text-destructive" />
                  </Button>
                </div>

                {products.length > 0 ? (
                  <ProductGrid products={products} />
                ) : (
                  <p className="py-8 text-center text-sm text-muted-foreground">
                    No products in this collection yet. Browse and add products from the home page.
                  </p>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
