'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, PlayCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

import { QuizFlow } from './quiz-flow'

const ease = [0.22, 1, 0.36, 1] as const

export function QuizTrigger({ label = 'Démarrer le briefing et le quiz' }: { label?: string }) {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  // Verrou du scroll de la page + fermeture à la touche Échap.
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-[0_4px_14px_-4px_oklch(0.58_0.10_200/0.45)] transition-shadow hover:shadow-[0_8px_24px_-6px_oklch(0.58_0.10_200/0.6)]"
      >
        <PlayCircle className="size-4" aria-hidden />
        {label}
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
      </button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="fixed inset-0 z-[200] flex items-start justify-center overflow-y-auto bg-foreground/40 p-4 backdrop-blur-sm sm:items-center sm:p-6"
                role="dialog"
                aria-modal="true"
                aria-label="Quiz de validation accompagnateur"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.97, y: 14 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97, y: 14 }}
                  transition={{ duration: 0.3, ease }}
                  className="relative my-auto w-full max-w-2xl rounded-3xl border border-border/70 bg-card p-5 shadow-2xl ring-1 ring-foreground/5 sm:p-8"
                >
                  <QuizFlow onClose={() => setOpen(false)} />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  )
}
