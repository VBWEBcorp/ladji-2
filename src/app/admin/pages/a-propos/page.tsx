'use client'

import { PageEditor } from '@/components/admin/page-editor'
import { FieldEditor, SectionEditor, ImageField } from '@/components/admin/field-editor'
import { Button } from '@/components/ui/button'
import { Plus, Trash2 } from 'lucide-react'
import { aboutContent } from '@/lib/site-content'

const defaults = {
  hero: aboutContent.hero,
  values: aboutContent.values,
  legal: aboutContent.legal,
  institutions: aboutContent.institutions,
  gallery: aboutContent.gallery,
}

export default function AdminAboutPage() {
  return (
    <PageEditor pageId="about" title="Page À propos" defaultContent={defaults}>
      {(content, update) => (
        <>
          <SectionEditor title="Hero">
            <FieldEditor label="Accroche" value={content.hero?.eyebrow} onChange={(v) => update('hero.eyebrow', v)} />
            <FieldEditor label="Titre" value={content.hero?.title} onChange={(v) => update('hero.title', v)} />
            <FieldEditor label="Description" value={content.hero?.description} onChange={(v) => update('hero.description', v)} type="textarea" />
            <ImageField label="Image de fond" value={content.hero?.image} onChange={(v) => update('hero.image', v)} />
          </SectionEditor>

          <SectionEditor title="Nos valeurs (3 cartes)">
            {(content.values ?? []).map((val: { iconName?: string; title: string; description: string }, i: number) => (
              <div key={i} className="p-4 border border-border/30 rounded-lg space-y-3">
                <span className="text-xs text-muted-foreground font-medium">Valeur {i + 1}</span>
                <FieldEditor
                  label="Icône (Sparkles, ShieldCheck, Users, Scale...)"
                  value={val.iconName ?? ''}
                  onChange={(v) => {
                    const list = [...(content.values ?? [])]
                    list[i] = { ...list[i], iconName: v }
                    update('values', list)
                  }}
                />
                <FieldEditor
                  label="Titre"
                  value={val.title}
                  onChange={(v) => {
                    const list = [...(content.values ?? [])]
                    list[i] = { ...list[i], title: v }
                    update('values', list)
                  }}
                />
                <FieldEditor
                  label="Description"
                  value={val.description}
                  onChange={(v) => {
                    const list = [...(content.values ?? [])]
                    list[i] = { ...list[i], description: v }
                    update('values', list)
                  }}
                  type="textarea"
                />
              </div>
            ))}
          </SectionEditor>

          <SectionEditor title="Cadre légal (2 cartes)">
            {(content.legal ?? []).map((item: { iconName?: string; title: string; paragraphs: string[] }, i: number) => (
              <div key={i} className="p-4 border border-border/30 rounded-lg space-y-3">
                <span className="text-xs text-muted-foreground font-medium">Carte {i + 1}</span>
                <FieldEditor
                  label="Icône (Scale, ShieldCheck...)"
                  value={item.iconName ?? ''}
                  onChange={(v) => {
                    const list = [...(content.legal ?? [])]
                    list[i] = { ...list[i], iconName: v }
                    update('legal', list)
                  }}
                />
                <FieldEditor
                  label="Titre"
                  value={item.title}
                  onChange={(v) => {
                    const list = [...(content.legal ?? [])]
                    list[i] = { ...list[i], title: v }
                    update('legal', list)
                  }}
                />
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">Paragraphes</p>
                  {(item.paragraphs ?? []).map((p: string, j: number) => (
                    <div key={j} className="flex items-start gap-2">
                      <div className="flex-1">
                        <FieldEditor
                          label={`Paragraphe ${j + 1}`}
                          value={p}
                          onChange={(v) => {
                            const list = [...(content.legal ?? [])]
                            const paras = [...(list[i].paragraphs ?? [])]
                            paras[j] = v
                            list[i] = { ...list[i], paragraphs: paras }
                            update('legal', list)
                          }}
                          type="textarea"
                        />
                      </div>
                      <button
                        onClick={() => {
                          const list = [...(content.legal ?? [])]
                          const paras = (list[i].paragraphs ?? []).filter((_: string, k: number) => k !== j)
                          list[i] = { ...list[i], paragraphs: paras }
                          update('legal', list)
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
                    onClick={() => {
                      const list = [...(content.legal ?? [])]
                      const paras = [...(list[i].paragraphs ?? []), '']
                      list[i] = { ...list[i], paragraphs: paras }
                      update('legal', list)
                    }}
                  >
                    <Plus className="size-4" />
                    Ajouter un paragraphe
                  </Button>
                </div>
              </div>
            ))}
          </SectionEditor>

          <SectionEditor title="Institutions (cartes partenaires)">
            {(content.institutions ?? []).map((inst: { title: string; desc: string }, i: number) => (
              <div key={i} className="p-4 border border-border/30 rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground font-medium">Institution {i + 1}</span>
                  <button
                    onClick={() => {
                      const list = (content.institutions ?? []).filter((_: any, j: number) => j !== i)
                      update('institutions', list)
                    }}
                    className="text-destructive hover:text-destructive/80"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
                <FieldEditor
                  label="Nom"
                  value={inst.title}
                  onChange={(v) => {
                    const list = [...(content.institutions ?? [])]
                    list[i] = { ...list[i], title: v }
                    update('institutions', list)
                  }}
                />
                <FieldEditor
                  label="Description"
                  value={inst.desc}
                  onChange={(v) => {
                    const list = [...(content.institutions ?? [])]
                    list[i] = { ...list[i], desc: v }
                    update('institutions', list)
                  }}
                  type="textarea"
                />
              </div>
            ))}
            <Button
              variant="outline"
              className="w-full gap-2"
              onClick={() => update('institutions', [...(content.institutions ?? []), { title: '', desc: '' }])}
            >
              <Plus className="size-4" />
              Ajouter une institution
            </Button>
          </SectionEditor>

          <SectionEditor title="Galerie photos">
            {(content.gallery ?? []).map((img: string, i: number) => (
              <div key={i} className="flex items-start gap-2">
                <div className="flex-1">
                  <ImageField
                    label={`Image ${i + 1}`}
                    value={img}
                    onChange={(v) => {
                      const list = [...(content.gallery ?? [])]
                      list[i] = v
                      update('gallery', list)
                    }}
                  />
                </div>
                <button
                  onClick={() => {
                    const list = (content.gallery ?? []).filter((_: string, j: number) => j !== i)
                    update('gallery', list)
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
              onClick={() => update('gallery', [...(content.gallery ?? []), ''])}
            >
              <Plus className="size-4" />
              Ajouter une image
            </Button>
          </SectionEditor>
        </>
      )}
    </PageEditor>
  )
}
