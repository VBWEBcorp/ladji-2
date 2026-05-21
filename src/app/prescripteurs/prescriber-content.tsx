'use client'

import { motion } from 'framer-motion'
import { Download, Mail, Phone, Send } from 'lucide-react'

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
  const space = (data.space ?? defaults.space) as typeof defaults.space
  const clauses = (data.clauses ?? defaults.clauses) as typeof defaults.clauses
  const contact = (data.contact ?? defaults.contact) as typeof defaults.contact

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

      {/* Formulaire d'orientation (5 champs) */}
      <section className="border-b border-border/60 bg-[oklch(0.975_0.012_285)] dark:bg-[oklch(0.16_0.02_285)]">
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

              <form
                className="mt-8 space-y-5 rounded-3xl border border-border/80 bg-card/70 p-7 shadow-[var(--shadow-sm)] ring-1 ring-foreground/5 sm:p-9"
                onSubmit={(e) => e.preventDefault()}
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
                        className="w-full rounded-xl border border-input bg-background/70 px-3.5 py-3 text-sm leading-relaxed text-foreground transition-shadow placeholder:text-muted-foreground focus-visible:border-ring focus-visible:shadow-[0_0_0_4px_oklch(0.55_0.2_285/0.1)] focus-visible:outline-none"
                      />
                    ) : (
                      <Input
                        id={f.name}
                        name={f.name}
                        placeholder={f.placeholder}
                        className="h-11 rounded-xl bg-background/70 transition-shadow focus-visible:shadow-[0_0_0_4px_oklch(0.55_0.2_285/0.1)]"
                      />
                    )}
                  </div>
                ))}
                <Button type="submit" size="lg" className="w-full">
                  {form.submitLabel}
                  <Send className="size-4" aria-hidden />
                </Button>
              </form>
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

              {/* Espace prescripteur (à venir) */}
              <div className="rounded-3xl border border-border/80 bg-card/70 p-7 shadow-[var(--shadow-sm)] ring-1 ring-foreground/5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-base font-semibold tracking-tight text-foreground">
                    {space.title}
                  </h3>
                  <span className="rounded-full bg-amber-500/10 px-2.5 py-1 text-[11px] font-semibold text-amber-600 ring-1 ring-amber-500/20 dark:bg-amber-500/15 dark:text-amber-300">
                    {space.status}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {space.description}
                </p>
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
