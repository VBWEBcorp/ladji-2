'use client'

import { Lock, Mail } from 'lucide-react'
import { useEffect, useState } from 'react'

import { QuizFlow } from './quiz-flow'

type GateStatus = 'checking' | 'valid' | 'invalid' | 'expired' | 'missing'

// Accès au quiz UNIQUEMENT via le lien unique envoyé par e-mail après validation
// du dossier (cf. spec client « Workflow Mail Automatique »). Sans token valide,
// l'accès est refusé.
export function QuizContent() {
  const [token, setToken] = useState<string | null>(null)
  const [status, setStatus] = useState<GateStatus>('checking')

  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get('token')
    if (!t) {
      setStatus('missing')
      return
    }
    setToken(t)
    let cancelled = false
    fetch(`/api/briefing/${t}`)
      .then(async (r) => {
        const d = await r.json().catch(() => null)
        if (cancelled) return
        if (r.ok && d?.valid) setStatus('valid')
        else if (d?.reason === 'expired') setStatus('expired')
        else setStatus('invalid')
      })
      .catch(() => {
        if (!cancelled) setStatus('invalid')
      })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-2xl px-4 pt-28 pb-24 sm:px-6 sm:pt-32 lg:px-8">
        {status === 'valid' && token ? (
          <QuizFlow token={token} />
        ) : status === 'checking' ? (
          <p className="text-center text-sm text-muted-foreground">Vérification de votre lien…</p>
        ) : (
          <AccessGate status={status} />
        )}
      </div>
    </div>
  )
}

function AccessGate({ status }: { status: GateStatus }) {
  const message =
    status === 'expired'
      ? 'Ce lien de quiz a expiré (validité 30 jours). Contactez Auto Conduite pour en recevoir un nouveau.'
      : "Le quiz briefing est accessible uniquement via le lien personnel envoyé par e-mail à l'accompagnateur, après validation du dossier par Auto Conduite."

  return (
    <div className="mx-auto max-w-md rounded-3xl border border-border/80 bg-card/70 p-8 text-center shadow-[var(--shadow-sm)] ring-1 ring-foreground/5">
      <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/15">
        <Lock className="size-6" aria-hidden />
      </span>
      <h1 className="mt-5 font-display text-xl font-semibold tracking-tight text-foreground">
        Accès sur invitation
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{message}</p>
      <div className="mt-6 space-y-2 border-t border-border/50 pt-5 text-sm">
        <p className="font-medium text-foreground">Comment l&apos;obtenir ?</p>
        <p className="text-muted-foreground">
          Votre dossier doit d&apos;abord être validé par Auto Conduite. Une fois validé, votre
          accompagnateur reçoit automatiquement par e-mail le guide et le lien vers ce quiz.
        </p>
      </div>
      <a
        href="mailto:contact@auto-conduite.com"
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
      >
        <Mail className="size-4" aria-hidden />
        Contacter Auto Conduite
      </a>
    </div>
  )
}
