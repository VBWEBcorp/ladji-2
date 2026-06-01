import { NextRequest, NextResponse } from 'next/server'

import { connectDB } from '@/lib/db'
import { BriefingInvite } from '@/models/BriefingInvite'

type Params = Promise<{ token: string }>

// GET — validation publique d'un lien quiz + infos de pré-remplissage.
// Token-gated : accessible sans authentification (lien unique envoyé par mail).
export async function GET(_request: NextRequest, { params }: { params: Params }) {
  try {
    const { token } = await params
    await connectDB()

    const invite = await BriefingInvite.findOne({ token }).lean()
    if (!invite) {
      return NextResponse.json({ valid: false, reason: 'not_found' }, { status: 404 })
    }

    const expired = new Date((invite as { expiresAt: Date }).expiresAt).getTime() < Date.now()
    if (expired) {
      return NextResponse.json(
        { valid: false, reason: 'expired' },
        { headers: { 'Cache-Control': 'no-store' } }
      )
    }

    const i = invite as unknown as {
      companionFirstName: string
      companionLastName: string
      companionEmail: string
      beneficiaryName: string
      status: string
    }
    return NextResponse.json(
      {
        valid: true,
        invite: {
          firstName: i.companionFirstName,
          lastName: i.companionLastName,
          email: i.companionEmail,
          beneficiaryName: i.beneficiaryName,
          status: i.status,
        },
      },
      { headers: { 'Cache-Control': 'no-store' } }
    )
  } catch (error) {
    console.error('Briefing validate error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
