'use client'

import { partnersContent } from '@/lib/site-content'

type PartnerItem = {
  name: string
  logo?: string | null
}

function PartnerCard({ partner }: { partner: PartnerItem }) {
  return (
    <div
      className="group flex h-20 w-44 shrink-0 items-center justify-center rounded-2xl border border-border/50 bg-card/70 px-6 py-4 shadow-[var(--shadow-xs)] ring-1 ring-foreground/[0.03] backdrop-blur-sm sm:h-24 sm:w-52"
      title={partner.name}
    >
      {partner.logo ? (
        <img
          src={partner.logo}
          alt={partner.name}
          loading="lazy"
          className="max-h-12 w-auto max-w-full object-contain opacity-70 grayscale transition-[filter,opacity] duration-700 ease-out group-hover:opacity-100 group-hover:grayscale-0 sm:max-h-14"
        />
      ) : (
        <span className="font-display text-sm font-semibold tracking-tight text-muted-foreground/70 transition-colors duration-700 ease-out group-hover:text-foreground sm:text-base">
          {partner.name}
        </span>
      )}
    </div>
  )
}

function MarqueeRow({ items }: { items: PartnerItem[] }) {
  return (
    <div className="group relative flex gap-6 overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-background to-transparent sm:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-background to-transparent sm:w-24" />

      <div className="flex shrink-0 gap-6 py-2 animate-marquee-left group-hover:[animation-play-state:paused]">
        {items.map((p, i) => (
          <PartnerCard key={`${p.name}-${i}`} partner={p} />
        ))}
      </div>
      <div
        aria-hidden
        className="flex shrink-0 gap-6 py-2 animate-marquee-left group-hover:[animation-play-state:paused]"
      >
        {items.map((p, i) => (
          <PartnerCard key={`${p.name}-dup-${i}`} partner={p} />
        ))}
      </div>
    </div>
  )
}

export function PartnersSection() {
  const items = partnersContent.items as PartnerItem[]
  const tripled = [...items, ...items, ...items]

  return (
    <section className="overflow-hidden border-b border-border/60 bg-background">
      <div className="mx-auto max-w-6xl px-4 pt-16 sm:px-6 lg:px-8 lg:pt-20">
        <div className="text-center">
          <p className="font-display text-xs font-semibold tracking-[0.22em] uppercase text-primary">
            {partnersContent.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {partnersContent.title}
          </h2>
        </div>
      </div>

      <div className="mt-10 pb-16 sm:mt-12 lg:pb-20">
        <MarqueeRow items={tripled} />
      </div>
    </section>
  )
}
