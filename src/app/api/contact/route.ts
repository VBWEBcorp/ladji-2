import { NextRequest, NextResponse } from 'next/server'

import { sendContactMessage } from '@/lib/mail'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// POST — message du formulaire de contact public → e-mail gestionnaire.
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const firstName = String(body.firstName ?? body.firstname ?? '').trim()
    const lastName = String(body.lastName ?? body.lastname ?? '').trim()
    const email = String(body.email ?? '').trim()
    const phone = String(body.phone ?? '').trim()
    const profile = String(body.profile ?? '').trim()
    const message = String(body.message ?? '').trim()

    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: 'E-mail invalide.' }, { status: 400 })
    }
    if (message.length < 5) {
      return NextResponse.json(
        { error: 'Merci de détailler votre message.' },
        { status: 400 }
      )
    }

    const mail = await sendContactMessage({
      firstName,
      lastName,
      email,
      phone,
      profile,
      message,
    })

    if (!mail.ok && !mail.skipped) {
      return NextResponse.json(
        { error: "L'envoi a échoué, merci de réessayer." },
        { status: 502 }
      )
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
