'use client'

import { motion } from 'framer-motion'

import { CtaSection } from '@/components/sections/cta-section'
import { PremiumHero } from '@/components/sections/premium-hero'
import { SectionTitle } from '@/components/ui/section-title'
import { useContent } from '@/hooks/use-content'
import { getIcon } from '@/lib/icons'
import { aboutContent } from '@/lib/site-content'

const ease = [0.22, 1, 0.36, 1] as const

const defaults = aboutContent

export function AboutContent() {
  const { data } = useContent('about', defaults)
  const hero = data.hero ?? defaults.hero
  const values = (data.values ?? defaults.values) as typeof defaults.values
  const legal = (data.legal ?? defaults.legal) as typeof defaults.legal
  const institutions = (data.institutions ?? defaults.institutions) as typeof defaults.institutions

  return (
    <>
      <PremiumHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        breadcrumb="À propos"
        compact
        backgroundImage={hero.image}
      />

      {/* Nos valeurs : 3 cards */}
      <section className="border-b border-border/60 bg-background">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <SectionTitle eyebrow="Nos valeurs" title="Ce qui nous guide au quotidien" />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
            }}
            className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {values.map((v, i) => {
              const Icon = getIcon(v.iconName ?? defaults.values[i]?.iconName)
              return (
                <motion.div
                  key={v.title}
                  variants={{
                    hidden: { opacity: 0, y: 24, scale: 0.97 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: { duration: 0.55, ease },
                    },
                  }}
                  className="group relative overflow-hidden rounded-2xl border border-border/80 bg-card/70 p-6 shadow-[var(--shadow-sm)] ring-1 ring-foreground/5 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-md)]"
                >
                  <span className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/15">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="mt-5 font-display text-base font-semibold text-foreground">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {v.description}
                  </p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Cadre légal : 2 cards */}
      <section className="border-b border-border/60 bg-[oklch(0.975_0.008_220)] dark:bg-[oklch(0.16_0.015_220)]">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <SectionTitle eyebrow="Cadre légal" title="100% conforme, 100% assuré" />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
            }}
            className="mt-14 grid gap-5 md:grid-cols-2"
          >
            {legal.map((l, i) => {
              const Icon = getIcon(l.iconName ?? defaults.legal[i]?.iconName)
              return (
                <motion.div
                  key={l.title}
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.55, ease },
                    },
                  }}
                  className="rounded-2xl border border-border/80 bg-card/70 p-7 shadow-[var(--shadow-sm)] ring-1 ring-foreground/5"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <h3 className="font-display text-base font-semibold text-foreground">
                      {l.title}
                    </h3>
                  </div>
                  <div className="mt-5 space-y-3.5">
                    {l.paragraphs.map((p, j) => (
                      <p key={j} className="text-sm leading-relaxed text-muted-foreground">
                        {p}
                      </p>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Institutions : 4 cards */}
      <section className="border-b border-border/60 bg-background">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <SectionTitle eyebrow="Institutions" title="Un partenaire pour l'insertion" />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
            }}
            className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {institutions.map((p) => (
              <motion.div
                key={p.title}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
                }}
                className="rounded-2xl border border-border/80 bg-card/70 p-5 shadow-[var(--shadow-sm)] ring-1 ring-foreground/5 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-md)]"
              >
                <h3 className="font-display text-sm font-semibold text-foreground">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {p.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <CtaSection />
    </>
  )
}
