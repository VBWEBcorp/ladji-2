'use client'

import { PageEditor } from '@/components/admin/page-editor'
import { FieldEditor, SectionEditor } from '@/components/admin/field-editor'
import { Button } from '@/components/ui/button'
import { Plus, Trash2 } from 'lucide-react'
import { servicesContent } from '@/lib/site-content'

const defaults = {
  hero: servicesContent.hero,
  pricing: servicesContent.pricing,
  cpfPack: servicesContent.cpfPack,
  zones: servicesContent.zones,
  deposits: servicesContent.deposits,
  funding: servicesContent.funding,
  conditions: servicesContent.conditions,
}

export default function AdminServicesPage() {
  return (
    <PageEditor pageId="services" title="Forfaits & Tarifs" defaultContent={defaults}>
      {(content, update) => (
        <>
          <SectionEditor title="Hero">
            <FieldEditor label="Accroche" value={content.hero?.eyebrow} onChange={(v) => update('hero.eyebrow', v)} />
            <FieldEditor label="Titre" value={content.hero?.title} onChange={(v) => update('hero.title', v)} />
            <FieldEditor label="Description" value={content.hero?.description} onChange={(v) => update('hero.description', v)} type="textarea" />
          </SectionEditor>

          <SectionEditor title="Forfaits (Pack 5h / 10h / 20h)">
            <FieldEditor label="Accroche" value={content.pricing?.eyebrow} onChange={(v) => update('pricing.eyebrow', v)} />
            <FieldEditor label="Titre" value={content.pricing?.title} onChange={(v) => update('pricing.title', v)} />
            <FieldEditor label="Description" value={content.pricing?.description} onChange={(v) => update('pricing.description', v)} type="textarea" />

            <div className="space-y-3 pt-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Packs</p>
              {(content.pricing?.plans ?? []).map((plan: any, i: number) => (
                <div key={i} className="p-4 border border-border/30 rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground font-medium">Pack {i + 1}</span>
                    <button
                      onClick={() => {
                        const list = (content.pricing?.plans ?? []).filter((_: any, j: number) => j !== i)
                        update('pricing.plans', list)
                      }}
                      className="text-destructive hover:text-destructive/80"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <FieldEditor
                      label="Nom"
                      value={plan.name}
                      onChange={(v) => {
                        const list = [...(content.pricing.plans ?? [])]
                        list[i] = { ...list[i], name: v }
                        update('pricing.plans', list)
                      }}
                    />
                    <FieldEditor
                      label="Icône (Clock, Calendar, GraduationCap...)"
                      value={plan.iconName ?? ''}
                      onChange={(v) => {
                        const list = [...(content.pricing.plans ?? [])]
                        list[i] = { ...list[i], iconName: v }
                        update('pricing.plans', list)
                      }}
                    />
                  </div>
                  <FieldEditor
                    label="Mention (ex : '6h avec 1h offerte')"
                    value={plan.offer ?? ''}
                    onChange={(v) => {
                      const list = [...(content.pricing.plans ?? [])]
                      list[i] = { ...list[i], offer: v }
                      update('pricing.plans', list)
                    }}
                  />
                  <FieldEditor
                    label="Description"
                    value={plan.description}
                    onChange={(v) => {
                      const list = [...(content.pricing.plans ?? [])]
                      list[i] = { ...list[i], description: v }
                      update('pricing.plans', list)
                    }}
                    type="textarea"
                  />
                  <div className="grid grid-cols-3 gap-2">
                    <FieldEditor
                      label="Prix zone A (€)"
                      value={String(plan.prices?.A ?? '')}
                      onChange={(v) => {
                        const list = [...(content.pricing.plans ?? [])]
                        list[i] = {
                          ...list[i],
                          prices: { ...list[i].prices, A: parseInt(v) || 0 },
                        }
                        update('pricing.plans', list)
                      }}
                    />
                    <FieldEditor
                      label="Prix zone B (€)"
                      value={String(plan.prices?.B ?? '')}
                      onChange={(v) => {
                        const list = [...(content.pricing.plans ?? [])]
                        list[i] = {
                          ...list[i],
                          prices: { ...list[i].prices, B: parseInt(v) || 0 },
                        }
                        update('pricing.plans', list)
                      }}
                    />
                    <FieldEditor
                      label="Prix zone C (€)"
                      value={String(plan.prices?.C ?? '')}
                      onChange={(v) => {
                        const list = [...(content.pricing.plans ?? [])]
                        list[i] = {
                          ...list[i],
                          prices: { ...list[i].prices, C: parseInt(v) || 0 },
                        }
                        update('pricing.plans', list)
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground">Inclus dans le pack</p>
                    {(plan.features ?? []).map((f: string, j: number) => (
                      <div key={j} className="flex items-start gap-2">
                        <div className="flex-1">
                          <FieldEditor
                            label={`Point ${j + 1}`}
                            value={f}
                            onChange={(v) => {
                              const list = [...(content.pricing.plans ?? [])]
                              const feats = [...(list[i].features ?? [])]
                              feats[j] = v
                              list[i] = { ...list[i], features: feats }
                              update('pricing.plans', list)
                            }}
                          />
                        </div>
                        <button
                          onClick={() => {
                            const list = [...(content.pricing.plans ?? [])]
                            const feats = (list[i].features ?? []).filter((_: string, k: number) => k !== j)
                            list[i] = { ...list[i], features: feats }
                            update('pricing.plans', list)
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
                        const list = [...(content.pricing.plans ?? [])]
                        const feats = [...(list[i].features ?? []), '']
                        list[i] = { ...list[i], features: feats }
                        update('pricing.plans', list)
                      }}
                    >
                      <Plus className="size-4" />
                      Ajouter un point
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </SectionEditor>

          <SectionEditor title="Pack 20h CPF (option ADAM)">
            <FieldEditor label="Accroche" value={content.cpfPack?.eyebrow} onChange={(v) => update('cpfPack.eyebrow', v)} />
            <FieldEditor label="Nom du pack" value={content.cpfPack?.name} onChange={(v) => update('cpfPack.name', v)} />
            <FieldEditor label="Titre principal (ex : 183€/mois)" value={content.cpfPack?.headline} onChange={(v) => update('cpfPack.headline', v)} />
            <FieldEditor label="Sous-titre (ex : sur 3 fois sans frais)" value={content.cpfPack?.subline} onChange={(v) => update('cpfPack.subline', v)} />
            <FieldEditor label="Description" value={content.cpfPack?.description} onChange={(v) => update('cpfPack.description', v)} type="textarea" />
            <div className="grid grid-cols-2 gap-2">
              <FieldEditor
                label="Prix total (€)"
                value={String(content.cpfPack?.price ?? '')}
                onChange={(v) => update('cpfPack.price', parseInt(v) || 0)}
              />
              <FieldEditor
                label="Pris en charge CPF (€)"
                value={String(content.cpfPack?.cpfCovered ?? '')}
                onChange={(v) => update('cpfPack.cpfCovered', parseInt(v) || 0)}
              />
              <FieldEditor
                label="Reste à charge (€)"
                value={String(content.cpfPack?.remaining ?? '')}
                onChange={(v) => update('cpfPack.remaining', parseInt(v) || 0)}
              />
              <FieldEditor
                label="Mensualité (€)"
                value={String(content.cpfPack?.monthly ?? '')}
                onChange={(v) => update('cpfPack.monthly', parseInt(v) || 0)}
              />
            </div>
            <FieldEditor label="Opérateur (ex : ADAM)" value={content.cpfPack?.operator} onChange={(v) => update('cpfPack.operator', v)} />
          </SectionEditor>

          <SectionEditor title="Financements (CPF, ALMA, ADIE, France Travail...)">
            <FieldEditor label="Accroche" value={content.funding?.eyebrow} onChange={(v) => update('funding.eyebrow', v)} />
            <FieldEditor label="Titre" value={content.funding?.title} onChange={(v) => update('funding.title', v)} />
            <div className="space-y-3 pt-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Dispositifs</p>
              {(content.funding?.items ?? []).map((item: { title: string; desc: string }, i: number) => (
                <div key={i} className="p-3 border border-border/30 rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground font-medium">Dispositif {i + 1}</span>
                    <button
                      onClick={() => {
                        const list = (content.funding?.items ?? []).filter((_: any, j: number) => j !== i)
                        update('funding.items', list)
                      }}
                      className="text-destructive hover:text-destructive/80"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                  <FieldEditor
                    label="Nom"
                    value={item.title}
                    onChange={(v) => {
                      const list = [...(content.funding.items ?? [])]
                      list[i] = { ...list[i], title: v }
                      update('funding.items', list)
                    }}
                  />
                  <FieldEditor
                    label="Description"
                    value={item.desc}
                    onChange={(v) => {
                      const list = [...(content.funding.items ?? [])]
                      list[i] = { ...list[i], desc: v }
                      update('funding.items', list)
                    }}
                    type="textarea"
                  />
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() =>
                  update('funding.items', [...(content.funding?.items ?? []), { title: '', desc: '' }])
                }
              >
                <Plus className="size-4" />
                Ajouter un dispositif
              </Button>
            </div>
          </SectionEditor>

          <SectionEditor title="Conditions (bénéficiaire, accompagnateur, prescripteurs)">
            <FieldEditor label="Accroche" value={content.conditions?.eyebrow} onChange={(v) => update('conditions.eyebrow', v)} />
            <FieldEditor label="Titre" value={content.conditions?.title} onChange={(v) => update('conditions.title', v)} />
            <FieldEditor label="Description" value={content.conditions?.description} onChange={(v) => update('conditions.description', v)} type="textarea" />
            <div className="space-y-3 pt-2">
              {(content.conditions?.groups ?? []).map((group: { iconName?: string; title: string; items: string[] }, i: number) => (
                <div key={i} className="p-4 border border-border/30 rounded-lg space-y-3">
                  <span className="text-xs text-muted-foreground font-medium">Groupe {i + 1}</span>
                  <FieldEditor
                    label="Titre du groupe"
                    value={group.title}
                    onChange={(v) => {
                      const list = [...(content.conditions.groups ?? [])]
                      list[i] = { ...list[i], title: v }
                      update('conditions.groups', list)
                    }}
                  />
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground">Critères</p>
                    {(group.items ?? []).map((it: string, j: number) => (
                      <div key={j} className="flex items-start gap-2">
                        <div className="flex-1">
                          <FieldEditor
                            label={`Critère ${j + 1}`}
                            value={it}
                            onChange={(v) => {
                              const list = [...(content.conditions.groups ?? [])]
                              const items = [...(list[i].items ?? [])]
                              items[j] = v
                              list[i] = { ...list[i], items }
                              update('conditions.groups', list)
                            }}
                          />
                        </div>
                        <button
                          onClick={() => {
                            const list = [...(content.conditions.groups ?? [])]
                            const items = (list[i].items ?? []).filter((_: string, k: number) => k !== j)
                            list[i] = { ...list[i], items }
                            update('conditions.groups', list)
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
                        const list = [...(content.conditions.groups ?? [])]
                        const items = [...(list[i].items ?? []), '']
                        list[i] = { ...list[i], items }
                        update('conditions.groups', list)
                      }}
                    >
                      <Plus className="size-4" />
                      Ajouter un critère
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </SectionEditor>
        </>
      )}
    </PageEditor>
  )
}
