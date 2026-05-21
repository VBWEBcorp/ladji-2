'use client'

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'

import { Button } from '@/components/ui/button'
import { useContent } from '@/hooks/use-content'
import { storyContent as defaults } from '@/lib/site-content'

const ease = [0.22, 1, 0.36, 1] as const

export function StorySection() {
  const { data } = useContent('home', { story: defaults })
  const story = data.story ?? defaults
  const steps: { title: string; desc: string }[] = story.steps ?? defaults.steps
  const ref = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [-30, 30])

  return (
    <section ref={ref} className="border-b border-border/60 bg-background">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
        <div className="grid items-center gap-14 md:grid-cols-2 md:gap-16 lg:gap-20">
          {/* Image : slide from left + parallax Y */}
          <motion.div
            initial={{ opacity: 0, x: reduceMotion ? 0 : -40, scale: 0.96 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.75, ease, delay: 0.1 }}
            className="relative order-2 md:order-1"
          >
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.4, ease }}
              className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted shadow-[0_20px_60px_-20px_rgba(0,0,0,0.35)] ring-1 ring-foreground/5"
            >
              <motion.div className="absolute inset-0 -inset-y-8" style={{ y: imageY }}>
                <Image
                  src={story.image}
                  alt=""
                  fill
                  sizes="(min-width:768px) 45vw, 100vw"
                  className="object-cover"
                />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Text + steps */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
            }}
            className="order-1 md:order-2 max-w-xl"
          >
            <motion.span
              variants={{
                hidden: { opacity: 0, x: reduceMotion ? 0 : 32 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease } },
              }}
              className="inline-block font-display text-[11px] font-semibold tracking-[0.2em] text-primary uppercase"
            >
              {story.eyebrow}
            </motion.span>

            <motion.h2
              variants={{
                hidden: { opacity: 0, x: reduceMotion ? 0 : 32 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease } },
              }}
              className="mt-5 font-display text-balance text-[32px] leading-[1.08] tracking-[-0.02em] text-foreground sm:text-[40px] lg:text-[48px]"
            >
              {story.title}
            </motion.h2>

            <motion.ol
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
              }}
              className="mt-8 space-y-5"
            >
              {steps.map((s, i) => (
                <motion.li
                  key={s.title}
                  variants={{
                    hidden: { opacity: 0, y: 12 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
                  }}
                  className="flex items-start gap-4"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/15 font-display text-sm font-semibold text-primary ring-1 ring-primary/25">
                    {i + 1}
                  </span>
                  <div className="pt-1">
                    <h3 className="font-display text-base font-semibold leading-tight text-foreground">
                      {s.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {s.desc}
                    </p>
                  </div>
                </motion.li>
              ))}
            </motion.ol>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 8 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
              }}
              className="mt-8"
            >
              <Button variant="outline" className="group" asChild>
                <Link href="/a-propos">
                  {story.ctaLabel ?? 'En savoir plus'}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
