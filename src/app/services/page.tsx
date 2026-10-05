import type { Metadata } from 'next'

import { ServicesContent } from './services-content'
import {
  breadcrumbJsonLd,
  serviceJsonLd,
  webPageJsonLd,
} from '@/components/seo/json-ld'
import { servicesContent } from '@/lib/site-content'

const description =
  'Location de véhicule pédagogique à double commande en Moselle : Pack 5h, 10h, 20h et option CPF. Tarifs par zone, paiement en 3 fois.'

// Données structurées : les packs réellement proposés sur la page.
const services = [
  ...servicesContent.pricing.plans.map((p) => ({ title: p.name, desc: p.description })),
  { title: servicesContent.cpfPack.name, desc: servicesContent.cpfPack.description },
]

export const metadata: Metadata = {
  title: 'Services',
  description,
  alternates: { canonical: '/services' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    webPageJsonLd('Services', description, '/services'),
    breadcrumbJsonLd([
      { name: 'Accueil', path: '/' },
      { name: 'Services', path: '/services' },
    ]),
    ...services.map((s) => serviceJsonLd(s.title, s.desc, '/services')),
  ],
}

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServicesContent />
    </>
  )
}
