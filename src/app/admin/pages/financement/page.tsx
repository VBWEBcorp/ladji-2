'use client'

import { PageEditor } from '@/components/admin/page-editor'
import {
  FieldEditor,
  SectionEditor,
  RepeaterField,
} from '@/components/admin/field-editor'
import { fundingContent } from '@/lib/site-content'

const defaults = fundingContent

export default function AdminFundingPage() {
  return (
    <PageEditor pageId="funding" title="Financement" defaultContent={defaults}>
      {(content, update) => (
        <>
          <SectionEditor title="En-tête (hero)">
            <FieldEditor label="Accroche" value={content.hero?.eyebrow} onChange={(v) => update('hero.eyebrow', v)} />
            <FieldEditor label="Titre" value={content.hero?.title} onChange={(v) => update('hero.title', v)} />
            <FieldEditor label="Description" value={content.hero?.description} onChange={(v) => update('hero.description', v)} type="textarea" />
          </SectionEditor>

          <SectionEditor title="Dispositifs de financement">
            <RepeaterField
              label="Solutions"
              addLabel="Ajouter un dispositif"
              items={content.solutions ?? []}
              onChange={(v) => update('solutions', v)}
              makeNew={() => ({ iconName: 'HandCoins', title: '', desc: '', link: null as { label: string; href: string; external?: boolean } | null })}
              itemTitle={(it: { title: string }, i) => it.title || `Dispositif ${i + 1}`}
              renderItem={(it: { iconName: string; title: string; desc: string; link: { label: string; href: string; external?: boolean } | null }, set) => (
                <>
                  <FieldEditor label="Icône (nom Lucide)" value={it.iconName} onChange={(v) => set({ iconName: v })} placeholder="HandCoins, GraduationCap, CreditCard…" />
                  <FieldEditor label="Titre" value={it.title} onChange={(v) => set({ title: v })} />
                  <FieldEditor label="Description" value={it.desc} onChange={(v) => set({ desc: v })} type="textarea" />
                  <FieldEditor
                    label="Lien : libellé (laisser vide = pas de lien)"
                    value={it.link?.label ?? ''}
                    onChange={(v) =>
                      set({ link: v ? { label: v, href: it.link?.href ?? '', external: (it.link?.href ?? '').startsWith('http') } : null })
                    }
                  />
                  <FieldEditor
                    label="Lien : URL"
                    value={it.link?.href ?? ''}
                    type="url"
                    onChange={(v) =>
                      set({ link: it.link?.label ? { label: it.link.label, href: v, external: v.startsWith('http') } : it.link })
                    }
                  />
                </>
              )}
            />
          </SectionEditor>
        </>
      )}
    </PageEditor>
  )
}
