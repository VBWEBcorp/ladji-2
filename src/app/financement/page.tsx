import type { Metadata } from 'next'

import { FundingContent } from './funding-content'

export const metadata: Metadata = {
  title: 'Financement',
  description:
    "Toutes les solutions de financement Auto Conduite : CPF via ADAM, ALMA fractionné, aide mobilité France Travail, FAJ Mission Locale, ADIE microcrédit, abondement Département Moselle.",
  alternates: { canonical: '/financement' },
}

export default function FundingPage() {
  return <FundingContent />
}
