'use client'

import { PageEditor } from '@/components/admin/page-editor'
import {
  FieldEditor,
  SectionEditor,
  RepeaterField,
} from '@/components/admin/field-editor'
import { howItWorksContent } from '@/lib/site-content'

const defaults = howItWorksContent

export default function AdminHowItWorksPage() {
  return (
    <PageEditor pageId="how-it-works" title="Comment ça marche" defaultContent={defaults}>
      {(content, update) => (
        <>
          <SectionEditor title="En-tête (hero)">
            <FieldEditor label="Accroche" value={content.hero?.eyebrow} onChange={(v) => update('hero.eyebrow', v)} />
            <FieldEditor label="Titre" value={content.hero?.title} onChange={(v) => update('hero.title', v)} />
            <FieldEditor label="Description" value={content.hero?.description} onChange={(v) => update('hero.description', v)} type="textarea" />
          </SectionEditor>

          <SectionEditor title="Parcours (étapes)">
            <RepeaterField
              label="Étapes du parcours"
              addLabel="Ajouter une étape"
              items={content.journey ?? []}
              onChange={(v) => update('journey', v)}
              makeNew={() => ({ iconName: 'FileText', title: '', desc: '', link: null as { label: string; href: string; external?: boolean } | null })}
              itemTitle={(it: { title: string }, i) => it.title || `Étape ${i + 1}`}
              renderItem={(it: { iconName: string; title: string; desc: string; link: { label: string; href: string; external?: boolean } | null }, set) => (
                <>
                  <FieldEditor label="Icône (nom Lucide)" value={it.iconName} onChange={(v) => set({ iconName: v })} placeholder="FileText, UserCheck, Coins…" />
                  <FieldEditor label="Titre" value={it.title} onChange={(v) => set({ title: v })} />
                  <FieldEditor label="Description" value={it.desc} onChange={(v) => set({ desc: v })} type="textarea" />
                  <FieldEditor
                    label="Lien : libellé (laisser vide = pas de lien)"
                    value={it.link?.label ?? ''}
                    onChange={(v) => set({ link: v ? { label: v, href: it.link?.href ?? '', external: (it.link?.href ?? '').startsWith('http') } : null })}
                  />
                  <FieldEditor
                    label="Lien : URL"
                    value={it.link?.href ?? ''}
                    onChange={(v) => set({ link: it.link?.label ? { label: it.link.label, href: v, external: v.startsWith('http') } : it.link })}
                  />
                </>
              )}
            />
          </SectionEditor>

          <SectionEditor title="Vidéos">
            <RepeaterField
              label="Vidéos prévues"
              addLabel="Ajouter une vidéo"
              items={content.videos ?? []}
              onChange={(v) => update('videos', v)}
              makeNew={() => ({ number: 0, title: '', duration: '', desc: '' })}
              itemTitle={(it: { title: string }, i) => it.title || `Vidéo ${i + 1}`}
              renderItem={(it: { number: number; title: string; duration: string; desc: string }, set) => (
                <>
                  <FieldEditor label="Numéro" value={String(it.number ?? '')} onChange={(v) => set({ number: Number(v.replace(/\D/g, '')) || 0 })} />
                  <FieldEditor label="Titre" value={it.title} onChange={(v) => set({ title: v })} />
                  <FieldEditor label="Durée" value={it.duration} onChange={(v) => set({ duration: v })} placeholder="2-3 min" />
                  <FieldEditor label="Description" value={it.desc} onChange={(v) => set({ desc: v })} type="textarea" />
                </>
              )}
            />
          </SectionEditor>

          <SectionEditor title="Bloc accompagnateur">
            <FieldEditor label="Accroche" value={content.accompagnateur?.eyebrow} onChange={(v) => update('accompagnateur.eyebrow', v)} />
            <FieldEditor label="Titre" value={content.accompagnateur?.title} onChange={(v) => update('accompagnateur.title', v)} />
            <FieldEditor label="Description" value={content.accompagnateur?.description} onChange={(v) => update('accompagnateur.description', v)} type="textarea" />
            <FieldEditor label="Bouton : libellé" value={content.accompagnateur?.cta?.label} onChange={(v) => update('accompagnateur.cta.label', v)} />
            <FieldEditor label="Bouton : lien" value={content.accompagnateur?.cta?.href} onChange={(v) => update('accompagnateur.cta.href', v)} />
          </SectionEditor>

          <SectionEditor title="FAQ">
            <FieldEditor label="Accroche" value={content.faq?.eyebrow} onChange={(v) => update('faq.eyebrow', v)} />
            <FieldEditor label="Titre" value={content.faq?.title} onChange={(v) => update('faq.title', v)} />
            <RepeaterField
              label="Questions / réponses"
              addLabel="Ajouter une question"
              items={content.faq?.items ?? []}
              onChange={(v) => update('faq.items', v)}
              makeNew={() => ({ question: '', answer: '' })}
              itemTitle={(it: { question: string }, i) => it.question || `Question ${i + 1}`}
              renderItem={(it: { question: string; answer: string }, set) => (
                <>
                  <FieldEditor label="Question" value={it.question} onChange={(v) => set({ question: v })} />
                  <FieldEditor label="Réponse" value={it.answer} onChange={(v) => set({ answer: v })} type="textarea" />
                </>
              )}
            />
          </SectionEditor>
        </>
      )}
    </PageEditor>
  )
}
