'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

import { cn } from '@/lib/utils'

type Lang = 'FR' | 'DE' | 'TR' | 'EN'
const LANGUAGES: Lang[] = ['FR', 'DE', 'TR', 'EN']
const LANG_LABELS: Record<Lang, string> = {
  FR: 'Français',
  DE: 'Deutsch',
  TR: 'Türkçe',
  EN: 'English',
}

type Props = {
  className?: string
  layoutId?: string
}

export function LanguageSwitcher({ className, layoutId = 'lang-pill' }: Props) {
  const [active, setActive] = useState<Lang>('FR')
  const [hovered, setHovered] = useState<Lang | null>(null)

  return (
    <div
      role="group"
      aria-label="Sélecteur de langue (interface multilingue à venir)"
      className={cn(
        'relative inline-flex h-8 items-center gap-0 rounded-xl bg-foreground/[0.04] p-0.5 ring-1 ring-foreground/[0.06]',
        className
      )}
      onMouseLeave={() => setHovered(null)}
    >
      {LANGUAGES.map((lang) => {
        const isActive = active === lang
        const isHovered = hovered === lang
        return (
          <button
            key={lang}
            type="button"
            onMouseEnter={() => setHovered(lang)}
            onClick={() => setActive(lang)}
            aria-pressed={isActive}
            aria-label={`${LANG_LABELS[lang]} (à venir)`}
            title={`${LANG_LABELS[lang]} · multilingue à venir`}
            className={cn(
              'relative inline-flex h-7 min-w-[26px] items-center justify-center rounded-lg px-1.5 font-mono text-[10px] font-semibold tracking-[0.08em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60',
              isActive
                ? 'text-foreground'
                : 'text-muted-foreground/80 hover:text-foreground'
            )}
          >
            {isActive && (
              <motion.span
                layoutId={`${layoutId}-active`}
                className="absolute inset-0 rounded-lg bg-background shadow-[0_2px_8px_-2px_oklch(0.2_0.02_264/0.25)] ring-1 ring-foreground/[0.08]"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                aria-hidden
              />
            )}
            {!isActive && isHovered && (
              <motion.span
                layoutId={`${layoutId}-hover`}
                className="absolute inset-0 rounded-lg bg-foreground/[0.06]"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                aria-hidden
              />
            )}
            <span className="relative">{lang}</span>
          </button>
        )
      })}
    </div>
  )
}
