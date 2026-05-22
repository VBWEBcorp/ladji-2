'use client'

import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, PlayCircle } from 'lucide-react'
import Link from 'next/link'

import { CtaSection } from '@/components/sections/cta-section'
import { PremiumHero } from '@/components/sections/premium-hero'
import { Button } from '@/components/ui/button'
import { SectionTitle } from '@/components/ui/section-title'
import { useContent } from '@/hooks/use-content'
import { getIcon } from '@/lib/icons'
import { howItWorksContent, images as siteImages } from '@/lib/site-content'

const ease = [0.22, 1, 0.36, 1] as const
const defaults = howItWorksContent

export function HowItWorksContent() {
  const { data } = useContent('how-it-works', defaults)
  const hero = data.hero ?? defaults.hero
  const journey = (data.journey ?? defaults.journey) as typeof defaults.journey
  const videos = (data.videos ?? defaults.videos) as typeof defaults.videos
  const accompagnateur = (data.accompagnateur ?? defaults.accompagnateur) as typeof defaults.accompagnateur
  const faq = (data.faq ?? defaults.faq) as typeof defaults.faq

  return (
    <>
      <PremiumHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        breadcrumb="Comment ça marche"
        compact
        backgroundImage={siteImages.servicesHero}
      />

      {/* Parcours bénéficiaire en 7 étapes — timeline verticale */}
      <section className="border-b border-border/60 bg-background">
        <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <SectionTitle
            eyebrow="Le parcours"
            title="7 étapes claires, du NEPH à la première séance"
            description="Vous êtes accompagné à chaque étape. La validation finale par M. Faé se fait sous 24h."
          />

          <div className="relative mt-16">
            {/* Ligne verticale dégradée qui traverse toute la timeline */}
            <div
              className="pointer-events-none absolute left-5 top-2 bottom-2 w-px bg-gradient-to-b from-primary/50 via-primary/30 to-primary/10 sm:left-6"
              aria-hidden
            />

            <motion.ol
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.05 }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
              }}
              className="space-y-6 sm:space-y-8"
            >
              {journey.map((step, i) => {
                const Icon = getIcon(step.iconName ?? defaults.journey[i]?.iconName)
                return (
                  <motion.li
                    key={step.title}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease } },
                    }}
                    className="group relative pl-16 sm:pl-20"
                  >
                    {/* Pastille numérotée sur la ligne */}
                    <span
                      className="absolute left-0 top-0 flex size-11 items-center justify-center rounded-full bg-gradient-to-br from-primary to-[oklch(0.42_0.22_280)] font-display text-sm font-bold text-primary-foreground shadow-[0_8px_24px_-8px_oklch(0.55_0.2_285/0.55)] ring-4 ring-background transition-transform duration-500 ease-out group-hover:scale-110 sm:size-12 sm:text-base"
                      aria-hidden
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    {/* Connecteur horizontal subtil entre pastille et card */}
                    <span
                      className="pointer-events-none absolute left-11 top-5 hidden h-px w-5 bg-gradient-to-r from-primary/30 to-transparent sm:block sm:left-12"
                      aria-hidden
                    />

                    {/* Card contenu */}
                    <div className="relative rounded-2xl border border-border/80 bg-card/70 p-5 shadow-[var(--shadow-sm)] ring-1 ring-foreground/5 backdrop-blur-sm transition-[border-color,box-shadow] duration-500 ease-out group-hover:border-primary/30 group-hover:shadow-[var(--shadow-md)] sm:p-6">
                      <div className="flex items-start gap-3 sm:gap-4">
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15">
                          <Icon className="size-5" aria-hidden />
                        </span>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-display text-base font-semibold leading-tight text-foreground sm:text-lg">
                            {step.title}
                          </h3>
                          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                            {step.desc}
                          </p>
                          {step.link && (
                            <a
                              href={step.link.href}
                              target={step.link.external ? '_blank' : undefined}
                              rel={step.link.external ? 'noopener noreferrer' : undefined}
                              className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                            >
                              {step.link.label}
                              {step.link.external ? (
                                <ArrowUpRight className="size-3.5" aria-hidden />
                              ) : (
                                <ArrowRight className="size-3.5" aria-hidden />
                              )}
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.li>
                )
              })}
            </motion.ol>
          </div>
        </div>
      </section>

      {/* Section vidéos masquée tant que les vidéos ne sont pas tournées (cf. brief Ouibo) */}
      {false && (
        <section className="border-b border-border/60 bg-[oklch(0.975_0.012_285)] dark:bg-[oklch(0.16_0.02_285)]">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
            <SectionTitle
              eyebrow="En vidéo"
              title="Voir le dispositif en action"
              description="Trois vidéos courtes pour comprendre le dispositif et le déroulement d'une séance."
            />
            <div className="mt-14 grid gap-5 md:grid-cols-3">
              {videos.map((v) => (
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
      )}

      {/* Bloc rôle accompagnateur */}
      <section className="border-b border-border/60 bg-background">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, ease }}
            className="relative overflow-hidden rounded-3xl border border-border/80 bg-card/70 p-8 shadow-[var(--shadow-sm)] ring-1 ring-foreground/5 sm:p-12"
          >
            <p className="font-display text-xs font-semibold tracking-[0.22em] uppercase text-primary">
              {accompagnateur.eyebrow}
            </p>
            <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {accompagnateur.title}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {accompagnateur.description}
            </p>
            <div className="mt-6">
              <Button asChild>
                <Link href={accompagnateur.cta.href}>
                  {accompagnateur.cta.label}
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ courte */}
      <section className="border-b border-border/60 bg-[oklch(0.975_0.012_285)] dark:bg-[oklch(0.16_0.02_285)]">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <SectionTitle eyebrow={faq.eyebrow} title={faq.title} />
          <div className="mx-auto mt-14 max-w-3xl divide-y divide-border/60 overflow-hidden rounded-2xl border border-border/80 bg-card/70 shadow-[var(--shadow-sm)] ring-1 ring-foreground/5">
            {faq.items.map((it) => (
              <details key={it.question} className="group">
                <summary className="flex cursor-pointer items-start justify-between gap-4 px-5 py-4 transition-colors hover:bg-foreground/[0.03]">
                  <span className="font-display text-sm font-semibold text-foreground sm:text-base">
                    {it.question}
                  </span>
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform duration-300 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">
                  {it.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Liens utiles (cahier des charges §4.5) */}
      <section className="border-b border-border/60 bg-background">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <SectionTitle
            eyebrow="Pour aller plus loin"
            title="Liens utiles & démarches officielles"
            description="Les ressources externes à connaître pour le NEPH, le code de la route, l'examen et le financement."
          />
          <ul className="mx-auto mt-12 grid max-w-3xl gap-3 sm:grid-cols-2">
            {[
              {
                label: 'Inscription NEPH',
                href: 'https://ants.gouv.fr',
                domain: 'ants.gouv.fr',
                desc: 'Obtenir le NEPH (guide pas à pas)',
              },
              {
                label: 'Code de la route',
                href: 'https://codeclic.fr',
                domain: 'codeclic.fr',
                desc: 'Passage du code en ligne à 17€',
              },
              {
                label: 'Réservation examen',
                href: 'https://ants.gouv.fr',
                domain: 'ants.gouv.fr',
                desc: "Réserver la date de l'examen pratique",
              },
              {
                label: 'CPF',
                href: 'https://moncompteformation.gouv.fr',
                domain: 'moncompteformation.gouv.fr',
                desc: 'Accès au Pack 20h finançable',
              },
              {
                label: 'ADIE Lorraine',
                href: 'https://adie.org',
                domain: 'adie.org',
                desc: 'Microcrédit pour les bénéficiaires RSA',
              },
            ].map((l) => (
              <li key={`${l.label}-${l.href}`}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 rounded-2xl border border-border/80 bg-card/70 p-5 shadow-[var(--shadow-sm)] ring-1 ring-foreground/5 transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15">
                    <ArrowUpRight className="size-4" aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-base font-semibold text-foreground">
                      {l.label}
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                      {l.desc}
                    </span>
                    <span className="mt-1.5 block text-[11px] font-medium uppercase tracking-wide text-primary/85">
                      {l.domain}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaSection />
    </>
  )
}
