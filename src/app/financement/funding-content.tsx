'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, Check } from 'lucide-react'

import { CtaSection } from '@/components/sections/cta-section'
import { PremiumHero } from '@/components/sections/premium-hero'
import { SectionTitle } from '@/components/ui/section-title'
import { useContent } from '@/hooks/use-content'
import { getIcon } from '@/lib/icons'
import { fundingContent, images as siteImages } from '@/lib/site-content'

const ease = [0.22, 1, 0.36, 1] as const
const defaults = fundingContent

export function FundingContent() {
  const { data } = useContent('funding', defaults)
  const hero = data.hero ?? defaults.hero
  const profiles = (data.profiles ?? defaults.profiles) as typeof defaults.profiles
  const solutions = (data.solutions ?? defaults.solutions) as typeof defaults.solutions

  return (
    <>
      <PremiumHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        breadcrumb="Financement"
        compact
        backgroundImage={siteImages.aboutHero}
      />

      {/* Tableau des financeurs selon profil */}
      <section className="border-b border-border/60 bg-background">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <SectionTitle
            eyebrow="Selon votre profil"
            title="Quelle solution pour vous ?"
            description="Trouvez les financements mobilisables selon votre situation. Plusieurs aides peuvent se cumuler."
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
            }}
            className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3"
          >
            {profiles.map((p) => (
              <motion.div
                key={p.profile}
                variants={{
                  hidden: { opacity: 0, y: 18 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
                }}
                className="rounded-2xl border border-border/80 bg-card/70 p-6 shadow-[var(--shadow-sm)] ring-1 ring-foreground/5 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-md)]"
              >
                <h3 className="font-display text-sm font-semibold text-foreground">
                  {p.profile}
                </h3>
                <ul className="mt-4 space-y-2">
                  {p.solutions.map((s: string) => (
                    <li key={s} className="flex items-start gap-2 text-sm text-foreground/85">
                      <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                        <Check className="size-3" aria-hidden />
                      </span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Solutions détaillées */}
      <section className="border-b border-border/60 bg-[oklch(0.975_0.012_285)] dark:bg-[oklch(0.16_0.02_285)]">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <SectionTitle
            eyebrow="Les financements en détail"
            title="6 solutions mobilisables"
            description="Toutes ces solutions sont compatibles avec le dispositif Auto Conduite. On vous oriente vers la mieux adaptée à votre situation."
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
            }}
            className="mt-14 grid gap-5 md:grid-cols-2"
          >
            {solutions.map((s, i) => {
              const Icon = getIcon(s.iconName ?? defaults.solutions[i]?.iconName)
              return (
                <motion.div
                  key={s.title}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
                  }}
                  className="rounded-2xl border border-border/80 bg-card/70 p-6 shadow-[var(--shadow-sm)] ring-1 ring-foreground/5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/15">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    {(s as any).status && (
                      <span className="rounded-full bg-amber-500/10 px-2.5 py-1 text-[11px] font-semibold text-amber-600 ring-1 ring-amber-500/20 dark:bg-amber-500/15 dark:text-amber-300">
                        {(s as any).status}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-4 font-display text-base font-semibold text-foreground">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {s.desc}
                  </p>
                  {s.link && (
                    <a
                      href={s.link.href}
                      target={s.link.external ? '_blank' : undefined}
                      rel={s.link.external ? 'noopener noreferrer' : undefined}
                      className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                    >
                      {s.link.label}
                      <ArrowUpRight className="size-3.5" aria-hidden />
                    </a>
                  )}
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Note ADIE + appel à contact */}
      <section className="border-b border-border/60 bg-background">
        <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8 lg:py-28">
          <p className="font-display text-xs font-semibold tracking-[0.22em] uppercase text-primary">
            Sans solution identifiée ?
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            On cherche ensemble la bonne combinaison
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Si votre CPF est insuffisant et qu'ALMA ne couvre pas le reste à charge, l'ADIE Lorraine peut vous accompagner avec un microcrédit personnel. Contactez-nous, on regarde votre situation.
          </p>
        </div>
      </section>

      <CtaSection />
    </>
  )
}
