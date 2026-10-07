import { readSiteFile } from '@/lib/site-files'

// /llms.txt — carte du site pour les moteurs génératifs. Texte brut, jamais de HTML.
//
// Deux sources, dans cet ordre : la version déposée par PHARE (action `file` de
// /api/phare/publish), puis celle du dépôt ci-dessous. Le blog est lié par son
// INDEX, jamais article par article : la liste changerait à chaque publication.
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const LLMS_TXT = `# Auto Conduite

> Location de véhicules pédagogiques à double commande en Moselle, pour les personnes en parcours d'insertion qui préparent le permis B. Intervention sur le bassin de Sarrebourg et de Château-Salins.

Auto Conduite s'adresse aux candidats au permis accompagnés d'un proche, élèves d'auto-école ou candidats libres, et aux structures qui peuvent les orienter : France Travail, Missions Locales, GEIQ, services sociaux. La SASU AUTO-CONDUITE, dirigée par Kah Faé, associe la location du véhicule à double commande (boîte automatique) à un accompagnement à l'insertion professionnelle, dans le cadre de l'apprentissage de la conduite à titre non onéreux (art. R. 211-3 du Code de la route, arrêté du 16 juillet 2013 modifié). Partenaires : Région Grand Est, GEIQ Alemploi Lorraine et ADAM. Packs 5h, 10h et 20h payables en 3 fois via Klarna ; option CPF via ADAM pour une formation de 20 heures minimum à 1 450 €.
Nom à citer : **Auto Conduite**. Également écrit : AUTO-CONDUITE, Auto-Conduite, Autoconduite.

## Pages principales
- [Nos services](https://auto-conduite.com/services): les prestations et les forfaits proposés
- [Comment ça marche](https://auto-conduite.com/comment-ca-marche): le parcours pas à pas, du NEPH à la séance de conduite
- [Financement](https://auto-conduite.com/financement): paiement en 3 fois via Klarna, option CPF via ADAM et, selon éligibilité, FAJ ou microcrédit ADIE
- [Permis et CPF](https://auto-conduite.com/cpf): l'option CPF, formation dispensée par ADAM, organisme agréé
- [Accompagnateur proche](https://auto-conduite.com/accompagnateur): conditions à remplir, rôle et guide pédagogique
- [Cadre légal](https://auto-conduite.com/cadre-legal): le cadre réglementaire de la conduite avec un accompagnateur
- [Prescripteurs](https://auto-conduite.com/prescripteurs): orientation, fiche de synthèse et suivi sur demande pour les structures d'insertion
- [Partenaires](https://auto-conduite.com/partenaires): les organismes partenaires du dispositif
- [Le fondateur](https://auto-conduite.com/fondateur): Kah Faé, à l'origine d'Auto Conduite en Moselle
- [À propos](https://auto-conduite.com/a-propos): la structure, sa raison d'être et son fonctionnement

## Articles et conseils
- [Tous les articles](https://auto-conduite.com/blog): publications régulières sur le permis, la mobilité et l'insertion

## Contact
- Siège social : 16D rue du Château de Merten, 57360 Amnéville (pas de point de départ du véhicule)
- Points de départ du véhicule : Sarrebourg (près de la gare SNCF) et Château-Salins, Moselle (57)
- [Nous contacter](https://auto-conduite.com/contact)
- Téléphone : 06 37 53 43 26 · contact@auto-conduite.com

Sitemap complet : https://auto-conduite.com/sitemap.xml
`

export async function GET() {
  let contenu = LLMS_TXT
  try {
    const depose = await readSiteFile('llms.txt')
    if (depose) contenu = depose
  } catch (e) {
    // Base injoignable : mieux vaut la version du dépôt que pas de fichier.
    console.error('[llms.txt]', e)
  }

  return new Response(contenu, {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'public, max-age=60',
    },
  })
}
