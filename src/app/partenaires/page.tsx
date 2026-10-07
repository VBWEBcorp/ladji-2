import type { Metadata } from 'next'

import { breadcrumbJsonLd, webPageJsonLd } from '@/components/seo/json-ld'
import { PartnersContent } from './partners-content'

const description =
  "Les partenaires d'Auto Conduite en Moselle : Région Grand Est, GEIQ Alemploi Lorraine et ADAM, et les organismes qui peuvent orienter des bénéficiaires."

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

export default function PartnersPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PartnersContent />
    </>
  )
}
