'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

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

      {/* 4 dispositifs simples (cf. brief Ouibo) */}
      <section className="border-b border-border/60 bg-background">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <SectionTitle
            eyebrow="Les dispositifs mobilisables"
            title="Quatre solutions, une orientation personnalisée"
            description="On regarde votre situation et on vous oriente vers le bon dispositif. Plusieurs aides peuvent se cumuler."
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
            }}
            className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
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
                  className="group relative flex flex-col rounded-2xl border border-border/80 bg-card/70 p-6 shadow-[var(--shadow-sm)] ring-1 ring-foreground/5 backdrop-blur-sm transition-[border-color,box-shadow] duration-500 ease-out hover:border-primary/30 hover:shadow-[var(--shadow-md)]"
                >
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/15">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-semibold tracking-tight text-foreground">
                    {s.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {s.desc}
                  </p>
                  {s.link && (
                    <a
                      href={s.link.href}
                      target={s.link.external ? '_blank' : undefined}
                      rel={s.link.external ? 'noopener noreferrer' : undefined}
                      className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
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

      {/* Note finale */}
      <section className="border-b border-border/60 bg-[oklch(0.975_0.008_220)] dark:bg-[oklch(0.16_0.015_220)]">
        <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8 lg:py-28">
          <p className="font-display text-xs font-semibold tracking-[0.22em] uppercase text-primary">
            Pas sûr de votre éligibilité ?
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            On cherche ensemble la bonne combinaison
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Contactez-nous, on regarde votre situation et on vous oriente vers le ou les dispositifs adaptés. Plusieurs aides peuvent se cumuler.
          </p>
        </div>
      </section>

      <CtaSection />
    </>
  )
}
