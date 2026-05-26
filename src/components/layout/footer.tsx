import { Mail, MapPin, Phone } from 'lucide-react'
import Link from 'next/link'

import { Logo } from '@/components/layout/logo'
import { siteConfig } from '@/lib/seo'

const navLinks = [
  { label: 'Accueil', to: '/' },
  { label: 'Comment ça marche', to: '/comment-ca-marche' },
  { label: 'Forfaits', to: '/services' },
  { label: 'Financement', to: '/financement' },
  { label: 'À propos', to: '/a-propos' },
  { label: 'Le fondateur', to: '/fondateur' },
  { label: 'Contact', to: '/contact' },
]

const audienceLinks = [
  { label: 'Accompagnateur proche', to: '/accompagnateur' },
  { label: 'Prescripteurs', to: '/prescripteurs' },
  { label: 'Partenaires', to: '/partenaires' },
]

const legalLinks = [
  { label: 'Cadre légal', to: '/cadre-legal' },
  { label: 'Mentions légales', to: '/mentions-legales' },
  { label: 'Politique de confidentialité', to: '/politique-de-confidentialite' },
  { label: 'Conditions générales', to: '/conditions-generales' },
  { label: 'Politique de cookies', to: '/politique-cookies' },
  { label: 'Accessibilité', to: '/accessibilite' },
]

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Top: brand + nav columns */}
        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] lg:gap-12">
          {/* Brand + contact */}
          <div className="space-y-5">
            <Logo />
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              Auto Conduite, pour toutes les bourses. Mobilité solidaire en
              Moselle : location de véhicules pédagogiques à double commande
              pour les personnes en parcours d&apos;insertion.
            </p>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="group inline-flex items-center gap-2.5 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Phone className="size-4 text-primary" aria-hidden />
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="group inline-flex items-center gap-2.5 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Mail className="size-4 text-primary" aria-hidden />
                  {siteConfig.email}
                </a>
              </li>
              <li className="inline-flex items-center gap-2.5 text-muted-foreground">
                <MapPin className="size-4 text-primary" aria-hidden />
                {siteConfig.address.street}, {siteConfig.address.postalCode}{' '}
                {siteConfig.address.city}
              </li>
            </ul>
          </div>

          {/* Navigation */}
          <nav aria-label="Navigation">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/80">
              Navigation
            </h3>
            <ul className="mt-5 space-y-3">
              {navLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.to}
                    className="group inline-flex items-center gap-1 text-sm text-foreground/80 transition-colors hover:text-foreground"
                  >
                    <span className="relative">
                      {l.label}
                      <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-foreground/70 transition-transform duration-300 group-hover:scale-x-100" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Pour vous (audiences spécifiques) */}
          <nav aria-label="Audiences">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/80">
              Pour vous
            </h3>
            <ul className="mt-5 space-y-3">
              {audienceLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.to}
                    className="group inline-flex items-center gap-1 text-sm text-foreground/80 transition-colors hover:text-foreground"
                  >
                    <span className="relative">
                      {l.label}
                      <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-foreground/70 transition-transform duration-300 group-hover:scale-x-100" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Legal */}
          <nav aria-label="Légal">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/80">
              Légal
            </h3>
            <ul className="mt-5 space-y-3">
              {legalLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.to}
                    className="group inline-flex items-center gap-1 text-sm text-foreground/80 transition-colors hover:text-foreground"
                  >
                    <span className="relative">
                      {l.label}
                      <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-foreground/70 transition-transform duration-300 group-hover:scale-x-100" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Divider */}
        <div className="border-t border-border/40" />

        {/* Bottom bar */}
        <div className="flex flex-col items-start justify-between gap-3 py-6 sm:flex-row sm:items-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {siteConfig.name}. Tous droits réservés.
          </p>
          <div className="flex items-center gap-5 text-xs text-muted-foreground">
            <Link href="/mentions-legales" className="transition-colors hover:text-foreground">
              Mentions légales
            </Link>
            <Link href="/politique-de-confidentialite" className="transition-colors hover:text-foreground">
              Confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
