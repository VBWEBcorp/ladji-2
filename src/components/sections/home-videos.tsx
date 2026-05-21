'use client'

import { PlayCircle } from 'lucide-react'

import { SectionTitle } from '@/components/ui/section-title'
import { useContent } from '@/hooks/use-content'
import { howItWorksContent as defaults } from '@/lib/site-content'

const HOME_VIDEO_NUMBERS = [1, 4] as const

export function HomeVideos() {
  const { data } = useContent('how-it-works', defaults)
  const videos = (data.videos ?? defaults.videos) as typeof defaults.videos
  const items = videos.filter((v) => (HOME_VIDEO_NUMBERS as readonly number[]).includes(v.number))

  if (items.length === 0) return null

  return (
    <section className="border-b border-border/60 bg-[oklch(0.975_0.012_285)] dark:bg-[oklch(0.16_0.02_285)]">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <SectionTitle
          eyebrow="En vidéo"
          title="Découvrez Auto Conduite en image"
          description="Deux vidéos courtes : comment s'inscrire au dispositif et comment l'IA Auto Conduite accompagne chaque séance."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {items.map((v) => (
            <div
              key={v.number}
              className="group relative overflow-hidden rounded-2xl border border-border/80 bg-card/70 shadow-[var(--shadow-sm)] ring-1 ring-foreground/5"
            >
              <div className="relative aspect-video bg-gradient-to-br from-primary/15 to-primary/5">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="flex size-14 items-center justify-center rounded-full bg-background/85 text-primary shadow-lg backdrop-blur-sm ring-1 ring-border/60 transition-transform duration-300 group-hover:scale-110">
                    <PlayCircle className="size-7" aria-hidden />
                  </span>
                </div>
                <span className="absolute right-3 top-3 rounded-full bg-background/85 px-2.5 py-1 text-[11px] font-medium text-foreground backdrop-blur-sm">
                  {v.duration}
                </span>
              </div>
              <div className="p-5">
                <p className="font-display text-[11px] font-bold tracking-[0.18em] text-primary">
                  VIDÉO {v.number}
                </p>
                <h3 className="mt-2 font-display text-base font-semibold text-foreground">
                  {v.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {v.desc}
                </p>
                <p className="mt-3 text-[11px] font-medium uppercase tracking-wide text-muted-foreground/80">
                  Vidéo à venir
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
