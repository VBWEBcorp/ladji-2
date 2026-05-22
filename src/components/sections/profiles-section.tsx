'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import { SectionTitle } from '@/components/ui/section-title'
import { useContent } from '@/hooks/use-content'
import { getIcon } from '@/lib/icons'
import { profilesContent as defaults } from '@/lib/site-content'

const ease = [0.22, 1, 0.36, 1] as const

export function ProfilesSection() {
  const { data } = useContent('profiles', defaults)
  const eyebrow = data.eyebrow ?? defaults.eyebrow
  const title = data.title ?? defaults.title
  const description = data.description ?? defaults.description
  const entries = (data.entries ?? defaults.entries) as typeof defaults.entries

  return (
    <section className="border-b border-border/60 bg-[oklch(0.975_0.008_220)] dark:bg-[oklch(0.16_0.015_220)]">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <SectionTitle eyebrow={eyebrow} title={title} description={description} />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
          }}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {entries.map((entry, i) => {
            const Icon = getIcon(entry.iconName ?? defaults.entries[i]?.iconName)
            return (
              <motion.div
                key={entry.title}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
                }}
              >
                <Link
                  href={entry.href}
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border/80 bg-card/80 p-6 shadow-[var(--shadow-sm)] ring-1 ring-foreground/5 backdrop-blur-sm transition-[border-color,box-shadow,transform] duration-500 ease-out hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_20px_50px_-20px_oklch(0.62_0.10_200/0.3)]"
                >
                  {/* Halo dégradé subtil */}
                  <span
                    className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-primary/10 blur-3xl transition-opacity duration-700 group-hover:bg-primary/20"
                    aria-hidden
                  />

                  {/* Icon */}
                  <span className="relative flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-[inset_0_1px_0_oklch(1_0_0/0.3)] ring-1 ring-primary/20">
                    <Icon className="size-6" aria-hidden />
                  </span>

                  {/* Label */}
                  <p className="relative mt-5 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-primary/70">
                    {entry.label}
                  </p>

                  {/* Titre */}
                  <h3 className="relative mt-2 font-display text-base font-semibold leading-tight text-foreground sm:text-lg">
                    {entry.title}
                  </h3>

                  {/* Description */}
                  <p className="relative mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {entry.desc}
                  </p>

                  {/* Prix / accroche */}
                  <p className="relative mt-5 font-display text-2xl font-bold tracking-tight text-foreground">
                    {entry.pricing}
                  </p>

                  {/* CTA */}
                  <p className="relative mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                    {entry.cta}
                    <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
                  </p>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
