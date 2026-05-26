import type { Metadata } from 'next'

import { QuizContent } from './quiz-content'

// Accès restreint (lien unique envoyé après validation manuelle du dossier).
// On retire la page de l'index des moteurs de recherche.
export const metadata: Metadata = {
  title: 'Quiz de validation accompagnateur',
  description:
    "Quiz de validation du briefing sécurité accompagnateur Auto Conduite. Score minimum 80%.",
  robots: { index: false, follow: false },
  alternates: { canonical: '/accompagnateur/quiz' },
}

export default function QuizPage() {
  return <QuizContent />
}
