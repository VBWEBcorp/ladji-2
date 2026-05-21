import type { Metadata } from 'next'
import Link from 'next/link'

import { breadcrumbJsonLd, webPageJsonLd } from '@/components/seo/json-ld'
import { Breadcrumb } from '@/components/ui/breadcrumb'

const description =
  "Les partenaires institutionnels d'Auto Conduite en Moselle : France Travail, Missions Locales, Région Grand Est, GEIQ Alemploi, ADAM, ADIE Lorraine, Département de la Moselle."

export const metadata: Metadata = {
  title: 'Partenaires',
  description,
  alternates: { canonical: '/partenaires' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    webPageJsonLd('Partenaires', description, '/partenaires'),
    breadcrumbJsonLd([
      { name: 'Accueil', path: '/' },
      { name: 'Partenaires', path: '/partenaires' },
    ]),
  ],
}

type Partner = {
  name: string
  role: string
  desc: string
  link?: { label: string; href: string }
}

const partners: Partner[] = [
  {
    name: 'France Travail',
    role: 'Orientation et aide mobilité',
    desc: "Premier opérateur du service public de l'emploi. Les conseillers France Travail orientent les demandeurs d'emploi vers Auto Conduite et peuvent mobiliser l'aide à la mobilité (jusqu'à 1 200 €) dans le cadre d'un projet de retour à l'emploi.",
    link: { label: 'francetravail.fr', href: 'https://www.francetravail.fr' },
  },
  {
    name: 'Missions Locales',
    role: 'Accompagnement des 16-25 ans',
    desc: "Les Missions Locales accompagnent les jeunes de 16 à 25 ans en parcours d'insertion. La Mission Locale Sud Mosellan est notre interlocuteur de référence sur le bassin Sarrebourg / Château-Salins. Mobilisation possible du Fonds d'Aide aux Jeunes (FAJ).",
    link: { label: 'mission-locale.fr', href: 'https://www.mission-locale.fr' },
  },
  {
    name: 'Région Grand Est',
    role: 'Politiques régionales de mobilité',
    desc: "La Région Grand Est porte des politiques de mobilité solidaire en lien avec les acteurs de l'insertion. Auto Conduite s'inscrit dans cette dynamique régionale de levée du frein mobilité.",
    link: { label: 'grandest.fr', href: 'https://www.grandest.fr' },
  },
  {
    name: 'GEIQ Alemploi',
    role: 'Insertion par l\'emploi',
    desc: "Le GEIQ Alemploi est un groupement d'employeurs pour l'insertion et la qualification, présent sur le territoire mosellan. Notre dispositif est mobilisable pour les salariés en parcours, en cofinancement employeur.",
    link: { label: 'lesgeiq.fr', href: 'https://www.lesgeiq.fr' },
  },
  {
    name: 'ADAM',
    role: 'Portage CPF',
    desc: "ADAM est notre partenaire de portage CPF : c'est elle qui rend le Pack 20h Auto Conduite finançable via le Compte Personnel de Formation (moncompteformation.gouv.fr).",
    link: { label: 'moncompteformation.gouv.fr', href: 'https://www.moncompteformation.gouv.fr' },
  },
  {
    name: 'ADIE Lorraine',
    role: 'Microcrédit personnel',
    desc: "L'ADIE accompagne les personnes éloignées des financements classiques. En Lorraine, elle peut financer le reste à charge d'Auto Conduite pour les bénéficiaires RSA sans solution CPF ni ALMA, via un microcrédit personnel adapté.",
    link: { label: 'adie.org', href: 'https://www.adie.org' },
  },
  {
    name: 'Département de la Moselle',
    role: 'Convention en cours',
    desc: "Une convention est en cours de négociation avec le Département de la Moselle pour un abondement spécifique aux publics du Département (bénéficiaires RSA, ASE, jeunes en insertion). Cette page sera mise à jour à la signature.",
  },
]

export default function PartnersPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumb items={[{ label: 'Partenaires' }]} />

      <section className="border-b border-border/60">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <p className="font-display text-xs font-semibold tracking-[0.22em] uppercase text-primary">
            Écosystème
          </p>
          <h1 className="mt-3 font-display text-3xl tracking-tight text-foreground sm:text-4xl">
            Nos partenaires institutionnels
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Auto Conduite ne fonctionne pas en silo. Notre dispositif s&apos;appuie
            sur un réseau de partenaires publics et associatifs qui orientent,
            financent et accompagnent les bénéficiaires.
          </p>

          <ul className="mt-12 grid gap-4 sm:grid-cols-2">
            {partners.map((p) => (
              <li
                key={p.name}
                className="rounded-2xl border border-border/80 bg-card/70 p-5 shadow-[var(--shadow-sm)] ring-1 ring-foreground/5 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-md)]"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h2 className="font-display text-base font-semibold text-foreground">
                    {p.name}
                  </h2>
                </div>
                <p className="mt-1 font-display text-[11px] font-semibold uppercase tracking-wide text-primary">
                  {p.role}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {p.desc}
                </p>
                {p.link && (
                  <a
                    href={p.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                  >
                    {p.link.label}
                    <span aria-hidden>→</span>
                  </a>
                )}
              </li>
            ))}
          </ul>

          <section className="mt-14 rounded-2xl border border-border/80 bg-card/70 p-7 shadow-[var(--shadow-sm)] ring-1 ring-foreground/5 sm:p-9">
            <h2 className="font-display text-lg font-semibold text-foreground">
              Devenir partenaire
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
              Vous êtes une collectivité, une association, un opérateur d&apos;insertion,
              un bailleur social ou un employeur engagé dans la levée du frein mobilité ?
              Nous sommes ouverts aux conventions de partenariat, cofinancements et
              clauses sociales adossées à notre dispositif.
            </p>
            <p className="mt-4 text-sm font-semibold text-foreground">
              Contact : M. Faé · 06 37 53 43 26 ·{' '}
              <a
                href="mailto:faeladg@icloud.com"
                className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
              >
                faeladg@icloud.com
              </a>
            </p>
            <div className="mt-5">
              <Link
                href="/prescripteurs"
                className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
              >
                Espace prescripteurs <span aria-hidden>→</span>
              </Link>
            </div>
          </section>
        </div>
      </section>
    </>
  )
}
