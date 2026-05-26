'use client'

import { PageEditor } from '@/components/admin/page-editor'
import { FieldEditor, SectionEditor } from '@/components/admin/field-editor'
import { Button } from '@/components/ui/button'
import { Plus, Trash2 } from 'lucide-react'
import { contactContent } from '@/lib/site-content'
import { siteConfig } from '@/lib/seo'

const defaults = {
  hero: contactContent.hero,
  form: contactContent.form,
  info: {
    phone: siteConfig.phone,
    email: siteConfig.email,
    street: siteConfig.address.street,
    postalCode: siteConfig.address.postalCode,
    city: siteConfig.address.city,
  },
}

export default function AdminContactPage() {
  return (
    <PageEditor pageId="contact" title="Page Contact" defaultContent={defaults}>
      {(content, update) => (
        <>
          <SectionEditor title="Hero">
            <FieldEditor label="Accroche" value={content.hero?.eyebrow} onChange={(v) => update('hero.eyebrow', v)} />
            <FieldEditor label="Titre" value={content.hero?.title} onChange={(v) => update('hero.title', v)} />
            <FieldEditor label="Description" value={content.hero?.description} onChange={(v) => update('hero.description', v)} type="textarea" />
          </SectionEditor>

          <SectionEditor title="Coordonnées affichées">
            <FieldEditor label="Téléphone" value={content.info?.phone} onChange={(v) => update('info.phone', v)} placeholder="06 37 53 43 26" />
            <FieldEditor label="Email" value={content.info?.email} onChange={(v) => update('info.email', v)} placeholder="contact@auto-conduite.com" />
            <FieldEditor label="Adresse" value={content.info?.street} onChange={(v) => update('info.street', v)} placeholder="Bassin Sarrebourg / Château-Salins" />
            <FieldEditor label="Code postal" value={content.info?.postalCode} onChange={(v) => update('info.postalCode', v)} placeholder="57400" />
            <FieldEditor label="Ville / département" value={content.info?.city} onChange={(v) => update('info.city', v)} placeholder="Moselle" />
          </SectionEditor>

          <SectionEditor title="Formulaire de contact">
            <FieldEditor label="Titre du formulaire" value={content.form?.title} onChange={(v) => update('form.title', v)} />
            <FieldEditor label="Libellé bouton" value={content.form?.submitLabel} onChange={(v) => update('form.submitLabel', v)} />

            <div className="space-y-3 pt-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Profils proposés dans le menu déroulant</p>
              {(content.form?.profileOptions ?? []).map((opt: string, i: number) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="flex-1">
                    <FieldEditor
                      label={`Option ${i + 1}`}
                      value={opt}
                      onChange={(v) => {
                        const list = [...(content.form?.profileOptions ?? [])]
                        list[i] = v
                        update('form.profileOptions', list)
                      }}
                    />
                  </div>
                  <button
                    onClick={() => {
                      const list = (content.form?.profileOptions ?? []).filter((_: string, j: number) => j !== i)
                      update('form.profileOptions', list)
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
                onClick={() => update('form.profileOptions', [...(content.form?.profileOptions ?? []), ''])}
              >
                <Plus className="size-4" />
                Ajouter une option
              </Button>
            </div>
          </SectionEditor>
        </>
      )}
    </PageEditor>
  )
}
