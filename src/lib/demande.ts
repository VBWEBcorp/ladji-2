// Valeurs exactes attendues par le circuit Make de M. Faé (10 octobre 2026).
// Partagées par le formulaire Contact et la route /api/demande.
export const PROFILS = ['Candidat libre', 'Perfectionnement auto-école', 'Prescripteur'] as const
export const ZONES = [
  { value: 'A', label: "Zone A : jusqu'à 15 km du point de stationnement du véhicule" },
  { value: 'B', label: 'Zone B : de 15 à 35 km' },
  { value: 'C', label: 'Zone C : plus de 35 km' },
] as const
export const PACKS = ['5h', '10h', '20h'] as const

// Cases d'éligibilité obligatoires (demande de M. Faé du 14 octobre 2026).
// `name` = nom exact envoyé au webhook, valeur « oui » quand la case est cochée.
export const CASES_ELIGIBILITE = [
  { name: 'majeur', label: "J'ai 18 ans ou plus" },
  { name: 'livret', label: "J'ai mon livret d'apprentissage (papier ou numérique)" },
  { name: 'code', label: "J'ai obtenu le code de la route" },
  { name: 'accompagnateur_ok', label: 'Mon accompagnateur a le permis B depuis au moins 5 ans et ne sera pas rémunéré' },
] as const

/** Profil pour lequel l'attestation des heures d'auto-école est exigée. */
export const PROFIL_AUTO_ECOLE = 'Perfectionnement auto-école'
export const CASE_ATTESTATION_HEURES = {
  name: 'attestation_heures',
  label: "J'atteste sur l'honneur avoir effectué au moins 20 h de conduite en auto-école (13 h en boîte automatique)",
} as const

// Formulaire d'orientation des prescripteurs (demande de M. Faé du 14 octobre 2026).
// `name` = nom exact envoyé au webhook. L'ancien champ « Votre nom et contact »
// est séparé en conseiller, email et telephone.
export const CHAMPS_PRESCRIPTEUR = [
  { name: 'structure', label: 'Votre structure', placeholder: 'France Travail, Mission Locale, GEIQ Alemploi…', type: 'text', requis: true },
  { name: 'conseiller', label: 'Votre nom', placeholder: 'Prénom Nom', type: 'text', requis: true },
  { name: 'email', label: 'Votre e-mail', placeholder: 'prenom.nom@structure.fr', type: 'email', requis: true },
  { name: 'telephone', label: 'Votre téléphone', placeholder: '06 12 34 56 78', type: 'tel', requis: false },
  { name: 'beneficiaire', label: 'Nom du bénéficiaire', placeholder: 'Prénom Nom', type: 'text', requis: true },
  { name: 'contact_beneficiaire', label: 'Contact du bénéficiaire', placeholder: 'Téléphone ou email', type: 'text', requis: true },
  { name: 'message', label: 'Profil / contexte', placeholder: 'DE / RSA / jeune / autre + besoin (Pack 5h, 10h, 20h)', type: 'textarea', requis: false },
] as const

export const CONSENTEMENT_PRESCRIPTEUR = 'Le bénéficiaire a donné son accord pour être contacté par Auto Conduite'
