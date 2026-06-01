'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */

import { motion } from 'framer-motion'
import { ArrowLeft, Check, MapPin, Plus, Save, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { GOOGLE_MAPS_KEY, loadGoogleMaps } from '@/lib/maps'
import { depositPoints } from '@/lib/site-content'

interface EditablePoint {
  id: string
  name: string
  address: string
  hours: string
  lat: number
  lng: number
}

const DEFAULT_HOURS = 'Accès 24h/24 · 7j/7 · parking ouvert'

function newId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID()
  return `p_${Math.floor(performance.now() * 1000)}`
}

function withIds(list: any[]): EditablePoint[] {
  return (list || [])
    .filter((p) => p && typeof p === 'object')
    .map((p) => ({
      id: p.id || newId(),
      name: p.name || '',
      address: p.address || '',
      hours: p.hours || DEFAULT_HOURS,
      lat: Number(p.lat),
      lng: Number(p.lng),
    }))
}

export default function AdminDepositsPage() {
  const router = useRouter()
  const mapHostRef = useRef<HTMLDivElement>(null)
  const mapsRef = useRef<any>(null)
  const mapRef = useRef<any>(null)
  const markersRef = useRef<Record<string, any>>({})

  const [points, setPoints] = useState<EditablePoint[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [mapStatus, setMapStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  // Accès aux points à jour depuis les callbacks Google Maps (closures).
  const pointsRef = useRef<EditablePoint[]>([])
  pointsRef.current = points

  // --- Chargement des points enregistrés --------------------------------------
  useEffect(() => {
    if (!localStorage.getItem('authToken')) {
      router.push('/admin/login')
      return
    }
    fetch('/api/content/mapPoints')
      .then((r) => r.json())
      .then((res) => {
        const saved = res?.content?.points
        setPoints(withIds(Array.isArray(saved) && saved.length ? saved : depositPoints))
      })
      .catch(() => setPoints(withIds(depositPoints)))
      .finally(() => setLoading(false))
  }, [router])

  // --- Initialisation de la carte ---------------------------------------------
  useEffect(() => {
    if (loading) return
    if (!GOOGLE_MAPS_KEY) {
      setMapStatus('error')
      return
    }
    let cancelled = false
    loadGoogleMaps(GOOGLE_MAPS_KEY)
      .then((maps) => {
        if (cancelled || !mapHostRef.current || mapRef.current) return
        mapsRef.current = maps
        const first = pointsRef.current.find((p) => Number.isFinite(p.lat))
        const map = new maps.Map(mapHostRef.current, {
          center: first ? { lat: first.lat, lng: first.lng } : { lat: 48.7361, lng: 7.0553 },
          zoom: 10,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
        })
        mapRef.current = map
        // Clic sur la carte = ajout d'un point à cet endroit.
        map.addListener('click', (e: any) => {
          const lat = e.latLng.lat()
          const lng = e.latLng.lng()
          const id = newId()
          setPoints((prev) => [
            ...prev,
            { id, name: 'Nouveau point', address: '', hours: DEFAULT_HOURS, lat, lng },
          ])
          setSelectedId(id)
        })
        setMapStatus('ready')
      })
      .catch(() => {
        if (!cancelled) setMapStatus('error')
      })
    return () => {
      cancelled = true
    }
  }, [loading])

  // --- (Re)construction des marqueurs quand la géométrie change ---------------
  const geomKey = points
    .map((p) => `${p.id}:${Number.isFinite(p.lat) ? p.lat.toFixed(5) : 'x'},${Number.isFinite(p.lng) ? p.lng.toFixed(5) : 'x'}`)
    .join('|')

  useEffect(() => {
    const maps = mapsRef.current
    const map = mapRef.current
    if (mapStatus !== 'ready' || !maps || !map) return

    // Retire les marqueurs obsolètes.
    Object.entries(markersRef.current).forEach(([id, marker]) => {
      if (!points.some((p) => p.id === id)) {
        ;(marker as any).setMap(null)
        delete markersRef.current[id]
      }
    })

    points.forEach((p, i) => {
      if (!Number.isFinite(p.lat) || !Number.isFinite(p.lng)) return
      let marker = markersRef.current[p.id]
      if (!marker) {
        marker = new maps.Marker({
          map,
          draggable: true,
          label: { text: String(i + 1), color: '#fff', fontSize: '12px', fontWeight: '700' },
        })
        marker.addListener('dragend', (e: any) => {
          const lat = e.latLng.lat()
          const lng = e.latLng.lng()
          setPoints((prev) => prev.map((pt) => (pt.id === p.id ? { ...pt, lat, lng } : pt)))
        })
        marker.addListener('click', () => setSelectedId(p.id))
        markersRef.current[p.id] = marker
      }
      marker.setPosition({ lat: p.lat, lng: p.lng })
      marker.setLabel({ text: String(i + 1), color: '#fff', fontSize: '12px', fontWeight: '700' })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geomKey, mapStatus])

  const update = (id: string, field: keyof EditablePoint, value: string | number) => {
    setSaved(false)
    setPoints((prev) => prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)))
  }

  const addPoint = () => {
    const map = mapRef.current
    const c = map?.getCenter?.()
    const id = newId()
    setPoints((prev) => [
      ...prev,
      {
        id,
        name: 'Nouveau point',
        address: '',
        hours: DEFAULT_HOURS,
        lat: c ? c.lat() : 48.7361,
        lng: c ? c.lng() : 7.0553,
      },
    ])
    setSelectedId(id)
  }

  const removePoint = (id: string) => {
    setSaved(false)
    setPoints((prev) => prev.filter((p) => p.id !== id))
    if (selectedId === id) setSelectedId(null)
  }

  const focusPoint = (p: EditablePoint) => {
    setSelectedId(p.id)
    const map = mapRef.current
    if (map && Number.isFinite(p.lat)) {
      map.panTo({ lat: p.lat, lng: p.lng })
      map.setZoom(Math.max(map.getZoom() ?? 12, 13))
    }
  }

  const save = useCallback(async () => {
    setSaving(true)
    try {
      const token = localStorage.getItem('authToken')
      // On retire l'id interne avant l'enregistrement (non utilisé côté site).
      const clean = points.map(({ id: _id, ...rest }) => rest)
      const res = await fetch('/api/content/mapPoints', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ content: { points: clean } }),
      })
      if (res.ok) {
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
      }
    } finally {
      setSaving(false)
    }
  }, [points])

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/dashboard"
            className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-card hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
          </Link>
          <div>
            <h1 className="text-lg font-bold text-foreground">Points de dépôt</h1>
            <p className="text-xs text-muted-foreground">
              Cliquez sur la carte pour ajouter un point, déplacez-le à la souris, puis enregistrez.
            </p>
          </div>
        </div>
        <Button onClick={save} disabled={saving} size="sm" className={saved ? 'bg-emerald-600 hover:bg-emerald-600' : ''}>
          {saved ? <><Check className="size-3.5" /> Enregistré</> : <><Save className="size-3.5" /> {saving ? 'Enregistrement…' : 'Enregistrer'}</>}
        </Button>
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground">Chargement…</p>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid gap-6 lg:grid-cols-[1fr_400px]"
        >
          {/* Carte */}
          <div className="relative min-h-[420px] overflow-hidden rounded-2xl border border-border/70 bg-muted/40 lg:min-h-[560px]">
            <div ref={mapHostRef} className="absolute inset-0 size-full" />
            {mapStatus !== 'ready' && (
              <div className="absolute inset-0 flex items-center justify-center bg-muted/60 px-6 text-center text-sm text-muted-foreground backdrop-blur-sm">
                {mapStatus === 'loading'
                  ? 'Chargement de la carte…'
                  : "La carte ne se charge pas. Vérifiez la clé Google Maps (NEXT_PUBLIC_GOOGLE_MAPS_KEY)."}
              </div>
            )}
          </div>

          {/* Liste des points */}
          <div className="space-y-3">
            <Button onClick={addPoint} variant="outline" className="w-full" disabled={mapStatus !== 'ready'}>
              <Plus className="size-4" /> Ajouter un point
            </Button>

            {points.length === 0 && (
              <p className="rounded-xl border border-dashed border-border/70 p-4 text-sm text-muted-foreground">
                Aucun point. Cliquez sur la carte ou sur « Ajouter un point ».
              </p>
            )}

            {points.map((p, i) => (
              <div
                key={p.id}
                onClick={() => focusPoint(p)}
                className={`cursor-pointer rounded-xl border bg-card p-4 transition-colors ${
                  selectedId === p.id ? 'border-primary ring-1 ring-primary/30' : 'border-border/60'
                }`}
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 text-xs font-semibold text-primary">
                    <span className="flex size-5 items-center justify-center rounded-full bg-primary text-[11px] text-primary-foreground">
                      {i + 1}
                    </span>
                    Point {i + 1}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      removePoint(p.id)
                    }}
                    className="flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-rose-50 hover:text-rose-600"
                    aria-label="Supprimer ce point"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
                <div className="space-y-2.5" onClick={(e) => e.stopPropagation()}>
                  <div className="space-y-1">
                    <Label htmlFor={`name-${p.id}`} className="text-xs">Nom</Label>
                    <Input
                      id={`name-${p.id}`}
                      value={p.name}
                      onChange={(e) => update(p.id, 'name', e.target.value)}
                      placeholder="Parking Leclerc Sarrebourg"
                      className="h-9"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor={`addr-${p.id}`} className="text-xs">Adresse</Label>
                    <Input
                      id={`addr-${p.id}`}
                      value={p.address}
                      onChange={(e) => update(p.id, 'address', e.target.value)}
                      placeholder="Sarrebourg (57400)"
                      className="h-9"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor={`hours-${p.id}`} className="text-xs">Horaires / accès</Label>
                    <Input
                      id={`hours-${p.id}`}
                      value={p.hours}
                      onChange={(e) => update(p.id, 'hours', e.target.value)}
                      className="h-9"
                    />
                  </div>
                  <p className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                    <MapPin className="size-3" />
                    {Number.isFinite(p.lat) ? p.lat.toFixed(5) : '?'}, {Number.isFinite(p.lng) ? p.lng.toFixed(5) : '?'}
                    <span className="ml-1 italic">(glissez le repère sur la carte pour ajuster)</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}
