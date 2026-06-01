// ============================================================================
//   GOOGLE MAPS — chargement de l'API + utilitaires de zone
// ----------------------------------------------------------------------------
//   La carte affiche des points de dépôt FIXES. Le bénéficiaire saisit son
//   adresse, on calcule le point le plus proche puis la zone (A/B/C) selon la
//   distance, ce qui détermine le bon tarif et le bon lien de paiement.
// ============================================================================

export type ZoneCode = 'A' | 'B' | 'C'

export interface DepositPoint {
  name: string
  address: string
  hours?: string
  lat: number
  lng: number
}

export interface LatLng {
  lat: number
  lng: number
}

/** Seuils officiels (cf. cahier des charges §3.3). */
export const ZONE_THRESHOLDS = { B: 15, C: 35 } as const

/** Déduit la zone à partir de la distance (km) au point le plus proche. */
export function zoneFromKm(km: number): ZoneCode {
  if (km <= ZONE_THRESHOLDS.B) return 'A'
  if (km <= ZONE_THRESHOLDS.C) return 'B'
  return 'C'
}

/** Distance à vol d'oiseau (km) entre deux points — formule de haversine. */
export function haversineKm(a: LatLng, b: LatLng): number {
  const R = 6371
  const dLat = ((b.lat - a.lat) * Math.PI) / 180
  const dLng = ((b.lng - a.lng) * Math.PI) / 180
  const lat1 = (a.lat * Math.PI) / 180
  const lat2 = (b.lat * Math.PI) / 180
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.sin(dLng / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2)
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(h)))
}

/** Renvoie le point de dépôt le plus proche d'une position + la distance. */
export function nearestPoint(
  origin: LatLng,
  points: DepositPoint[]
): { point: DepositPoint; km: number } | null {
  const valid = points.filter((p) => Number.isFinite(p.lat) && Number.isFinite(p.lng))
  if (valid.length === 0) return null
  let best = valid[0]
  let bestKm = haversineKm(origin, best)
  for (const p of valid.slice(1)) {
    const km = haversineKm(origin, p)
    if (km < bestKm) {
      best = p
      bestKm = km
    }
  }
  return { point: best, km: bestKm }
}

/* -------------------------------------------------------------------------- */
/*  Chargement du script Google Maps (singleton)                               */
/* -------------------------------------------------------------------------- */

// Le package @types/google.maps n'est pas installé : on type l'API en `any`.
/* eslint-disable @typescript-eslint/no-explicit-any */
let mapsPromise: Promise<any> | null = null

export function loadGoogleMaps(apiKey: string): Promise<any> {
  if (typeof window === 'undefined') return Promise.reject(new Error('no window'))
  const w = window as any
  if (w.google?.maps) return Promise.resolve(w.google.maps)
  if (mapsPromise) return mapsPromise

  mapsPromise = new Promise((resolve, reject) => {
    if (!apiKey) {
      reject(new Error('clé Google Maps absente'))
      return
    }
    const cbName = '__autoConduiteInitMaps'
    ;(window as any)[cbName] = () => {
      resolve((window as any).google.maps)
    }
    const script = document.createElement('script')
    script.src =
      `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}` +
      `&libraries=places&language=fr&region=FR&callback=${cbName}`
    script.async = true
    script.defer = true
    script.onerror = () => reject(new Error('échec du chargement de Google Maps'))
    document.head.appendChild(script)
  })
  return mapsPromise
}

export const GOOGLE_MAPS_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || ''
