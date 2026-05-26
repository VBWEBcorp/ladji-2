'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, Check, ExternalLink, MapPin } from 'lucide-react'
import Link from 'next/link'

import { CtaSection } from '@/components/sections/cta-section'
import { PremiumHero } from '@/components/sections/premium-hero'
import { Button } from '@/components/ui/button'
import { SectionTitle } from '@/components/ui/section-title'
import { WhatsAppButton } from '@/components/whatsapp-button'
import { useContent } from '@/hooks/use-content'
import { getIcon } from '@/lib/icons'
import {
  depositPoints,
  images as siteImages,
  servicesContent,
  zones,
} from '@/lib/site-content'
import { whatsappMessages } from '@/lib/whatsapp'

const ease = [0.22, 1, 0.36, 1] as const

const defaults = servicesContent

type ZoneCode = 'A' | 'B' | 'C'

export function ServicesContent() {
  const { data } = useContent('services', defaults)
  const hero = data.hero ?? defaults.hero
  const pricing = (data.pricing ?? defaults.pricing) as typeof defaults.pricing
  const zonesSection = (data.zones ?? defaults.zones) as typeof defaults.zones
  const deposits = (data.deposits ?? defaults.deposits) as typeof defaults.deposits
  const funding = (data.funding ?? defaults.funding) as typeof defaults.funding
  const conditions = (data.conditions ?? defaults.conditions) as typeof defaults.conditions
  const cpfPack = (data.cpfPack ?? defaults.cpfPack) as typeof defaults.cpfPack

  return (
    <>
      <PremiumHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        breadcrumb="Nos offres"
        compact
        backgroundImage={siteImages.servicesHero}
      />

      {/* Pricing : 3 Packs avec 3 prix (zones A/B/C) */}
      <section className="border-b border-border/60 bg-background">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <SectionTitle
            eyebrow={pricing.eyebrow}
            title={pricing.title}
            description={pricing.description}
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
            }}
            className="mt-14 grid gap-6 lg:grid-cols-3"
          >
            {pricing.plans.map((plan, i) => {
              const Icon = getIcon(plan.iconName ?? defaults.pricing.plans[i]?.iconName)
              const popular = (plan as any).popular
              return (
                <motion.div
                  key={plan.name}
                  variants={{
                    hidden: { opacity: 0, y: 24, scale: 0.97 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: { duration: 0.55, ease },
                    },
                  }}
                  className={`relative flex flex-col rounded-2xl border bg-card/70 p-6 shadow-[var(--shadow-sm)] ring-1 ring-foreground/5 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-md)] ${
                    popular
                      ? 'border-primary/60 ring-primary/30 shadow-[0_20px_50px_-20px_oklch(0.62_0.10_200/0.45)]'
                      : 'border-border/80'
                  }`}
                >
                  {popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-[11px] font-semibold text-primary-foreground shadow-[0_8px_20px_-8px_oklch(0.62_0.10_200/0.5)]">
                      Populaire
                    </span>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    {(plan as any).offer && (
                      <span className="rounded-full bg-foreground/[0.06] px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                        {(plan as any).offer}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
                    {plan.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {plan.description}
                  </p>

                  {/* 3 prix par zone */}
                  <div className="mt-5 grid grid-cols-3 gap-2 rounded-xl border border-border/60 bg-background/50 p-2">
                    {(['A', 'B', 'C'] as ZoneCode[]).map((z) => (
                      <div key={z} className="text-center">
                        <div className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                          Zone {z}
                        </div>
                        <div className="mt-1 font-display text-lg font-semibold text-foreground">
                          {(plan.prices as Record<ZoneCode, number>)[z]}€
                        </div>
                      </div>
                    ))}
                  </div>

                  <ul className="mt-5 space-y-2.5">
                    {plan.features.map((f: string) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-foreground/85">
                        <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                          <Check className="size-3" aria-hidden />
                        </span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 pt-2">
                    <Button asChild className="w-full" variant={popular ? 'default' : 'outline'}>
                      <Link href="/contact">Vérifier mon éligibilité</Link>
                    </Button>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Contact direct WhatsApp pour toute question sur un forfait */}
          <div className="mt-12 flex flex-col items-center gap-3 text-center">
            <p className="text-sm text-muted-foreground">
              Une question sur un forfait ou besoin d&apos;un conseil ?
            </p>
            <WhatsAppButton message={whatsappMessages.forfaits} />
          </div>
        </div>
      </section>

      {/* Pack 20h CPF — bloc séparé (cf. brief Ouibo : 1450€, 183€/mois) */}
      <section className="border-b border-border/60 bg-[oklch(0.975_0.008_220)] dark:bg-[oklch(0.16_0.015_220)]">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease }}
            className="grid gap-10 rounded-3xl border border-primary/30 bg-card/80 p-8 shadow-[0_30px_60px_-20px_oklch(0.62_0.10_200/0.3)] ring-1 ring-primary/10 backdrop-blur-sm lg:grid-cols-[1.1fr_1fr] lg:items-center lg:p-12"
          >
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
                {cpfPack.eyebrow}
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
                {cpfPack.name}
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
                {cpfPack.description}
              </p>
              <ul className="mt-6 space-y-2.5">
                {cpfPack.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-foreground/90">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary ring-1 ring-primary/20">
                      <Check className="size-3" aria-hidden />
                    </span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link href="/cpf">
                    En savoir plus
                    <ArrowUpRight className="size-4" aria-hidden />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a
                    href={cpfPack.ctaPrimary.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Vérifier mon CPF
                    <ExternalLink className="size-4" aria-hidden />
                  </a>
                </Button>
              </div>
            </div>

            <div>
              <div className="rounded-3xl border border-border/60 bg-background/70 p-6 ring-1 ring-foreground/5 backdrop-blur-sm sm:p-8">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-primary">
                  Votre reste à charge
                </p>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="font-display text-[48px] font-black leading-none tracking-[-0.04em] text-foreground sm:text-[64px]">
                    {cpfPack.monthly}
                  </span>
                  <span className="font-display text-2xl font-bold text-foreground sm:text-3xl">
                    €
                  </span>
                </div>
                <p className="mt-2 font-display text-base font-semibold text-foreground sm:text-lg">
                  par mois <span className="text-muted-foreground">· {cpfPack.subline}</span>
                </p>
                <div className="mt-6 space-y-2 border-t border-border/40 pt-5 text-sm">
                  <div className="flex justify-between gap-4">
                    <span className="text-muted-foreground">Formation</span>
                    <span className="font-semibold text-foreground">{cpfPack.price.toLocaleString('fr-FR')}€</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-muted-foreground">CPF jusqu&apos;à</span>
                    <span className="font-semibold text-primary">− {cpfPack.cpfCovered}€</span>
                  </div>
                  <div className="flex justify-between gap-4 border-t border-border/40 pt-2">
                    <span className="font-medium text-foreground">Reste à charge</span>
                    <span className="font-bold text-foreground">{cpfPack.remaining}€</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Zones kilométriques : tableau */}
      <section className="border-b border-border/60 bg-[oklch(0.975_0.008_220)] dark:bg-[oklch(0.16_0.015_220)]">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <SectionTitle
            eyebrow={zonesSection.eyebrow}
            title={zonesSection.title}
            description={zonesSection.description}
          />

          <div className="mt-14 overflow-hidden rounded-2xl border border-border/80 bg-card/70 shadow-[var(--shadow-sm)] ring-1 ring-foreground/5">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/60 bg-foreground/[0.03]">
                  <th className="px-5 py-4 text-left font-display text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Zone
                  </th>
                  <th className="px-5 py-4 text-left font-display text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Distance au dépôt
                  </th>
                  <th className="px-5 py-4 text-left font-display text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Supplément carburant
                  </th>
                  <th className="px-5 py-4 text-left font-display text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Détail
                  </th>
                </tr>
              </thead>
              <tbody>
                {zones.map((z) => (
                  <tr
                    key={z.code}
                    className="border-b border-border/40 last:border-0 transition-colors hover:bg-foreground/[0.02]"
                  >
                    <td className="px-5 py-4">
                      <span className="inline-flex size-8 items-center justify-center rounded-lg bg-primary/10 font-display text-sm font-semibold text-primary ring-1 ring-primary/15">
                        {z.code}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-medium text-foreground">{z.range}</td>
                    <td className="px-5 py-4 text-foreground/85">
                      {z.surcharge === 0 ? 'Aucun' : `+${z.surcharge}€ par forfait`}
                    </td>
                    <td className="px-5 py-4 text-muted-foreground">{z.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Points de dépôt — design enrichi avec numérotation et fond stylisé */}
      <section className="border-b border-border/60 bg-background">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <SectionTitle
            eyebrow={deposits.eyebrow}
            title={deposits.title}
            description={deposits.description}
          />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
            }}
            className="mt-14 grid gap-5 md:grid-cols-2"
          >
            {depositPoints.map((p, i) => (
              <motion.div
                key={p.name}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
                }}
                className="group relative overflow-hidden rounded-3xl border border-border/80 bg-card/70 p-7 shadow-[var(--shadow-sm)] ring-1 ring-foreground/5 backdrop-blur-sm transition-[border-color,box-shadow] duration-500 ease-out hover:border-primary/30 hover:shadow-[0_20px_50px_-20px_oklch(0.62_0.10_200/0.25)] sm:p-8"
              >
                {/* Gros chiffre fantôme en arrière-plan */}
                <span
                  className="pointer-events-none absolute -right-3 -top-8 select-none font-display text-[140px] font-bold leading-none text-primary/[0.07] transition-colors duration-700 ease-out group-hover:text-primary/[0.13] sm:-right-2 sm:text-[160px]"
                  aria-hidden
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Halo dégradé subtil */}
                <span
                  className="pointer-events-none absolute -left-12 -top-12 size-32 rounded-full bg-primary/10 blur-3xl transition-opacity duration-700 group-hover:opacity-100 opacity-60"
                  aria-hidden
                />

                {/* Pin icon en relief */}
                <div className="relative flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-[inset_0_1px_0_oklch(1_0_0/0.3)] ring-1 ring-primary/20">
                  <MapPin className="size-6" aria-hidden />
                </div>

                {/* Label étape */}
                <p className="relative mt-5 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-primary/70">
                  Point de dépôt · {String(i + 1).padStart(2, '0')}
                </p>

                {/* Nom du point */}
                <h3 className="relative mt-2 font-display text-xl font-semibold leading-tight tracking-tight text-foreground sm:text-2xl">
                  {p.name}
                </h3>

                {/* Adresse + horaires avec dots de séparation */}
                <div className="relative mt-5 space-y-3 border-t border-border/50 pt-5">
                  <div className="flex items-start gap-3">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary/50 ring-2 ring-primary/15" aria-hidden />
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {p.address}
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary/50 ring-2 ring-primary/15" aria-hidden />
                    <p className="text-sm font-medium leading-relaxed text-foreground/85">
                      {p.hours}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Financements */}
      <section className="border-b border-border/60 bg-[oklch(0.975_0.008_220)] dark:bg-[oklch(0.16_0.015_220)]">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <SectionTitle eyebrow={funding.eyebrow} title={funding.title} />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
            }}
            className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {funding.items.map((it) => (
              <motion.div
                key={it.title}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
                }}
                className="rounded-2xl border border-border/80 bg-card/70 p-5 shadow-[var(--shadow-sm)] ring-1 ring-foreground/5"
              >
                <h3 className="font-display text-sm font-semibold text-foreground">
                  {it.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {it.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Conditions : qui peut en bénéficier */}
      <section className="border-b border-border/60 bg-background">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <SectionTitle
            eyebrow={conditions.eyebrow}
            title={conditions.title}
            description={conditions.description}
          />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
            }}
            className="mt-14 grid gap-5 md:grid-cols-3"
          >
            {conditions.groups.map((g, i) => {
              const Icon = getIcon(g.iconName ?? defaults.conditions.groups[i]?.iconName)
              return (
                <motion.div
                  key={g.title}
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
                  }}
                  className="rounded-2xl border border-border/80 bg-card/70 p-6 shadow-[var(--shadow-sm)] ring-1 ring-foreground/5"
                >
                  <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="mt-4 font-display text-base font-semibold text-foreground">
                    {g.title}
                  </h3>
                  <ul className="mt-4 space-y-2.5">
                    {g.items.map((item: string) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-foreground/85">
                        <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                          <Check className="size-3" aria-hidden />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )
            })}
          </motion.div>

          <div className="mt-12 text-center">
            <Button asChild size="lg" className="rounded-xl">
              <Link href="/contact">Vérifier mon éligibilité</Link>
            </Button>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  )
}
