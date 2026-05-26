'use client'

import { PageEditor } from '@/components/admin/page-editor'
import {
  FieldEditor,
  SectionEditor,
  ImageField,
  StringListEditor,
  RepeaterField,
} from '@/components/admin/field-editor'
import { founderContent } from '@/lib/site-content'

const defaults = founderContent

export default function AdminFounderPage() {
  return (
    <PageEditor pageId="founder" title="Le fondateur" defaultContent={defaults}>
      {(content, update) => (
        <>
          <SectionEditor title="En-tête (hero)">
            <FieldEditor label="Accroche" value={content.hero?.eyebrow} onChange={(v) => update('hero.eyebrow', v)} />
            <FieldEditor label="Titre (nom)" value={content.hero?.title} onChange={(v) => update('hero.title', v)} />
            <FieldEditor label="Sous-titre" value={content.hero?.subtitle} onChange={(v) => update('hero.subtitle', v)} />
            <FieldEditor label="Description" value={content.hero?.description} onChange={(v) => update('hero.description', v)} type="textarea" />
          </SectionEditor>

          <SectionEditor title="Photo">
            <ImageField label="Photo du fondateur" value={content.photo?.src} onChange={(v) => update('photo.src', v)} />
            <FieldEditor label="Texte alternatif (accessibilité)" value={content.photo?.alt} onChange={(v) => update('photo.alt', v)} />
          </SectionEditor>

          <SectionEditor title="Parcours (bio)">
            <FieldEditor label="Accroche" value={content.bio?.eyebrow} onChange={(v) => update('bio.eyebrow', v)} />
            <FieldEditor label="Titre" value={content.bio?.title} onChange={(v) => update('bio.title', v)} />
            <StringListEditor
              label="Paragraphes"
              addLabel="Ajouter un paragraphe"
              type="textarea"
              items={content.bio?.paragraphs ?? []}
              onChange={(v) => update('bio.paragraphs', v)}
            />
          </SectionEditor>

          <SectionEditor title="La mission">
            <FieldEditor label="Accroche" value={content.mission?.eyebrow} onChange={(v) => update('mission.eyebrow', v)} />
            <FieldEditor label="Titre" value={content.mission?.title} onChange={(v) => update('mission.title', v)} />
            <RepeaterField
              label="Points de la mission"
              addLabel="Ajouter un point"
              items={content.mission?.points ?? []}
              onChange={(v) => update('mission.points', v)}
              makeNew={() => ({ iconName: 'Sparkles', title: '', desc: '' })}
              itemTitle={(it: { title: string }, i) => it.title || `Point ${i + 1}`}
              renderItem={(it: { iconName: string; title: string; desc: string }, set) => (
                <>
                  <FieldEditor label="Icône (nom Lucide)" value={it.iconName} onChange={(v) => set({ iconName: v })} placeholder="Compass, Globe, Sparkles…" />
                  <FieldEditor label="Titre" value={it.title} onChange={(v) => set({ title: v })} />
                  <FieldEditor label="Description" value={it.desc} onChange={(v) => set({ desc: v })} type="textarea" />
                </>
              )}
            />
          </SectionEditor>

          <SectionEditor title="Contact direct">
            <FieldEditor label="Accroche" value={content.contact?.eyebrow} onChange={(v) => update('contact.eyebrow', v)} />
            <FieldEditor label="Titre" value={content.contact?.title} onChange={(v) => update('contact.title', v)} />
            <FieldEditor label="Description" value={content.contact?.description} onChange={(v) => update('contact.description', v)} type="textarea" />
            <FieldEditor label="Nom" value={content.contact?.name} onChange={(v) => update('contact.name', v)} />
            <FieldEditor label="E-mail" value={content.contact?.email} onChange={(v) => update('contact.email', v)} />
            <FieldEditor label="Téléphone" value={content.contact?.phone} onChange={(v) => update('contact.phone', v)} />
          </SectionEditor>
        </>
      )}
    </PageEditor>
  )
}
