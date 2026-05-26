import { siteConfig } from '@/lib/seo'

/**
 * Numéro WhatsApp Business officiel Auto Conduite, au format international
 * sans le « + » (requis par wa.me). Ex : 06 37 53 43 26 -> 33637534326
 */
export const whatsappNumber = (() => {
  const digits = siteConfig.phone.replace(/\D/g, '')
  return digits.startsWith('0') ? `33${digits.slice(1)}` : digits
})()

/** Lien cliquable de base : https://wa.me/33637534326 */
export const whatsappBaseHref = `https://wa.me/${whatsappNumber}`

/**
 * Lien WhatsApp avec message pré-rempli (recommandé pour les pages Forfaits
 * et Contact). Sans message, renvoie le lien cliquable de base.
 */
export function whatsappHref(message?: string) {
  if (!message) return whatsappBaseHref
  return `${whatsappBaseHref}?text=${encodeURIComponent(message)}`
}

/** Messages pré-remplis par contexte. */
export const whatsappMessages = {
  forfaits: 'Bonjour, je souhaite avoir des informations sur vos forfaits.',
  contact: 'Bonjour, je souhaite avoir des informations sur Auto Conduite.',
} as const

/** Libellé du bouton recommandé par le cahier des charges. */
export const whatsappButtonLabel = 'Nous contacter sur WhatsApp'
