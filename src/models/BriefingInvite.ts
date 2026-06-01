import mongoose, { Schema, Document } from 'mongoose'

// ============================================================================
//   DOSSIER ACCOMPAGNATEUR — invitation au briefing + suivi du quiz
// ----------------------------------------------------------------------------
//   Créé par le gestionnaire dans le back-office après validation du dossier
//   bénéficiaire. Génère un token unique (lien quiz valable 30 jours) et
//   déclenche l'envoi automatique du guide pédagogique par e-mail.
// ============================================================================

export type BriefingStatus = 'pending' | 'passed' | 'failed'

export interface IBriefingInvite extends Document {
  token: string
  beneficiaryName: string
  companionFirstName: string
  companionLastName: string
  companionEmail: string
  status: BriefingStatus
  correct?: number
  total?: number
  percent?: number
  attestationRef?: string
  guideSentAt?: Date
  completedAt?: Date
  expiresAt: Date
  createdAt: Date
  updatedAt: Date
}

const BriefingInviteSchema = new Schema<IBriefingInvite>(
  {
    token: { type: String, required: true, unique: true, index: true },
    beneficiaryName: { type: String, default: '' },
    companionFirstName: { type: String, required: true },
    companionLastName: { type: String, required: true },
    companionEmail: { type: String, required: true },
    status: {
      type: String,
      enum: ['pending', 'passed', 'failed'],
      default: 'pending',
    },
    correct: Number,
    total: Number,
    percent: Number,
    attestationRef: String,
    guideSentAt: Date,
    completedAt: Date,
    // Lien quiz valable 30 jours (cf. spec workflow §2).
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true }
)

export const BriefingInvite =
  mongoose.models.BriefingInvite ||
  mongoose.model<IBriefingInvite>('BriefingInvite', BriefingInviteSchema)
