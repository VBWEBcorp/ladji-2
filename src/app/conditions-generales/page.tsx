import type { Metadata } from 'next'
import Link from 'next/link'

import { breadcrumbJsonLd, webPageJsonLd } from '@/components/seo/json-ld'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { siteConfig } from '@/lib/seo'

const description =
  "Conditions générales d'utilisation et de service Auto Conduite : éligibilité, forfaits, zones kilométriques, supplément carburant, caution, briefing obligatoire, annulation."

export const metadata: Metadata = {
  title: "Conditions générales d'utilisation",
  description,
  alternates: { canonical: '/conditions-generales' },
  robots: { index: false, follow: false },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    webPageJsonLd("Conditions générales d'utilisation", description, '/conditions-generales'),
    breadcrumbJsonLd([
      { name: 'Accueil', path: '/' },
      { name: "Conditions générales d'utilisation", path: '/conditions-generales' },
    ]),
  ],
}

export default function CGUPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumb items={[{ label: "Conditions générales d'utilisation" }]} />

      <section className="border-b border-border/60">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <h1 className="font-display text-3xl tracking-tight text-foreground sm:text-4xl">
            Conditions générales d&apos;utilisation et de service
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">
            Dernière mise à jour : <span className="text-foreground">[à compléter]</span>
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Les présentes conditions encadrent à la fois l&apos;utilisation du site{' '}
            <strong>{siteConfig.url}</strong> et l&apos;accès au dispositif{' '}
            {siteConfig.name}. Elles intègrent les clauses spécifiques aux zones
            kilométriques, suppléments carburant, caution, briefing sécurité et
            conditions d&apos;éligibilité prévues par le cahier des charges du service.
          </p>

          <article className="mt-10 space-y-10 text-sm leading-relaxed text-muted-foreground [&_h2]:font-display [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-foreground [&_h3]:text-sm [&_h3]:font-semibold [&_h3]:text-foreground">

            <section className="space-y-3">
              <h2>1. Objet</h2>
              <p>
                Les présentes Conditions Générales d&apos;Utilisation et de Service
                (ci-après les « CGU ») définissent les règles d&apos;accès au site et
                les conditions du dispositif {siteConfig.name}, qui met à disposition
                des véhicules pédagogiques à double commande à destination des
                bénéficiaires inscrits dans une démarche de conduite supervisée ou
                accompagnée.
              </p>
              <p>
                {siteConfig.name} n&apos;est pas une auto-école et ne dispense
                pas la formation initiale obligatoirement délivrée par un
                établissement agréé. Voir notre page{' '}
                <Link href="/cadre-legal" className="font-medium text-primary underline underline-offset-4 hover:text-primary/80">
                  Cadre légal
                </Link>.
              </p>
            </section>

            <section className="space-y-3">
              <h2>2. Acceptation des CGU</h2>
              <p>
                L&apos;usage du site et l&apos;inscription au dispositif impliquent
                l&apos;acceptation pleine et entière des présentes CGU. Toute personne
                qui ne souhaite pas y adhérer doit s&apos;abstenir d&apos;utiliser le site
                et le dispositif.
              </p>
            </section>

            <section className="space-y-3">
              <h2>3. Conditions d&apos;éligibilité</h2>

              <h3 className="pt-2">a) Côté bénéficiaire</h3>
              <ul className="list-inside list-disc space-y-1 pl-1">
                <li>Être âgé de 18 ans révolus (conduite supervisée) ou 15 ans (conduite accompagnée, dite AAC).</li>
                <li>Avoir obtenu le code de la route (NEPH valide).</li>
                <li>Avoir suivi 20h minimum en auto-école et disposer de l&apos;attestation de fin de formation initiale (ou justifier d&apos;un échec à l&apos;épreuve pratique).</li>
                <li>Avoir participé au rendez-vous préalable de 2h prévu par l&apos;arrêté du 16 juillet 2013 (en présence d&apos;un enseignant agréé et de l&apos;accompagnateur).</li>
                <li>Communiquer un justificatif de domicile pour le calcul de la zone kilométrique.</li>
              </ul>

              <h3 className="pt-2">b) Côté accompagnateur proche</h3>
              <ul className="list-inside list-disc space-y-1 pl-1">
                <li>Être titulaire du permis B depuis au moins 5 ans sans interruption.</li>
                <li>Ne pas avoir fait l&apos;objet d&apos;une suspension, annulation ou invalidation du permis dans les 5 années précédentes.</li>
                <li>Être désigné nommément au contrat de location.</li>
                <li>Être sobre pendant toute la durée de la séance (taux d&apos;alcoolémie nul, absence de stupéfiants).</li>
              </ul>

              <p>
                {siteConfig.name} se réserve le droit de refuser ou de suspendre
                l&apos;accès au dispositif si l&apos;une de ces conditions n&apos;est pas
                remplie ou cesse de l&apos;être.
              </p>
            </section>

            <section className="space-y-3">
              <h2>4. Forfaits et tarifs</h2>
              <p>
                Trois forfaits sont proposés : <strong>Pack 5h</strong> (6h avec 1h
                offerte), <strong>Pack 10h</strong> et <strong>Pack 20h finançable CPF</strong>.
                Les tarifs s&apos;ajustent selon la zone kilométrique (A, B ou C)
                applicable au bénéficiaire.
              </p>
              <p>
                Les tarifs en vigueur sont publiés sur la page{' '}
                <Link href="/services" className="font-medium text-primary underline underline-offset-4 hover:text-primary/80">
                  Forfaits
                </Link>{' '}
                et peuvent évoluer. Les tarifs applicables sont ceux affichés au
                moment de la souscription.
              </p>
              <p>
                Tous les forfaits incluent l&apos;assurance apprentissage, le kilométrage
                illimité dans la limite raisonnable d&apos;un usage pédagogique normal,
                et l&apos;entretien courant du véhicule.
              </p>
            </section>

            <section className="space-y-3">
              <h2>5. Zones kilométriques et supplément carburant</h2>
              <p>
                Le supplément carburant est appliqué selon la distance entre le
                domicile déclaré du bénéficiaire et le point de dépôt {siteConfig.name}{' '}
                le plus proche.
              </p>
              <ul className="list-inside list-disc space-y-1 pl-1">
                <li><strong>Zone A</strong> : 0 à 15 km du point de dépôt, supplément 0 €.</li>
                <li><strong>Zone B</strong> : 15 à 35 km, supplément 15 € par forfait.</li>
                <li><strong>Zone C</strong> : au-delà de 35 km, supplément 30 € par forfait.</li>
              </ul>
              <p>
                La zone est déterminée à partir du justificatif de domicile fourni
                au moment de l&apos;inscription. En cas de déménagement en cours de
                forfait, le bénéficiaire doit nous en informer dans les meilleurs
                délais. Le supplément peut être réajusté pour les séances restantes.
              </p>
            </section>

            <section className="space-y-3">
              <h2>6. Caution</h2>
              <p>
                Une pré-autorisation de carte bancaire d&apos;un montant de{' '}
                <strong>600 €</strong> est demandée par réservation à titre de
                caution (lorsque le paiement en ligne par carte est activé).
                La caution n&apos;est jamais débitée tant que le véhicule est rendu
                en bon état, dans les délais convenus et sans sinistre. Elle est
                libérée automatiquement à la fin de la séance.
              </p>
              <p>
                En cas de dommage matériel non couvert par l&apos;assurance, de retard,
                de carburant manquant ou de manquement aux CGU, tout ou partie de
                la caution peut être prélevée. Le bénéficiaire en sera informé par
                écrit.
              </p>
            </section>

            <section className="space-y-3">
              <h2>7. Briefing sécurité obligatoire</h2>
              <p>
                Avant la première séance, le bénéficiaire et l&apos;accompagnateur
                doivent visionner intégralement le briefing sécurité (vidéo officielle{' '}
                {siteConfig.name}) et valider le quiz associé avec un score minimum
                de <strong>80 %</strong>. Tant que cette validation n&apos;est pas obtenue,
                l&apos;accès au véhicule reste bloqué.
              </p>
              <p>
                En cas d&apos;échec au quiz, un nouveau lien est envoyé et le bénéficiaire
                est invité à reprendre le visionnage avant de retenter la validation.
                Aucun frais supplémentaire n&apos;est appliqué à ce stade.
              </p>
            </section>

            <section className="space-y-3">
              <h2>8. Réservation, annulation, retard</h2>
              <ul className="list-inside list-disc space-y-1 pl-1">
                <li>Les créneaux sont réservés depuis l&apos;espace bénéficiaire (lorsque déployé) ou par échange direct avec {siteConfig.name}.</li>
                <li>Toute annulation à plus de 48 heures avant la séance est gratuite.</li>
                <li>Toute annulation entre 48h et 24h avant la séance entraîne une retenue de 30 % du tarif horaire.</li>
                <li>Toute annulation moins de 24h avant la séance ou tout no-show entraîne une retenue de 100 % du tarif horaire de la séance manquée.</li>
                <li>Un retard supérieur à 15 minutes peut entraîner l&apos;annulation de la séance sans remboursement, pour préserver le créneau du bénéficiaire suivant.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2>9. Usage du véhicule</h2>
              <p>
                Le véhicule pédagogique est mis à disposition exclusivement pour
                la pratique de la conduite par le bénéficiaire désigné, sous la
                supervision de l&apos;accompagnateur désigné. Sont notamment interdits :
              </p>
              <ul className="list-inside list-disc space-y-1 pl-1">
                <li>L&apos;usage du véhicule par un tiers non désigné au contrat.</li>
                <li>L&apos;usage en dehors d&apos;une séance d&apos;apprentissage (déplacements personnels, transports rémunérés).</li>
                <li>Le transport de passagers non prévus au contrat.</li>
                <li>La conduite sous influence de l&apos;alcool, de stupéfiants ou de médicaments contre-indiqués.</li>
                <li>La sortie du territoire français sans autorisation expresse de {siteConfig.name}.</li>
              </ul>
              <p>
                Tout manquement peut entraîner la résiliation immédiate du contrat,
                le débit de la caution et le cas échéant des poursuites.
              </p>
            </section>

            <section className="space-y-3">
              <h2>10. Assurance et responsabilités</h2>
              <p>
                Chaque véhicule {siteConfig.name} est couvert par une assurance
                spécifique apprentissage. Le bénéficiaire et l&apos;accompagnateur
                désignés sont couverts pendant la durée de la séance.
              </p>
              <p>
                Une franchise reste à la charge du bénéficiaire en cas de sinistre
                responsable. Son montant est précisé au contrat de location.
              </p>
              <p>
                L&apos;accompagnateur, du fait de sa présence en place avant droit et de
                la maîtrise du double pédalier, exerce une vigilance active. Il
                engage sa responsabilité au même titre qu&apos;un conducteur classique
                au sens du Code de la route.
              </p>
            </section>

            <section className="space-y-3">
              <h2>11. Paiement</h2>
              <p>
                Les modes de paiement acceptés sont : Stripe (carte bancaire, lorsque
                activé), ALMA (paiement fractionné, lorsque activé), virement bancaire,
                et financement via CPF (Pack 20h porté par ADAM). Les financements
                publics (aide mobilité France Travail, FAJ, ADIE) sont mobilisables
                au cas par cas, voir la page{' '}
                <Link href="/financement" className="font-medium text-primary underline underline-offset-4 hover:text-primary/80">
                  Financement
                </Link>.
              </p>
              <p>
                Le paiement conditionne l&apos;activation effective du forfait. Une
                facture est émise pour chaque transaction.
              </p>
            </section>

            <section className="space-y-3">
              <h2>12. Droit de rétractation</h2>
              <p>
                Conformément à l&apos;article L.221-18 du Code de la consommation,
                le bénéficiaire dispose d&apos;un délai de quatorze (14) jours à compter
                de la souscription pour exercer son droit de rétractation, sans
                avoir à motiver sa décision.
              </p>
              <p>
                Si le bénéficiaire a demandé expressément l&apos;exécution du service
                pendant le délai de rétractation et que celui-ci a commencé, il
                reste redevable d&apos;un montant proportionnel au service effectivement
                fourni jusqu&apos;à la date de notification de la rétractation.
              </p>
            </section>

            <section className="space-y-3">
              <h2>13. Données personnelles</h2>
              <p>
                Les traitements de données mis en œuvre dans le cadre du dispositif
                sont décrits dans notre{' '}
                <Link href="/politique-de-confidentialite" className="font-medium text-primary underline underline-offset-4 hover:text-primary/80">
                  Politique de confidentialité
                </Link>.
              </p>
            </section>

            <section className="space-y-3">
              <h2>14. Modification des CGU</h2>
              <p>
                {siteConfig.name} se réserve le droit de modifier les présentes CGU
                à tout moment, notamment pour suivre l&apos;évolution du dispositif,
                des partenariats ou de la réglementation. La version applicable est
                celle en ligne à la date de souscription ou de séance.
              </p>
            </section>

            <section className="space-y-3">
              <h2>15. Droit applicable, médiation et juridiction</h2>
              <p>
                Les présentes CGU sont soumises au droit français. En cas de litige,
                et après tentative de résolution amiable dans un délai de trente (30)
                jours à compter de la réclamation, les juridictions compétentes
                seront celles du ressort du siège de {siteConfig.name}.
              </p>
              <p>
                Conformément à l&apos;article L.612-1 du Code de la consommation, le
                consommateur peut recourir gratuitement au médiateur de la consommation.
                Coordonnées du médiateur : <span className="text-foreground">[à compléter par l&apos;éditeur]</span>.
              </p>
              <p>
                Plateforme européenne de règlement en ligne des litiges :{' '}
                <a
                  href="https://ec.europa.eu/consumers/odr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
                >
                  ec.europa.eu/consumers/odr
                </a>
              </p>
            </section>
          </article>
        </div>
      </section>
    </>
  )
}
