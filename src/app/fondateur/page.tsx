import type { Metadata } from 'next'

import { FounderContent } from './founder-content'

export const metadata: Metadata = {
  title: 'Kah Faé · Fondateur Auto Conduite Moselle',
  description:
    "Kah Faé, fondateur d'Auto Conduite en Moselle : première structure alliant location de véhicule pédagogique à double commande et accompagnement à l'insertion professionnelle.",
  alternates: { canonical: '/fondateur' },
  keywords: [
    'Kah Faé',
    'fondateur Auto Conduite',
    'mobilité solidaire Moselle',
    'permis Sarrebourg',
  ],
}

export default function FounderPage() {
  return <FounderContent />
}
