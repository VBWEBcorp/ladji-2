// Valeurs exactes attendues par le circuit Make de M. Faé (10 octobre 2026).
// Partagées par le formulaire Contact et la route /api/demande.
export const PROFILS = ['Candidat libre', 'Perfectionnement auto-école', 'Prescripteur'] as const
export const ZONES = [
  { value: 'A', label: "Zone A : jusqu'à 15 km du point de stationnement du véhicule" },
  { value: 'B', label: 'Zone B : de 15 à 35 km' },
  { value: 'C', label: 'Zone C : plus de 35 km' },
] as const
export const PACKS = ['5h', '10h', '20h'] as const
