import type { Metadata } from 'next'
import Link from 'next/link'

import { breadcrumbJsonLd, webPageJsonLd } from '@/components/seo/json-ld'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { siteConfig } from '@/lib/seo'

const description =
  "Mentions légales du site Auto Conduite : éditeur, hébergeur, propriété intellectuelle, médiation, conformément aux articles 6-III de la LCEN."

export const metadata: Metadata = {
  title: 'Mentions légales',
  description,
  alternates: { canonical: '/mentions-legales' },
  robots: { index: false, follow: false },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    webPageJsonLd('Mentions légales', description, '/mentions-legales'),
    breadcrumbJsonLd([
      { name: 'Accueil', path: '/' },
      { name: 'Mentions légales', path: '/mentions-legales' },
    ]),
  ],
}

export default function LegalPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumb items={[{ label: 'Mentions légales' }]} />

      <section className="border-b border-border/60">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <h1 className="font-display text-3xl tracking-tight text-foreground sm:text-4xl">
            Mentions légales
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">
            Dernière mise à jour : <span className="text-foreground">[à compléter]</span>
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Conformément aux dispositions de l&apos;article 6-III de la loi n° 2004-575
            du 21 juin 2004 pour la confiance dans l&apos;économie numérique (LCEN),
            les informations suivantes sont portées à la connaissance des utilisateurs
            du site.
          </p>

          <article className="mt-10 space-y-10 text-sm leading-relaxed text-muted-foreground [&_h2]:font-display [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-foreground [&_h3]:text-sm [&_h3]:font-semibold [&_h3]:text-foreground">

            <section className="space-y-3">
              <h2>1. Éditeur du site</h2>
              <p>
                Le site accessible à l&apos;adresse <strong>{siteConfig.url}</strong>{' '}
                est édité par :
              </p>
              <ul className="list-inside list-disc space-y-1 pl-1">
                <li><strong>Nom commercial :</strong> {siteConfig.name}</li>
                <li><strong>Porteur du projet :</strong> M. Faé</li>
                <li><strong>Forme juridique :</strong> <span className="text-foreground">[à compléter : entreprise individuelle, micro-entreprise, association ou société]</span></li>
                <li><strong>SIRET :</strong> <span className="text-foreground">[à compléter]</span></li>
                <li><strong>RCS / RM :</strong> <span className="text-foreground">[à compléter si applicable]</span></li>
                <li><strong>Capital social :</strong> <span className="text-foreground">[le cas échéant]</span></li>
                <li><strong>N° TVA intracommunautaire :</strong> <span className="text-foreground">[si assujetti]</span></li>
                <li>
                  <strong>Adresse :</strong> {siteConfig.address.street},{' '}
                  {siteConfig.address.postalCode} {siteConfig.address.city}
                </li>
                <li>
                  <strong>Téléphone :</strong>{' '}
                  <a
                    href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`}
                    className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
                  >
                    {siteConfig.phone}
                  </a>
                </li>
                <li>
                  <strong>Email :</strong>{' '}
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
                  >
                    {siteConfig.email}
                  </a>
                </li>
              </ul>
              <p>
                <strong>Directeur de la publication :</strong> M. Faé
              </p>
            </section>

            <section className="space-y-3">
              <h2>2. Hébergement</h2>
              <p>Le site est hébergé par :</p>
              <ul className="list-inside list-disc space-y-1 pl-1">
                <li><strong>Hébergeur :</strong> <span className="text-foreground">[à compléter, ex. Vercel Inc., OVHcloud, Scaleway]</span></li>
                <li><strong>Adresse :</strong> <span className="text-foreground">[adresse de l&apos;hébergeur]</span></li>
                <li><strong>Site web :</strong> <span className="text-foreground">[URL de l&apos;hébergeur]</span></li>
                <li><strong>Localisation des serveurs :</strong> Union européenne (conformément aux exigences RGPD).</li>
              </ul>
              <h3 className="pt-2">Prestataires techniques tiers</h3>
              <p>
                Dans un souci de transparence, voici les principaux prestataires
                techniques susceptibles de traiter des données dans le cadre du
                fonctionnement du site :
              </p>
              <ul className="list-inside list-disc space-y-1 pl-1">
                <li><strong>Stripe</strong> (paiement, lorsque activé) : Stripe Payments Europe Ltd., Irlande.</li>
                <li><strong>ADAM</strong> (portage CPF du Pack 20h) : partenaire de financement.</li>
                <li><strong>LIMOVA</strong> (chatbot, lorsque activé) : serveurs Union européenne.</li>
                <li><strong>n8n</strong> (orchestration de workflows internes) : auto-hébergé en Union européenne.</li>
              </ul>
              <p>
                Pour le détail des données traitées, consultez notre{' '}
                <Link
                  href="/politique-de-confidentialite"
                  className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
                >
                  Politique de confidentialité
                </Link>.
              </p>
            </section>

            <section className="space-y-3">
              <h2>3. Activité du site</h2>
              <p>
                Le site présente le dispositif {siteConfig.name}, service de
                mobilité solidaire basé en Moselle. Auto Conduite met à disposition
                des véhicules pédagogiques à double commande pour les personnes en
                parcours d&apos;insertion engagées dans la conduite supervisée ou
                accompagnée, dans le cadre des articles L211-1 A à L221-7 du Code
                de la route.
              </p>
              <p>
                Auto Conduite n&apos;est pas une auto-école et n&apos;intervient
                pas dans la formation initiale dispensée par les établissements
                agréés. Voir la page{' '}
                <Link
                  href="/cadre-legal"
                  className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
                >
                  Cadre légal
                </Link>{' '}
                pour le détail.
              </p>
            </section>

            <section className="space-y-3">
              <h2>4. Propriété intellectuelle</h2>
              <p>
                L&apos;ensemble des éléments composant le site (textes, identité
                visuelle, photographies, vidéos, icônes, illustrations,
                architecture, code source) est protégé par le droit français et
                international de la propriété intellectuelle (articles L.111-1 et
                suivants du Code de la propriété intellectuelle).
              </p>
              <p>
                Toute reproduction, représentation, modification ou exploitation,
                en tout ou partie, sans autorisation écrite préalable de{' '}
                {siteConfig.name} est interdite et constitue une contrefaçon
                sanctionnée par les articles L.335-2 et suivants du Code de la
                propriété intellectuelle.
              </p>
              <h3 className="pt-2">Composants open source</h3>
              <p>
                Le site repose sur des bibliothèques open source (notamment React,
                Next.js, Tailwind CSS, Lucide Icons, Framer Motion) distribuées
                sous licences MIT, Apache 2.0 ou ISC. Leur usage respecte les
                conditions de chaque licence et n&apos;emporte aucune cession de
                droits sur le contenu propre du site.
              </p>
            </section>

            <section className="space-y-3">
              <h2>5. Limitation de responsabilité</h2>
              <p>
                {siteConfig.name} apporte un soin particulier à la qualité des
                informations diffusées sur le site, mais ne peut garantir leur
                exhaustivité ni leur exactitude permanente. Les contenus relatifs
                aux dispositifs publics (CPF, aides France Travail, FAJ, ADIE,
                etc.) sont susceptibles d&apos;évoluer indépendamment de notre volonté.
              </p>
              <p>
                {siteConfig.name} ne saurait être tenu responsable :
              </p>
              <ul className="list-inside list-disc space-y-1 pl-1">
                <li>D&apos;interruptions temporaires du site pour maintenance ou mise à jour.</li>
                <li>De dommages liés à une intrusion frauduleuse d&apos;un tiers.</li>
                <li>D&apos;une impossibilité d&apos;accès due à un dysfonctionnement du réseau Internet.</li>
                <li>De l&apos;usage qui serait fait par un utilisateur d&apos;informations issues du site.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2>6. Liens hypertextes</h2>
              <p>
                Le site peut renvoyer vers des ressources externes (ants.gouv.fr,
                moncompteformation.gouv.fr, adie.org, etc.) que {siteConfig.name}{' '}
                ne contrôle pas. Notre responsabilité ne saurait être engagée du
                fait du contenu de ces sites tiers.
              </p>
              <p>
                La création d&apos;un lien hypertexte vers le site est libre dès lors
                qu&apos;elle ne porte pas atteinte à l&apos;image de {siteConfig.name} et
                qu&apos;il ne s&apos;agit pas d&apos;un détournement de contenu.
              </p>
            </section>

            <section className="space-y-3">
              <h2>7. Accessibilité</h2>
              <p>
                Nous nous engageons à améliorer progressivement l&apos;accessibilité
                de ce site dans le respect du RGAA 4.1. Voir notre{' '}
                <Link
                  href="/accessibilite"
                  className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
                >
                  Déclaration d&apos;accessibilité
                </Link>.
              </p>
            </section>

            <section className="space-y-3">
              <h2>8. Médiation et droit applicable</h2>
              <p>
                Les présentes mentions sont régies par le droit français. En cas
                de litige, et après échec d&apos;une tentative de résolution amiable
                dans un délai de trente (30) jours à compter de la réclamation,
                les juridictions compétentes seront celles du ressort du siège
                de {siteConfig.name}.
              </p>
              <p>
                Conformément à l&apos;article L.612-1 du Code de la consommation,
                le consommateur peut recourir gratuitement au médiateur de la
                consommation. Coordonnées du médiateur :{' '}
                <span className="text-foreground">[à compléter par l&apos;éditeur]</span>.
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

            <section className="space-y-3">
              <h2>9. Crédits</h2>
              <ul className="list-inside list-disc space-y-1 pl-1">
                <li><strong>Conception et développement :</strong> <span className="text-foreground">[à compléter]</span></li>
                <li><strong>Photographies :</strong> visuels fournis par {siteConfig.name} (M. Faé), droits réservés.</li>
                <li><strong>Icônes :</strong> Lucide Icons (licence ISC).</li>
                <li><strong>Polices :</strong> Inter, Plus Jakarta Sans, Instrument Serif, JetBrains Mono (Google Fonts, Open Font License).</li>
              </ul>
            </section>

            <section className="space-y-3 rounded-xl border border-border/60 bg-muted/20 p-5">
              <p className="text-foreground">
                Pour nos pratiques en matière de données personnelles, consultez
                notre{' '}
                <Link
                  href="/politique-de-confidentialite"
                  className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
                >
                  Politique de confidentialité
                </Link>
                ,{' '}
                <Link
                  href="/conditions-generales"
                  className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
                >
                  Conditions générales d&apos;utilisation
                </Link>
                {' '}et notre{' '}
                <Link
                  href="/politique-cookies"
                  className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
                >
                  Politique de cookies
                </Link>.
              </p>
            </section>
          </article>
        </div>
      </section>
    </>
  )
}
