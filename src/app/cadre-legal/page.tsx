import type { Metadata } from 'next'
import Link from 'next/link'

import { breadcrumbJsonLd, webPageJsonLd } from '@/components/seo/json-ld'
import { Breadcrumb } from '@/components/ui/breadcrumb'

const description =
  "Le cadre légal du dispositif Auto Conduite : apprentissage de la conduite à titre non onéreux (art. R. 211-3 du Code de la route, arrêté du 16 juillet 2013 modifié), double commande (art. R. 317-25), candidat libre et place d'Auto Conduite."

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

const lien = 'font-medium text-primary underline underline-offset-4 hover:text-primary/80'

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
            Auto Conduite intervient dans le cadre de l&apos;apprentissage de la
            conduite à titre non onéreux. Nous ne sommes pas une auto-école : nous
            fournissons un véhicule pédagogique à double commande pour
            s&apos;entraîner avec un proche, en complément d&apos;une auto-école ou en
            candidat libre.
          </p>

          <article className="mt-12 space-y-12 text-sm leading-relaxed text-muted-foreground [&_h2]:font-display [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-foreground [&_h3]:text-sm [&_h3]:font-semibold [&_h3]:text-foreground">

            <section className="space-y-3">
              <h2>1. Les textes de référence</h2>
              <p>
                L&apos;apprentissage de la conduite à titre non onéreux est autorisé par
                l&apos;<strong>article R. 211-3 du Code de la route</strong> et encadré par
                l&apos;<strong>arrêté du 16 juillet 2013 modifié</strong>. Ces textes
                définissent les conditions de cet apprentissage : rôle de
                l&apos;accompagnateur, véhicule, assurance.
              </p>
              <p>
                Le véhicule est équipé d&apos;une double commande, conformément à
                l&apos;<strong>article R. 317-25 du Code de la route</strong>.
              </p>
              <p className="rounded-xl border border-primary/20 bg-primary/[0.04] p-3 text-foreground">
                <strong>Service réservé aux majeurs.</strong> L&apos;accès au dispositif
                Auto Conduite est réservé aux personnes âgées de 18 ans minimum.
              </p>
            </section>

            <section className="space-y-3">
              <h2>2. Les conditions pour le bénéficiaire</h2>
              <ul className="list-inside list-disc space-y-1 pl-1">
                <li>Être majeur (18 ans minimum).</li>
                <li>Avoir un numéro NEPH (numéro d&apos;enregistrement préfectoral harmonisé).</li>
                <li>Avoir obtenu le code de la route.</li>
                <li>Élève d&apos;auto-école : avoir déjà effectué 20h de conduite en auto-école, attestées sur l&apos;honneur.</li>
                <li>Candidat libre : aucun minimum d&apos;heures demandé.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2>3. Les conditions pour l&apos;accompagnateur</h2>
              <ul className="list-inside list-disc space-y-1 pl-1">
                <li>Être titulaire du permis B depuis au moins 5 ans sans interruption.</li>
                <li>Ne pas avoir fait l&apos;objet d&apos;une suspension, annulation ou invalidation du permis en cours.</li>
                <li>Être désigné nommément au contrat de location.</li>
                <li>Être sobre pendant toute la durée de la séance.</li>
                <li>Avoir validé le briefing sécurité (vidéo + quiz) avant la première séance.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2>4. Le candidat libre</h2>
              <p>
                Le candidat libre s&apos;inscrit lui-même au permis sur l&apos;ANTS
                (ants.gouv.fr) pour obtenir son numéro NEPH, sans passer par une
                auto-école. La réservation de l&apos;épreuve pratique se fait ensuite sur
                la plateforme RDV Permis.
              </p>
              <ul className="list-inside list-disc space-y-1 pl-1">
                <li>Inscription en ligne via{' '}
                  <a href="https://ants.gouv.fr" target="_blank" rel="noopener noreferrer" className={lien}>
                    ants.gouv.fr
                  </a>{' '}
                  pour obtenir le NEPH.
                </li>
                <li>Entraînement avec un accompagnateur proche dans le véhicule à double commande d&apos;Auto Conduite.</li>
                <li>
                  Le jour de l&apos;examen, Auto Conduite peut fournir le véhicule à double
                  commande pour l&apos;épreuve pratique, en option payante à 30 €.
                </li>
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
                Le bénéficiaire conduit avec son accompagnateur proche, à son rythme.
                Auto Conduite ne se substitue pas à l&apos;auto-école.
              </p>
              <h3 className="pt-2">Ce qu&apos;Auto Conduite fournit</h3>
              <ul className="list-inside list-disc space-y-1 pl-1">
                <li>Un véhicule pédagogique récent, entretenu et conforme, en boîte automatique.</li>
                <li>Une double commande de frein homologuée côté passager avant (article R. 317-25).</li>
                <li>Une assurance spécifique apprentissage qui couvre le bénéficiaire et l&apos;accompagnateur pendant la durée de la location.</li>
                <li>Un point de dépôt accessible (bassin Sarrebourg / Château-Salins), accès 24h/24 et 7j/7 par code SMS.</li>
                <li>Un briefing sécurité obligatoire (vidéo + quiz) avant l&apos;accès au véhicule.</li>
              </ul>
              <h3 className="pt-2">Ce qu&apos;Auto Conduite ne fait pas</h3>
              <ul className="list-inside list-disc space-y-1 pl-1">
                <li>Nous ne sommes pas une auto-école et ne dispensons pas de leçons de conduite.</li>
                <li>Nous ne formons pas au code de la route.</li>
                <li>Nous ne délivrons pas d&apos;attestation de formation.</li>
              </ul>
            </section>

            <section className="space-y-3 rounded-xl border border-border/60 bg-muted/20 p-5">
              <h3>Pour aller plus loin</h3>
              <ul className="list-inside list-disc space-y-1.5 pl-1">
                <li>
                  Textes officiels :{' '}
                  <a
                    href="https://www.legifrance.gouv.fr/codes/texte_lc/LEGITEXT000006074228/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={lien}
                  >
                    Code de la route, articles R. 211-3 et R. 317-25 (Légifrance)
                  </a>
                </li>
                <li>
                  Inscription au permis :{' '}
                  <a href="https://ants.gouv.fr" target="_blank" rel="noopener noreferrer" className={lien}>
                    ANTS
                  </a>
                </li>
              </ul>
              <p className="pt-2 text-foreground">
                Pour vérifier votre éligibilité au dispositif Auto Conduite, consultez
                la page{' '}
                <Link href="/comment-ca-marche" className={lien}>
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
