// ============================================================================
//   ENVOI E-MAIL — Resend (workflow guide accompagnateur + attestation)
// ----------------------------------------------------------------------------
//   Appels via l'API REST Resend (pas de dépendance npm). Si RESEND_API_KEY
//   est absente, l'envoi est ignoré proprement (journalisé) : le reste du
//   workflow continue de fonctionner. Voir .env.local pour la configuration.
// ============================================================================

import { promises as fs } from 'fs'
import path from 'path'

import { siteConfig } from '@/lib/seo'

const RESEND_API_KEY = process.env.RESEND_API_KEY || ''
const MAIL_FROM = process.env.MAIL_FROM || `Auto Conduite <${siteConfig.email}>`
const MANAGER_EMAIL = process.env.MANAGER_EMAIL || siteConfig.email

const GUIDE_FILENAME = 'Guide_Pedagogique_Accompagnateur_Auto_Conduite.pdf'

interface Attachment {
  filename: string
  content: string // base64
}

export interface SendResult {
  ok: boolean
  skipped?: boolean
  error?: string
  id?: string
}

/** Envoi bas niveau via l'API Resend. Ignoré (skipped) si la clé est absente. */
export async function sendEmail(opts: {
  to: string
  subject: string
  html: string
  attachments?: Attachment[]
  replyTo?: string
}): Promise<SendResult> {
  if (!RESEND_API_KEY) {
    console.warn(
      `[mail] RESEND_API_KEY absente — e-mail non envoyé : "${opts.subject}" → ${opts.to}`
    )
    return { ok: false, skipped: true }
  }
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: MAIL_FROM,
        to: [opts.to],
        subject: opts.subject,
        html: opts.html,
        reply_to: opts.replyTo,
        attachments: opts.attachments,
      }),
    })
    if (!res.ok) {
      const text = await res.text()
      console.error('[mail] Resend error', res.status, text)
      return { ok: false, error: `${res.status} ${text}` }
    }
    const data = (await res.json()) as { id?: string }
    return { ok: true, id: data?.id }
  } catch (e) {
    console.error('[mail] envoi échoué', e)
    return { ok: false, error: String((e as Error)?.message || e) }
  }
}

/* -------------------------------------------------------------------------- */
/*  Gabarit HTML commun                                                        */
/* -------------------------------------------------------------------------- */

const TEAL = '#2da3b2'
const INK = '#212a36'

function layout(title: string, bodyHtml: string): string {
  return `<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;background:#f4f7f8;font-family:Arial,Helvetica,sans-serif;color:${INK};">
  <div style="max-width:560px;margin:0 auto;padding:24px;">
    <div style="background:${TEAL};border-radius:14px 14px 0 0;padding:22px 26px;">
      <div style="color:#fff;font-size:20px;font-weight:bold;letter-spacing:.5px;">AUTO CONDUITE</div>
      <div style="color:#e6f6f8;font-size:11px;letter-spacing:2px;margin-top:2px;">MOBILITÉ SOLIDAIRE — MOSELLE</div>
    </div>
    <div style="background:#fff;border-radius:0 0 14px 14px;padding:26px;border:1px solid #e4ecee;border-top:none;">
      <h1 style="font-size:18px;margin:0 0 14px;color:${INK};">${title}</h1>
      ${bodyHtml}
    </div>
    <div style="text-align:center;color:#8a97a3;font-size:11px;padding:16px 8px;">
      Auto Conduite — Mobilité solidaire, Moselle<br>
      ${siteConfig.email} · ${siteConfig.phone} · ${siteConfig.url}
    </div>
  </div>
</body></html>`
}

function button(href: string, label: string): string {
  return `<a href="${href}" style="display:inline-block;background:${TEAL};color:#fff;text-decoration:none;font-weight:bold;font-size:14px;padding:12px 22px;border-radius:10px;">${label}</a>`
}

/* -------------------------------------------------------------------------- */
/*  Guide pédagogique — contenu HTML (sert aussi de repli si le PDF manque)     */
/* -------------------------------------------------------------------------- */

const GUIDE_HTML = `
<p style="font-size:14px;line-height:1.6;color:#4a5560;">Ce guide résume votre rôle, vos responsabilités et les bonnes pratiques pour accompagner votre proche en toute sécurité. Merci de le lire attentivement avant votre première séance.</p>

<h2 style="font-size:15px;color:${INK};margin:20px 0 8px;">1. Votre rôle</h2>
<p style="font-size:13px;line-height:1.6;color:#4a5560;margin:0;">Vous êtes : un filet de sécurité, un soutien psychologique, un observateur attentif, un partenaire pédagogique.<br>Vous n'êtes pas : un examinateur, un correcteur en temps réel, un moniteur d'auto-école.</p>

<h2 style="font-size:15px;color:${INK};margin:20px 0 8px;">2. Le véhicule à double commande</h2>
<p style="font-size:13px;line-height:1.6;color:#4a5560;margin:0;">Pédale de frein et volant : vous n'intervenez qu'en cas de danger immédiat et inévitable. Sinon, vous observez, rassurez et débriefez après la séance. La conduite reste entre les mains de l'élève.</p>

<h2 style="font-size:15px;color:${INK};margin:20px 0 8px;">3. Briefing avant chaque séance</h2>
<p style="font-size:13px;line-height:1.6;color:#4a5560;margin:0;">Posez systématiquement 3 questions : comment te sens-tu aujourd'hui ? Une situation t'inquiète-t-elle ? Te sens-tu prêt à démarrer ? En cas d'hésitation, prenez le temps ou reportez la séance : c'est une décision de sécurité, pas un échec.</p>

<h2 style="font-size:15px;color:${INK};margin:20px 0 8px;">4. Posture psychologique</h2>
<p style="font-size:13px;line-height:1.6;color:#4a5560;margin:0;">Ne corrigez pas à chaud, nommez d'abord ce qui va bien, progressez par paliers. Votre patience est votre outil principal.</p>

<h2 style="font-size:15px;color:${INK};margin:20px 0 8px;">5. Incidents</h2>
<p style="font-size:13px;line-height:1.6;color:#4a5560;margin:0;">En cas d'incident : stoppez le véhicule en sécurité, coupez le moteur, contactez Auto Conduite sans délai au ${siteConfig.phone}. C'est une obligation contractuelle et assurantielle.</p>
`

/** Lit le guide PDF sur le disque pour le joindre au mail. null si introuvable. */
async function readGuideAttachment(): Promise<Attachment | null> {
  const p =
    process.env.GUIDE_PDF_PATH ||
    path.join(process.cwd(), 'public', 'documents', 'guide-accompagnateur.pdf')
  try {
    const buf = await fs.readFile(p)
    return { filename: GUIDE_FILENAME, content: buf.toString('base64') }
  } catch {
    console.warn(
      `[mail] Guide PDF introuvable (${p}) — e-mail envoyé sans pièce jointe, guide inclus en HTML.`
    )
    return null
  }
}

/* -------------------------------------------------------------------------- */
/*  E-mails métier                                                             */
/* -------------------------------------------------------------------------- */

export interface CompanionInfo {
  firstName: string
  lastName: string
  email: string
}

/** Étape 3 — Guide accompagnateur + lien quiz unique. */
export async function sendBriefingGuide(
  companion: CompanionInfo,
  quizUrl: string
): Promise<SendResult> {
  const attachment = await readGuideAttachment()
  const body = `
    <p style="font-size:14px;line-height:1.6;">Bonjour ${companion.firstName},</p>
    <p style="font-size:14px;line-height:1.6;color:#4a5560;">
      Vous accompagnez un proche dans son apprentissage de la conduite avec Auto Conduite.
      Vous trouverez ci-dessous votre guide pédagogique accompagnateur${
        attachment ? ' (également joint en PDF)' : ''
      }. Merci de le lire attentivement avant votre première séance.
    </p>
    <p style="font-size:14px;line-height:1.6;color:#4a5560;">
      Avant de pouvoir confirmer votre réservation, vous devez valider le
      <strong>quiz briefing sécurité</strong> via le lien ci-dessous. Score minimum requis : <strong>80&nbsp;%</strong>.
      Votre attestation vous sera envoyée automatiquement après validation.
    </p>
    <p style="margin:22px 0;">${button(quizUrl, 'Visionner la vidéo et passer le quiz')}</p>
    <p style="font-size:12px;color:#8a97a3;word-break:break-all;">Lien valable 30 jours : ${quizUrl}</p>
    <hr style="border:none;border-top:1px solid #e4ecee;margin:22px 0;">
    <h2 style="font-size:16px;color:${INK};margin:0 0 6px;">Guide pédagogique de l'accompagnateur</h2>
    ${GUIDE_HTML}
  `
  return sendEmail({
    to: companion.email,
    subject: 'Votre guide accompagnateur — Auto Conduite',
    html: layout('Votre guide accompagnateur', body),
    attachments: attachment ? [attachment] : undefined,
    replyTo: siteConfig.email,
  })
}

/** Étape 5 — Attestation envoyée à l'accompagnateur après réussite. */
export async function sendAttestation(
  companion: CompanionInfo,
  attestationBase64: string,
  reference: string,
  score: { correct: number; total: number; percent: number }
): Promise<SendResult> {
  const body = `
    <p style="font-size:14px;line-height:1.6;">Bonjour ${companion.firstName},</p>
    <p style="font-size:14px;line-height:1.6;color:#4a5560;">
      Félicitations, vous avez validé le quiz briefing accompagnateur avec
      <strong>${score.correct}/${score.total} (${score.percent}&nbsp;%)</strong>.
    </p>
    <p style="font-size:14px;line-height:1.6;color:#4a5560;">
      Votre attestation nominative est jointe à cet e-mail (référence ${reference}).
      Elle vous sera demandée lors de la confirmation de la location du véhicule pédagogique.
    </p>
  `
  return sendEmail({
    to: companion.email,
    subject: 'Votre attestation de briefing — Auto Conduite',
    html: layout('Attestation de briefing validée', body),
    attachments: [
      { filename: `attestation-briefing-${reference}.pdf`, content: attestationBase64 },
    ],
    replyTo: siteConfig.email,
  })
}

/** Étape 6 — Notification gestionnaire après validation du quiz. */
export async function notifyManagerQuizPassed(
  companion: CompanionInfo,
  score: { correct: number; total: number; percent: number },
  dateStr: string
): Promise<SendResult> {
  const fullName = `${companion.firstName} ${companion.lastName}`
  const body = `
    <p style="font-size:14px;line-height:1.6;color:#4a5560;">
      L'accompagnateur <strong>${fullName}</strong> a validé le quiz briefing.
    </p>
    <ul style="font-size:14px;line-height:1.8;color:#4a5560;">
      <li>Score obtenu : <strong>${score.correct}/${score.total} (${score.percent}&nbsp;%)</strong></li>
      <li>Date de validation : ${dateStr}</li>
      <li>Attestation envoyée à : ${companion.email}</li>
    </ul>
    <p style="font-size:14px;line-height:1.6;color:${INK};">Vous pouvez maintenant confirmer la réservation.</p>
  `
  return sendEmail({
    to: MANAGER_EMAIL,
    subject: `Quiz validé — ${fullName} — Auto Conduite`,
    html: layout('Quiz accompagnateur validé', body),
    replyTo: companion.email,
  })
}
