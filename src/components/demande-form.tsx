'use client'

import Link from 'next/link'
import { CheckCircle2, Loader2 } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PACKS, PROFILS, ZONES } from '@/lib/demande'

const champ =
  'h-11 rounded-xl bg-background/70 transition-shadow focus-visible:shadow-[0_0_0_4px_oklch(0.62_0.10_200/0.1)]'
const liste =
  'h-11 w-full rounded-xl border border-input bg-background/70 px-3.5 text-sm text-foreground transition-shadow focus-visible:border-ring focus-visible:shadow-[0_0_0_4px_oklch(0.62_0.10_200/0.1)] focus-visible:outline-none'

/**
 * Formulaire de demande : envoie vers /api/demande, qui transmet au circuit
 * Make de M. Faé (tableau de suivi + devis validé à la main avant envoi).
 */
export function DemandeForm({ submitLabel }: { submitLabel: string }) {
  const [etat, setEtat] = useState<'saisie' | 'envoi' | 'envoye' | 'erreur'>('saisie')
  const [message, setMessage] = useState('')

  async function envoyer(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    setEtat('envoi')
    setMessage('')
    try {
      const res = await fetch('/api/demande', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prenom: f.get('prenom'),
          nom: f.get('nom'),
          email: f.get('email'),
          telephone: f.get('telephone'),
          profil: f.get('profil'),
          commune: f.get('commune'),
          zone: f.get('zone'),
          pack: f.get('pack'),
          notes: f.get('notes'),
          consentement: f.get('consentement') === 'oui',
          site_web: f.get('site_web'),
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data?.error || 'Envoi impossible.')
      setEtat('envoye')
    } catch (err) {
      setEtat('erreur')
      setMessage((err as Error).message)
    }
  }

  if (etat === 'envoye') {
    return (
      <div className="mt-7 flex items-start gap-3 rounded-2xl border border-primary/30 bg-primary/[0.05] p-5 text-sm leading-relaxed text-foreground">
        <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
        <p>
          Merci, votre demande est bien envoyée. M. Faé vous répond sous 24h ouvrées,
          avec votre devis par e-mail.
        </p>
      </div>
    )
  }

  return (
    <form className="mt-7 space-y-5" onSubmit={envoyer}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="prenom">Prénom</Label>
          <Input id="prenom" name="prenom" required placeholder="Jean" autoComplete="given-name" className={champ} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="nom">Nom</Label>
          <Input id="nom" name="nom" required placeholder="Dupont" autoComplete="family-name" className={champ} />
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required placeholder="jean@email.fr" autoComplete="email" className={champ} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="telephone">Téléphone</Label>
          <Input id="telephone" name="telephone" type="tel" placeholder="06 12 34 56 78" autoComplete="tel" className={champ} />
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="profil">Vous êtes</Label>
          <select id="profil" name="profil" required defaultValue="" className={liste}>
            <option value="" disabled>Sélectionnez votre profil</option>
            {PROFILS.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="commune">Commune</Label>
          <Input id="commune" name="commune" placeholder="Sarrebourg" autoComplete="address-level2" className={champ} />
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="zone">Zone</Label>
          <select id="zone" name="zone" required defaultValue="" className={liste}>
            <option value="" disabled>Sélectionnez votre zone</option>
            {ZONES.map((z) => (
              <option key={z.value} value={z.value}>{z.label}</option>
            ))}
          </select>
          <p className="text-xs text-muted-foreground">
            Pas sûr ? La carte de la page{' '}
            <Link href="/services" className="font-medium text-primary underline underline-offset-4">Forfaits</Link>{' '}
            vous donne votre zone.
          </p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="pack">Pack souhaité</Label>
          <select id="pack" name="pack" required defaultValue="" className={liste}>
            <option value="" disabled>Sélectionnez un pack</option>
            {PACKS.map((p) => (
              <option key={p} value={p}>Pack {p}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="notes">Votre message (facultatif)</Label>
        <textarea
          id="notes"
          name="notes"
          rows={4}
          placeholder="Dates souhaitées, questions…"
          className="w-full rounded-xl border border-input bg-background/70 px-3.5 py-3 text-sm leading-relaxed text-foreground transition-shadow placeholder:text-muted-foreground focus-visible:border-ring focus-visible:shadow-[0_0_0_4px_oklch(0.62_0.10_200/0.1)] focus-visible:outline-none"
        />
      </div>

      {/* Champ piège pour les robots : invisible pour les visiteurs. */}
      <div className="hidden" aria-hidden>
        <label htmlFor="site_web">Site web</label>
        <input id="site_web" name="site_web" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <label className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
        <input type="checkbox" name="consentement" value="oui" required className="mt-1 size-4 shrink-0 accent-[oklch(0.62_0.10_200)]" />
        <span>
          J&apos;accepte que mes données soient utilisées pour traiter ma demande et
          m&apos;envoyer un devis par e-mail. Voir la{' '}
          <Link href="/politique-de-confidentialite" className="font-medium text-primary underline underline-offset-4">
            politique de confidentialité
          </Link>
          .
        </span>
      </label>

      {etat === 'erreur' && (
        <p role="alert" className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {message} Vous pouvez aussi appeler le 06 37 53 43 26.
        </p>
      )}

      <Button type="submit" size="lg" className="w-full" disabled={etat === 'envoi'}>
        {etat === 'envoi' ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden /> Envoi en cours…
          </>
        ) : (
          submitLabel
        )}
      </Button>
    </form>
  )
}
