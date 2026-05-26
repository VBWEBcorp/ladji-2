'use client'

import { PageEditor } from '@/components/admin/page-editor'
import {
  FieldEditor,
  SectionEditor,
  RepeaterField,
} from '@/components/admin/field-editor'
import { partnersPageContent } from '@/lib/site-content'

const defaults = partnersPageContent

export default function AdminPartnersPage() {
  return (
    <PageEditor pageId="partners" title="Partenaires" defaultContent={defaults}>
      {(content, update) => (
        <>
          <SectionEditor title="En-tête de la page">
            <FieldEditor label="Accroche" value={content.eyebrow} onChange={(v) => update('eyebrow', v)} />
            <FieldEditor label="Titre" value={content.title} onChange={(v) => update('title', v)} />
            <FieldEditor label="Description" value={content.description} onChange={(v) => update('description', v)} type="textarea" />
          </SectionEditor>

          <SectionEditor title="Liste des partenaires">
            <RepeaterField
              label="Partenaires"
              addLabel="Ajouter un partenaire"
              items={content.partners ?? []}
              onChange={(v) => update('partners', v)}
              makeNew={() => ({ name: '', role: '', desc: '', link: null as { label: string; href: string } | null })}
              itemTitle={(it: { name: string }, i) => it.name || `Partenaire ${i + 1}`}
              renderItem={(it: { name: string; role: string; desc: string; link: { label: string; href: string } | null }, set) => (
                <>
                  <FieldEditor label="Nom" value={it.name} onChange={(v) => set({ name: v })} />
                  <FieldEditor label="Rôle" value={it.role} onChange={(v) => set({ role: v })} />
                  <FieldEditor label="Description" value={it.desc} onChange={(v) => set({ desc: v })} type="textarea" />
                  <FieldEditor
                    label="Lien : libellé (laisser vide = pas de lien)"
                    value={it.link?.label ?? ''}
                    onChange={(v) => set({ link: v ? { label: v, href: it.link?.href ?? '' } : null })}
                  />
                  <FieldEditor
                    label="Lien : URL"
                    value={it.link?.href ?? ''}
                    type="url"
                    onChange={(v) => set({ link: it.link?.label ? { label: it.link.label, href: v } : it.link })}
                  />
                </>
              )}
            />
          </SectionEditor>

          <SectionEditor title="Devenir partenaire">
            <FieldEditor label="Titre" value={content.becomePartner?.title} onChange={(v) => update('becomePartner.title', v)} />
            <FieldEditor label="Description" value={content.becomePartner?.description} onChange={(v) => update('becomePartner.description', v)} type="textarea" />
            <FieldEditor label="Nom de contact" value={content.becomePartner?.contactName} onChange={(v) => update('becomePartner.contactName', v)} />
            <FieldEditor label="Téléphone de contact" value={content.becomePartner?.contactPhone} onChange={(v) => update('becomePartner.contactPhone', v)} />
            <FieldEditor label="E-mail de contact" value={content.becomePartner?.contactEmail} onChange={(v) => update('becomePartner.contactEmail', v)} />
          </SectionEditor>
        </>
      )}
    </PageEditor>
  )
}
