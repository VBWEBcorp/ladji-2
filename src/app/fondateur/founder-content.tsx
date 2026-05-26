'use client'

import { motion } from 'framer-motion'
import { Mail, Phone } from 'lucide-react'
import Image from 'next/image'

import { CtaSection } from '@/components/sections/cta-section'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { SectionTitle } from '@/components/ui/section-title'
import { useContent } from '@/hooks/use-content'
import { getIcon } from '@/lib/icons'
import { founderContent } from '@/lib/site-content'

const ease = [0.22, 1, 0.36, 1] as const

export function FounderContent() {
  const { data } = useContent('founder', founderContent)
  const hero = data.hero ?? founderContent.hero
  const photo = data.photo ?? founderContent.photo
  const bio = data.bio ?? founderContent.bio
  const mission = data.mission ?? founderContent.mission
  const contact = data.contact ?? founderContent.contact

  return (
    <>
      <Breadcrumb items={[{ label: 'Fondateur' }]} />

      {/* HERO Fondateur */}
      <section className="relative overflow-hidden border-b border-border/60 bg-background">
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-50"
          aria-hidden
          style={{
            background:
              'radial-gradient(ellipse at top right, oklch(0.62 0.10 200 / 0.15), transparent 50%)',
          }}
        />

        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_auto] lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease }}
            >
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
                {hero.eyebrow}
              </p>
              <h1 className="mt-4 font-display text-balance text-5xl font-bold leading-[1.05] tracking-[-0.02em] text-foreground sm:text-6xl lg:text-7xl">
                {hero.title}
              </h1>
              <p className="mt-3 font-display text-lg font-medium text-muted-foreground sm:text-xl">
                {hero.subtitle}
              </p>
              <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                {hero.description}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.75, ease, delay: 0.15 }}
              className="relative mx-auto w-full max-w-xs lg:max-w-[320px]"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted shadow-[0_20px_60px_-20px_rgba(0,0,0,0.35)] ring-1 ring-foreground/5">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  priority
                  sizes="(min-width:1024px) 320px, 80vw"
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bio */}
      <section className="border-b border-border/60 bg-[oklch(0.975_0.008_220)] dark:bg-[oklch(0.16_0.015_220)]">
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
            {bio.eyebrow}
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {bio.title}
          </h2>

          <div className="mt-10 space-y-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {bio.paragraphs.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.55, delay: i * 0.1, ease }}
              >
                {p}
              </motion.p>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="border-b border-border/60 bg-background">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <SectionTitle eyebrow={mission.eyebrow} title={mission.title} />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
            }}
            className="mt-14 grid gap-5 md:grid-cols-3"
          >
            {mission.points.map((point) => {
              const Icon = getIcon(point.iconName)
              return (
                <motion.div
                  key={point.title}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
                  }}
                  className="rounded-2xl border border-border/80 bg-card/70 p-6 shadow-[var(--shadow-sm)] ring-1 ring-foreground/5"
                >
                  <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="mt-4 font-display text-base font-semibold text-foreground">
                    {point.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {point.desc}
                  </p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Contact direct */}
      <section className="border-b border-border/60 bg-[oklch(0.975_0.008_220)] dark:bg-[oklch(0.16_0.015_220)]">
        <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8 lg:py-28">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
            {contact.eyebrow}
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {contact.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {contact.description}
          </p>
          <p className="mt-8 font-display text-lg font-semibold text-foreground">
            {contact.name}
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
            <a
              href={`mailto:${contact.email}`}
              className="inline-flex items-center gap-2 rounded-xl border border-border/80 bg-card/70 px-4 py-2.5 text-sm font-medium text-foreground shadow-[var(--shadow-xs)] transition-colors hover:border-primary/30 hover:text-primary"
            >
              <Mail className="size-4" aria-hidden />
              {contact.email}
            </a>
            <a
              href={`tel:${contact.phone.replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-2 rounded-xl border border-border/80 bg-card/70 px-4 py-2.5 text-sm font-medium text-foreground shadow-[var(--shadow-xs)] transition-colors hover:border-primary/30 hover:text-primary"
            >
              <Phone className="size-4" aria-hidden />
              {contact.phone}
            </a>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  )
}
