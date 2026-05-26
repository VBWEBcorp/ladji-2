'use client'

import { PageEditor } from '@/components/admin/page-editor'
import { FieldEditor, SectionEditor, ImageField } from '@/components/admin/field-editor'
import { Button } from '@/components/ui/button'
import { Plus, Trash2 } from 'lucide-react'
import {
  ctaContent,
  galleryContent,
  heroContent,
  storyContent,
} from '@/lib/site-content'

const defaults = {
  hero: {
    eyebrow: heroContent.eyebrow,
    title: heroContent.title,
    description: heroContent.description,
    button1: heroContent.button1,
    button2: heroContent.button2,
    features: heroContent.features,
    stats: heroContent.stats,
    images: heroContent.images,
  },
  story: {
    eyebrow: storyContent.eyebrow,
    title: storyContent.title,
    steps: storyContent.steps,
    ctaLabel: storyContent.ctaLabel,
    image: storyContent.image,
  },
  cta: {
    eyebrow: ctaContent.eyebrow,
    title: ctaContent.title,
    description: ctaContent.description,
    button: ctaContent.button,
  },
  gallery: {
    eyebrow: galleryContent.eyebrow,
    title: galleryContent.title,
    images: galleryContent.images,
  },
}

export default function AdminHomePage() {
  return (
    <PageEditor pageId="home" title="Page d'accueil" defaultContent={defaults}>
      {(content, update) => (
        <>
          <SectionEditor title="Hero (carousel + accroche)">
            <FieldEditor label="Accroche" value={content.hero?.eyebrow} onChange={(v) => update('hero.eyebrow', v)} />
            <FieldEditor label="Titre principal" value={content.hero?.title} onChange={(v) => update('hero.title', v)} />
            <FieldEditor label="Description" value={content.hero?.description} onChange={(v) => update('hero.description', v)} type="textarea" />
            <FieldEditor label="Bouton 1" value={content.hero?.button1} onChange={(v) => update('hero.button1', v)} />
            <FieldEditor label="Bouton 2" value={content.hero?.button2} onChange={(v) => update('hero.button2', v)} />

            <div className="space-y-3 pt-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Points clés (sous le titre)</p>
              {(content.hero?.features ?? []).map((feat: string, i: number) => (
                <div key={i} className="flex items-center gap-2">
                  <FieldEditor
                    label={`Point ${i + 1}`}
                    value={feat}
                    onChange={(v) => {
                      const list = [...(content.hero.features ?? [])]
                      list[i] = v
                      update('hero.features', list)
                    }}
                  />
                  <button
                    onClick={() => {
                      const list = (content.hero.features ?? []).filter((_: string, j: number) => j !== i)
                      update('hero.features', list)
                    }}
                    className="text-destructive hover:text-destructive/80"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() => update('hero.features', [...(content.hero?.features ?? []), ''])}
              >
                <Plus className="size-4" />
                Ajouter un point
              </Button>
            </div>

            <div className="space-y-3 pt-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Statistiques (3 chiffres clés)</p>
              {(content.hero?.stats ?? []).map((stat: { value: string; label: string }, i: number) => (
                <div key={i} className="p-3 border border-border/30 rounded-lg space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <FieldEditor
                      label="Valeur"
                      value={stat.value}
                      onChange={(v) => {
                        const list = [...(content.hero.stats ?? [])]
                        list[i] = { ...list[i], value: v }
                        update('hero.stats', list)
                      }}
                    />
                    <FieldEditor
                      label="Libellé"
                      value={stat.label}
                      onChange={(v) => {
                        const list = [...(content.hero.stats ?? [])]
                        list[i] = { ...list[i], label: v }
                        update('hero.stats', list)
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Images du carousel</p>
              {(content.hero?.images ?? []).map((img: string, i: number) => (
                <ImageField
                  key={i}
                  label={`Image ${i + 1}`}
                  value={img}
                  onChange={(v) => {
                    const list = [...(content.hero.images ?? [])]
                    list[i] = v
                    update('hero.images', list)
                  }}
                />
              ))}
            </div>
          </SectionEditor>

          <SectionEditor title="Comment ça marche (3 étapes + image)">
            <FieldEditor label="Accroche" value={content.story?.eyebrow} onChange={(v) => update('story.eyebrow', v)} />
            <FieldEditor label="Titre" value={content.story?.title} onChange={(v) => update('story.title', v)} />
            <FieldEditor label="Bouton (lien vers À propos)" value={content.story?.ctaLabel} onChange={(v) => update('story.ctaLabel', v)} />
            <ImageField label="Image" value={content.story?.image} onChange={(v) => update('story.image', v)} />

            <div className="space-y-3 pt-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Étapes (numérotées 1 à 3)</p>
              {(content.story?.steps ?? []).map((step: { title: string; desc: string }, i: number) => (
                <div key={i} className="p-3 border border-border/30 rounded-lg space-y-2">
                  <FieldEditor
                    label={`Étape ${i + 1} : titre`}
                    value={step.title}
                    onChange={(v) => {
                      const list = [...(content.story.steps ?? [])]
                      list[i] = { ...list[i], title: v }
                      update('story.steps', list)
                    }}
                  />
                  <FieldEditor
                    label="Description"
                    value={step.desc}
                    onChange={(v) => {
                      const list = [...(content.story.steps ?? [])]
                      list[i] = { ...list[i], desc: v }
                      update('story.steps', list)
                    }}
                    type="textarea"
                  />
                </div>
              ))}
            </div>
          </SectionEditor>

          <SectionEditor title="Galerie (carousel bas de page)">
            <FieldEditor label="Accroche" value={content.gallery?.eyebrow} onChange={(v) => update('gallery.eyebrow', v)} />
            <FieldEditor label="Titre" value={content.gallery?.title} onChange={(v) => update('gallery.title', v)} />
            <div className="space-y-3 pt-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Images</p>
              {(content.gallery?.images ?? []).map((img: string, i: number) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="flex-1">
                    <ImageField
                      label={`Image ${i + 1}`}
                      value={img}
                      onChange={(v) => {
                        const list = [...(content.gallery.images ?? [])]
                        list[i] = v
                        update('gallery.images', list)
                      }}
                    />
                  </div>
                  <button
                    onClick={() => {
                      const list = (content.gallery.images ?? []).filter((_: string, j: number) => j !== i)
                      update('gallery.images', list)
                    }}
                    className="mt-7 text-destructive hover:text-destructive/80"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() => update('gallery.images', [...(content.gallery?.images ?? []), ''])}
              >
                <Plus className="size-4" />
                Ajouter une image
              </Button>
            </div>
          </SectionEditor>

          <SectionEditor title="Appel à l'action (bas de page)">
            <FieldEditor label="Accroche" value={content.cta?.eyebrow} onChange={(v) => update('cta.eyebrow', v)} />
            <FieldEditor label="Titre" value={content.cta?.title} onChange={(v) => update('cta.title', v)} />
            <FieldEditor label="Description" value={content.cta?.description} onChange={(v) => update('cta.description', v)} type="textarea" />
            <FieldEditor label="Bouton" value={content.cta?.button} onChange={(v) => update('cta.button', v)} />
          </SectionEditor>
        </>
      )}
    </PageEditor>
  )
}
