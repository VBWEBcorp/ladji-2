import type { Metadata } from 'next'
import Link from 'next/link'

import { breadcrumbJsonLd, webPageJsonLd } from '@/components/seo/json-ld'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { siteConfig } from '@/lib/seo'

const description =
  "Politique de cookies du site Auto Conduite : cookies utilisés, finalités, consentement, retrait, conforme aux recommandations CNIL 2026."

export const metadata: Metadata = {
  title: 'Politique de cookies',
  description,
  alternates: { canonical: '/politique-cookies' },
  robots: { index: false, follow: false },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    webPageJsonLd('Politique de cookies', description, '/politique-cookies'),
    breadcrumbJsonLd([
      { name: 'Accueil', path: '/' },
      { name: 'Politique de cookies', path: '/politique-cookies' },
    ]),
  ],
}

export default function CookiePolicyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumb items={[{ label: 'Politique de cookies' }]} />

      <section className="border-b border-border/60">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <h1 className="font-display text-3xl tracking-tight text-foreground sm:text-4xl">
            Politique de cookies
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">
            Dernière mise à jour : <span className="text-foreground">[à compléter]</span>
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            La présente politique précise les cookies et traceurs déposés sur votre
            terminal lors de votre visite sur {siteConfig.url}, et les moyens de
            les accepter, les refuser ou les paramétrer. Elle est rédigée conformément
            à l&apos;article 82 de la loi Informatique et Libertés et aux lignes
            directrices et recommandations de la CNIL, en particulier celles
            mises à jour le 16 janvier 2026 sur le consentement multi-terminaux.
          </p>

          <article className="mt-10 space-y-10 text-sm leading-relaxed text-muted-foreground [&_h2]:font-display [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-foreground [&_h3]:text-sm [&_h3]:font-semibold [&_h3]:text-foreground">

            <section className="space-y-3">
              <h2>1. Qu&apos;est-ce qu&apos;un cookie ?</h2>
              <p>
                Un cookie est un petit fichier déposé par un site web sur votre
                appareil (ordinateur, smartphone, tablette) lors de votre visite.
                Il permet au site de mémoriser des informations (préférences,
                session, mesures d&apos;audience). Le terme « cookie » désigne par
                extension l&apos;ensemble des traceurs (pixels, identifiants, stockage
                local, etc.) susceptibles d&apos;être déposés.
              </p>
            </section>

            <section className="space-y-3">
              <h2>2. Catégories de cookies utilisés</h2>

              <h3 className="pt-2">a) Cookies strictement nécessaires</h3>
              <p>
                Ces cookies sont indispensables au fonctionnement du site. Ils ne
                peuvent pas être désactivés et ne nécessitent pas votre consentement
                préalable. Ils permettent par exemple de garder votre session active,
                de mémoriser votre préférence de thème (clair/sombre) ou de sécuriser
                les formulaires.
              </p>

              <h3 className="pt-2">b) Cookies de mesure d&apos;audience</h3>
              <p>
                Lorsque cette fonctionnalité sera activée, nous utiliserons un outil
                de mesure d&apos;audience pour comprendre comment le site est utilisé
                (pages les plus consultées, parcours, terminal utilisé). Conformément
                à la position de la CNIL, ces mesures peuvent être exemptées de
                consentement à condition d&apos;être strictement limitées à des
                statistiques anonymisées, sans recoupement avec d&apos;autres traitements.
              </p>
              <p>
                Si nous utilisons un outil non couvert par l&apos;exemption (par exemple
                Google Analytics), nous recueillerons votre consentement préalable.
              </p>

              <h3 className="pt-2">c) Cookies de personnalisation / marketing</h3>
              <p>
                {siteConfig.name} n&apos;utilise pas, à ce stade, de cookies à des
                fins publicitaires ou de profilage. Si un tel usage devait être mis
                en place (par exemple via le pixel Meta mentionné au cahier des
                charges), il serait soumis à votre consentement explicite préalable,
                avec possibilité de refus aussi simple que d&apos;acceptation.
              </p>

              <h3 className="pt-2">d) Cookies tiers</h3>
              <p>
                Certaines pages peuvent intégrer des contenus provenant de tiers
                (vidéos YouTube ou Vimeo, par exemple), susceptibles de déposer
                leurs propres cookies. Leur dépôt est conditionné à votre consentement
                via le bandeau du site. Vous êtes invité à consulter la politique
                de cookies de chaque éditeur tiers concerné.
              </p>
            </section>

            <section className="space-y-3">
              <h2>3. Recueil du consentement</h2>
              <p>
                Lors de votre première visite, un bandeau vous présente les
                catégories de cookies utilisés. Vous pouvez :
              </p>
              <ul className="list-inside list-disc space-y-1 pl-1">
                <li><strong>Tout accepter</strong> en un clic.</li>
                <li><strong>Tout refuser</strong> en un clic : l&apos;option de refus est aussi simple et aussi visible que celle d&apos;acceptation, conformément aux recommandations CNIL.</li>
                <li><strong>Paramétrer</strong> votre choix par catégorie.</li>
              </ul>
              <p>
                L&apos;absence de choix actif équivaut à un refus : aucun cookie non
                strictement nécessaire ne sera déposé tant que vous n&apos;aurez pas
                exprimé un consentement clair et positif.
              </p>
              <p>
                Votre choix est mémorisé pour une durée maximale de six (6) mois.
                Au-delà, votre consentement vous sera redemandé. Vous pouvez
                modifier vos préférences à tout moment via le lien « Gérer mes
                cookies » présent en pied de page.
              </p>
            </section>

            <section className="space-y-3">
              <h2>4. Consentement multi-terminaux</h2>
              <p>
                Lorsque le site proposera des espaces connectés (espace bénéficiaire,
                espace prescripteur, à venir), le choix exprimé sur un terminal
                pourra être rattaché à votre compte. Dans ce cas, votre consentement
                ou votre refus s&apos;appliquera automatiquement à l&apos;ensemble des
                appareils sur lesquels vous serez connecté à ce compte, conformément
                aux recommandations CNIL publiées le 16 janvier 2026 sur le
                consentement multi-terminaux.
              </p>
              <p>
                Cette portée vous sera signalée explicitement lors du recueil du
                consentement.
              </p>
            </section>

            <section className="space-y-3">
              <h2>5. Durée de conservation des cookies</h2>
              <p>
                Conformément à la recommandation CNIL, la durée de vie d&apos;un
                cookie de mesure d&apos;audience n&apos;excède pas 13 mois, et celle des
                informations qu&apos;il collecte n&apos;excède pas 25 mois. Le choix
                exprimé sur le bandeau (acceptation / refus) est conservé six (6)
                mois.
              </p>
            </section>

            <section className="space-y-3">
              <h2>6. Comment refuser ou retirer son consentement</h2>
              <p>
                Vous pouvez à tout moment retirer votre consentement, aussi facilement
                que vous l&apos;avez donné, via les outils suivants :
              </p>
              <ul className="list-inside list-disc space-y-1 pl-1">
                <li>Le lien « Gérer mes cookies » en pied de page du site.</li>
                <li>Les paramètres de confidentialité de votre navigateur (suppression et blocage des cookies).</li>
                <li>Les outils d&apos;opt-out proposés par certains tiers (le cas échéant).</li>
              </ul>
              <p>
                Le refus des cookies n&apos;empêche pas la consultation du site, mais
                certaines fonctionnalités secondaires peuvent être indisponibles
                (statistiques de visite, contenus tiers intégrés).
              </p>
            </section>

            <section className="space-y-3">
              <h2>7. Vos droits</h2>
              <p>
                Vous disposez sur les données collectées via les cookies des mêmes
                droits que ceux décrits dans notre{' '}
                <Link
                  href="/politique-de-confidentialite"
                  className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
                >
                  Politique de confidentialité
                </Link>{' '}
                : accès, rectification, effacement, opposition, limitation,
                portabilité, retrait du consentement.
              </p>
              <p>
                Pour les exercer, écrivez à{' '}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
                >
                  {siteConfig.email}
                </a>{' '}
                ou adressez une réclamation à la CNIL :{' '}
                <a
                  href="https://www.cnil.fr/fr/plaintes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
                >
                  cnil.fr/fr/plaintes
                </a>.
              </p>
            </section>

            <section className="space-y-3 rounded-xl border border-border/60 bg-muted/20 p-5">
              <h3>Pour en savoir plus</h3>
              <ul className="list-inside list-disc space-y-1.5 pl-1">
                <li>
                  Règles CNIL relatives aux cookies :{' '}
                  <a
                    href="https://www.cnil.fr/fr/cookies-et-autres-traceurs/regles/cookies"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
                  >
                    cnil.fr/fr/cookies-et-autres-traceurs
                  </a>
                </li>
                <li>
                  Mesure d&apos;audience exemptée de consentement :{' '}
                  <a
                    href="https://www.cnil.fr/fr/cookies-solutions-pour-les-outils-de-mesure-daudience"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
                  >
                    cnil.fr : solutions pour la mesure d&apos;audience
                  </a>
                </li>
              </ul>
            </section>
          </article>
        </div>
      </section>
    </>
  )
}
