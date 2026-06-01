'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */

import { MapPin, Navigation, Search } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import {
  GOOGLE_MAPS_KEY,
  loadGoogleMaps,
  nearestPoint,
  zoneFromKm,
  type DepositPoint,
  type ZoneCode,
} from '@/lib/maps'

interface ZoneResult {
  zone: ZoneCode
  km: number
  point: DepositPoint
  address: string
}

const zoneLabel: Record<ZoneCode, string> = {
  A: 'jusqu\'à 15 km',
  B: '15 à 35 km',
  C: '+ 35 km',
}

export function ZoneFinder({
  points,
  onZoneDetected,
}: {
  points: DepositPoint[]
  onZoneDetected?: (zone: ZoneCode, result: ZoneResult) => void
}) {
  const mapHostRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const mapRef = useRef<any>(null)
  const mapsRef = useRef<any>(null)
  const userMarkerRef = useRef<any>(null)

  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const [result, setResult] = useState<ZoneResult | null>(null)

  useEffect(() => {
    let cancelled = false

    if (!GOOGLE_MAPS_KEY) {
      setStatus('error')
      return
    }

    loadGoogleMaps(GOOGLE_MAPS_KEY)
      .then((maps) => {
        if (cancelled || !mapHostRef.current) return
        mapsRef.current = maps

        const valid = points.filter((p) => Number.isFinite(p.lat) && Number.isFinite(p.lng))
        const center = valid.length
          ? { lat: valid[0].lat, lng: valid[0].lng }
          : { lat: 48.7361, lng: 7.0553 }

        const map = new maps.Map(mapHostRef.current, {
          center,
          zoom: 10,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
        })
        mapRef.current = map

        // Marqueurs des points de dépôt fixes.
        const bounds = new maps.LatLngBounds()
        valid.forEach((p) => {
          const marker = new maps.Marker({
            position: { lat: p.lat, lng: p.lng },
            map,
            title: p.name,
          })
          const info = new maps.InfoWindow({
            content: `<strong>${p.name}</strong><br>${p.address}`,
          })
          marker.addListener('click', () => info.open({ anchor: marker, map }))
          bounds.extend({ lat: p.lat, lng: p.lng })
        })
        if (valid.length > 1) map.fitBounds(bounds, 48)

        // Autocomplétion d'adresse (Places, restreinte à la France).
        if (inputRef.current && maps.places?.Autocomplete) {
          const ac = new maps.places.Autocomplete(inputRef.current, {
            componentRestrictions: { country: 'fr' },
            fields: ['geometry', 'formatted_address'],
          })
          ac.addListener('place_changed', () => {
            const place = ac.getPlace()
            if (!place?.geometry?.location) return
            const origin = {
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
            }
            handleOrigin(origin, place.formatted_address || '')
          })
        }

        setStatus('ready')
      })
      .catch(() => {
        if (!cancelled) setStatus('error')
      })

    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [points])

  const handleOrigin = (origin: { lat: number; lng: number }, address: string) => {
    const maps = mapsRef.current
    const map = mapRef.current
    const nearest = nearestPoint(origin, points)
    if (!maps || !map || !nearest) return

    const zone = zoneFromKm(nearest.km)
    const next: ZoneResult = { zone, km: nearest.km, point: nearest.point, address }
    setResult(next)
    onZoneDetected?.(zone, next)

    // Marqueur de l'adresse du bénéficiaire (point bleu).
    if (userMarkerRef.current) userMarkerRef.current.setMap(null)
    userMarkerRef.current = new maps.Marker({
      position: origin,
      map,
      title: 'Votre adresse',
      icon: {
        path: maps.SymbolPath.CIRCLE,
        scale: 8,
        fillColor: '#2da3b2',
        fillOpacity: 1,
        strokeColor: '#ffffff',
        strokeWeight: 3,
      },
    })

    // Recadre la carte sur l'adresse + le point le plus proche.
    const bounds = new maps.LatLngBounds()
    bounds.extend(origin)
    bounds.extend({ lat: nearest.point.lat, lng: nearest.point.lng })
    map.fitBounds(bounds, 80)
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      {/* Carte */}
      <div className="relative min-h-[340px] overflow-hidden rounded-2xl border border-border/80 bg-muted/40 ring-1 ring-foreground/5 lg:min-h-[420px]">
        <div ref={mapHostRef} className="absolute inset-0 size-full" />
        {status !== 'ready' && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted/60 px-6 text-center text-sm text-muted-foreground backdrop-blur-sm">
            {status === 'loading'
              ? 'Chargement de la carte…'
              : "La carte n'a pas pu se charger. Vérifiez votre connexion ou réessayez plus tard."}
          </div>
        )}
      </div>

      {/* Recherche + résultat */}
      <div className="flex flex-col gap-4">
        <div>
          <label
            htmlFor="zone-address"
            className="font-display text-sm font-semibold text-foreground"
          >
            Votre adresse
          </label>
          <div className="relative mt-2">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <input
              ref={inputRef}
              id="zone-address"
              type="text"
              placeholder="Saisissez votre adresse…"
              disabled={status !== 'ready'}
              onKeyDown={(e) => {
                if (e.key === 'Enter') e.preventDefault()
              }}
              className="h-11 w-full rounded-xl border border-input bg-background/80 pl-9 pr-3 text-sm text-foreground transition-shadow placeholder:text-muted-foreground focus-visible:border-ring focus-visible:shadow-[0_0_0_4px_oklch(0.62_0.10_200/0.1)] focus-visible:outline-none disabled:opacity-60"
            />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            On calcule le point de dépôt le plus proche et votre zone tarifaire.
          </p>
        </div>

        {result ? (
          <div className="rounded-2xl border border-primary/30 bg-primary/[0.04] p-5 ring-1 ring-primary/10">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Navigation className="size-4 text-primary" aria-hidden />
              Point le plus proche
            </div>
            <p className="mt-2 font-display text-base font-semibold text-foreground">
              {result.point.name}
            </p>
            <p className="text-sm text-muted-foreground">{result.point.address}</p>
            <p className="mt-1 text-sm text-foreground/80">
              À environ <strong>{result.km.toFixed(1)} km</strong> de votre adresse.
            </p>
            <div className="mt-4 flex items-center gap-3 border-t border-primary/15 pt-4">
              <span className="flex size-10 items-center justify-center rounded-xl bg-primary font-display text-base font-bold text-primary-foreground">
                {result.zone}
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">Zone {result.zone}</p>
                <p className="text-xs text-muted-foreground">{zoneLabel[result.zone]}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-1 items-center gap-3 rounded-2xl border border-dashed border-border/70 p-5 text-sm text-muted-foreground">
            <MapPin className="size-5 shrink-0 text-primary/60" aria-hidden />
            Saisissez votre adresse pour voir le point le plus proche et votre zone.
          </div>
        )}
      </div>
    </div>
  )
}
