'use client'

import Link from 'next/link'

import { Breadcrumb } from '@/components/ui/breadcrumb'
import { useContent } from '@/hooks/use-content'
import { partnersPageContent } from '@/lib/site-content'

export function PartnersContent() {
  const { data } = useContent('partners', partnersPageContent)
  const eyebrow = data.eyebrow ?? partnersPageContent.eyebrow
  const title = data.title ?? partnersPageContent.title
  const description = data.description ?? partnersPageContent.description
  const partners = (data.partners ?? partnersPageContent.partners) as typeof partnersPageContent.partners
  const becomePartner = data.becomePartner ?? partnersPageContent.becomePartner

  return (
    <>
      <Breadcrumb items={[{ label: 'Partenaires' }]} />

      <section className="border-b border-border/60">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <p className="font-display text-xs font-semibold tracking-[0.22em] uppercase text-primary">
            {eyebrow}
          </p>
          <h1 className="mt-3 font-display text-3xl tracking-tight text-foreground sm:text-4xl">
            {title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            {description}
          </p>

          <ul className="mt-12 grid gap-4 sm:grid-cols-2">
            {partners.map((p) => (
              <li
                key={p.name}
                className="rounded-2xl border border-border/80 bg-card/70 p-5 shadow-[var(--shadow-sm)] ring-1 ring-foreground/5 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-md)]"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h2 className="font-display text-base font-semibold text-foreground">
                    {p.name}
                  </h2>
                </div>
                <p className="mt-1 font-display text-[11px] font-semibold uppercase tracking-wide text-primary">
                  {p.role}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {p.desc}
                </p>
                {p.link && (
                  <a
                    href={p.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                  >
                    {p.link.label}
                    <span aria-hidden>→</span>
                  </a>
                )}
              </li>
            ))}
          </ul>

          <section className="mt-14 rounded-2xl border border-border/80 bg-card/70 p-7 shadow-[var(--shadow-sm)] ring-1 ring-foreground/5 sm:p-9">
            <h2 className="font-display text-lg font-semibold text-foreground">
              {becomePartner.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
              {becomePartner.description}
            </p>
            <p className="mt-4 text-sm font-semibold text-foreground">
              Contact : {becomePartner.contactName} · {becomePartner.contactPhone} ·{' '}
              <a
                href={`mailto:${becomePartner.contactEmail}`}
                className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
              >
                {becomePartner.contactEmail}
              </a>
            </p>
            <div className="mt-5">
              <Link
                href="/prescripteurs"
                className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
              >
                Espace prescripteurs <span aria-hidden>→</span>
              </Link>
            </div>
          </section>
        </div>
      </section>
    </>
  )
}
