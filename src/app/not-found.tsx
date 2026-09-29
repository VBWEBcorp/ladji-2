import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

/**
 * Page 404.
 *
 * Clin d'œil à l'auto-école : une page manquée, comme un panneau qu'on rate.
 * La barre de navigation et le pied de page viennent de RootWrapper, monté
 * dans le layout racine.
 */

const sorties = [
  { to: '/comment-ca-marche', label: 'Comment ça marche' },
  { to: '/services', label: 'Forfaits' },
  { to: '/financement', label: 'Financement' },
  { to: '/contact', label: 'Contact' },
]

export default function NotFound() {
  return (
    <section className="flex min-h-[72vh] items-center justify-center px-5 py-24">
      <div className="mx-auto max-w-xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
          Erreur 404
        </p>

        <h1 className="mt-6 text-4xl font-bold leading-[1.12] tracking-tight text-foreground sm:text-5xl">
          Vous avez raté
          <span className="block text-primary">la sortie</span>
        </h1>

        <p className="mx-auto mt-6 max-w-md text-pretty text-[17px] leading-relaxed text-muted-foreground">
          Cette page n&apos;existe pas, ou elle a changé d&apos;adresse. Pas de
          panique, ça ne compte pas comme une faute éliminatoire.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/">Retour à l&apos;accueil</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/contact">Nous contacter</Link>
          </Button>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {sorties.map((s) => (
            <Link
              key={s.to}
              href={s.to}
              className="group inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {s.label}
              <ArrowRight
                className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
