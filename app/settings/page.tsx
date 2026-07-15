'use client'

import { useState } from 'react'
import {
  User,
  Palette,
  Bell,
  ShoppingBag,
  Sparkles,
} from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { Input } from '@/components/ui/input'
import { PLATFORMS } from '@/lib/data'

export default function SettingsPage() {
  const [toggles, setToggles] = useState({
    weeklyDigest: true,
    priceDrops: true,
    newArrivals: false,
    aiSuggestions: true,
    compactCards: false,
  })

  const toggle = (key: keyof typeof toggles) =>
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }))

  return (
    <div className="max-w-3xl space-y-8">
      <PageHeader
        eyebrow="Settings"
        title="Preferences"
        description="Personalize how Curato researches, organizes, and surfaces products for you."
      />

      <SettingCard icon={User} title="Profile">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Display name">
            <Input defaultValue="Aria Sharma" />
          </Field>
          <Field label="Email">
            <Input defaultValue="aria@curato.app" type="email" />
          </Field>
        </div>
        <Field label="Currency &amp; region">
          <Input defaultValue="INR (₹) · India" />
        </Field>
      </SettingCard>

      <SettingCard icon={Palette} title="Appearance">
        <ToggleRow
          label="Compact product cards"
          description="Show more products per row with a tighter layout."
          active={toggles.compactCards}
          onToggle={() => toggle('compactCards')}
        />
        <ToggleRow
          label="AI curation suggestions"
          description="Let Curato recommend products while you build collections."
          active={toggles.aiSuggestions}
          onToggle={() => toggle('aiSuggestions')}
        />
      </SettingCard>

      <SettingCard icon={Bell} title="Notifications">
        <ToggleRow
          label="Weekly curation digest"
          description="A gentle summary of new finds for your saved themes."
          active={toggles.weeklyDigest}
          onToggle={() => toggle('weeklyDigest')}
        />
        <ToggleRow
          label="Price drop alerts"
          description="Get notified when a saved product changes price."
          active={toggles.priceDrops}
          onToggle={() => toggle('priceDrops')}
        />
        <ToggleRow
          label="New arrivals"
          description="Fresh products in categories you research most."
          active={toggles.newArrivals}
          onToggle={() => toggle('newArrivals')}
        />
      </SettingCard>

      <SettingCard icon={ShoppingBag} title="Preferred platforms">
        <p className="text-sm text-muted-foreground">
          Curato surfaces products from the shopping platforms you follow.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {PLATFORMS.map((p) => (
            <span
              key={p}
              className="flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground"
            >
              <Sparkles className="size-3 text-primary" />
              {p}
            </span>
          ))}
        </div>
      </SettingCard>
    </div>
  )
}

function SettingCard({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="mb-5 flex items-center gap-2">
        <span className="flex size-9 items-center justify-center rounded-xl bg-primary/10">
          <Icon className="size-4 text-primary" />
        </span>
        <h2 className="font-serif text-lg font-semibold text-foreground">{title}</h2>
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm font-medium text-foreground">{label}</span>
      {children}
    </label>
  )
}

function ToggleRow({
  label,
  description,
  active,
  onToggle,
}: {
  label: string
  description: string
  active: boolean
  onToggle: () => void
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="min-w-0">
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={active}
        aria-label={label}
        onClick={onToggle}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
          active ? 'bg-primary' : 'bg-border'
        }`}
      >
        <span
          className={`absolute top-0.5 size-5 rounded-full bg-card shadow-sm transition-transform ${
            active ? 'translate-x-5' : 'translate-x-0.5'
          }`}
        />
      </button>
    </div>
  )
}
