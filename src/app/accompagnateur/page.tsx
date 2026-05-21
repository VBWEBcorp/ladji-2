import type { Metadata } from 'next'

import { CompanionContent } from './companion-content'

export const metadata: Metadata = {
  title: 'Accompagnateur proche',
  description:
    "Le rôle de l'accompagnateur proche chez Auto Conduite : conditions (permis B 5 ans+, non suspendu, sobre), ce qu'il peut/ne peut pas faire, guide pédagogique et briefing sécurité.",
  alternates: { canonical: '/accompagnateur' },
}

export default function CompanionPage() {
  return <CompanionContent />
}
