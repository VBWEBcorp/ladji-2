/**
 * Création / réinitialisation du compte admin Auto Conduite (M. Faé).
 * Idempotent : supprime un éventuel ancien compte template, puis
 * upsert faeladg@icloud.com avec le mot de passe officiel.
 *
 * Usage :  node scripts/create-admin.js
 */

const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
require('dotenv').config({ path: '.env.local' })

const MONGODB_URI = process.env.MONGODB_URI
const adminEmail = 'faeladg@icloud.com'
const adminPassword = 'AutoConduite2230'
const adminName = 'Kah Faé'
const legacyEmails = ['admin@template.com']

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    name: String,
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
  },
  { timestamps: true }
)

const User = mongoose.model('User', UserSchema)

async function run() {
  if (!MONGODB_URI) {
    console.error('MONGODB_URI manquant dans .env.local')
    process.exit(1)
  }

  console.log('Connexion à MongoDB...')
  await mongoose.connect(MONGODB_URI)
  console.log('Connecté.')

  // Nettoyage des comptes template hérités.
  for (const legacy of legacyEmails) {
    const removed = await User.deleteOne({ email: legacy })
    if (removed.deletedCount > 0) {
      console.log(`Compte template supprimé : ${legacy}`)
    }
  }

  // Hash du mot de passe officiel.
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(adminPassword, salt)

  // Upsert du compte propriétaire.
  const existing = await User.findOne({ email: adminEmail })
  if (existing) {
    existing.password = hashedPassword
    existing.name = adminName
    existing.role = 'admin'
    await existing.save()
    console.log('Mot de passe et profil admin mis à jour.')
  } else {
    await User.create({
      email: adminEmail,
      password: hashedPassword,
      name: adminName,
      role: 'admin',
    })
    console.log('Compte admin créé.')
  }

  console.log('')
  console.log('Email      :', adminEmail)
  console.log('Mot de passe :', adminPassword)
  console.log('Nom        :', adminName)
  console.log('Rôle       : admin')
  console.log('')
  console.log('Connexion : http://localhost:3001/admin/login')

  await mongoose.disconnect()
  process.exit(0)
}

run().catch((error) => {
  console.error('Erreur :', error.message)
  process.exit(1)
})
