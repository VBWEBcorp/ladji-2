'use client'

import { PageEditor } from '@/components/admin/page-editor'
import {
  FieldEditor,
  SectionEditor,
  StringListEditor,
  RepeaterField,
} from '@/components/admin/field-editor'
import { cn } from '@/lib/utils'
import { quizDefaults, type QuizOption, type QuizQuestion } from '@/lib/quiz-data'

const defaults = quizDefaults
const OPTION_KEYS: QuizOption['key'][] = ['A', 'B', 'C', 'D']

export default function AdminQuizPage() {
  return (
    <PageEditor pageId="quiz" title="Quiz accompagnateur" defaultContent={defaults}>
      {(content, update) => {
        const num = (path: string) => (v: string) => update(path, Number(v.replace(/\D/g, '')) || 0)
        return (
          <>
            <SectionEditor title="Vidéo de briefing">
              <FieldEditor
                label="Identifiant YouTube (après watch?v=, youtu.be/ ou /shorts/)"
                value={content.video?.videoId}
                onChange={(v) => update('video.videoId', v.trim())}
                placeholder="inyCAdpvYz0"
              />
              <label className="flex items-center gap-2 text-sm text-foreground">
                <input
                  type="checkbox"
                  checked={!!content.video?.isShort}
                  onChange={(e) => update('video.isShort', e.target.checked)}
                  className="size-4 rounded border-input"
                />
                Vidéo au format Short (vertical 9/16)
              </label>
              <FieldEditor
                label="Lien de la chaîne (secours si la vidéo ne se lance pas)"
                value={content.video?.channelUrl}
                onChange={(v) => update('video.channelUrl', v)}
                type="url"
              />
            </SectionEditor>

            <SectionEditor title="Réglages du quiz">
              <FieldEditor label="Bonnes réponses requises pour valider" value={String(content.config?.passCount ?? '')} onChange={num('config.passCount')} />
              <FieldEditor label="Pourcentage de réussite affiché" value={String(content.config?.passPercent ?? '')} onChange={num('config.passPercent')} />
              <FieldEditor label="Nombre de tentatives autorisées" value={String(content.config?.maxAttempts ?? '')} onChange={num('config.maxAttempts')} />
              <FieldEditor
                label="Notification e-mail (URL Formspree, vide = aucune)"
                value={content.formspreeEndpoint}
                onChange={(v) => update('formspreeEndpoint', v.trim())}
                placeholder="https://formspree.io/f/XXXXXX"
              />
            </SectionEditor>

            <SectionEditor title="Texte d'introduction">
              <FieldEditor label="Accroche" value={content.intro?.eyebrow} onChange={(v) => update('intro.eyebrow', v)} />
              <FieldEditor label="Titre" value={content.intro?.title} onChange={(v) => update('intro.title', v)} />
              <FieldEditor label="Titre de bienvenue" value={content.intro?.welcomeTitle} onChange={(v) => update('intro.welcomeTitle', v)} />
              <StringListEditor
                label="Paragraphes de bienvenue"
                addLabel="Ajouter un paragraphe"
                type="textarea"
                items={content.intro?.welcomeBody ?? []}
                onChange={(v) => update('intro.welcomeBody', v)}
              />
            </SectionEditor>

            <SectionEditor title="Questions">
              <RepeaterField
                label={`Questions (${(content.questions ?? []).length})`}
                addLabel="Ajouter une question"
                items={content.questions ?? []}
                onChange={(v) => update('questions', v)}
                makeNew={() => {
                  const ids = (content.questions ?? []).map((q: QuizQuestion) => q.id)
                  const nextId = (ids.length ? Math.max(...ids) : 0) + 1
                  return {
                    id: nextId,
                    theme: '',
                    prompt: '',
                    options: OPTION_KEYS.map((key) => ({ key, text: '' })),
                    correct: 'A',
                    explanation: '',
                  } as QuizQuestion
                }}
                itemTitle={(it: QuizQuestion, i) => `Q${i + 1} ${it.theme ? `· ${it.theme}` : ''}`}
                renderItem={(it: QuizQuestion, set) => (
                  <>
                    <FieldEditor label="Thème" value={it.theme} onChange={(v) => set({ theme: v })} />
                    <FieldEditor label="Question" value={it.prompt} onChange={(v) => set({ prompt: v })} type="textarea" />

                    <div className="space-y-2 pt-1">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        Réponses (cliquez sur la lettre pour désigner la bonne réponse)
                      </p>
                      {(it.options ?? []).map((opt, oi) => (
                        <div key={opt.key} className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => set({ correct: opt.key })}
                            title="Désigner comme bonne réponse"
                            className={cn(
                              'flex size-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold transition-colors',
                              it.correct === opt.key
                                ? 'bg-emerald-500 text-white'
                                : 'bg-muted text-muted-foreground hover:bg-muted/70'
                            )}
                          >
                            {opt.key}
                          </button>
                          <input
                            value={opt.text}
                            onChange={(e) => {
                              const options = (it.options ?? []).map((o, j) =>
                                j === oi ? { ...o, text: e.target.value } : o
                              )
                              set({ options })
                            }}
                            placeholder={`Réponse ${opt.key}`}
                            className="h-9 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                          />
                        </div>
                      ))}
                    </div>

                    <FieldEditor label="Explication (après réponse)" value={it.explanation} onChange={(v) => set({ explanation: v })} type="textarea" />
                  </>
                )}
              />
            </SectionEditor>

            <SectionEditor title="Message de réussite">
              <FieldEditor label="Titre" value={content.result?.success?.title} onChange={(v) => update('result.success.title', v)} type="textarea" />
              <StringListEditor
                label="Paragraphes"
                addLabel="Ajouter un paragraphe"
                type="textarea"
                items={content.result?.success?.body ?? []}
                onChange={(v) => update('result.success.body', v)}
              />
            </SectionEditor>

            <SectionEditor title="Message d'échec (repasse possible)">
              <FieldEditor label="Titre" value={content.result?.failure?.title} onChange={(v) => update('result.failure.title', v)} type="textarea" />
              <StringListEditor
                label="Paragraphes"
                addLabel="Ajouter un paragraphe"
                type="textarea"
                items={content.result?.failure?.body ?? []}
                onChange={(v) => update('result.failure.body', v)}
              />
            </SectionEditor>

            <SectionEditor title="Message tentatives épuisées">
              <FieldEditor label="Titre" value={content.result?.exhausted?.title} onChange={(v) => update('result.exhausted.title', v)} type="textarea" />
              <StringListEditor
                label="Paragraphes"
                addLabel="Ajouter un paragraphe"
                type="textarea"
                items={content.result?.exhausted?.body ?? []}
                onChange={(v) => update('result.exhausted.body', v)}
              />
            </SectionEditor>
          </>
        )
      }}
    </PageEditor>
  )
}
