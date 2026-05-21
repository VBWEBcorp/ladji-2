'use client'

import { PageEditor } from '@/components/admin/page-editor'
import { FieldEditor, SectionEditor, ImageField } from '@/components/admin/field-editor'

const defaults = {
  hero: {
    eyebrow: 'À propos',
    title: 'Une équipe engagée à vos côtés',
    description: 'Nous croyons que chaque entreprise mérite une présence en ligne à la hauteur de ses ambitions. Depuis notre création, nous accompagnons artisans, PME et indépendants avec des solutions simples, efficaces et soignées.',
    image: 'https://i.ibb.co/KpjN0Vqc/Voiture-basic-2-Copie.webp',
  },
  values: [
    { title: 'Proximité', description: 'Un interlocuteur unique, disponible, qui connaît votre projet sur le bout des doigts.' },
    { title: 'Clarté', description: 'Pas de jargon inutile. Des explications simples, des livrables concrets.' },
    { title: 'Sur mesure', description: 'Chaque projet est différent. Nous adaptons nos solutions à votre réalité, pas l\'inverse.' },
  ],
  gallery: [
    'https://i.ibb.co/rfspRRnL/Conduite-coaching-3.jpg',
    'https://i.ibb.co/27RyB3JM/Conduite-coaching-2.jpg',
    'https://i.ibb.co/r2Pvm6J0/Conduite-coaching.jpg',
    'https://i.ibb.co/HDM862hg/Voiture-basic-Copie.jpg',
  ],
}

export default function AdminAboutPage() {
  return (
    <PageEditor pageId="about" title="Page À propos" defaultContent={defaults}>
      {(content, update) => (
        <>
          <SectionEditor title="Hero">
            <FieldEditor label="Accroche" value={content.hero?.eyebrow} onChange={(v) => update('hero.eyebrow', v)} />
            <FieldEditor label="Titre" value={content.hero?.title} onChange={(v) => update('hero.title', v)} />
            <FieldEditor label="Description" value={content.hero?.description} onChange={(v) => update('hero.description', v)} type="textarea" />
            <ImageField label="Image" value={content.hero?.image} onChange={(v) => update('hero.image', v)} />
          </SectionEditor>

          <SectionEditor title="Valeurs">
            {content.values?.map((val: any, i: number) => (
              <div key={i} className="p-4 border border-border/30 rounded-lg space-y-3">
                <FieldEditor label={`Valeur ${i + 1} - Titre`} value={val.title} onChange={(v) => {
                  const newValues = [...content.values]
                  newValues[i] = { ...newValues[i], title: v }
                  update('values', newValues)
                }} />
                <FieldEditor label="Description" value={val.description} onChange={(v) => {
                  const newValues = [...content.values]
                  newValues[i] = { ...newValues[i], description: v }
                  update('values', newValues)
                }} type="textarea" />
              </div>
            ))}
          </SectionEditor>

          <SectionEditor title="Galerie photos">
            {content.gallery?.map((img: string, i: number) => (
              <ImageField
                key={i}
                label={`Image ${i + 1}`}
                value={img}
                onChange={(v) => {
                  const newGallery = [...content.gallery]
                  newGallery[i] = v
                  update('gallery', newGallery)
                }}
              />
            ))}
          </SectionEditor>
        </>
      )}
    </PageEditor>
  )
}
