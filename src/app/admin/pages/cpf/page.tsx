'use client'

import { PageEditor } from '@/components/admin/page-editor'
import {
  FieldEditor,
  SectionEditor,
  StringListEditor,
} from '@/components/admin/field-editor'
import { servicesContent } from '@/lib/site-content'

const defaults = { cpf: servicesContent.cpfPack }

export default function AdminCpfPage() {
  return (
    <PageEditor pageId="cpf" title="Pack 20h CPF" defaultContent={defaults}>
      {(content, update) => {
        const cpf = content.cpf ?? {}
        const num = (path: string) => (v: string) => update(path, Number(v.replace(/[^\d.-]/g, '')) || 0)
        return (
          <>
            <SectionEditor title="Bloc principal">
              <FieldEditor label="Accroche" value={cpf.eyebrow} onChange={(v) => update('cpf.eyebrow', v)} />
              <FieldEditor label="Nom du pack" value={cpf.name} onChange={(v) => update('cpf.name', v)} />
              <FieldEditor label="Accroche prix (headline)" value={cpf.headline} onChange={(v) => update('cpf.headline', v)} />
              <FieldEditor label="Sous-ligne" value={cpf.subline} onChange={(v) => update('cpf.subline', v)} />
              <FieldEditor label="Description" value={cpf.description} onChange={(v) => update('cpf.description', v)} type="textarea" />
              <FieldEditor label="Opérateur" value={cpf.operator} onChange={(v) => update('cpf.operator', v)} />
            </SectionEditor>

            <SectionEditor title="Tarifs (en euros)">
              <FieldEditor label="Prix formation" value={String(cpf.price ?? '')} onChange={num('cpf.price')} />
              <FieldEditor label="Pris en charge CPF" value={String(cpf.cpfCovered ?? '')} onChange={num('cpf.cpfCovered')} />
              <FieldEditor label="Reste à charge" value={String(cpf.remaining ?? '')} onChange={num('cpf.remaining')} />
              <FieldEditor label="Mensualité" value={String(cpf.monthly ?? '')} onChange={num('cpf.monthly')} />
            </SectionEditor>

            <SectionEditor title="Ce qui est inclus">
              <StringListEditor
                label="Points inclus"
                addLabel="Ajouter un point"
                items={cpf.features ?? []}
                onChange={(v) => update('cpf.features', v)}
              />
            </SectionEditor>

            <SectionEditor title="Boutons">
              <FieldEditor label="Bouton principal : libellé" value={cpf.ctaPrimary?.label} onChange={(v) => update('cpf.ctaPrimary.label', v)} />
              <FieldEditor label="Bouton principal : URL" value={cpf.ctaPrimary?.href} onChange={(v) => update('cpf.ctaPrimary.href', v)} type="url" />
              <FieldEditor label="Bouton secondaire : libellé" value={cpf.ctaSecondary?.label} onChange={(v) => update('cpf.ctaSecondary.label', v)} />
              <FieldEditor label="Bouton secondaire : URL" value={cpf.ctaSecondary?.href} onChange={(v) => update('cpf.ctaSecondary.href', v)} />
            </SectionEditor>
          </>
        )
      }}
    </PageEditor>
  )
}
