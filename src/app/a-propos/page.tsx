import type { Metadata } from 'next'

import { AboutContent } from './about-content'
import { breadcrumbJsonLd, webPageJsonLd } from '@/components/seo/json-ld'

const description =
  "Auto Conduite, mobilité solidaire en Moselle : location de véhicules à double commande pour s'entraîner à la conduite avec un proche, dans un cadre légal et assuré."

export const metadata: Metadata = {
  title: 'À propos',
  description,
  alternates: { canonical: '/a-propos' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    webPageJsonLd('À propos', description, '/a-propos'),
    breadcrumbJsonLd([
      { name: 'Accueil', path: '/' },
      { name: 'À propos', path: '/a-propos' },
    ]),
  ],
}

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutContent />
    </>
  )
}
