'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { MessageCircle, X } from 'lucide-react'
import { useState } from 'react'

/**
 * Bulle d'assistant LIMOVA (placeholder).
 * Affichée en bas à droite, toujours visible.
 * Au clic, ouvre un petit panneau "à venir" (connexion réelle au chatbot
 * LIMOVA à brancher plus tard).
 */
export function LimovaBubble() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Bouton bulle flottant */}
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Fermer l\'assistant' : 'Ouvrir l\'assistant LIMOVA'}
        aria-expanded={open}
        initial={{ opacity: 0, scale: 0.7, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="group/limova fixed bottom-6 right-6 z-[90] flex size-14 items-center justify-center overflow-hidden rounded-full bg-primary text-primary-foreground shadow-[0_10px_30px_-6px_oklch(0.58_0.10_200/0.55)] ring-1 ring-primary/30 transition-shadow hover:shadow-[0_14px_38px_-6px_oklch(0.58_0.10_200/0.7)] sm:size-15"
      >
        {/* Halo pulsé subtil pour signaler la présence */}
        <span
          className="pointer-events-none absolute inset-0 rounded-full bg-primary opacity-50 motion-safe:animate-ping"
          aria-hidden
        />

        {/* Highlight top fin */}
        <span
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"
          aria-hidden
        />

        <AnimatePresence initial={false} mode="wait">
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex items-center justify-center"
            >
              <X className="size-5" strokeWidth={2.25} aria-hidden />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex items-center justify-center"
            >
              <MessageCircle className="size-6" strokeWidth={2} aria-hidden />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Panneau placeholder */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-labelledby="limova-title"
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-6 z-[89] w-[min(360px,calc(100vw-3rem))] overflow-hidden rounded-2xl border border-border/70 bg-background/95 shadow-[0_30px_60px_-20px_oklch(0.2_0.02_264/0.35)] ring-1 ring-foreground/[0.04] backdrop-blur-xl"
          >
            {/* Header */}
            <div className="flex items-start gap-3 border-b border-border/60 bg-primary/[0.04] px-5 py-4">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/20">
                <MessageCircle className="size-5" aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-primary">
                  Assistant
                </p>
                <h3
                  id="limova-title"
                  className="mt-0.5 font-display text-base font-semibold leading-tight text-foreground"
                >
                  LIMOVA
                </h3>
              </div>
              <span className="shrink-0 rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-600 ring-1 ring-amber-500/20 dark:bg-amber-500/15 dark:text-amber-300">
                À venir
              </span>
            </div>

            {/* Corps */}
            <div className="space-y-3 px-5 py-5 text-sm leading-relaxed text-muted-foreground">
              <p>
                Bonjour, je suis <span className="font-semibold text-foreground">LIMOVA</span>,
                l&apos;assistant Auto Conduite.
              </p>
              <p>
                Le chatbot sera bientôt disponible pour répondre à vos questions sur
                les forfaits, le financement CPF, l&apos;éligibilité au dispositif et
                les démarches.
              </p>
              <p className="rounded-xl bg-primary/[0.06] p-3 text-xs text-foreground/85 ring-1 ring-primary/15">
                En attendant, vous pouvez nous contacter directement par téléphone
                ou via le formulaire d&apos;éligibilité.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
