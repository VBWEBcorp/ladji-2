import type { Metadata } from 'next'

import { HowItWorksContent } from './how-it-works-content'

export const metadata: Metadata = {
  title: 'Comment ça marche',
  description:
    "Le parcours bénéficiaire Auto Conduite : NEPH → code → forfait → paiement → briefing → réservation → séance. Tout est expliqué pas à pas.",
  alternates: { canonical: '/comment-ca-marche' },
}

export default function HowItWorksPage() {
  return <HowItWorksContent />
}
