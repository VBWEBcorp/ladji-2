import type { Metadata } from 'next'

import { breadcrumbJsonLd, webPageJsonLd } from '@/components/seo/json-ld'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { siteConfig } from '@/lib/seo'

const description =
  "Déclaration d'accessibilité du site Auto Conduite : engagement vers le RGAA 4.1, état de conformité, voies de contact et de recours."

export const metadata: Metadata = {
  title: "Déclaration d'accessibilité",
  description,
  alternates: { canonical: '/accessibilite' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    webPageJsonLd("Déclaration d'accessibilité", description, '/accessibilite'),
    breadcrumbJsonLd([
      { name: 'Accueil', path: '/' },
      { name: "Déclaration d'accessibilité", path: '/accessibilite' },
    ]),
  ],
}

export default function AccessibilityPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumb items={[{ label: "Déclaration d'accessibilité" }]} />

      <section className="border-b border-border/60">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <p className="font-display text-xs font-semibold tracking-[0.22em] uppercase text-primary">
            Accessibilité numérique
          </p>
          <h1 className="mt-3 font-display text-3xl tracking-tight text-foreground sm:text-4xl">
            Déclaration d&apos;accessibilité
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">
            Dernière mise à jour : <span className="text-foreground">mai 2026</span>
          </p>

          <article className="mt-10 space-y-10 text-sm leading-relaxed text-muted-foreground [&_h2]:font-display [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-foreground [&_h3]:text-sm [&_h3]:font-semibold [&_h3]:text-foreground">

            <section className="space-y-3">
              <p>
                {siteConfig.name} s&apos;engage à rendre son site internet
                accessible au plus grand nombre, conformément au Référentiel
                Général d&apos;Amélioration de l&apos;Accessibilité (RGAA) version 4.1,
                qui demeure la version de référence en France pour les démarches
                de conformité, en attendant la publication du RGAA 5 prévue fin 2026.
              </p>
              <p>
                Cette déclaration concerne le site{' '}
                <strong>{siteConfig.url}</strong>.
              </p>
            </section>

            <section className="space-y-3">
              <h2>1. État de conformité</h2>
              <p>
                Le site <strong>{siteConfig.url}</strong> n&apos;est pas encore audité
                par un organisme tiers. Aucun niveau de conformité ne peut donc
                être déclaré formellement à ce stade. Cette déclaration sera mise
                à jour à l&apos;issue de notre premier audit d&apos;accessibilité.
              </p>
              <p>
                Notre objectif est de viser un niveau de <strong>conformité
                partielle</strong> à court terme et d&apos;atteindre la <strong>conformité totale</strong>{' '}
                au RGAA 4.1 dans un délai raisonnable.
              </p>
            </section>

            <section className="space-y-3">
              <h2>2. Engagements pris</h2>
              <p>
                Dans la conception du site, nous avons d&apos;ores et déjà intégré
                plusieurs bonnes pratiques :
              </p>
              <ul className="list-inside list-disc space-y-1 pl-1">
                <li>Structure sémantique HTML claire (titres hiérarchisés, repères de navigation).</li>
                <li>Contraste de couleurs renforcé entre les textes et l&apos;arrière-plan.</li>
                <li>Indicateurs de focus visibles pour la navigation au clavier.</li>
                <li>Mode sombre par défaut, mode clair disponible via bascule, sans impact sur la lisibilité.</li>
                <li>Alternatives textuelles sur les icônes décoratives (attribut <code className="rounded bg-muted px-1 py-0.5 text-foreground/80">aria-hidden</code>).</li>
                <li>Liens explicites et reconnaissables, avec libellés clairs.</li>
                <li>Police de caractères lisible, taille de texte responsive.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2>3. Contenus non accessibles (connus)</h2>
              <p>
                Les éléments suivants peuvent à ce stade poser des difficultés
                d&apos;accessibilité. Nous travaillons à les corriger :
              </p>
              <ul className="list-inside list-disc space-y-1 pl-1">
                <li>Certaines images d&apos;illustration n&apos;ont pas encore d&apos;alternative textuelle descriptive.</li>
                <li>Les vidéos pédagogiques (à venir) devront disposer d&apos;une transcription textuelle et/ou de sous-titres.</li>
                <li>Le téléchargement des documents PDF (fiche prescripteur, guide accompagnateur) n&apos;a pas encore fait l&apos;objet d&apos;une vérification d&apos;accessibilité.</li>
                <li>Le quiz du briefing sécurité (à venir) devra être testé pour la navigation au clavier et la compatibilité avec les lecteurs d&apos;écran.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2>4. Établissement de la déclaration</h2>
              <p>
                La présente déclaration a été établie en <span className="text-foreground">mai 2026</span>{' '}
                par {siteConfig.name} sur la base d&apos;une auto-évaluation. Une
                évaluation par un tiers spécialisé est prévue.
              </p>
            </section>

            <section className="space-y-3">
              <h2>5. Signaler une difficulté</h2>
              <p>
                Si vous constatez un défaut d&apos;accessibilité vous empêchant
                d&apos;accéder à un contenu ou à une fonctionnalité du site, vous
                pouvez nous le signaler. Nous nous engageons à vous répondre dans
                un délai raisonnable et à proposer une alternative.
              </p>
              <ul className="list-inside list-disc space-y-1 pl-1">
                <li>Par email :{' '}
                  <a
                    href={`mailto:${siteConfig.email}?subject=Signalement%20d%27un%20probl%C3%A8me%20d%27accessibilit%C3%A9`}
                    className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
                  >
                    {siteConfig.email}
                  </a>
                </li>
                <li>Par téléphone :{' '}
                  <a
                    href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`}
                    className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
                  >
                    {siteConfig.phone}
                  </a>
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2>6. Voies de recours</h2>
              <p>
                Si vous constatez un défaut d&apos;accessibilité non corrigé après
                votre signalement, ou si vous estimez ne pas avoir reçu de réponse
                satisfaisante, vous pouvez :
              </p>
              <ul className="list-inside list-disc space-y-1 pl-1">
                <li>
                  Écrire au Défenseur des droits :{' '}
                  <a
                    href="https://formulaire.defenseurdesdroits.fr/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
                  >
                    formulaire.defenseurdesdroits.fr
                  </a>
                </li>
                <li>
                  Contacter le délégué du Défenseur des droits dans votre département.
                </li>
                <li>
                  Adresser un courrier au siège : Défenseur des droits, Libre réponse 71120, 75342 Paris CEDEX 07.
                </li>
              </ul>
            </section>

            <section className="space-y-3 rounded-xl border border-border/60 bg-muted/20 p-5">
              <h3>Pour en savoir plus</h3>
              <ul className="list-inside list-disc space-y-1.5 pl-1">
                <li>
                  Référentiel officiel :{' '}
                  <a
                    href="https://accessibilite.numerique.gouv.fr/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
                  >
                    accessibilite.numerique.gouv.fr
                  </a>
                </li>
                <li>
                  Cadre légal européen : European Accessibility Act (directive
                  2019/882), applicable en France depuis le 28 juin 2025.
                </li>
              </ul>
            </section>
          </article>
        </div>
      </section>
    </>
  )
}
