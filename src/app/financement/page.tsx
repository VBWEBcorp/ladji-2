import type { Metadata } from 'next'

import { FundingContent } from './funding-content'

export const metadata: Metadata = {
  title: 'Financement',
  description:
    "Les solutions de financement Auto Conduite : paiement en 3 fois via Klarna, option CPF via ADAM et, selon éligibilité, FAJ ou microcrédit ADIE.",
  alternates: { canonical: '/financement' },
}

export default function FundingPage() {
  return <FundingContent />
}
