'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, Check, ExternalLink } from 'lucide-react'
import Link from 'next/link'

import { CtaSection } from '@/components/sections/cta-section'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { SectionTitle } from '@/components/ui/section-title'
import { servicesContent } from '@/lib/site-content'

const ease = [0.22, 1, 0.36, 1] as const

export function CpfContent() {
  const cpf = servicesContent.cpfPack

  return (
    <>
      <Breadcrumb items={[{ label: 'Pack 20h CPF' }]} />

      {/* HERO CPF — 183€/mois en gros */}
      <section className="relative overflow-hidden border-b border-border/60 bg-background">
        {/* Halo dégradé */}
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-60"
          aria-hidden
          style={{
            background:
              'radial-gradient(ellipse at top left, oklch(0.62 0.10 200 / 0.18), transparent 50%), radial-gradient(ellipse at bottom right, oklch(0.48 0.10 200 / 0.12), transparent 50%)',
          }}
        />

        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-center"
          >
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
                {cpf.eyebrow}
              </p>
              <h1 className="mt-4 font-display text-balance text-4xl font-bold leading-[1.05] tracking-[-0.02em] text-foreground sm:text-5xl lg:text-6xl">
                Financez votre permis avec votre CPF
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Le Pack 20h CPF Auto Conduite, c&apos;est une formation officielle
                avec moniteur agréé, finançable via votre Compte Personnel de
                Formation. Le reste à charge est étalé sur 3 mois.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <a
                    href={cpf.ctaPrimary.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {cpf.ctaPrimary.label}
                    <ExternalLink className="size-4" aria-hidden />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href={cpf.ctaSecondary.href}>
                    {cpf.ctaSecondary.label}
                  </Link>
                </Button>
              </div>
            </div>

            {/* Bloc prix XL — 183€/mois en très gros */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15, ease }}
              className="relative rounded-3xl border border-primary/30 bg-card/80 p-8 shadow-[0_30px_60px_-20px_oklch(0.62_0.10_200/0.35)] ring-1 ring-primary/10 backdrop-blur-sm sm:p-10"
            >
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-primary">
                Votre reste à charge
              </p>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="font-display text-[56px] font-black leading-none tracking-[-0.04em] text-foreground sm:text-[72px]">
                  {cpf.monthly}
                </span>
                <span className="font-display text-2xl font-bold text-foreground sm:text-3xl">
                  €
                </span>
              </div>
              <p className="mt-2 font-display text-lg font-semibold text-foreground sm:text-xl">
                par mois{' '}
                <span className="text-muted-foreground">· {cpf.subline}</span>
              </p>

              {/* Décomposition */}
              <div className="mt-8 space-y-3 border-t border-border/40 pt-6 text-sm">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-muted-foreground">
                    Formation officielle
                  </span>
                  <span className="font-display text-base font-semibold text-foreground">
                    {cpf.price.toLocaleString('fr-FR')}€
                  </span>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-muted-foreground">
                    CPF jusqu&apos;à
                  </span>
                  <span className="font-display text-base font-semibold text-primary">
                    − {cpf.cpfCovered}€
                  </span>
                </div>
                <div className="flex items-baseline justify-between gap-4 border-t border-border/40 pt-3">
                  <span className="font-medium text-foreground">
                    Reste à charge
                  </span>
                  <span className="font-display text-base font-bold text-foreground">
                    {cpf.remaining}€
                  </span>
                </div>
                <p className="pt-1 text-[11px] italic text-muted-foreground">
                  ≈ {cpf.remaining}€ ÷ 3 = {cpf.monthly}€/mois sans frais
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Ce qui est inclus */}
      <section className="border-b border-border/60 bg-[oklch(0.975_0.008_220)] dark:bg-[oklch(0.16_0.015_220)]">
        <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <SectionTitle
            eyebrow="Ce que comprend le Pack 20h CPF"
            title="Formation officielle avec moniteur agréé"
            description="Le Pack 20h CPF est porté par notre partenaire ADAM, organisme de formation agréé. C'est une formation reconnue par France compétences, finançable CPF."
          />

          <motion.ul
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
            }}
            className="mx-auto mt-14 grid max-w-2xl gap-3"
          >
            {cpf.features.map((f) => (
              <motion.li
                key={f}
                variants={{
                  hidden: { opacity: 0, x: -10 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease } },
                }}
                className="flex items-start gap-3 rounded-2xl border border-border/80 bg-card/70 p-4 shadow-[var(--shadow-xs)] ring-1 ring-foreground/5"
              >
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary ring-1 ring-primary/20">
                  <Check className="size-3.5" aria-hidden />
                </span>
                <span className="text-sm leading-relaxed text-foreground/90 sm:text-base">
                  {f}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* Étapes simples */}
      <section className="border-b border-border/60 bg-background">
        <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <SectionTitle
            eyebrow="Comment ça se passe"
            title="3 étapes simples pour démarrer"
          />

          <ol className="mx-auto mt-14 grid max-w-3xl gap-5 sm:grid-cols-3">
            {[
              {
                step: '01',
                title: 'Vérifiez votre CPF',
                desc: 'Connectez-vous à moncompteformation.gouv.fr pour voir votre solde disponible.',
              },
              {
                step: '02',
                title: 'On vous oriente',
                desc: "Contactez-nous, on calcule votre reste à charge réel et on monte votre dossier avec ADAM.",
              },
              {
                step: '03',
                title: 'Vous démarrez',
                desc: 'Une fois validé, vous démarrez la formation avec votre moniteur agréé. Reste à charge en 3 fois.',
              },
            ].map((item) => (
              <li
                key={item.step}
                className="relative rounded-2xl border border-border/80 bg-card/70 p-6 shadow-[var(--shadow-sm)] ring-1 ring-foreground/5"
              >
                <span className="absolute -top-3 left-6 inline-flex size-9 items-center justify-center rounded-xl bg-primary font-display text-xs font-bold text-primary-foreground shadow-[0_8px_20px_-8px_oklch(0.62_0.10_200/0.5)] ring-4 ring-background">
                  {item.step}
                </span>
                <h3 className="mt-4 font-display text-base font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.desc}
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg">
              <a
                href="https://moncompteformation.gouv.fr"
                target="_blank"
                rel="noopener noreferrer"
              >
                Vérifier mon solde CPF
                <ArrowUpRight className="size-4" aria-hidden />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/contact">Nous contacter</Link>
            </Button>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  )
}
