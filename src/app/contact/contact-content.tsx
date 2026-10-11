'use client'

import { motion } from 'framer-motion'
import { Mail, MapPin, Phone } from 'lucide-react'

import { DemandeForm } from '@/components/demande-form'
import { PremiumHero } from '@/components/sections/premium-hero'
import { WhatsAppButton } from '@/components/whatsapp-button'
import { useContent } from '@/hooks/use-content'
import { siteConfig } from '@/lib/seo'
import { contactContent, images as siteImages } from '@/lib/site-content'
import { whatsappMessages } from '@/lib/whatsapp'

const ease = [0.22, 1, 0.36, 1] as const

const defaults = {
  hero: contactContent.hero,
  form: contactContent.form,
}

export function ContactContent() {
  const { data } = useContent('contact', defaults)
  const hero = data.hero ?? defaults.hero
  const form = data.form ?? defaults.form

  return (
    <>
      <PremiumHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        breadcrumb="Contact"
        compact
        backgroundImage={siteImages.contactHero}
      />

      <section className="border-b border-border/60 bg-background">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            {/* Form card */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease }}
            >
              <div className="relative overflow-hidden rounded-3xl bg-card/90 p-7 shadow-[0_20px_50px_-20px_oklch(0.2_0.02_264/0.25)] backdrop-blur-sm sm:p-9">
                <div
                  className="pointer-events-none absolute inset-0 rounded-3xl p-px"
                  aria-hidden
                  style={{
                    background:
                      'linear-gradient(135deg, oklch(0.62 0.10 200 / 0.35) 0%, oklch(0.91 0.012 264 / 0.5) 50%, oklch(0.62 0.10 200 / 0.35) 100%)',
                    WebkitMask:
                      'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                  }}
                />
                <div className="relative">
                  <h2 className="font-display text-lg font-semibold tracking-tight text-foreground">
                    {form.title}
                  </h2>

                  <DemandeForm submitLabel={form.submitLabel} />

                  <div className="mt-7 space-y-1.5 border-t border-border/50 pt-6 text-sm leading-relaxed text-muted-foreground">
                    <p>
                      Vous échangez directement avec M. Faé, fondateur d&apos;Auto Conduite.
                      Réponse sous 24h ouvrées.
                    </p>
                    <p>
                      <a
                        href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`}
                        className="font-medium text-foreground transition-colors hover:text-primary"
                      >
                        {siteConfig.phone}
                      </a>{' '}
                      (appel ou WhatsApp) ·{' '}
                      <a
                        href={`mailto:${siteConfig.email}`}
                        className="font-medium text-foreground transition-colors hover:text-primary"
                      >
                        {siteConfig.email}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Sidebar contact info */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease, delay: 0.06 }}
              className="space-y-5"
            >
              <div className="relative overflow-hidden rounded-3xl bg-card/90 p-7 shadow-[0_10px_30px_-12px_oklch(0.2_0.02_264/0.18)] backdrop-blur-sm">
                <div
                  className="pointer-events-none absolute inset-0 rounded-3xl p-px"
                  aria-hidden
                  style={{
                    background:
                      'linear-gradient(135deg, oklch(0.62 0.10 200 / 0.35) 0%, oklch(0.91 0.012 264 / 0.5) 50%, oklch(0.62 0.10 200 / 0.35) 100%)',
                    WebkitMask:
                      'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                  }}
                />

                <div className="relative space-y-5">
                  <a
                    href={`tel:${siteConfig.phone}`}
                    className="group flex items-start gap-4 -mx-3 rounded-xl px-3 py-2 transition-colors hover:bg-foreground/[0.04]"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20 transition-transform duration-300 group-hover:scale-105">
                      <Phone className="size-4" aria-hidden />
                    </span>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">Téléphone</p>
                      <p className="text-sm font-semibold text-foreground">{siteConfig.phone}</p>
                    </div>
                  </a>

                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="group flex items-start gap-4 -mx-3 rounded-xl px-3 py-2 transition-colors hover:bg-foreground/[0.04]"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20 transition-transform duration-300 group-hover:scale-105">
                      <Mail className="size-4" aria-hidden />
                    </span>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">Email</p>
                      <p className="text-sm font-semibold text-foreground break-all">
                        {siteConfig.email}
                      </p>
                    </div>
                  </a>

                  <div className="flex items-start gap-4 -mx-3 rounded-xl px-3 py-2">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
                      <MapPin className="size-4" aria-hidden />
                    </span>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">Adresse</p>
                      <p className="text-sm font-semibold text-foreground">
                        {siteConfig.address.street}
                        <br />
                        {siteConfig.address.postalCode} {siteConfig.address.city}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-border/50 pt-5">
                    <WhatsAppButton
                      message={whatsappMessages.contact}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
