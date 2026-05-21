'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { ValuesMarquee } from '@/components/sections/values-marquee'
import { Button } from '@/components/ui/button'
import { useContent } from '@/hooks/use-content'
import { heroContent as defaults } from '@/lib/site-content'

const ease = [0.22, 1, 0.36, 1] as const
const INTERVAL = 5000

function splitTitle(title: string): { lead: string; accent: string } {
  const words = title.trim().split(/\s+/)
  if (words.length <= 2) return { lead: '', accent: title }
  const accentCount = Math.min(2, Math.max(1, Math.floor(words.length / 3)))
  return {
    lead: words.slice(0, words.length - accentCount).join(' '),
    accent: words.slice(words.length - accentCount).join(' '),
  }
}

export function HeroSection() {
  const { data } = useContent('home', { hero: defaults })
  const hero = data.hero ?? defaults
  const images: string[] = hero.images ?? defaults.images
  const [current, setCurrent] = useState(0)
  const { lead, accent } = splitTitle(hero.title)

  useEffect(() => {
    if (images.length <= 1) return
    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length)
    }, INTERVAL)
    return () => clearInterval(id)
  }, [images.length])

  return (
    <section className="relative isolate overflow-hidden border-b border-border/60">
      {/* Background : carousel d'images plein écran */}
      <div className="absolute inset-0 -z-10" aria-hidden>
        <AnimatePresence initial={false}>
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease }}
            className="absolute inset-0"
          >
            <Image
              src={images[current]}
              alt=""
              fill
              sizes="100vw"
              priority={current === 0}
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
        {/* Overlay sombre pour lisibilité du texte */}
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease }}
          className="mx-auto max-w-3xl text-center"
        >
          {/* Eyebrow : chips */}
          {hero.eyebrow && (
            <div className="flex flex-wrap items-center justify-center gap-2">
              {hero.eyebrow.split('·').map((chip: string, i: number) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.08] px-3 py-1 font-display text-[11px] font-medium tracking-wide text-white/80 backdrop-blur-sm"
                >
                  {i === 0 ? (
                    <span className="size-1.5 rounded-full bg-[oklch(0.78_0.15_285)]" aria-hidden />
                  ) : (
                    <Check className="size-3 text-[oklch(0.78_0.15_285)]" aria-hidden />
                  )}
                  {chip.trim()}
                </span>
              ))}
            </div>
          )}

          {/* Titre avec mot accentué en serif italic + violet uni */}
          <h1 className="mt-8 font-display text-balance pb-1 text-4xl leading-[1.15] font-semibold tracking-[-0.035em] text-white sm:text-5xl lg:text-6xl">
            {lead ? (
              <>
                {lead}{' '}
                <span className="relative inline-block pb-1 font-serif italic font-normal tracking-[-0.01em] text-[oklch(0.78_0.15_285)]">
                  {accent}
                </span>
              </>
            ) : (
              accent
            )}
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-white/75 sm:text-xl">
            {hero.description}
          </p>

          {/* Features list inline */}
          {Array.isArray((hero as any).features) && (
            <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/70">
              {(hero as any).features.map((f: string) => (
                <span key={f} className="inline-flex items-center gap-1.5">
                  <Check className="size-3.5 text-[oklch(0.78_0.15_285)]" aria-hidden />
                  {f}
                </span>
              ))}
            </div>
          )}

          {/* CTAs */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            {/* CTA primary premium */}
            <Link
              href="/contact"
              className="group/cta relative inline-flex h-11 items-center gap-2 overflow-hidden rounded-xl px-5 text-sm font-medium text-primary-foreground shadow-[0_8px_24px_-8px_oklch(0.48_0.22_285/0.5)] transition-all hover:shadow-[0_12px_32px_-8px_oklch(0.48_0.22_285/0.6)] active:translate-y-px"
            >
              <span
                className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-[oklch(0.42_0.22_280)] dark:from-primary dark:via-primary dark:to-[oklch(0.65_0.18_280)]"
                aria-hidden
              />
              <span
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover/cta:translate-x-full"
                aria-hidden
              />
              <span
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"
                aria-hidden
              />
              <span className="relative">{hero.button1}</span>
              <ArrowRight
                className="relative size-4 transition-transform duration-300 group-hover/cta:translate-x-0.5"
                aria-hidden
              />
            </Link>

            <Button
              size="lg"
              variant="outline"
              className="h-11 rounded-xl border-white/25 bg-white/10 px-5 text-white backdrop-blur-sm hover:bg-white/20 hover:text-white"
              asChild
            >
              <Link href="/services">{hero.button2}</Link>
            </Button>
          </div>

          {/* Stats row : 3 KPIs */}
          {Array.isArray((hero as any).stats) && (
            <div className="mt-12 mx-auto grid max-w-2xl grid-cols-3 divide-x divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm">
              {(hero as any).stats.map((s: { value: string; label: string }, i: number) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.08, ease }}
                  className="px-4 py-5 text-center sm:px-6 sm:py-6"
                >
                  <div className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                    {s.value}
                  </div>
                  <div className="mt-1 text-[11px] uppercase tracking-wide text-white/60 sm:text-xs">
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Indicateurs carousel */}
        {images.length > 1 && (
          <div className="mt-12 flex justify-center gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Image ${i + 1}`}
                onClick={() => setCurrent(i)}
                className={`h-1 rounded-full transition-all duration-500 ${
                  i === current ? 'w-8 bg-white' : 'w-4 bg-white/35 hover:bg-white/55'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="relative">
        <ValuesMarquee variant="dark" />
      </div>
    </section>
  )
}
