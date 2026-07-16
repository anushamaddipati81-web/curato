'use client'

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

export type Collection = {
  id: string
  name: string
  description: string
  createdAt: number
  productIds: string[]
}

export type FavoriteProduct = {
  id: string
  addedAt: number
}

type WorkspaceState = {
  recentSearches: string[]
  addSearch: (query: string) => void
  collections: Collection[]
  createCollection: (name: string, description: string) => string
  addProductToCollection: (collectionId: string, productId: string) => void
  removeProductFromCollection: (collectionId: string, productId: string) => void
  deleteCollection: (collectionId: string) => void
  favorites: FavoriteProduct[]
  toggleFavorite: (productId: string) => void
  isFavorite: (productId: string) => boolean
  notes: Record<string, string>
  setNote: (productId: string, note: string) => void
}

const WorkspaceContext = createContext<WorkspaceState | null>(null)

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [collections, setCollections] = useState<Collection[]>([])
  const [favorites, setFavorites] = useState<FavoriteProduct[]>([])
  const [notes, setNotes] = useState<Record<string, string>>({})

  const addSearch = useCallback((query: string) => {
    setRecentSearches((prev) => {
      const filtered = prev.filter((s) => s !== query)
      return [query, ...filtered].slice(0, 10)
    })
  }, [])

  const createCollection = useCallback((name: string, description: string) => {
    const id = `col_${Date.now()}`
    const collection: Collection = {
      id,
      name,
      description,
      createdAt: Date.now(),
      productIds: [],
    }
    setCollections((prev) => [collection, ...prev])
    return id
  }, [])

  const addProductToCollection = useCallback((collectionId: string, productId: string) => {
    setCollections((prev) =>
      prev.map((c) =>
        c.id === collectionId && !c.productIds.includes(productId)
          ? { ...c, productIds: [...c.productIds, productId] }
          : c,
      ),
    )
  }, [])

  const removeProductFromCollection = useCallback((collectionId: string, productId: string) => {
    setCollections((prev) =>
      prev.map((c) =>
        c.id === collectionId
          ? { ...c, productIds: c.productIds.filter((p) => p !== productId) }
          : c,
      ),
    )
  }, [])

  const deleteCollection = useCallback((collectionId: string) => {
    setCollections((prev) => prev.filter((c) => c.id !== collectionId))
  }, [])

  const toggleFavorite = useCallback((productId: string) => {
    setFavorites((prev) => {
      if (prev.some((f) => f.id === productId)) {
        return prev.filter((f) => f.id !== productId)
      }
      return [...prev, { id: productId, addedAt: Date.now() }]
    })
  }, [])

  const isFavorite = useCallback(
    (productId: string) => favorites.some((f) => f.id === productId),
    [favorites],
  )

  const setNote = useCallback((productId: string, note: string) => {
    setNotes((prev) => ({ ...prev, [productId]: note }))
  }, [])

  return (
    <WorkspaceContext.Provider
      value={{
        recentSearches,
        addSearch,
        collections,
        createCollection,
        addProductToCollection,
        removeProductFromCollection,
        deleteCollection,
        favorites,
        toggleFavorite,
        isFavorite,
        notes,
        setNote,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  )
}

export function useWorkspace() {
  const ctx = useContext(WorkspaceContext)
  if (!ctx) throw new Error('useWorkspace must be used within WorkspaceProvider')
  return ctx
}
