'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, Download, Loader2, Mail, Phone, Send } from 'lucide-react'
import Link from 'next/link'
import { useRef, useState } from 'react'

import { CtaSection } from '@/components/sections/cta-section'
import { PremiumHero } from '@/components/sections/premium-hero'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SectionTitle } from '@/components/ui/section-title'
import { useContent } from '@/hooks/use-content'
import { getIcon } from '@/lib/icons'
import { images as siteImages, prescriberContent } from '@/lib/site-content'

const ease = [0.22, 1, 0.36, 1] as const
const defaults = prescriberContent

export function PrescriberContent() {
  const { data } = useContent('prescribers', defaults)
  const hero = data.hero ?? defaults.hero
  const benefits = (data.benefits ?? defaults.benefits) as typeof defaults.benefits
  const form = (data.form ?? defaults.form) as typeof defaults.form
  const clauses = (data.clauses ?? defaults.clauses) as typeof defaults.clauses
  const contact = (data.contact ?? defaults.contact) as typeof defaults.contact

  // Envoi du formulaire d'orientation vers /api/prescripteur (webhook Make dédié).
  const [etat, setEtat] = useState<'saisie' | 'envoi' | 'envoye' | 'erreur'>('saisie')
  const [erreur, setErreur] = useState('')
  const affiche = useRef(Date.now())

  async function envoyer(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    setEtat('envoi')
    setErreur('')
    try {
      const res = await fetch('/api/prescripteur', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({
          ...Object.fromEntries(form.fields.map((fl) => [fl.name, f.get(fl.name)])),
          consentement: f.get('consentement') === 'oui',
          site_web: f.get('site_web'),
          t: Date.now() - affiche.current,
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data?.error || 'Envoi impossible.')
      setEtat('envoye')
    } catch (err) {
      setEtat('erreur')
      setErreur((err as Error).message)
    }
  }

  return (
    <>
      <PremiumHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        breadcrumb="Prescripteurs"
        compact
        backgroundImage={siteImages.contactHero}
      />

      {/* Bénéfices pour le prescripteur */}
      <section className="border-b border-border/60 bg-background">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <SectionTitle
            eyebrow="Vos avantages"
            title="Un dispositif clé en main"
            description="Auto Conduite simplifie la levée du frein mobilité pour les bénéficiaires que vous accompagnez."
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
            {benefits.map((b, i) => {
              const Icon = getIcon(b.iconName ?? defaults.benefits[i]?.iconName)
              return (
                <motion.div
                  key={b.title}
                  variants={{
                    hidden: { opacity: 0, y: 18 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
                  }}
                  className="rounded-2xl border border-border/80 bg-card/70 p-6 shadow-[var(--shadow-sm)] ring-1 ring-foreground/5 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-md)]"
                >
                  <span className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/15">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="mt-5 font-display text-base font-semibold text-foreground">
                    {b.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {b.desc}
                  </p>
                  {(b as any).action && (
                    <a
                      href={(b as any).action.href}
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80 aria-disabled:pointer-events-none aria-disabled:opacity-60"
                      aria-disabled={(b as any).action.disabled}
                    >
                      <Download className="size-3.5" aria-hidden />
                      {(b as any).action.label}
                    </a>
                  )}
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Processus 3 étapes (cf. brief Ouibo : "processus 3 étapes") */}
      <section className="border-b border-border/60 bg-background">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <SectionTitle
            eyebrow="Le processus"
            title="Orientation en 3 étapes"
            description="Du formulaire à la première séance du bénéficiaire, un parcours rapide et clair pour vous."
          />

          <div className="relative mt-16">
            {/* Ligne horizontale dégradée derrière (desktop) */}
            <div
              className="pointer-events-none absolute left-12 right-12 top-6 hidden h-px bg-gradient-to-r from-primary/40 via-primary/30 to-primary/10 md:block"
              aria-hidden
            />

            <motion.ol
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
              }}
              className="grid gap-6 md:grid-cols-3"
            >
              {[
                {
                  step: '01',
                  title: 'Vous remplissez le formulaire',
                  desc: 'Formulaire en ligne de 5 champs maximum. Identité du bénéficiaire, profil, type de besoin. 2 minutes chrono.',
                },
                {
                  step: '02',
                  title: 'On contacte votre bénéficiaire',
                  desc: 'Réponse sous 24h ouvrées. On qualifie son éligibilité, on lui présente le dispositif et on monte son dossier de financement.',
                },
                {
                  step: '03',
                  title: 'Vous recevez le suivi',
                  desc: "Confirmation de la prise en charge, puis point d'étape sur simple demande.",
                },
              ].map((item) => (
                <motion.li
                  key={item.step}
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
                  }}
                  className="relative flex flex-col rounded-3xl border border-border/80 bg-card/70 p-7 shadow-[var(--shadow-sm)] ring-1 ring-foreground/5 backdrop-blur-sm"
                >
                  {/* Pastille numérotée */}
                  <span className="flex size-12 items-center justify-center rounded-full bg-primary font-display text-sm font-bold text-primary-foreground shadow-[0_8px_24px_-8px_oklch(0.62_0.10_200/0.55)] ring-4 ring-background">
                    {item.step}
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {item.desc}
                  </p>
                </motion.li>
              ))}
            </motion.ol>
          </div>
        </div>
      </section>

      {/* Formulaire d'orientation (5 champs) */}
      <section className="border-b border-border/60 bg-[oklch(0.975_0.008_220)] dark:bg-[oklch(0.16_0.015_220)]">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease }}
            >
              <p className="font-display text-xs font-semibold tracking-[0.22em] uppercase text-primary">
                {form.eyebrow}
              </p>
              <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                {form.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                {form.description}
              </p>

              {etat === 'envoye' ? (
                <div className="mt-8 flex items-start gap-3 rounded-3xl border border-primary/30 bg-primary/[0.05] p-7 text-sm leading-relaxed text-foreground">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                  <p>
                    Merci, l&apos;orientation est bien envoyée. M. Faé contacte votre
                    bénéficiaire sous 24h ouvrées.
                  </p>
                </div>
              ) : (
              <form
                className="mt-8 space-y-5 rounded-3xl border border-border/80 bg-card/70 p-7 shadow-[var(--shadow-sm)] ring-1 ring-foreground/5 sm:p-9"
                onSubmit={envoyer}
              >
                {form.fields.map((f) => (
                  <div key={f.name} className="space-y-2">
                    <Label htmlFor={f.name}>{f.label}</Label>
                    {f.type === 'textarea' ? (
                      <textarea
                        id={f.name}
                        name={f.name}
                        placeholder={f.placeholder}
                        rows={4}
                        className="w-full rounded-xl border border-input bg-background/70 px-3.5 py-3 text-sm leading-relaxed text-foreground transition-shadow placeholder:text-muted-foreground focus-visible:border-ring focus-visible:shadow-[0_0_0_4px_oklch(0.62_0.10_200/0.1)] focus-visible:outline-none"
                      />
                    ) : (
                      <Input
                        id={f.name}
                        name={f.name}
                        required
                        placeholder={f.placeholder}
                        className="h-11 rounded-xl bg-background/70 transition-shadow focus-visible:shadow-[0_0_0_4px_oklch(0.62_0.10_200/0.1)]"
                      />
                    )}
                  </div>
                ))}

                {/* Champ piège pour les robots : invisible pour les visiteurs. */}
                <div className="hidden" aria-hidden>
                  <label htmlFor="site_web_prescripteur">Site web</label>
                  <input id="site_web_prescripteur" name="site_web" type="text" tabIndex={-1} autoComplete="off" />
                </div>

                <label className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
                  <input type="checkbox" name="consentement" value="oui" required className="mt-1 size-4 shrink-0 accent-[oklch(0.62_0.10_200)]" />
                  <span>
                    J&apos;accepte que ces informations soient utilisées pour traiter
                    l&apos;orientation et recontacter le bénéficiaire, avec son accord.
                    Voir la{' '}
                    <Link href="/politique-de-confidentialite" className="font-medium text-primary underline underline-offset-4">
                      politique de confidentialité
                    </Link>
                    .
                  </span>
                </label>

                {etat === 'erreur' && (
                  <p role="alert" className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                    {erreur} Vous pouvez aussi appeler le 06 37 53 43 26.
                  </p>
                )}

                <Button type="submit" size="lg" className="w-full" disabled={etat === 'envoi'}>
                  {etat === 'envoi' ? (
                    <>
                      <Loader2 className="size-4 animate-spin" aria-hidden /> Envoi en cours…
                    </>
                  ) : (
                    <>
                      {form.submitLabel}
                      <Send className="size-4" aria-hidden />
                    </>
                  )}
                </Button>
              </form>
              )}
            </motion.div>

            {/* Contacts directs M. Faé */}
            <motion.aside
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease, delay: 0.08 }}
              className="space-y-5"
            >
              <div className="rounded-3xl border border-border/80 bg-card/70 p-7 shadow-[var(--shadow-sm)] ring-1 ring-foreground/5">
                <h3 className="font-display text-base font-semibold tracking-tight text-foreground">
                  {contact.title}
                </h3>
                <p className="mt-3 text-sm font-semibold text-foreground">{contact.name}</p>
                <ul className="mt-4 space-y-3 text-sm">
                  <li>
                    <a
                      href={`tel:${contact.phone.replace(/\s+/g, '')}`}
                      className="group inline-flex items-center gap-2 text-foreground transition-colors hover:text-primary"
                    >
                      <Phone className="size-4 text-primary" aria-hidden />
                      {contact.phone}
                    </a>
                  </li>
                  <li>
                    <a
                      href={`mailto:${contact.email}`}
                      className="group inline-flex items-center gap-2 text-foreground transition-colors hover:text-primary"
                    >
                      <Mail className="size-4 text-primary" aria-hidden />
                      {contact.email}
                    </a>
                  </li>
                </ul>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>

      {/* Clauses sociales */}
      <section className="border-b border-border/60 bg-background">
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <p className="font-display text-xs font-semibold tracking-[0.22em] uppercase text-primary">
            Clauses sociales
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {clauses.title}
          </h2>
          <div className="mt-6 space-y-4">
            {clauses.paragraphs.map((p, i) => (
              <p key={i} className="text-base leading-relaxed text-muted-foreground">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  )
}
