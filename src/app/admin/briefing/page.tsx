'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Check, Copy, Mail, Send, UserCheck } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface Invite {
  _id: string
  token: string
  beneficiaryName?: string
  companionFirstName: string
  companionLastName: string
  companionEmail: string
  status: 'pending' | 'passed' | 'failed'
  correct?: number
  total?: number
  percent?: number
  guideSentAt?: string
  completedAt?: string
  createdAt: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const statusLabel: Record<Invite['status'], { text: string; cls: string }> = {
  pending: { text: 'En attente', cls: 'bg-amber-100 text-amber-700' },
  passed: { text: 'Quiz validé', cls: 'bg-emerald-100 text-emerald-700' },
  failed: { text: 'Échec', cls: 'bg-rose-100 text-rose-700' },
}

export default function AdminBriefingPage() {
  const router = useRouter()
  const [invites, setInvites] = useState<Invite[]>([])
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [form, setForm] = useState({
    beneficiaryName: '',
    companionFirstName: '',
    companionLastName: '',
    companionEmail: '',
  })
  const [feedback, setFeedback] = useState<{ kind: 'ok' | 'err'; msg: string } | null>(null)
  const [copied, setCopied] = useState<string | null>(null)

  const authHeaders = useCallback((): Record<string, string> => {
    const token = localStorage.getItem('authToken')
    return { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
  }, [])

  const load = useCallback(async () => {
    try {
      const res = await fetch('/api/briefing', { headers: authHeaders() })
      if (res.status === 401) {
        router.push('/admin/login')
        return
      }
      const data = await res.json()
      if (Array.isArray(data)) setInvites(data)
    } catch {
      /* noop */
    } finally {
      setLoading(false)
    }
  }, [authHeaders, router])

  useEffect(() => {
    if (!localStorage.getItem('authToken')) {
      router.push('/admin/login')
      return
    }
    void load()
  }, [load, router])

  const formValid =
    form.companionFirstName.trim().length > 1 &&
    form.companionLastName.trim().length > 1 &&
    EMAIL_RE.test(form.companionEmail.trim())

  const submit = async () => {
    if (!formValid) return
    setSending(true)
    setFeedback(null)
    try {
      const res = await fetch('/api/briefing', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) {
        setFeedback({ kind: 'err', msg: data.error || 'Erreur lors de la création' })
        return
      }
      const sent = data.mail?.ok
      const skipped = data.mail?.skipped
      setFeedback({
        kind: 'ok',
        msg: sent
          ? 'Dossier validé : guide envoyé par e-mail à l\'accompagnateur.'
          : skipped
            ? 'Dossier créé. E-mail non envoyé (clé Resend absente) — le lien quiz reste utilisable.'
            : 'Dossier créé, mais l\'envoi e-mail a échoué (voir logs serveur).',
      })
      setForm({ beneficiaryName: '', companionFirstName: '', companionLastName: '', companionEmail: '' })
      void load()
    } catch {
      setFeedback({ kind: 'err', msg: 'Erreur réseau' })
    } finally {
      setSending(false)
    }
  }

  const copyLink = (token: string) => {
    const url = `${window.location.origin}/accompagnateur/quiz?token=${token}`
    void navigator.clipboard.writeText(url)
    setCopied(token)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6 flex items-center gap-3">
        <Link
          href="/admin/dashboard"
          className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-card hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
        </Link>
        <div>
          <h1 className="text-lg font-bold text-foreground">Dossiers accompagnateur</h1>
          <p className="text-xs text-muted-foreground">
            Valider un dossier envoie le guide + le lien quiz à l&apos;accompagnateur.
          </p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid gap-6 lg:grid-cols-[380px_1fr]"
      >
        {/* Formulaire de validation */}
        <div className="h-fit rounded-2xl border border-border/70 bg-card p-5 shadow-sm">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <UserCheck className="size-4 text-primary" />
            Valider un dossier
          </div>
          <div className="mt-4 space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="beneficiaryName">Bénéficiaire (optionnel)</Label>
              <Input
                id="beneficiaryName"
                value={form.beneficiaryName}
                onChange={(e) => setForm({ ...form, beneficiaryName: e.target.value })}
                placeholder="Nom du bénéficiaire"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="companionFirstName">Prénom accompagnateur</Label>
                <Input
                  id="companionFirstName"
                  value={form.companionFirstName}
                  onChange={(e) => setForm({ ...form, companionFirstName: e.target.value })}
                  placeholder="Marie"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="companionLastName">Nom accompagnateur</Label>
                <Input
                  id="companionLastName"
                  value={form.companionLastName}
                  onChange={(e) => setForm({ ...form, companionLastName: e.target.value })}
                  placeholder="Durand"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="companionEmail">E-mail accompagnateur</Label>
              <Input
                id="companionEmail"
                type="email"
                value={form.companionEmail}
                onChange={(e) => setForm({ ...form, companionEmail: e.target.value })}
                placeholder="marie.durand@email.fr"
              />
            </div>
            <Button onClick={submit} disabled={!formValid || sending} className="w-full">
              <Send className="size-4" />
              {sending ? 'Envoi…' : 'Valider et envoyer le guide'}
            </Button>
            {feedback && (
              <p
                className={`rounded-lg px-3 py-2 text-xs ${
                  feedback.kind === 'ok'
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'bg-rose-50 text-rose-700'
                }`}
              >
                {feedback.msg}
              </p>
            )}
          </div>
        </div>

        {/* Liste des dossiers */}
        <div className="rounded-2xl border border-border/70 bg-card p-5 shadow-sm">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Mail className="size-4 text-primary" />
            Dossiers ({invites.length})
          </div>
          {loading ? (
            <p className="mt-4 text-sm text-muted-foreground">Chargement…</p>
          ) : invites.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">Aucun dossier pour le moment.</p>
          ) : (
            <div className="mt-4 space-y-3">
              {invites.map((inv) => {
                const st = statusLabel[inv.status]
                return (
                  <div
                    key={inv._id}
                    className="rounded-xl border border-border/60 bg-background/60 p-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          {inv.companionFirstName} {inv.companionLastName}
                        </p>
                        <p className="text-xs text-muted-foreground">{inv.companionEmail}</p>
                        {inv.beneficiaryName && (
                          <p className="text-xs text-muted-foreground">
                            Bénéficiaire : {inv.beneficiaryName}
                          </p>
                        )}
                      </div>
                      <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${st.cls}`}>
                        {st.text}
                        {inv.status !== 'pending' && inv.percent != null
                          ? ` · ${inv.correct}/${inv.total} (${inv.percent}%)`
                          : ''}
                      </span>
                    </div>
                    <div className="mt-3 flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => copyLink(inv.token)}
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
                      >
                        {copied === inv.token ? (
                          <>
                            <Check className="size-3.5" /> Lien copié
                          </>
                        ) : (
                          <>
                            <Copy className="size-3.5" /> Copier le lien quiz
                          </>
                        )}
                      </button>
                      <span className="text-[11px] text-muted-foreground">
                        Créé le {new Date(inv.createdAt).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
