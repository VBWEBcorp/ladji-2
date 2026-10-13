import { NextRequest, NextResponse } from 'next/server'

import { envoyerVersMake, estRobot } from '@/lib/make'

// Formulaire d'orientation (page Prescripteurs) → webhook Make dédié de M. Faé.
// Contrat du 13 octobre 2026 : les champs du formulaire tels quels, plus
// `consentement` à « oui », en JSON UTF-8. Rien d'autre n'est transmis.
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const MAKE_PRESCRIPTEUR_URL =
  process.env.MAKE_PRESCRIPTEUR_URL || 'https://hook.eu1.make.com/2a2y7a6p6d148t9ijirnbok2s9qdw8qc'

const CHAMPS = ['prescriber_org', 'prescriber_name', 'beneficiary_name', 'beneficiary_contact', 'beneficiary_profile'] as const

const texte = (v: unknown, max = 300) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Requête illisible.' }, { status: 400 })
  }

  if (estRobot(body)) return NextResponse.json({ ok: true })

  const orientation: Record<string, string> = {}
  for (const c of CHAMPS) orientation[c] = texte(body[c], c === 'beneficiary_profile' ? 2000 : 300)

  const manquants = CHAMPS.filter((c) => c !== 'beneficiary_profile' && !orientation[c])
  if (body.consentement !== true) manquants.push('consentement' as never)
  if (manquants.length) {
    return NextResponse.json({ error: 'Merci de remplir tous les champs et de cocher la case de consentement.' }, { status: 400 })
  }
  orientation.consentement = 'oui'

  if (!(await envoyerVersMake(MAKE_PRESCRIPTEUR_URL, orientation))) {
    return NextResponse.json({ error: "La demande n'a pas pu être transmise." }, { status: 502 })
  }
  return NextResponse.json({ ok: true })
}
