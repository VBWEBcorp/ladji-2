export const siteConfig = {
  name: 'Auto Conduite',
  url: 'https://auto-conduite.com',
  locale: 'fr_FR',
  description:
    "Auto Conduite, pour toutes les bourses. Location de véhicules pédagogiques à double commande en Moselle, pour les personnes en parcours d'insertion.",
  ogImage: 'https://auto-conduite.com/og.png',
  twitterHandle: '@autoconduite',
  themeColor: '#7c6bff',
  phone: '06 37 53 43 26',
  email: 'contact@auto-conduite.com',
  address: {
    street: 'Bassin Sarrebourg / Château-Salins',
    city: 'Moselle',
    postalCode: '57400',
    country: 'FR',
  },
} as const

export type SeoMeta = {
  title?: string
  description?: string
  canonical?: string
  ogImage?: string
  ogType?: 'website' | 'article'
  noindex?: boolean
  jsonLd?: Record<string, unknown>
}

export function buildTitle(page?: string) {
  if (!page) return siteConfig.name
  return `${page} - ${siteConfig.name}`
}

export const routes = [
  '/',
  '/a-propos',
  '/services',
  '/contact',
  '/mentions-legales',
  '/politique-de-confidentialite',
  '/conditions-generales',
  '/politique-cookies',
] as const
