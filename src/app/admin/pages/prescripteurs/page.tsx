'use client'

import { PageEditor } from '@/components/admin/page-editor'
import {
  FieldEditor,
  SectionEditor,
  StringListEditor,
  RepeaterField,
} from '@/components/admin/field-editor'
import { prescriberContent } from '@/lib/site-content'

const defaults = prescriberContent

export default function AdminPrescribersPage() {
  return (
    <PageEditor pageId="prescribers" title="Prescripteurs" defaultContent={defaults}>
      {(content, update) => (
        <>
          <SectionEditor title="En-tête (hero)">
            <FieldEditor label="Accroche" value={content.hero?.eyebrow} onChange={(v) => update('hero.eyebrow', v)} />
            <FieldEditor label="Titre" value={content.hero?.title} onChange={(v) => update('hero.title', v)} />
            <FieldEditor label="Description" value={content.hero?.description} onChange={(v) => update('hero.description', v)} type="textarea" />
          </SectionEditor>

          <SectionEditor title="Bénéfices">
            <RepeaterField
              label="Bénéfices pour le prescripteur"
              addLabel="Ajouter un bénéfice"
              items={content.benefits ?? []}
              onChange={(v) => update('benefits', v)}
              makeNew={() => ({ iconName: 'UserCheck', title: '', desc: '' })}
              itemTitle={(it: { title: string }, i) => it.title || `Bénéfice ${i + 1}`}
              renderItem={(it: { iconName: string; title: string; desc: string }, set) => (
                <>
                  <FieldEditor label="Icône (nom Lucide)" value={it.iconName} onChange={(v) => set({ iconName: v })} placeholder="UserCheck, ShieldCheck, BarChart3…" />
                  <FieldEditor label="Titre" value={it.title} onChange={(v) => set({ title: v })} />
                  <FieldEditor label="Description" value={it.desc} onChange={(v) => set({ desc: v })} type="textarea" />
                </>
              )}
            />
          </SectionEditor>

          <SectionEditor title="Formulaire d'orientation">
            <FieldEditor label="Accroche" value={content.form?.eyebrow} onChange={(v) => update('form.eyebrow', v)} />
            <FieldEditor label="Titre" value={content.form?.title} onChange={(v) => update('form.title', v)} />
            <FieldEditor label="Description" value={content.form?.description} onChange={(v) => update('form.description', v)} type="textarea" />
            <FieldEditor label="Libellé du bouton" value={content.form?.submitLabel} onChange={(v) => update('form.submitLabel', v)} />
            <p className="text-xs text-muted-foreground">Les champs du formulaire sont fixes : ils correspondent au circuit Make de M. Faé.</p>
          </SectionEditor>

          <SectionEditor title="Clauses sociales">
            <FieldEditor label="Titre" value={content.clauses?.title} onChange={(v) => update('clauses.title', v)} />
            <StringListEditor
              label="Paragraphes"
              addLabel="Ajouter un paragraphe"
              type="textarea"
              items={content.clauses?.paragraphs ?? []}
              onChange={(v) => update('clauses.paragraphs', v)}
            />
          </SectionEditor>

          <SectionEditor title="Contacts directs">
            <FieldEditor label="Titre" value={content.contact?.title} onChange={(v) => update('contact.title', v)} />
            <FieldEditor label="Nom" value={content.contact?.name} onChange={(v) => update('contact.name', v)} />
            <FieldEditor label="Téléphone" value={content.contact?.phone} onChange={(v) => update('contact.phone', v)} />
            <FieldEditor label="E-mail" value={content.contact?.email} onChange={(v) => update('contact.email', v)} />
          </SectionEditor>
        </>
      )}
    </PageEditor>
  )
}
