'use client'

import { motion } from 'framer-motion'
import { Check, Download, PlayCircle, X } from 'lucide-react'

import { CtaSection } from '@/components/sections/cta-section'
import { PremiumHero } from '@/components/sections/premium-hero'
import { SectionTitle } from '@/components/ui/section-title'
import { useContent } from '@/hooks/use-content'
import { getIcon } from '@/lib/icons'
import { companionContent, images as siteImages } from '@/lib/site-content'

const ease = [0.22, 1, 0.36, 1] as const
const defaults = companionContent

export function CompanionContent() {
  const { data } = useContent('companion', defaults)
  const hero = data.hero ?? defaults.hero
  const conditions = (data.conditions ?? defaults.conditions) as typeof defaults.conditions
  const doList = (data.do ?? defaults.do) as typeof defaults.do
  const dontList = (data.dont ?? defaults.dont) as typeof defaults.dont
  const guide = (data.guide ?? defaults.guide) as typeof defaults.guide
  const video = (data.video ?? defaults.video) as typeof defaults.video

  return (
    <>
      <PremiumHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        breadcrumb="Accompagnateur"
        compact
        backgroundImage={siteImages.aboutHero}
      />

      {/* Conditions obligatoires */}
      <section className="border-b border-border/60 bg-background">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <SectionTitle
            eyebrow="Conditions obligatoires"
            title="Vérifiez votre éligibilité d'accompagnateur"
            description="Le rôle d'accompagnateur engage votre responsabilité. Voici les 4 conditions à remplir avant chaque séance."
          />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
            }}
            className="mt-14 grid gap-5 sm:grid-cols-2"
          >
            {conditions.map((c, i) => {
              const Icon = getIcon(c.iconName ?? defaults.conditions[i]?.iconName)
              return (
                <motion.div
                  key={c.title}
                  variants={{
                    hidden: { opacity: 0, y: 18 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
                  }}
                  className="rounded-2xl border border-border/80 bg-card/70 p-6 shadow-[var(--shadow-sm)] ring-1 ring-foreground/5"
                >
                  <span className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/15">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="mt-5 font-display text-base font-semibold text-foreground">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {c.desc}
                  </p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Do / Don't */}
      <section className="border-b border-border/60 bg-[oklch(0.975_0.008_220)] dark:bg-[oklch(0.16_0.015_220)]">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <SectionTitle
            eyebrow="Pendant la séance"
            title="Ce que vous pouvez et ne pouvez pas faire"
          />
          <div className="mt-14 grid gap-5 lg:grid-cols-2">
            {/* DO */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, ease }}
              className="rounded-2xl border border-emerald-500/30 bg-card/70 p-7 shadow-[var(--shadow-sm)] ring-1 ring-emerald-500/10"
            >
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 ring-1 ring-emerald-500/20 dark:text-emerald-400">
                  <Check className="size-5" aria-hidden />
                </span>
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {doList.title}
                </h3>
              </div>
              <ul className="mt-5 space-y-2.5">
                {doList.items.map((item: string) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-foreground/85">
                    <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                      <Check className="size-3" aria-hidden />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* DON'T */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, ease, delay: 0.08 }}
              className="rounded-2xl border border-rose-500/30 bg-card/70 p-7 shadow-[var(--shadow-sm)] ring-1 ring-rose-500/10"
            >
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-xl bg-rose-500/10 text-rose-600 ring-1 ring-rose-500/20 dark:text-rose-400">
                  <X className="size-5" aria-hidden />
                </span>
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {dontList.title}
                </h3>
              </div>
              <ul className="mt-5 space-y-2.5">
                {dontList.items.map((item: string) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-foreground/85">
                    <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-rose-500/15 text-rose-600 dark:text-rose-400">
                      <X className="size-3" aria-hidden />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Guide pédagogique téléchargeable */}
      <section className="border-b border-border/60 bg-background">
        <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8 lg:py-28">
          <p className="font-display text-xs font-semibold tracking-[0.22em] uppercase text-primary">
            Document
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {guide.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            {guide.description}
          </p>
          <a
            href={guide.action.href}
            aria-disabled={guide.action.disabled}
            className="mt-7 inline-flex items-center gap-2 rounded-xl border border-border/80 bg-card px-5 py-3 text-sm font-medium text-foreground shadow-[var(--shadow-sm)] transition-colors hover:bg-foreground/[0.04] aria-disabled:cursor-not-allowed aria-disabled:opacity-60"
          >
            <Download className="size-4" aria-hidden />
            {guide.action.label}
          </a>
        </div>
      </section>

      {/* Vidéo briefing sécurité */}
      <section className="border-b border-border/60 bg-[oklch(0.975_0.008_220)] dark:bg-[oklch(0.16_0.015_220)]">
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-card/70 shadow-[var(--shadow-sm)] ring-1 ring-foreground/5">
            <div className="relative aspect-video bg-primary/10">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="flex size-16 items-center justify-center rounded-full bg-background/85 text-primary shadow-lg backdrop-blur-sm ring-1 ring-border/60">
                  <PlayCircle className="size-8" aria-hidden />
                </span>
              </div>
              <span className="absolute right-3 top-3 rounded-full bg-background/85 px-2.5 py-1 text-[11px] font-medium text-foreground backdrop-blur-sm">
                {video.duration}
              </span>
            </div>
            <div className="p-6 sm:p-8">
              <p className="font-display text-[11px] font-bold tracking-[0.18em] text-primary">
                VIDÉO {video.number}
              </p>
              <h2 className="mt-2 font-display text-xl font-semibold text-foreground sm:text-2xl">
                {video.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {video.desc}
              </p>
              <p className="mt-4 rounded-xl bg-amber-500/10 px-4 py-3 text-xs font-medium text-amber-700 ring-1 ring-amber-500/20 dark:bg-amber-500/15 dark:text-amber-300">
                {video.note}
              </p>
            </div>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  )
}
