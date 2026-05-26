'use client'

import { PageEditor } from '@/components/admin/page-editor'
import {
  FieldEditor,
  SectionEditor,
  RepeaterField,
} from '@/components/admin/field-editor'
import { profilesContent } from '@/lib/site-content'

const defaults = profilesContent

export default function AdminProfilesPage() {
  return (
    <PageEditor pageId="profiles" title="Profils (accueil)" defaultContent={defaults}>
      {(content, update) => (
        <>
          <SectionEditor title="En-tête de la section">
            <FieldEditor label="Accroche" value={content.eyebrow} onChange={(v) => update('eyebrow', v)} />
            <FieldEditor label="Titre" value={content.title} onChange={(v) => update('title', v)} />
            <FieldEditor label="Description" value={content.description} onChange={(v) => update('description', v)} type="textarea" />
          </SectionEditor>

          <SectionEditor title="Cartes profils">
            <RepeaterField
              label="Profils (4 entrées sur l'accueil)"
              addLabel="Ajouter un profil"
              items={content.entries ?? []}
              onChange={(v) => update('entries', v)}
              makeNew={() => ({ iconName: 'GraduationCap', label: '', title: '', desc: '', pricing: '', href: '/services', cta: '' })}
              itemTitle={(it: { title: string }, i) => it.title || `Profil ${i + 1}`}
              renderItem={(it: { iconName: string; label: string; title: string; desc: string; pricing: string; href: string; cta: string }, set) => (
                <>
                  <FieldEditor label="Icône (nom Lucide)" value={it.iconName} onChange={(v) => set({ iconName: v })} placeholder="GraduationCap, Compass, Building2, Wallet…" />
                  <FieldEditor label="Étiquette" value={it.label} onChange={(v) => set({ label: v })} />
                  <FieldEditor label="Titre" value={it.title} onChange={(v) => set({ title: v })} />
                  <FieldEditor label="Description" value={it.desc} onChange={(v) => set({ desc: v })} type="textarea" />
                  <FieldEditor label="Tarif / accroche" value={it.pricing} onChange={(v) => set({ pricing: v })} />
                  <FieldEditor label="Lien (href)" value={it.href} onChange={(v) => set({ href: v })} placeholder="/services" />
                  <FieldEditor label="Bouton (texte)" value={it.cta} onChange={(v) => set({ cta: v })} />
                </>
              )}
            />
          </SectionEditor>
        </>
      )}
    </PageEditor>
  )
}
