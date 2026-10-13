import { NextRequest, NextResponse } from 'next/server'

import { PACKS, PROFILS, ZONES } from '@/lib/demande'
import { envoyerVersMake, estRobot } from '@/lib/make'

// Formulaire de demande (page Contact) → circuit Make de M. Faé : tableau de
// suivi, devis calculé selon zone et pack, envoyé au client après validation.
// Contrat fixé par M. Faé le 10 octobre 2026 : POST JSON, champs en minuscules
// sans accent, rien d'autre que ces champs. Aucun e-mail n'est envoyé d'ici.
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const MAKE_WEBHOOK_URL =
  process.env.MAKE_WEBHOOK_URL || 'https://hook.eu1.make.com/dyds6cg3l67vxpq59ivyfjihdu5bsk9d'

const texte = (v: unknown, max = 200) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Requête illisible.' }, { status: 400 })
  }

  // Robot (champ piège rempli, ou formulaire envoyé en moins de 3 s) : on ne transmet rien.
  if (estRobot(body)) return NextResponse.json({ ok: true })

  const demande = {
    prenom: texte(body.prenom, 80),
    nom: texte(body.nom, 80),
    email: texte(body.email, 160).toLowerCase(),
    telephone: texte(body.telephone, 30), // texte : le 0 initial est conservé
    profil: texte(body.profil, 40),
    commune: texte(body.commune, 80),
    zone: texte(body.zone, 1).toUpperCase(),
    pack: texte(body.pack, 3),
    source: 'Site web',
    notes: texte(body.notes, 2000),
  }

  const erreurs: string[] = []
  if (!demande.prenom) erreurs.push('prénom')
  if (!demande.nom) erreurs.push('nom')
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(demande.email)) erreurs.push('e-mail')
  if (!(PROFILS as readonly string[]).includes(demande.profil)) erreurs.push('profil')
  if (!ZONES.some((z) => z.value === demande.zone)) erreurs.push('zone')
  if (!(PACKS as readonly string[]).includes(demande.pack)) erreurs.push('pack')
  if (body.consentement !== true) erreurs.push('consentement')
  if (erreurs.length) {
    return NextResponse.json({ error: `À vérifier : ${erreurs.join(', ')}.` }, { status: 400 })
  }

  if (!(await envoyerVersMake(MAKE_WEBHOOK_URL, demande))) {
    return NextResponse.json({ error: "La demande n'a pas pu être transmise." }, { status: 502 })
  }
  return NextResponse.json({ ok: true })
}
