'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */

import { AnimatePresence, motion } from 'framer-motion'
import {
  AlertTriangle,
  ArrowRight,
  Award,
  Check,
  Download,
  Info,
  RotateCcw,
  ShieldCheck,
  X,
} from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useContent } from '@/hooks/use-content'
import { downloadAttestation, type AttestationData } from '@/lib/attestation'
import {
  QUIZ_CONFIG,
  quizDefaults,
  type QuizContentData,
  type QuizOption,
  type QuizQuestion,
} from '@/lib/quiz-data'

const ease = [0.22, 1, 0.36, 1] as const
type Stage = 'video' | 'intro' | 'quiz' | 'result'
type AnswerKey = QuizOption['key']

interface Candidate {
  firstName: string
  lastName: string
  email: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function readAttempts(): number {
  if (typeof window === 'undefined') return 0
  const raw = window.localStorage.getItem(QUIZ_CONFIG.attemptsKey)
  const n = raw ? Number.parseInt(raw, 10) : 0
  return Number.isFinite(n) ? n : 0
}

/** Notifie le gestionnaire via Formspree (best-effort) si l'endpoint est configuré. */
async function notifyManager(
  endpoint: string,
  total: number,
  c: Candidate,
  correct: number,
  percent: number
) {
  if (!endpoint) return
  try {
    await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        _subject: `Briefing accompagnateur validé : ${c.firstName} ${c.lastName}`,
        // `email` permet à Formspree de cibler l'accompagnateur pour l'autoresponse.
        email: c.email,
        prenom: c.firstName,
        nom: c.lastName,
        score: `${correct}/${total}`,
        pourcentage: `${percent}%`,
        statut: 'REUSSI',
        date: new Date().toLocaleString('fr-FR'),
        message:
          `${c.firstName} ${c.lastName} a validé le briefing accompagnateur Auto Conduite ` +
          `avec ${correct}/${total} (${percent}%). ` +
          `Attestation nominative générée et téléchargée côté accompagnateur.`,
      }),
    })
  } catch {
    /* silencieux : l'attestation reste téléchargée côté accompagnateur */
  }
}

/* ========================================================================== */
/*  Composant principal : machine à états multi-step                          */
/* ========================================================================== */

export function QuizFlow({ onClose }: { onClose?: () => void }) {
  const { data: quiz } = useContent<QuizContentData>('quiz', quizDefaults)
  const questions = (quiz.questions?.length ? quiz.questions : quizDefaults.questions) as QuizQuestion[]

  const [stage, setStage] = useState<Stage>('video')
  const [candidate, setCandidate] = useState<Candidate>({ firstName: '', lastName: '', email: '' })
  const [attemptsUsed, setAttemptsUsed] = useState(0)

  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<AnswerKey | null>(null)
  const [correctCount, setCorrectCount] = useState(0)

  useEffect(() => {
    setAttemptsUsed(readAttempts())
  }, [])

  const startRun = useCallback(() => {
    setIndex(0)
    setSelected(null)
    setCorrectCount(0)
    setStage('quiz')
  }, [])

  const finishRun = useCallback((finalCorrect: number) => {
    const next = readAttempts() + 1
    window.localStorage.setItem(QUIZ_CONFIG.attemptsKey, String(next))
    setAttemptsUsed(next)
    setCorrectCount(finalCorrect)
    setStage('result')
  }, [])

  return (
    <div className="relative">
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer"
          className="absolute -right-1 -top-1 z-20 flex size-8 items-center justify-center rounded-full bg-foreground/[0.06] text-muted-foreground transition-colors hover:bg-foreground/10 hover:text-foreground sm:size-9"
        >
          <X className="size-4" aria-hidden />
        </button>
      )}

      <div className={onClose ? 'pt-9' : undefined}>
      <AnimatePresence mode="wait">
        {stage === 'video' && (
          <Step key="video">
            <VideoStep
              video={quiz.video ?? quizDefaults.video}
              eyebrow={quiz.intro?.eyebrow ?? quizDefaults.intro.eyebrow}
              onEnded={() => setStage('intro')}
            />
          </Step>
        )}

        {stage === 'intro' && (
          <Step key="intro">
            <IntroStep
              intro={quiz.intro ?? quizDefaults.intro}
              config={quiz.config ?? quizDefaults.config}
              result={quiz.result ?? quizDefaults.result}
              total={questions.length}
              candidate={candidate}
              setCandidate={setCandidate}
              attemptsUsed={attemptsUsed}
              onStart={startRun}
            />
          </Step>
        )}

        {stage === 'quiz' && (
          <Step key="quiz">
            <QuizStep
              questions={questions}
              index={index}
              selected={selected}
              correctCount={correctCount}
              onSelect={(key) => {
                setSelected(key)
                if (key === questions[index].correct) setCorrectCount((c) => c + 1)
              }}
              onNext={(finalCorrect) => {
                if (index < questions.length - 1) {
                  setIndex((i) => i + 1)
                  setSelected(null)
                } else {
                  finishRun(finalCorrect)
                }
              }}
            />
          </Step>
        )}

        {stage === 'result' && (
          <Step key="result">
            <ResultStep
              config={quiz.config ?? quizDefaults.config}
              result={quiz.result ?? quizDefaults.result}
              formspreeEndpoint={quiz.formspreeEndpoint ?? quizDefaults.formspreeEndpoint}
              total={questions.length}
              candidate={candidate}
              correctCount={correctCount}
              attemptsUsed={attemptsUsed}
              onRetry={startRun}
              onClose={onClose}
            />
          </Step>
        )}
      </AnimatePresence>
      </div>
    </div>
  )
}

function Step({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.32, ease }}
    >
      {children}
    </motion.div>
  )
}

/* ========================================================================== */
/*  ÉTAPE 1 — Vidéo briefing : à sa fin, le quiz démarre                       */
/* ========================================================================== */

let ytApiPromise: Promise<any> | null = null
function loadYouTubeApi(): Promise<any> {
  if (typeof window === 'undefined') return Promise.reject(new Error('no window'))
  const w = window as any
  if (w.YT && w.YT.Player) return Promise.resolve(w.YT)
  if (ytApiPromise) return ytApiPromise
  ytApiPromise = new Promise((resolve) => {
    const prev = w.onYouTubeIframeAPIReady
    w.onYouTubeIframeAPIReady = () => {
      prev?.()
      resolve(w.YT)
    }
    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    document.head.appendChild(tag)
  })
  return ytApiPromise
}

function VideoStep({
  video,
  eyebrow,
  onEnded,
}: {
  video: QuizContentData['video']
  eyebrow: string
  onEnded: () => void
}) {
  const hostRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<any>(null)
  const endedRef = useRef(false)
  const onEndedRef = useRef(onEnded)
  onEndedRef.current = onEnded

  const [ended, setEnded] = useState(false)
  const [showFallback, setShowFallback] = useState(false)

  const finish = useCallback(() => {
    if (endedRef.current) return
    endedRef.current = true
    setEnded(true)
    // petit délai pour laisser voir l'état "terminé" avant la transition
    window.setTimeout(() => onEndedRef.current(), 650)
  }, [])

  useEffect(() => {
    let cancelled = false
    loadYouTubeApi()
      .then((YT) => {
        if (cancelled || !hostRef.current) return
        const el = document.createElement('div')
        el.style.width = '100%'
        el.style.height = '100%'
        hostRef.current.appendChild(el)
        playerRef.current = new YT.Player(el, {
          videoId: video.videoId,
          playerVars: { playsinline: 1, rel: 0, modestbranding: 1 },
          events: {
            onStateChange: (e: any) => {
              if (e.data === YT.PlayerState.ENDED) finish()
            },
          },
        })
      })
      .catch(() => setShowFallback(true))

    // Filet de sécurité : si l'API ne répond pas, on propose une continuation manuelle.
    const t = window.setTimeout(() => setShowFallback(true), 9000)

    return () => {
      cancelled = true
      window.clearTimeout(t)
      try {
        playerRef.current?.destroy?.()
      } catch {
        /* noop */
      }
      playerRef.current = null
    }
  }, [finish, video.videoId])

  return (
    <div className="text-center">
      <p className="font-display text-xs font-semibold tracking-[0.22em] uppercase text-primary">
        {eyebrow}
      </p>
      <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        Briefing sécurité obligatoire
      </h2>
      <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
        Visionnez la vidéo en entier. Le quiz de validation démarre automatiquement dès la fin.
      </p>

      <div className="mt-7 flex justify-center">
        <div
          className={`relative overflow-hidden rounded-2xl bg-black shadow-[var(--shadow-sm)] ring-1 ring-border/60 ${
            video.isShort ? 'aspect-[9/16] h-[58vh] max-h-[460px]' : 'aspect-video w-full max-w-xl'
          }`}
        >
          <div
            ref={hostRef}
            className="absolute inset-0 size-full [&_iframe]:absolute [&_iframe]:inset-0 [&_iframe]:size-full"
          />
          <AnimatePresence>
            {ended && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-emerald-600/90 text-white"
              >
                <Check className="size-10" aria-hidden />
                <span className="font-display text-sm font-semibold">Briefing terminé</span>
                <span className="text-xs text-white/80">Lancement du quiz...</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {showFallback && !ended && (
        <div className="mt-6">
          <Button variant="outline" size="lg" onClick={finish} className="h-10">
            J’ai visionné la vidéo, passer au quiz
            <ArrowRight className="size-4" aria-hidden />
          </Button>
          <p className="mt-3 text-xs text-muted-foreground">
            La vidéo ne se lance pas ?{' '}
            <a
              href={video.channelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline-offset-4 hover:underline"
            >
              Voir sur la chaîne Auto Conduite
            </a>
          </p>
        </div>
      )}
    </div>
  )
}

/* ========================================================================== */
/*  ÉTAPE 2 — Intro (texte avant Q1) + identité pour l'attestation            */
/* ========================================================================== */

function IntroStep({
  intro,
  config,
  result,
  total,
  candidate,
  setCandidate,
  attemptsUsed,
  onStart,
}: {
  intro: QuizContentData['intro']
  config: QuizContentData['config']
  result: QuizContentData['result']
  total: number
  candidate: Candidate
  setCandidate: (c: Candidate) => void
  attemptsUsed: number
  onStart: () => void
}) {
  const exhausted = attemptsUsed >= config.maxAttempts
  const formValid =
    candidate.firstName.trim().length > 1 &&
    candidate.lastName.trim().length > 1 &&
    EMAIL_RE.test(candidate.email.trim())

  return (
    <div>
      <div className="rounded-2xl border border-border/70 bg-[oklch(0.975_0.008_220)] p-5 dark:bg-[oklch(0.16_0.015_220)] sm:p-7">
        <h2 className="font-display text-lg font-semibold text-primary">{intro.welcomeTitle}</h2>
        <div className="mt-3 space-y-2.5 text-sm leading-relaxed text-muted-foreground">
          {intro.welcomeBody.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </div>

      <div className="mt-7">
        <SectionLabel icon={ShieldCheck} text="Votre identité (attestation nominative)" />
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field
            id="firstName"
            label="Prénom"
            value={candidate.firstName}
            onChange={(v) => setCandidate({ ...candidate, firstName: v })}
            placeholder="Marie"
          />
          <Field
            id="lastName"
            label="Nom"
            value={candidate.lastName}
            onChange={(v) => setCandidate({ ...candidate, lastName: v })}
            placeholder="Durand"
          />
          <div className="sm:col-span-2">
            <Field
              id="email"
              label="Adresse e-mail"
              type="email"
              value={candidate.email}
              onChange={(v) => setCandidate({ ...candidate, email: v })}
              placeholder="marie.durand@email.fr"
            />
          </div>
        </div>
      </div>

      <div className="mt-7">
        {exhausted ? (
          <div className="flex items-start gap-3 rounded-2xl bg-amber-500/10 px-5 py-4 text-sm text-amber-700 ring-1 ring-amber-500/20 dark:text-amber-300">
            <AlertTriangle className="mt-0.5 size-5 shrink-0" aria-hidden />
            <span>{result.exhausted.body[0]}</span>
          </div>
        ) : (
          <>
            <Button size="lg" onClick={onStart} disabled={!formValid} className="h-12 w-full text-base">
              Commencer le quiz
              <ArrowRight className="size-4" aria-hidden />
            </Button>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              {total} questions · une seule bonne réponse · seuil {config.passPercent}%
            </p>
          </>
        )}
      </div>
    </div>
  )
}

/* ========================================================================== */
/*  ÉTAPE 3 — Quiz : une question à la fois, pas de retour                     */
/* ========================================================================== */

function QuizStep({
  questions,
  index,
  selected,
  correctCount,
  onSelect,
  onNext,
}: {
  questions: QuizQuestion[]
  index: number
  selected: AnswerKey | null
  correctCount: number
  onSelect: (key: AnswerKey) => void
  onNext: (finalCorrect: number) => void
}) {
  const q = questions[index]
  const total = questions.length
  const answered = selected !== null
  const isLast = index === total - 1
  const progress = Math.round(((index + (answered ? 1 : 0)) / total) * 100)

  return (
    <div>
      <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
        <span className="font-display tracking-wide">
          Question {index + 1} / {total}
        </span>
        <span>
          {correctCount} bonne{correctCount > 1 ? 's' : ''} réponse{correctCount > 1 ? 's' : ''}
        </span>
      </div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <motion.div
          className="h-full rounded-full bg-primary"
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={q.id}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.32, ease }}
        >
          <p className="mt-8 font-display text-[11px] font-bold tracking-[0.18em] uppercase text-primary">
            {q.theme}
          </p>
          <h2 className="mt-2.5 font-display text-lg font-semibold leading-snug text-foreground sm:text-xl">
            {q.prompt}
          </h2>

          <div className="mt-6 space-y-2.5">
            {q.options.map((opt) => (
              <OptionButton
                key={opt.key}
                option={opt}
                answered={answered}
                isSelected={selected === opt.key}
                isCorrect={opt.key === q.correct}
                onClick={() => !answered && onSelect(opt.key)}
              />
            ))}
          </div>

          <AnimatePresence>
            {answered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.4, ease }}
                className="overflow-hidden"
              >
                <div
                  className={`mt-5 flex items-start gap-3 rounded-2xl px-5 py-4 text-sm leading-relaxed ring-1 ${
                    selected === q.correct
                      ? 'bg-emerald-500/10 text-emerald-800 ring-emerald-500/20 dark:text-emerald-200'
                      : 'bg-primary/[0.07] text-foreground/85 ring-primary/15'
                  }`}
                >
                  <Info className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                  <span>
                    <span className="font-semibold text-foreground">Explication. </span>
                    {q.explanation}
                  </span>
                </div>

                <Button size="lg" onClick={() => onNext(correctCount)} className="mt-5 h-12 w-full text-base">
                  {isLast ? 'Voir mon résultat' : 'Question suivante'}
                  <ArrowRight className="size-4" aria-hidden />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function OptionButton({
  option,
  answered,
  isSelected,
  isCorrect,
  onClick,
}: {
  option: QuizOption
  answered: boolean
  isSelected: boolean
  isCorrect: boolean
  onClick: () => void
}) {
  const revealCorrect = answered && isCorrect
  const revealWrong = answered && isSelected && !isCorrect

  let tone = 'border-border/80 bg-card/70 hover:border-primary/40 hover:bg-primary/[0.04]'
  if (revealCorrect) tone = 'border-emerald-500/60 bg-emerald-500/10'
  else if (revealWrong) tone = 'border-rose-500/60 bg-rose-500/10'
  else if (answered) tone = 'border-border/60 bg-card/40 opacity-70'

  let badge = 'bg-muted text-muted-foreground'
  if (revealCorrect) badge = 'bg-emerald-500 text-white'
  else if (revealWrong) badge = 'bg-rose-500 text-white'

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={answered}
      aria-pressed={isSelected}
      className={`flex w-full items-center gap-3.5 rounded-2xl border px-4 py-3.5 text-left shadow-[var(--shadow-sm)] transition-all ${tone} ${
        answered ? 'cursor-default' : 'cursor-pointer active:translate-y-px'
      }`}
    >
      <span
        className={`flex size-8 shrink-0 items-center justify-center rounded-lg font-display text-sm font-bold transition-colors ${badge}`}
      >
        {revealCorrect ? (
          <Check className="size-4" aria-hidden />
        ) : revealWrong ? (
          <X className="size-4" aria-hidden />
        ) : (
          option.key
        )}
      </span>
      <span className="text-sm leading-relaxed text-foreground">{option.text}</span>
    </button>
  )
}

/* ========================================================================== */
/*  ÉTAPE 4 — Résultat : attestation auto-téléchargée, ou échec + repasse      */
/* ========================================================================== */

function ResultStep({
  config,
  result: resultMessages,
  formspreeEndpoint,
  total,
  candidate,
  correctCount,
  attemptsUsed,
  onRetry,
  onClose,
}: {
  config: QuizContentData['config']
  result: QuizContentData['result']
  formspreeEndpoint: string
  total: number
  candidate: Candidate
  correctCount: number
  attemptsUsed: number
  onRetry: () => void
  onClose?: () => void
}) {
  const percent = Math.round((correctCount / total) * 100)
  const passed = correctCount >= config.passCount
  const canRetry = !passed && attemptsUsed < config.maxAttempts
  const exhausted = !passed && attemptsUsed >= config.maxAttempts

  const [reference, setReference] = useState<string | null>(null)
  const [downloading, setDownloading] = useState(false)
  const autoFired = useRef(false)

  const data: AttestationData = {
    firstName: candidate.firstName,
    lastName: candidate.lastName,
    email: candidate.email,
    correct: correctCount,
    total,
    percent,
  }

  const generate = async () => {
    setDownloading(true)
    try {
      const { reference: ref } = await downloadAttestation(data)
      setReference(ref)
    } finally {
      setDownloading(false)
    }
  }

  useEffect(() => {
    if (passed && !autoFired.current) {
      autoFired.current = true
      void generate()
      void notifyManager(formspreeEndpoint, total, candidate, correctCount, percent)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [passed])

  const result = passed
    ? resultMessages.success
    : exhausted
      ? resultMessages.exhausted
      : resultMessages.failure

  return (
    <div className="text-center">
      <ScoreRing percent={percent} passed={passed} correct={correctCount} total={total} />

      <h2 className="mt-7 font-display text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
        {result.title}
      </h2>
      <div className="mx-auto mt-3 max-w-md space-y-2.5 text-sm leading-relaxed text-muted-foreground">
        {result.body.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>

      {passed && (
        <div className="mt-7 rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.06] p-5 ring-1 ring-emerald-500/10 sm:p-6">
          <span className="mx-auto flex size-11 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
            <Award className="size-5" aria-hidden />
          </span>
          <h3 className="mt-3 font-display text-base font-semibold text-foreground">Attestation nominative</h3>
          <p className="mt-1.5 text-sm text-muted-foreground">
            {downloading
              ? 'Génération de votre attestation en cours...'
              : 'Le téléchargement a démarré automatiquement. Vous pouvez la régénérer si besoin.'}
          </p>
          <Button size="lg" variant="outline" onClick={generate} disabled={downloading} className="mt-4 h-11">
            <Download className="size-4" aria-hidden />
            Télécharger l’attestation
          </Button>
          {reference && <p className="mt-3 text-xs text-muted-foreground">Référence : {reference}</p>}
        </div>
      )}

      {canRetry && (
        <div className="mt-7">
          <Button size="lg" onClick={onRetry} className="h-12 w-full text-base">
            <RotateCcw className="size-4" aria-hidden />
            Repasser le quiz
          </Button>
          <p className="mt-3 text-xs text-muted-foreground">
            Tentative {attemptsUsed} sur {config.maxAttempts} utilisée.
          </p>
        </div>
      )}

      {(passed || exhausted) && onClose && (
        <button
          type="button"
          onClick={onClose}
          className="mt-7 text-sm font-medium text-primary underline-offset-4 hover:underline"
        >
          Fermer
        </button>
      )}
    </div>
  )
}

function ScoreRing({
  percent,
  passed,
  correct,
  total,
}: {
  percent: number
  passed: boolean
  correct: number
  total: number
}) {
  const r = 52
  const c = 2 * Math.PI * r
  const color = passed ? 'text-emerald-500' : 'text-amber-500'

  return (
    <div className="relative mx-auto size-28">
      <svg viewBox="0 0 120 120" className="size-full -rotate-90">
        <circle cx="60" cy="60" r={r} fill="none" strokeWidth="10" className="stroke-muted" />
        <motion.circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          strokeWidth="10"
          strokeLinecap="round"
          className={`stroke-current ${color}`}
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c - (c * percent) / 100 }}
          transition={{ duration: 0.9, ease }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-2xl font-bold text-foreground">
          {correct}/{total}
        </span>
        <span className={`text-xs font-semibold ${color}`}>{percent}%</span>
      </div>
    </div>
  )
}

/* ========================================================================== */
/*  Composants partagés                                                        */
/* ========================================================================== */

function SectionLabel({ icon: Icon, text }: { icon: typeof ShieldCheck; text: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex size-8 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15">
        <Icon className="size-4" aria-hidden />
      </span>
      <span className="font-display text-sm font-semibold text-foreground">{text}</span>
    </div>
  )
}

function Field({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
}: {
  id: string
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: string
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="h-11"
        autoComplete="off"
      />
    </div>
  )
}
