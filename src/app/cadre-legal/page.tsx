import type { Metadata } from 'next'
import Link from 'next/link'

import { breadcrumbJsonLd, webPageJsonLd } from '@/components/seo/json-ld'
import { Breadcrumb } from '@/components/ui/breadcrumb'

const description =
  "Le cadre légal du dispositif Auto Conduite : conduite supervisée et accompagnée (Code de la route, articles L211-1 à L211-7 et R211-3 à R211-7), candidat libre, place d'Auto Conduite dans l'écosystème de l'apprentissage."

export const metadata: Metadata = {
  title: 'Cadre légal',
  description,
  alternates: { canonical: '/cadre-legal' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    webPageJsonLd('Cadre légal', description, '/cadre-legal'),
    breadcrumbJsonLd([
      { name: 'Accueil', path: '/' },
      { name: 'Cadre légal', path: '/cadre-legal' },
    ]),
  ],
}

export default function LegalFrameworkPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumb items={[{ label: 'Cadre légal' }]} />

      <section className="border-b border-border/60">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <p className="font-display text-xs font-semibold tracking-[0.22em] uppercase text-primary">
            Code de la route
          </p>
          <h1 className="mt-3 font-display text-3xl tracking-tight text-foreground sm:text-4xl">
            Un cadre clair, encadré par la loi
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Auto Conduite intervient dans le cadre légal de la conduite supervisée
            et de la conduite accompagnée. Nous ne sommes pas une auto-école : nous
            fournissons un véhicule pédagogique à double commande pour la phase
            d&apos;entraînement, en complément du parcours suivi en école de conduite.
          </p>

          <article className="mt-12 space-y-12 text-sm leading-relaxed text-muted-foreground [&_h2]:font-display [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-foreground [&_h3]:text-sm [&_h3]:font-semibold [&_h3]:text-foreground">

            <section className="space-y-3">
              <h2>1. Les textes de référence</h2>
              <p>
                L&apos;apprentissage de la conduite est encadré par le Code de la route,
                Livre 2 (Le conducteur), articles L211-1 A à L221-7, et leurs
                articles d&apos;application R211-3 à R211-7. Ces textes définissent les
                conditions, les acteurs et les responsabilités liées à la formation
                à la conduite.
              </p>
              <p>
                À ces textes s&apos;ajoute l&apos;arrêté du 22 décembre 2009 relatif à
                l&apos;apprentissage dans un établissement agréé, et l&apos;arrêté du 16 juillet
                2013 portant sur l&apos;apprentissage à titre non onéreux (qui encadre
                la conduite supervisée et accompagnée).
              </p>
            </section>

            <section className="space-y-3">
              <h2>2. La conduite supervisée</h2>
              <p>
                La conduite supervisée est ouverte aux candidats âgés de 18 ans
                révolus. Elle permet de poursuivre l&apos;apprentissage en dehors de
                l&apos;auto-école après validation de la formation initiale (minimum
                20h théoriques et pratiques) ou après un échec à l&apos;examen pratique.
              </p>
              <h3 className="pt-2">Conditions pour le bénéficiaire</h3>
              <ul className="list-inside list-disc space-y-1 pl-1">
                <li>Avoir 18 ans révolus.</li>
                <li>Détenir un NEPH valide (numéro d&apos;enregistrement préfectoral harmonisé).</li>
                <li>Avoir réussi le code de la route.</li>
                <li>Avoir suivi 20h minimum de leçons en auto-école et obtenu l&apos;attestation de fin de formation initiale (ou avoir échoué à l&apos;épreuve pratique).</li>
                <li>Participer à un rendez-vous préalable d&apos;au moins 2 heures, en présence d&apos;un enseignant agréé et de l&apos;accompagnateur, avant le début de la conduite supervisée.</li>
              </ul>
              <h3 className="pt-2">Conditions pour l&apos;accompagnateur</h3>
              <ul className="list-inside list-disc space-y-1 pl-1">
                <li>Être titulaire du permis B depuis au moins 5 ans sans interruption.</li>
                <li>Ne pas avoir fait l&apos;objet d&apos;une suspension, annulation ou invalidation du permis dans les 5 années précédentes.</li>
                <li>Être désigné nommément au contrat d&apos;assurance.</li>
                <li>Être sobre pendant toute la durée de la séance.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2>3. La conduite accompagnée (AAC)</h2>
              <p>
                L&apos;apprentissage anticipé de la conduite est accessible dès 15 ans.
                Il prévoit une formation initiale en auto-école suivie d&apos;une phase
                de conduite accompagnée d&apos;au minimum un an et 3 000 km parcourus.
                Cette phase fait l&apos;objet de rendez-vous pédagogiques obligatoires.
              </p>
              <p>
                Les conditions concernant l&apos;accompagnateur sont identiques à celles
                de la conduite supervisée (permis B 5 ans, pas de suspension, etc.).
              </p>
            </section>

            <section className="space-y-3">
              <h2>4. Le candidat libre</h2>
              <p>
                Le candidat libre est un bénéficiaire qui s&apos;inscrit directement à
                l&apos;examen du permis via l&apos;ANTS (ants.gouv.fr), sans passer par une
                auto-école pour le passage de l&apos;épreuve. Il reste cependant tenu
                d&apos;avoir suivi une formation initiale et obtenu le code de la route.
              </p>
              <p>
                Le statut de candidat libre ne dispense pas des règles de la conduite
                supervisée ou accompagnée. Il s&apos;agit d&apos;un mode d&apos;inscription
                administratif et non d&apos;une dispense de formation.
              </p>
              <ul className="list-inside list-disc space-y-1 pl-1">
                <li>Inscription en ligne via{' '}
                  <a
                    href="https://ants.gouv.fr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
                  >
                    ants.gouv.fr
                  </a>{' '}
                  pour obtenir le NEPH et réserver une date d&apos;examen.
                </li>
                <li>Présentation à l&apos;examen avec son propre véhicule (ou un véhicule loué auprès d&apos;une auto-école ou d&apos;un prestataire agréé).</li>
                <li>Conformité du véhicule (notamment double commande) exigée par l&apos;inspecteur.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2>5. La place d&apos;Auto Conduite</h2>
              <p>
                Auto Conduite est un service de mobilité solidaire. Notre rôle est
                strictement délimité : nous mettons à disposition un véhicule
                pédagogique à double commande, l&apos;assurance apprentissage associée
                et le cadre opérationnel (point de dépôt, contrat, briefing
                sécurité). Nous ne dispensons aucune formation théorique ni pratique
                réservée aux établissements agréés.
              </p>
              <p>
                Le bénéficiaire conduit avec son accompagnateur proche (ou, s&apos;il
                le souhaite, avec un enseignant agréé qu&apos;il aura choisi de son côté).
                Auto Conduite ne se substitue pas à l&apos;auto-école pour la formation
                initiale obligatoire, ni pour la préparation à l&apos;examen.
              </p>
              <h3 className="pt-2">Ce qu&apos;Auto Conduite fournit</h3>
              <ul className="list-inside list-disc space-y-1 pl-1">
                <li>Un véhicule pédagogique récent, entretenu et conforme.</li>
                <li>Un double pédalier homologué (frein + embrayage côté passager avant).</li>
                <li>Une assurance spécifique apprentissage qui couvre le bénéficiaire et l&apos;accompagnateur pendant la durée de la location.</li>
                <li>Un point de dépôt accessible (bassin Sarrebourg / Château-Salins).</li>
                <li>Un briefing sécurité obligatoire (vidéo + quiz) avant l&apos;accès au véhicule.</li>
              </ul>
              <h3 className="pt-2">Ce qu&apos;Auto Conduite ne fait pas</h3>
              <ul className="list-inside list-disc space-y-1 pl-1">
                <li>Nous n&apos;assurons pas la formation initiale obligatoire en auto-école.</li>
                <li>Nous ne formons pas au code de la route.</li>
                <li>Nous ne préparons pas à l&apos;examen pratique (cela reste le rôle des établissements agréés).</li>
                <li>Nous ne délivrons pas d&apos;attestation de fin de formation initiale.</li>
              </ul>
            </section>

            <section className="space-y-3 rounded-xl border border-border/60 bg-muted/20 p-5">
              <h3>Pour aller plus loin</h3>
              <ul className="list-inside list-disc space-y-1.5 pl-1">
                <li>
                  Textes officiels :{' '}
                  <a
                    href="https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006074228/LEGISCTA000006159511/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
                  >
                    Code de la route, articles L211-1 A à L211-7 (Légifrance)
                  </a>
                </li>
                <li>
                  Informations Service Public :{' '}
                  <a
                    href="https://www.service-public.gouv.fr/particuliers/vosdroits/F21012"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
                  >
                    Permis de conduire : conduite supervisée
                  </a>
                </li>
                <li>
                  Sécurité Routière :{' '}
                  <a
                    href="https://www.securite-routiere.gouv.fr/passer-son-permis-de-conduire/conduite-accompagnee"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
                  >
                    Conduite accompagnée : site officiel
                  </a>
                </li>
              </ul>
              <p className="pt-2 text-foreground">
                Pour vérifier votre éligibilité au dispositif Auto Conduite, consultez
                la page{' '}
                <Link
                  href="/comment-ca-marche"
                  className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
                >
                  Comment ça marche
                </Link>{' '}
                ou contactez-nous directement.
              </p>
            </section>
          </article>
        </div>
      </section>
    </>
  )
}
