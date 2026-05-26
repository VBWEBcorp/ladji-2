'use client'

import { useRef, useState } from 'react'
import { Upload, Link as LinkIcon, X, Loader2, Plus, Trash2, ChevronUp, ChevronDown } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface FieldEditorProps {
  label: string
  value: string
  onChange: (value: string) => void
  type?: 'text' | 'textarea' | 'url'
  placeholder?: string
}

export function FieldEditor({ label, value, onChange, type = 'text', placeholder }: FieldEditorProps) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
        {label}
      </Label>
      {type === 'textarea' ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
          className="w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 resize-y"
        />
      ) : (
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          type={type === 'url' ? 'url' : 'text'}
        />
      )}
    </div>
  )
}

interface SectionEditorProps {
  title: string
  children: React.ReactNode
}

export function SectionEditor({ title, children }: SectionEditorProps) {
  return (
    <div className="rounded-xl bg-card border border-border/40 overflow-hidden">
      <div className="px-5 py-3 border-b border-border/40 bg-muted/30">
        <h3 className="text-xs font-bold text-muted-foreground/60 uppercase tracking-widest">{title}</h3>
      </div>
      <div className="p-5 space-y-4">
        {children}
      </div>
    </div>
  )
}

/**
 * StringListEditor : édite une liste de chaînes (paragraphes, points, items…)
 * avec ajout, suppression et champ texte/textarea par entrée.
 */
interface StringListEditorProps {
  label: string
  items: string[]
  onChange: (items: string[]) => void
  type?: 'text' | 'textarea'
  addLabel?: string
  itemLabel?: (i: number) => string
}

export function StringListEditor({
  label,
  items,
  onChange,
  type = 'text',
  addLabel = 'Ajouter',
  itemLabel,
}: StringListEditorProps) {
  const list = items ?? []
  return (
    <div className="space-y-3 pt-2">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{label}</p>
      {list.map((item, i) => (
        <div key={i} className="flex items-start gap-2">
          <div className="flex-1">
            <FieldEditor
              label={itemLabel ? itemLabel(i) : `${i + 1}`}
              value={item}
              type={type}
              onChange={(v) => {
                const next = [...list]
                next[i] = v
                onChange(next)
              }}
            />
          </div>
          <button
            type="button"
            onClick={() => onChange(list.filter((_, j) => j !== i))}
            className="mt-7 text-destructive hover:text-destructive/80"
            title="Supprimer"
          >
            <Trash2 className="size-4" />
          </button>
        </div>
      ))}
      <Button
        variant="outline"
        size="sm"
        className="gap-2"
        onClick={() => onChange([...list, ''])}
      >
        <Plus className="size-4" />
        {addLabel}
      </Button>
    </div>
  )
}

/**
 * RepeaterField : édite une liste d'objets. Pour chaque entrée, `renderItem`
 * fournit l'UI d'édition. Gère ajout (via `makeNew`), suppression et ré-ordonnancement.
 */
interface RepeaterFieldProps<T> {
  label: string
  items: T[]
  onChange: (items: T[]) => void
  makeNew: () => T
  addLabel?: string
  renderItem: (item: T, update: (patch: Partial<T>) => void, index: number) => React.ReactNode
  itemTitle?: (item: T, index: number) => string
}

export function RepeaterField<T>({
  label,
  items,
  onChange,
  makeNew,
  addLabel = 'Ajouter',
  renderItem,
  itemTitle,
}: RepeaterFieldProps<T>) {
  const list = items ?? []

  const updateAt = (index: number, patch: Partial<T>) => {
    const next = [...list]
    next[index] = { ...next[index], ...patch }
    onChange(next)
  }

  const removeAt = (index: number) => onChange(list.filter((_, j) => j !== index))

  const move = (index: number, dir: -1 | 1) => {
    const target = index + dir
    if (target < 0 || target >= list.length) return
    const next = [...list]
    ;[next[index], next[target]] = [next[target], next[index]]
    onChange(next)
  }

  return (
    <div className="space-y-3 pt-2">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{label}</p>
      {list.map((item, i) => (
        <div key={i} className="rounded-lg border border-border/40 bg-muted/20 p-3 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-muted-foreground/70 uppercase tracking-wide">
              {itemTitle ? itemTitle(item, i) : `Entrée ${i + 1}`}
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => move(i, -1)}
                disabled={i === 0}
                className="text-muted-foreground hover:text-foreground disabled:opacity-30"
                title="Monter"
              >
                <ChevronUp className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => move(i, 1)}
                disabled={i === list.length - 1}
                className="text-muted-foreground hover:text-foreground disabled:opacity-30"
                title="Descendre"
              >
                <ChevronDown className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => removeAt(i)}
                className="text-destructive hover:text-destructive/80"
                title="Supprimer"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          </div>
          {renderItem(item, (patch) => updateAt(i, patch), i)}
        </div>
      ))}
      <Button
        variant="outline"
        size="sm"
        className="gap-2"
        onClick={() => onChange([...list, makeNew()])}
      >
        <Plus className="size-4" />
        {addLabel}
      </Button>
    </div>
  )
}

interface ImageFieldProps {
  label: string
  value: string
  onChange: (value: string) => void
}

export function ImageField({ label, value, onChange }: ImageFieldProps) {
  const [mode, setMode] = useState<'link' | 'upload'>(
    value && !value.startsWith('/uploads') && !value.includes('r2') ? 'link' : 'upload'
  )
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [uploadInfo, setUploadInfo] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleUpload = async (file: File) => {
    setUploading(true)
    try {
      const token = localStorage.getItem('authToken')
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      })

      if (!response.ok) {
        const data = await response.json()
        alert(data.error || 'Erreur upload')
        return
      }

      const data = await response.json()
      onChange(data.url)
      setUploadInfo(`${data.originalSize} → ${data.optimizedSize} (${data.storage})`)
    } catch (error) {
      alert('Erreur lors de l\'upload')
    } finally {
      setUploading(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleUpload(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith('image/')) {
      handleUpload(file)
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          {label}
        </Label>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => setMode('upload')}
            className={cn(
              'flex items-center gap-1 px-2 py-1 rounded text-xs font-medium transition-colors',
              mode === 'upload'
                ? 'bg-primary/10 text-primary'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <Upload className="size-3" />
            Upload
          </button>
          <button
            type="button"
            onClick={() => setMode('link')}
            className={cn(
              'flex items-center gap-1 px-2 py-1 rounded text-xs font-medium transition-colors',
              mode === 'link'
                ? 'bg-primary/10 text-primary'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <LinkIcon className="size-3" />
            Lien
          </button>
        </div>
      </div>

      {mode === 'link' ? (
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://..."
          type="url"
        />
      ) : (
        <>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <div
            onClick={() => !uploading && inputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            className={cn(
              'flex flex-col items-center justify-center gap-2 p-6 border-2 border-dashed rounded-lg cursor-pointer transition-colors',
              dragOver
                ? 'border-primary bg-primary/5'
                : 'border-border/50 hover:border-primary/30 hover:bg-muted/30',
              uploading && 'pointer-events-none opacity-60'
            )}
          >
            {uploading ? (
              <>
                <Loader2 className="size-6 text-primary animate-spin" />
                <span className="text-sm text-muted-foreground">Upload en cours...</span>
              </>
            ) : (
              <>
                <Upload className="size-6 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Cliquez ou glissez une image ici
                </span>
                <span className="text-xs text-muted-foreground/60">
                  JPG, PNG, WebP, GIF - max 5 Mo
                </span>
              </>
            )}
          </div>
        </>
      )}

      {/* Preview */}
      {value && (
        <div className="relative group w-full max-w-xs">
          <div className="aspect-video rounded-lg overflow-hidden bg-muted border border-border/50">
            <img src={value} alt="" className="object-cover w-full h-full" />
          </div>
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute top-2 right-2 p-1 rounded-md bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80"
          >
            <X className="size-3" />
          </button>
          <p className="text-xs text-muted-foreground mt-1 truncate">{value}</p>
          {uploadInfo && (
            <p className="text-xs text-primary mt-0.5">{uploadInfo}</p>
          )}
        </div>
      )}
    </div>
  )
}
