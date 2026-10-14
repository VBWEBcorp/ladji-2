import { NextRequest, NextResponse } from 'next/server'

import { CHAMPS_PRESCRIPTEUR } from '@/lib/demande'
import { envoyerVersMake, estRobot } from '@/lib/make'

// Formulaire d'orientation (page Prescripteurs) → même webhook Make que le
// formulaire élève, avec `type` à « prescripteur » (demande de M. Faé du
// 14 octobre 2026). Rien d'autre que ces champs n'est transmis.
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const MAKE_WEBHOOK_URL =
  process.env.MAKE_WEBHOOK_URL || 'https://hook.eu1.make.com/dyds6cg3l67vxpq59ivyfjihdu5bsk9d'

const texte = (v: unknown, max = 300) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Requête illisible.' }, { status: 400 })
  }

  if (estRobot(body)) return NextResponse.json({ ok: true })

  const orientation: Record<string, string> = { type: 'prescripteur' }
  for (const c of CHAMPS_PRESCRIPTEUR) orientation[c.name] = texte(body[c.name], c.name === 'message' ? 2000 : 200)
  orientation.email = orientation.email.toLowerCase()

  const manquants: string[] = CHAMPS_PRESCRIPTEUR.filter((c) => c.requis && !orientation[c.name]).map((c) => c.label)
  if (orientation.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(orientation.email)) manquants.push('e-mail valide')
  if (body.consentement !== true) manquants.push("accord du bénéficiaire")
  if (manquants.length) {
    return NextResponse.json({ error: `À vérifier : ${manquants.join(', ')}.` }, { status: 400 })
  }
  orientation.consentement = 'oui'

  if (!(await envoyerVersMake(MAKE_WEBHOOK_URL, orientation))) {
    return NextResponse.json({ error: "La demande n'a pas pu être transmise." }, { status: 502 })
  }
  return NextResponse.json({ ok: true })
}
