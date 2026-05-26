import type { Metadata } from 'next'
import Link from 'next/link'

import { breadcrumbJsonLd, webPageJsonLd } from '@/components/seo/json-ld'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { siteConfig } from '@/lib/seo'

const description =
  "Politique de confidentialité d'Auto Conduite : données traitées, finalités, durées de conservation, droits RGPD des bénéficiaires, accompagnateurs et prescripteurs."

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description,
  alternates: { canonical: '/politique-de-confidentialite' },
  robots: { index: false, follow: false },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    webPageJsonLd(
      'Politique de confidentialité',
      description,
      '/politique-de-confidentialite'
    ),
    breadcrumbJsonLd([
      { name: 'Accueil', path: '/' },
      {
        name: 'Politique de confidentialité',
        path: '/politique-de-confidentialite',
      },
    ]),
  ],
}

export default function PrivacyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumb items={[{ label: 'Politique de confidentialité' }]} />

      <section className="border-b border-border/60">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <h1 className="font-display text-3xl tracking-tight text-foreground sm:text-4xl">
            Politique de confidentialité
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">
            Dernière mise à jour : <span className="text-foreground">mai 2026</span>
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            La présente politique décrit la manière dont {siteConfig.name} traite
            les données personnelles des personnes qui utilisent le site et le
            dispositif, conformément au Règlement Général sur la Protection des
            Données (Règlement (UE) 2016/679, dit RGPD) et à la loi française
            n° 78-17 du 6 janvier 1978 modifiée.
          </p>

          <article className="mt-10 space-y-10 text-sm leading-relaxed text-muted-foreground [&_h2]:font-display [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-foreground [&_h3]:text-sm [&_h3]:font-semibold [&_h3]:text-foreground">

            <section className="space-y-3">
              <h2>1. Responsable du traitement</h2>
              <p>
                Le responsable du traitement des données collectées via le site
                et le dispositif est :
              </p>
              <ul className="list-inside list-disc space-y-1 pl-1">
                <li><strong>AUTO-CONDUITE</strong> (SASU au capital de 400,00 euros)</li>
                <li>SIRET : 990 202 616 00019, RCS Metz</li>
                <li>Représentant légal : M. Paulin Faé Kah, Président</li>
                <li>Email :{' '}
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
                  >
                    {siteConfig.email}
                  </a>
                </li>
                <li>Téléphone : {siteConfig.phone}</li>
                <li>Siège social : 16D Rue du Château de Merten, 57360 Amnéville</li>
              </ul>
              <p>
                Compte tenu de la taille de la structure, {siteConfig.name} n&apos;est
                pas tenue de désigner un délégué à la protection des données (DPO).
                Toute demande relative à vos données peut être adressée à l&apos;email
                ci-dessus.
              </p>
            </section>

            <section className="space-y-3">
              <h2>2. Données collectées</h2>
              <p>
                Nous appliquons le principe de minimisation prévu à l&apos;article 5.1.c)
                du RGPD : nous ne collectons que les données strictement nécessaires
                à la finalité poursuivie.
              </p>

              <h3 className="pt-2">a) Formulaire de contact / d&apos;éligibilité</h3>
              <ul className="list-inside list-disc space-y-1 pl-1">
                <li>Identité : prénom, nom.</li>
                <li>Coordonnées : email, téléphone.</li>
                <li>Profil déclaré : bénéficiaire en insertion, accompagnateur, prescripteur, visiteur institutionnel.</li>
                <li>Message libre et contexte (forfait souhaité, dates, questions).</li>
              </ul>

              <h3 className="pt-2">b) Formulaire d&apos;orientation prescripteur</h3>
              <ul className="list-inside list-disc space-y-1 pl-1">
                <li>Structure prescriptrice et coordonnées du conseiller.</li>
                <li>Identité et contact du bénéficiaire orienté.</li>
                <li>Contexte (profil, type de besoin, forfait pressenti).</li>
              </ul>

              <h3 className="pt-2">c) Dossier d&apos;inscription (lorsque déployé)</h3>
              <p>
                Pour les bénéficiaires qui choisissent d&apos;intégrer le dispositif,
                les documents suivants seront sollicités lors d&apos;une étape ultérieure
                (hors du site vitrine actuel) :
              </p>
              <ul className="list-inside list-disc space-y-1 pl-1">
                <li>Pièce d&apos;identité (CNI ou passeport).</li>
                <li>Numéro NEPH et attestation de code de la route.</li>
                <li>Coordonnées et copie du permis B de l&apos;accompagnateur proche (numéro, date de validité).</li>
                <li>Justificatif de domicile (pour le calcul de la zone kilométrique).</li>
              </ul>

              <h3 className="pt-2">d) Données de navigation</h3>
              <ul className="list-inside list-disc space-y-1 pl-1">
                <li>Données techniques minimales (adresse IP tronquée, type de navigateur, pages visitées) pour la sécurité et le bon fonctionnement du site.</li>
                <li>Cookies : voir la{' '}
                  <Link
                    href="/politique-cookies"
                    className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
                  >
                    Politique de cookies
                  </Link>.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2>3. Finalités du traitement</h2>
              <p>Les données sont collectées pour les finalités suivantes :</p>
              <ul className="list-inside list-disc space-y-1 pl-1">
                <li>Répondre aux demandes de contact et d&apos;information.</li>
                <li>Vérifier l&apos;éligibilité au dispositif.</li>
                <li>Constituer le dossier d&apos;inscription et le suivre.</li>
                <li>Émettre les contrats de location et factures correspondantes.</li>
                <li>Assurer la sécurité du dispositif (briefing, traçabilité du visionnage).</li>
                <li>Établir des statistiques anonymisées (reporting institutionnel auprès des prescripteurs et financeurs).</li>
                <li>Respecter nos obligations légales et comptables.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2>4. Bases légales</h2>
              <p>Conformément à l&apos;article 6 du RGPD, nos traitements reposent sur :</p>
              <ul className="list-inside list-disc space-y-1 pl-1">
                <li><strong>L&apos;exécution d&apos;un contrat ou de mesures précontractuelles</strong> (article 6.1.b) : pour la gestion du dossier, la signature du contrat de location, la facturation.</li>
                <li><strong>Le consentement</strong> (article 6.1.a) : pour les communications non essentielles, les cookies de mesure d&apos;audience, et le formulaire de contact.</li>
                <li><strong>L&apos;intérêt légitime</strong> (article 6.1.f) : pour la sécurité du site, la prévention de la fraude, et l&apos;orientation par prescripteur (transmission qualifiée).</li>
                <li><strong>L&apos;obligation légale</strong> (article 6.1.c) : conservation comptable, traçabilité de la formation initiale, conformité au Code de la route.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2>5. Destinataires des données</h2>
              <p>
                Les données sont accessibles à {siteConfig.name} (M. Faé) et,
                strictement dans la limite de leur mission, à nos sous-traitants
                et partenaires :
              </p>
              <ul className="list-inside list-disc space-y-1 pl-1">
                <li><strong>Hébergeur du site</strong> : serveurs en Union européenne.</li>
                <li><strong>Stripe</strong> (lorsque le paiement en ligne sera activé) : Stripe Payments Europe Ltd., Irlande. Données : informations de paiement, montants. Stripe agit en tant que responsable de traitement pour la conformité PCI-DSS.</li>
                <li><strong>ADAM</strong> : partenaire de portage CPF pour le Pack 20h. Données transmises uniquement avec accord du bénéficiaire.</li>
                <li><strong>LIMOVA</strong> (chatbot, lorsque activé) : messages échangés via le chatbot.</li>
                <li><strong>Prestataire SMS / email</strong> (lorsque activé) : pour les rappels de séance.</li>
                <li><strong>Prescripteurs orientants</strong> : uniquement les données anonymisées de suivi, après accord du bénéficiaire.</li>
              </ul>
              <p>
                Aucune donnée n&apos;est cédée ni revendue à des tiers à des fins
                commerciales.
              </p>
            </section>

            <section className="space-y-3">
              <h2>6. Transferts hors Union européenne</h2>
              <p>
                Nous privilégions des prestataires hébergés en Union européenne.
                Lorsqu&apos;un transfert hors UE s&apos;avère nécessaire (par exemple
                certains services techniques), il est encadré par les clauses
                contractuelles types de la Commission européenne ou un mécanisme
                de transfert reconnu (décision d&apos;adéquation, BCR).
              </p>
            </section>

            <section className="space-y-3">
              <h2>7. Durée de conservation</h2>
              <ul className="list-inside list-disc space-y-1 pl-1">
                <li>Demandes de contact non suivies d&apos;inscription : 3 ans à compter du dernier échange.</li>
                <li>Dossier de bénéficiaire actif : durée de la relation contractuelle + 5 ans (obligations comptables et de preuve).</li>
                <li>Documents d&apos;identité et pièces justificatives sensibles : durée du dossier actif, puis suppression dans les 6 mois.</li>
                <li>Cookies : durée maximale de 13 mois, voir la{' '}
                  <Link
                    href="/politique-cookies"
                    className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
                  >
                    Politique de cookies
                  </Link>.
                </li>
                <li>Données de facturation : 10 ans (obligation comptable, article L.123-22 du Code de commerce).</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2>8. Sécurité</h2>
              <p>
                Nous mettons en place des mesures techniques et organisationnelles
                pour préserver la confidentialité, l&apos;intégrité et la disponibilité
                des données : chiffrement HTTPS du site, authentification renforcée
                des accès administrateurs, chiffrement des bases de données et des
                fichiers uploadés, journalisation des accès, hébergement européen,
                politique de sauvegarde.
              </p>
            </section>

            <section className="space-y-3">
              <h2>9. Vos droits</h2>
              <p>
                Conformément aux articles 12 à 23 du RGPD, vous disposez à tout
                moment des droits suivants sur vos données :
              </p>
              <ul className="list-inside list-disc space-y-1 pl-1">
                <li><strong>Droit d&apos;accès</strong> : obtenir confirmation que vos données sont traitées et en recevoir copie.</li>
                <li><strong>Droit de rectification</strong> : corriger des données inexactes ou incomplètes.</li>
                <li><strong>Droit à l&apos;effacement</strong> (« droit à l&apos;oubli ») : sous réserve de nos obligations légales de conservation.</li>
                <li><strong>Droit à la limitation</strong> : geler temporairement l&apos;usage de vos données.</li>
                <li><strong>Droit d&apos;opposition</strong> : vous opposer à un traitement, notamment à des fins de prospection.</li>
                <li><strong>Droit à la portabilité</strong> : recevoir vos données dans un format structuré et réutilisable.</li>
                <li><strong>Droit de retirer votre consentement</strong> à tout moment, sans porter atteinte à la licéité des traitements passés.</li>
                <li><strong>Droit de définir des directives</strong> sur le sort de vos données après votre décès.</li>
              </ul>
              <p>
                Pour exercer ces droits, écrivez-nous à{' '}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
                >
                  {siteConfig.email}
                </a>{' '}
                en précisant l&apos;objet de votre demande. Nous répondrons dans un
                délai d&apos;un mois (prolongeable de deux mois pour les demandes
                complexes, conformément à l&apos;article 12.3 du RGPD).
              </p>
            </section>

            <section className="space-y-3">
              <h2>10. Réclamation auprès de la CNIL</h2>
              <p>
                Si vous estimez, après nous avoir contactés, que vos droits sur
                vos données ne sont pas respectés, vous pouvez introduire une
                réclamation auprès de la Commission Nationale de l&apos;Informatique
                et des Libertés (CNIL) :
              </p>
              <ul className="list-inside list-disc space-y-1 pl-1">
                <li>
                  En ligne :{' '}
                  <a
                    href="https://www.cnil.fr/fr/plaintes"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
                  >
                    cnil.fr/fr/plaintes
                  </a>
                </li>
                <li>
                  Par courrier : Commission Nationale de l&apos;Informatique et des
                  Libertés, 3 Place de Fontenoy, TSA 80715, 75334 Paris CEDEX 07.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2>11. Modifications de la politique</h2>
              <p>
                La présente politique peut être mise à jour à tout moment pour
                refléter une évolution du dispositif, des sous-traitants ou de la
                réglementation. La date de mise à jour figure en haut du document.
              </p>
            </section>
          </article>
        </div>
      </section>
    </>
  )
}
