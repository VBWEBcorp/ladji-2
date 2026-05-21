import type { Metadata } from 'next'

import { PrescriberContent } from './prescriber-content'

export const metadata: Metadata = {
  title: 'Prescripteurs',
  description:
    "Espace dédié aux prescripteurs Auto Conduite (France Travail, Missions Locales, GEIQ, services sociaux). Formulaire d'orientation 5 champs, fiche synthétique, reporting anonymisé.",
  alternates: { canonical: '/prescripteurs' },
}

export default function PrescriberPage() {
  return <PrescriberContent />
}
