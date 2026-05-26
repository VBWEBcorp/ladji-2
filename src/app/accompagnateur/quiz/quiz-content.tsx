'use client'

import { QuizFlow } from './quiz-flow'

// Version plein écran du quiz (route directe = cas du lien unique).
// Le même parcours est aussi disponible en pop-up sur la page accompagnateur.
export function QuizContent() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-2xl px-4 pt-28 pb-24 sm:px-6 sm:pt-32 lg:px-8">
        <QuizFlow />
      </div>
    </div>
  )
}
