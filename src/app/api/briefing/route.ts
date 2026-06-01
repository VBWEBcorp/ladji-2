import { randomUUID } from 'crypto'

import { NextRequest, NextResponse } from 'next/server'

import { verifyAuth } from '@/lib/auth'
import { connectDB } from '@/lib/db'
import { sendBriefingGuide } from '@/lib/mail'
import { BriefingInvite } from '@/models/BriefingInvite'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000

function quizUrl(request: NextRequest, token: string): string {
  const base = process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin
  return `${base.replace(/\/$/, '')}/accompagnateur/quiz?token=${token}`
}

// GET — liste des dossiers accompagnateur (admin uniquement).
export async function GET(request: NextRequest) {
  try {
    const { authenticated, user } = await verifyAuth(request)
    if (!authenticated || user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    await connectDB()
    const invites = await BriefingInvite.find().sort({ createdAt: -1 }).limit(200).lean()
    return NextResponse.json(invites, { headers: { 'Cache-Control': 'no-store' } })
  } catch (error) {
    console.error('Briefing list error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST — valide un dossier : crée l'invitation + envoie le guide par e-mail.
export async function POST(request: NextRequest) {
  try {
    const { authenticated, user } = await verifyAuth(request)
    if (!authenticated || user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    await connectDB()
    const body = await request.json()

    const companionFirstName = String(body.companionFirstName || '').trim()
    const companionLastName = String(body.companionLastName || '').trim()
    const companionEmail = String(body.companionEmail || '').trim()
    const beneficiaryName = String(body.beneficiaryName || '').trim()

    if (companionFirstName.length < 2 || companionLastName.length < 2) {
      return NextResponse.json({ error: 'Nom et prénom de l\'accompagnateur requis' }, { status: 400 })
    }
    if (!EMAIL_RE.test(companionEmail)) {
      return NextResponse.json({ error: 'E-mail accompagnateur invalide' }, { status: 400 })
    }

    const token = randomUUID()
    const invite = await BriefingInvite.create({
      token,
      beneficiaryName,
      companionFirstName,
      companionLastName,
      companionEmail,
      status: 'pending',
      expiresAt: new Date(Date.now() + THIRTY_DAYS_MS),
    })

    const url = quizUrl(request, token)
    const mail = await sendBriefingGuide(
      { firstName: companionFirstName, lastName: companionLastName, email: companionEmail },
      url
    )
    if (mail.ok || mail.skipped) {
      invite.guideSentAt = new Date()
      await invite.save()
    }

    return NextResponse.json(
      {
        invite: invite.toObject(),
        quizUrl: url,
        mail,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Briefing create error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
