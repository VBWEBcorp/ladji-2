import type { Metadata } from 'next'

import { FounderContent } from './founder-content'

export const metadata: Metadata = {
  title: 'Kah Faé · Fondateur Auto Conduite Moselle',
  description:
    "Kah Faé est le fondateur d'Auto Conduite, dispositif de mobilité solidaire basé en Moselle. Découvrez son parcours et la mission du projet.",
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
