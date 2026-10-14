import type { Metadata } from 'next'

import { PrescriberContent } from './prescriber-content'

export const metadata: Metadata = {
  title: 'Prescripteurs',
  description:
    "Page dédiée aux prescripteurs Auto Conduite (France Travail, Missions Locales, GEIQ, services sociaux). Formulaire d'orientation, fiche synthétique, suivi sur demande, réponse sous 24h ouvrées.",
  alternates: { canonical: '/prescripteurs' },
}

export default function PrescriberPage() {
  return <PrescriberContent />
}
