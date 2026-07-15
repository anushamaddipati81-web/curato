'use client'

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { COLLECTIONS, NOTES, RECENT_SEARCHES, type Collection, type Note } from '@/lib/data'

type ProductNoteMap = Record<string, string>

type WorkspaceState = {
  favorites: string[]
  toggleFavorite: (id: string) => void
  isFavorite: (id: string) => boolean

  savedCollections: Collection[]
  createCollection: (name: string, description?: string) => void

  notes: Note[]
  addNote: (note: Omit<Note, 'id' | 'date'>) => void

  productNotes: ProductNoteMap
  setProductNote: (id: string, text: string) => void

  recentSearches: string[]
  addSearch: (query: string) => void
}

const WorkspaceContext = createContext<WorkspaceState | null>(null)

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>(['p1', 'p15', 'p33', 'p9'])
  const [savedCollections, setSavedCollections] = useState<Collection[]>(COLLECTIONS)
  const [notes, setNotes] = useState<Note[]>(NOTES)
  const [productNotes, setProductNotes] = useState<ProductNoteMap>({})
  const [recentSearches, setRecentSearches] = useState<string[]>(RECENT_SEARCHES)

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [id, ...prev],
    )
  }, [])

  const isFavorite = useCallback((id: string) => favorites.includes(id), [favorites])

  const createCollection = useCallback((name: string, description = '') => {
    setSavedCollections((prev) => [
      {
        id: `c${Date.now()}`,
        name,
        description: description || 'A fresh collection, ready to curate.',
        domain: 'mixed',
        cover: 'oklch(0.92 0.03 80)',
        productIds: [],
      },
      ...prev,
    ])
  }, [])

  const addNote = useCallback((note: Omit<Note, 'id' | 'date'>) => {
    setNotes((prev) => [
      {
        ...note,
        id: `n${Date.now()}`,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      },
      ...prev,
    ])
  }, [])

  const setProductNote = useCallback((id: string, text: string) => {
    setProductNotes((prev) => ({ ...prev, [id]: text }))
  }, [])

  const addSearch = useCallback((query: string) => {
    const trimmed = query.trim()
    if (!trimmed) return
    setRecentSearches((prev) => [trimmed, ...prev.filter((s) => s !== trimmed)].slice(0, 8))
  }, [])

  const value = useMemo(
    () => ({
      favorites,
      toggleFavorite,
      isFavorite,
      savedCollections,
      createCollection,
      notes,
      addNote,
      productNotes,
      setProductNote,
      recentSearches,
      addSearch,
    }),
    [
      favorites,
      toggleFavorite,
      isFavorite,
      savedCollections,
      createCollection,
      notes,
      addNote,
      productNotes,
      setProductNote,
      recentSearches,
      addSearch,
    ],
  )

  return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>
}

export function useWorkspace() {
  const ctx = useContext(WorkspaceContext)
  if (!ctx) throw new Error('useWorkspace must be used within WorkspaceProvider')
  return ctx
}
