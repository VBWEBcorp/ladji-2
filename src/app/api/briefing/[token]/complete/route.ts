import { NextRequest, NextResponse } from 'next/server'

import { connectDB } from '@/lib/db'
import { notifyManagerQuizPassed, sendAttestation } from '@/lib/mail'
import { BriefingInvite } from '@/models/BriefingInvite'

type Params = Promise<{ token: string }>

// POST — l'accompagnateur a terminé le quiz (lien unique).
// Enregistre le résultat ; si réussi, envoie l'attestation par mail + notifie le
// gestionnaire. Token-gated, pas d'authentification.
export async function POST(request: NextRequest, { params }: { params: Params }) {
  try {
    const { token } = await params
    await connectDB()

    const invite = await BriefingInvite.findOne({ token })
    if (!invite) {
      return NextResponse.json({ error: 'not_found' }, { status: 404 })
    }
    if (new Date(invite.expiresAt).getTime() < Date.now()) {
      return NextResponse.json({ error: 'expired' }, { status: 410 })
    }

    const body = await request.json()
    const passed = Boolean(body.passed)
    const correct = Number(body.correct) || 0
    const total = Number(body.total) || 0
    const percent = Number(body.percent) || 0
    const reference = String(body.reference || '')
    const attestationBase64 = typeof body.attestationBase64 === 'string' ? body.attestationBase64 : ''

    invite.status = passed ? 'passed' : 'failed'
    invite.correct = correct
    invite.total = total
    invite.percent = percent
    invite.completedAt = new Date()
    if (passed && reference) invite.attestationRef = reference
    await invite.save()

    const companion = {
      firstName: invite.companionFirstName,
      lastName: invite.companionLastName,
      email: invite.companionEmail,
    }

    let attestationMail = null
    let managerMail = null
    if (passed) {
      const score = { correct, total, percent }
      const dateStr = new Date().toLocaleString('fr-FR')
      if (attestationBase64) {
        attestationMail = await sendAttestation(companion, attestationBase64, reference, score)
      }
      managerMail = await notifyManagerQuizPassed(companion, score, dateStr)
    }

    return NextResponse.json({ ok: true, attestationMail, managerMail })
  } catch (error) {
    console.error('Briefing complete error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
