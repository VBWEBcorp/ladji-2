'use client'

import { PageEditor } from '@/components/admin/page-editor'
import {
  FieldEditor,
  SectionEditor,
  StringListEditor,
  RepeaterField,
} from '@/components/admin/field-editor'
import { companionContent } from '@/lib/site-content'

const defaults = companionContent

export default function AdminCompanionPage() {
  return (
    <PageEditor pageId="companion" title="Accompagnateur" defaultContent={defaults}>
      {(content, update) => (
        <>
          <SectionEditor title="En-tête (hero)">
            <FieldEditor label="Accroche" value={content.hero?.eyebrow} onChange={(v) => update('hero.eyebrow', v)} />
            <FieldEditor label="Titre" value={content.hero?.title} onChange={(v) => update('hero.title', v)} />
            <FieldEditor label="Description" value={content.hero?.description} onChange={(v) => update('hero.description', v)} type="textarea" />
          </SectionEditor>

          <SectionEditor title="Conditions obligatoires">
            <RepeaterField
              label="Conditions"
              addLabel="Ajouter une condition"
              items={content.conditions ?? []}
              onChange={(v) => update('conditions', v)}
              makeNew={() => ({ iconName: 'ShieldCheck', title: '', desc: '' })}
              itemTitle={(it: { title: string }, i) => it.title || `Condition ${i + 1}`}
              renderItem={(it: { iconName: string; title: string; desc: string }, set) => (
                <>
                  <FieldEditor label="Icône (nom Lucide)" value={it.iconName} onChange={(v) => set({ iconName: v })} placeholder="ShieldCheck, Scale, UserCheck…" />
                  <FieldEditor label="Titre" value={it.title} onChange={(v) => set({ title: v })} />
                  <FieldEditor label="Description" value={it.desc} onChange={(v) => set({ desc: v })} type="textarea" />
                </>
              )}
            />
          </SectionEditor>

          <SectionEditor title="Ce que l'accompagnateur peut faire">
            <FieldEditor label="Titre" value={content.do?.title} onChange={(v) => update('do.title', v)} />
            <StringListEditor
              label="Points"
              addLabel="Ajouter un point"
              items={content.do?.items ?? []}
              onChange={(v) => update('do.items', v)}
            />
          </SectionEditor>

          <SectionEditor title="Ce que l'accompagnateur ne peut pas faire">
            <FieldEditor label="Titre" value={content.dont?.title} onChange={(v) => update('dont.title', v)} />
            <StringListEditor
              label="Points"
              addLabel="Ajouter un point"
              items={content.dont?.items ?? []}
              onChange={(v) => update('dont.items', v)}
            />
          </SectionEditor>

          <SectionEditor title="Guide pédagogique">
            <FieldEditor label="Titre" value={content.guide?.title} onChange={(v) => update('guide.title', v)} />
            <FieldEditor label="Description" value={content.guide?.description} onChange={(v) => update('guide.description', v)} type="textarea" />
            <FieldEditor label="Bouton : libellé" value={content.guide?.action?.label} onChange={(v) => update('guide.action.label', v)} />
          </SectionEditor>

          <SectionEditor title="Vidéo de briefing sécurité">
            <FieldEditor label="Numéro" value={String(content.video?.number ?? '')} onChange={(v) => update('video.number', Number(v.replace(/\D/g, '')) || 0)} />
            <FieldEditor label="Titre" value={content.video?.title} onChange={(v) => update('video.title', v)} />
            <FieldEditor label="Durée" value={content.video?.duration} onChange={(v) => update('video.duration', v)} placeholder="5-8 min" />
            <FieldEditor label="Description" value={content.video?.desc} onChange={(v) => update('video.desc', v)} type="textarea" />
            <FieldEditor label="Note (sous la vidéo)" value={content.video?.note} onChange={(v) => update('video.note', v)} type="textarea" />
          </SectionEditor>
        </>
      )}
    </PageEditor>
  )
}
