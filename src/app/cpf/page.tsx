import type { Metadata } from 'next'

import { CpfContent } from './cpf-content'

export const metadata: Metadata = {
  title: 'Financer son permis avec le CPF en Moselle · 183€/mois',
  description:
    "Option CPF via ADAM : formation de 20 heures minimum à 1 450€, dispensée par ADAM, organisme agréé (moniteur agréé). CPF jusqu'à 900€, reste à charge 550€ payable en 3 fois sans frais (183€/mois).",
  alternates: { canonical: '/cpf' },
  keywords: [
    'permis CPF Moselle',
    'financer permis CPF Sarrebourg',
    'reste à charge CPF permis 2026',
    'option CPF ADAM 57',
    'complément CPF permis conduire',
  ],
}

export default function CpfPage() {
  return <CpfContent />
}
