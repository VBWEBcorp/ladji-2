// ============================================================================
//   ATTESTATION DE BRIEFING ACCOMPAGNATEUR — génération PDF côté navigateur
// ----------------------------------------------------------------------------
//   Montage 100% front : aucun appel serveur. Le PDF nominatif est généré
//   puis téléchargé automatiquement sur l'appareil de l'accompagnateur.
//   jsPDF est importé dynamiquement pour rester hors du bundle initial.
// ============================================================================

import { siteConfig } from '@/lib/seo'

export interface AttestationData {
  firstName: string
  lastName: string
  email: string
  correct: number
  total: number
  percent: number
}

// Couleur primaire du site (teal) en RGB.
const TEAL: [number, number, number] = [45, 163, 178]
const INK: [number, number, number] = [33, 42, 54]
const MUTED: [number, number, number] = [110, 122, 138]

function pad(n: number) {
  return String(n).padStart(2, '0')
}

/** Référence unique lisible : AC-BRIEF-AAAAMMJJ-XXXX */
export function buildReference(date = new Date()): string {
  const stamp = `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}`
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase()
  return `AC-BRIEF-${stamp}-${rand}`
}

function formatDate(date = new Date()): string {
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

/**
 * Génère l'attestation nominative et la télécharge.
 * Retourne la référence et le nom de fichier produits.
 */
export async function downloadAttestation(
  data: AttestationData,
  reference = buildReference(),
): Promise<{ reference: string; fileName: string }> {
  const { jsPDF } = await import('jspdf')
  const doc = new jsPDF({ unit: 'pt', format: 'a4' })

  const W = doc.internal.pageSize.getWidth()
  const H = doc.internal.pageSize.getHeight()
  const M = 56 // marge
  const fullName = `${data.firstName.trim()} ${data.lastName.trim().toUpperCase()}`.trim()
  const dateStr = formatDate()

  // ---- Bandeau d'en-tête ----------------------------------------------------
  doc.setFillColor(...TEAL)
  doc.rect(0, 0, W, 132, 'F')

  doc.setTextColor(255, 255, 255)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(26)
  doc.text('AUTO CONDUITE', M, 62)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(11)
  doc.setTextColor(235, 248, 250)
  doc.text('MOBILITÉ SOLIDAIRE', M, 82)

  doc.setFontSize(10)
  doc.text('Attestation de briefing accompagnateur', M, 108)

  // Pastille score à droite du bandeau
  const badgeCx = W - M - 30
  const badgeCy = 66
  doc.setFillColor(255, 255, 255)
  doc.circle(badgeCx, badgeCy, 30, 'F')
  doc.setTextColor(...TEAL)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(18)
  doc.text(`${data.correct}/${data.total}`, badgeCx, badgeCy + 2, { align: 'center' })
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.text(`${data.percent}%`, badgeCx, badgeCy + 15, { align: 'center' })

  // ---- Titre ----------------------------------------------------------------
  let y = 196
  doc.setTextColor(...INK)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(22)
  doc.text('ATTESTATION DE VALIDATION', M, y)
  doc.setFontSize(14)
  doc.setTextColor(...MUTED)
  doc.text('Briefing sécurité accompagnateur proche', M, (y += 22))

  // Filet
  doc.setDrawColor(...TEAL)
  doc.setLineWidth(2)
  doc.line(M, (y += 18), M + 60, y)

  // ---- Corps ----------------------------------------------------------------
  y += 40
  doc.setTextColor(...INK)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(12)

  const body =
    `La présente atteste que ${fullName} a suivi le briefing sécurité destiné aux ` +
    `accompagnateurs proches d'Auto Conduite et a validé le quiz de validation associé ` +
    `avec un score de ${data.correct} bonnes réponses sur ${data.total} (${data.percent}%), ` +
    `supérieur ou égal au seuil requis de 80%.`
  const lines = doc.splitTextToSize(body, W - M * 2)
  doc.text(lines, M, y, { lineHeightFactor: 1.6 })
  y += lines.length * 12 * 1.6 + 24

  // ---- Encadré récapitulatif ------------------------------------------------
  const boxX = M
  const boxW = W - M * 2
  const rows: [string, string][] = [
    ['Accompagnateur', fullName],
    ['Adresse e-mail', data.email.trim() || '—'],
    ['Date de validation', dateStr],
    ['Score obtenu', `${data.correct}/${data.total} (${data.percent}%)`],
    ['Référence', reference],
  ]
  const rowH = 30
  const boxH = rows.length * rowH + 16

  doc.setFillColor(247, 251, 252)
  doc.setDrawColor(220, 230, 233)
  doc.setLineWidth(1)
  doc.roundedRect(boxX, y, boxW, boxH, 10, 10, 'FD')

  let ry = y + 16 + 10
  rows.forEach(([label, value], i) => {
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    doc.setTextColor(...MUTED)
    doc.text(label.toUpperCase(), boxX + 18, ry)

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(12)
    doc.setTextColor(...INK)
    doc.text(value, boxX + 18, ry + 14)

    if (i < rows.length - 1) {
      doc.setDrawColor(228, 236, 238)
      doc.setLineWidth(0.6)
      doc.line(boxX + 18, ry + rowH - 8, boxX + boxW - 18, ry + rowH - 8)
    }
    ry += rowH
  })
  y += boxH + 28

  // ---- Mention --------------------------------------------------------------
  doc.setFont('helvetica', 'italic')
  doc.setFontSize(10.5)
  doc.setTextColor(...MUTED)
  const mention =
    "Cette attestation est nominative. Elle est demandée lors de la confirmation de la location " +
    'du véhicule pédagogique. Le contrôle est effectué manuellement par le gestionnaire Auto Conduite.'
  const mLines = doc.splitTextToSize(mention, W - M * 2)
  doc.text(mLines, M, y, { lineHeightFactor: 1.55 })

  // ---- Pied de page ---------------------------------------------------------
  const footY = H - 56
  doc.setDrawColor(...TEAL)
  doc.setLineWidth(1)
  doc.line(M, footY, W - M, footY)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.setTextColor(...MUTED)
  doc.text('Auto Conduite, Mobilité Solidaire, Moselle', M, footY + 16)
  doc.text(`${siteConfig.email} · ${siteConfig.phone}`, M, footY + 30)
  doc.text(`Réf. ${reference}`, W - M, footY + 16, { align: 'right' })
  doc.text('Document généré automatiquement.', W - M, footY + 30, { align: 'right' })

  const fileName = `attestation-briefing-${data.lastName.trim().toLowerCase().replace(/\s+/g, '-') || 'accompagnateur'}.pdf`
  doc.save(fileName)

  return { reference, fileName }
}
