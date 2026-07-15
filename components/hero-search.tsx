'use client'

import { useState } from 'react'
import { Search, Sparkles, ArrowRight } from 'lucide-react'
import { EXAMPLE_SEARCHES } from '@/lib/data'
import { Button } from '@/components/ui/button'

export function HeroSearch({
  onSearch,
  initialValue = '',
}: {
  onSearch: (query: string) => void
  initialValue?: string
}) {
  const [value, setValue] = useState(initialValue)

  function submit(query: string) {
    const q = query.trim()
    if (!q) return
    onSearch(q)
  }

  return (
    <div className="w-full">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          submit(value)
        }}
        className="relative"
      >
        <div className="flex items-center gap-2 rounded-2xl border border-border bg-card p-2 shadow-sm transition-shadow focus-within:shadow-md sm:gap-3 sm:p-2.5">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
            <Search className="size-5" strokeWidth={1.75} />
          </span>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (
                e.key === 'Enter' &&
                !e.nativeEvent.isComposing &&
                (e as unknown as { keyCode: number }).keyCode !== 229
              ) {
                e.preventDefault()
                submit(value)
              }
            }}
            placeholder="What would you like to create today?"
            aria-label="Search for products or spaces"
            className="min-w-0 flex-1 bg-transparent px-1 text-base text-foreground outline-none placeholder:text-muted-foreground sm:text-lg"
          />
          <Button type="submit" size="lg" className="hidden h-11 rounded-xl px-5 sm:inline-flex">
            <Sparkles className="size-4" /> Curate
          </Button>
          <Button
            type="submit"
            size="icon-lg"
            aria-label="Curate"
            className="h-11 w-11 rounded-xl sm:hidden"
          >
            <ArrowRight className="size-4.5" />
          </Button>
        </div>
      </form>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <span className="text-xs font-medium text-muted-foreground">Try:</span>
        {EXAMPLE_SEARCHES.map((example) => (
          <button
            key={example}
            type="button"
            onClick={() => {
              setValue(example)
              submit(example)
            }}
            className="rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium text-muted-foreground shadow-sm transition-colors hover:border-primary/50 hover:text-foreground"
          >
            {example}
          </button>
        ))}
      </div>
    </div>
  )
}
