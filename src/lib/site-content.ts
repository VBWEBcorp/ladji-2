/**
 * site-content.ts : contenu Auto Conduite (V1 conforme au Cahier des Charges Mai 2026)
 *
 * Vocabulaire à respecter STRICTEMENT (cf. règle absolue de positionnement) :
 *  - Interdit : "cours de conduite", "leçon", "moniteur officiel", "formation réglementaire"
 *  - Obligatoire : "véhicule pédagogique à double commande", "brique de mobilité",
 *                  "outil pédagogique", "accompagnateur proche"
 *  - Auto Conduite n'est PAS une auto-école.
 *
 * Voir CAHIER-DES-CHARGES.md à la racine du repo.
 */

// ============================================================================
//                          IMAGES (pool de visuels)
// ============================================================================
// 12 photos officielles Auto Conduite fournies par M. Faé (hébergées sur ibb.co)
// + 2 logos officiels. Mélangées sur tout le site pour garder de la variété.

const p1 = 'https://i.ibb.co/s9nxFLMN/Auto-conduite-1.png'
const p2 = 'https://i.ibb.co/Cpm57Lvs/Auto-conduite-2.png'
const p3 = 'https://i.ibb.co/dJX10gqz/Auto-conduite-3.png'
const p4 = 'https://i.ibb.co/N6znKXSv/Auto-conduite-4.png'
const p5 = 'https://i.ibb.co/mF9HzxmG/Auto-conduite-5.png'
const p6 = 'https://i.ibb.co/xtgs8Mk3/Auto-conduite-6.png'
const p7 = 'https://i.ibb.co/vCWqNCyw/Auto-conduite-7.png'
const p8 = 'https://i.ibb.co/Gv62z1F2/Auto-conduite-8.png'
const p9 = 'https://i.ibb.co/hFcSPF7B/Auto-conduite-9.png'
const p10 = 'https://i.ibb.co/KzbnqX94/Auto-conduite-10.png'
const p11 = 'https://i.ibb.co/NdTtDcp4/Auto-conduite-11.png'
const p12 = 'https://i.ibb.co/Xr5051tP/Auto-conduite-12-Belle.png'

export const brandLogos = {
  logo1: 'https://i.ibb.co/rKvMMqF4/Auto-conduite-logo-1.png',
  logo2: 'https://i.ibb.co/zVvC9JYy/Auto-conduite-logo-2.png',
  logoTransparent: 'https://i.ibb.co/v6wnKbcR/7b424a54-05ce-45bf-bbad-aff184417e09-removalai-preview.png',
}

export const images = {
  heroCarousel: [p12, p7, p3],
  story: p5,
  aboutHero: p9,
  servicesHero: p6,
  contactHero: p4,
  aboutGallery: [p1, p8, p11, p2],
  services: [p10, p7, p3, p5],
  ctaScrollColumns: {
    col1: [p12, p2, p9, p6],
    col2: [p4, p11, p1, p8],
  },
  homeGallery: [p12, p7, p9, p3, p11, p5],
}

// ============================================================================
//                          HOME (Hero + sections)
// ============================================================================

export const heroContent = {
  eyebrow: 'Mobilité solidaire · Moselle',
  title: 'Pour toutes les bourses',
  description:
    "Pratiquez la conduite entre vos leçons d'auto-école ou en candidat libre, avec un proche, à votre rythme. Mobilité solidaire en Moselle, pour toutes les bourses.",
  button1: 'Vérifier mon éligibilité',
  button2: 'Voir les forfaits',
  features: [
    'Véhicule pédagogique fourni',
    'Assurance apprentissage incluse',
    'Cadre légal sécurisé',
  ],
  stats: [
    { value: 'Dès 199€', label: 'Pack 5h' },
    { value: '100%', label: 'légal & assuré' },
    { value: 'CPF', label: 'finançable' },
  ],
  images: images.heroCarousel,
}

export const whyContent = {
  eyebrow: 'Pourquoi Auto Conduite ?',
  title: 'Une brique de mobilité accessible et sécurisée',
  description:
    "Nous fournissons le véhicule et le cadre. Vous conduisez avec un accompagnateur proche, à votre rythme, dans un dispositif encadré par la loi.",
  items: [
    {
      iconName: 'Car',
      title: 'Véhicule pédagogique',
      desc: "Voitures récentes, entretenues, équipées d'un double pédalier homologué pour un apprentissage en toute sécurité.",
    },
    {
      iconName: 'Coins',
      title: 'Pour toutes les bourses',
      desc: 'Forfaits dès 199€ (Pack 5h, 1h offerte). Finançables CPF, ALMA, ADIE, aide mobilité France Travail.',
    },
    {
      iconName: 'ShieldCheck',
      title: 'Cadre légal L211-4',
      desc: "Conduite supervisée ou accompagnée encadrée par le Code de la route. Assurance apprentissage incluse.",
    },
    {
      iconName: 'Users',
      title: 'Partenaires institutionnels',
      desc: 'France Travail, Missions Locales, GEIQ, Département de la Moselle, ADAM, Région Grand Est.',
    },
  ],
}

export const storyContent = {
  eyebrow: 'Comment ça marche',
  title: 'Simple comme 1, 2, 3',
  steps: [
    {
      title: 'Vérifiez votre éligibilité',
      desc: 'Quelques questions sur votre NEPH, votre code, et votre accompagnateur proche. Réponse en 24h.',
    },
    {
      title: 'Choisissez votre forfait',
      desc: 'Pack 5h, 10h ou 20h finançable CPF, tarif ajusté selon votre zone (A, B ou C).',
    },
    {
      title: 'Récupérez le véhicule',
      desc: "Au point de dépôt le plus proche (Sarrebourg, Château-Salins…), véhicule prêt à l'emploi.",
    },
  ],
  ctaLabel: 'En savoir plus',
  image: images.story,
}

// Alias rétro-compat (servicesPreviewContent → whyContent)
export const servicesPreviewContent = {
  eyebrow: whyContent.eyebrow,
  title: whyContent.title,
  description: whyContent.description,
  items: whyContent.items,
}

// 4 entrées profils sur la home (cf. brief Ouibo : "Le site doit parler quatre langages différents")
export const profilesContent = {
  eyebrow: 'À qui s\'adresse Auto Conduite',
  title: 'Choisissez votre parcours',
  description:
    "Quatre profils, quatre entrées dédiées. Trouvez la formule adaptée à votre situation et accédez directement aux infos qui vous concernent.",
  entries: [
    {
      iconName: 'GraduationCap',
      label: 'Candidat auto-école',
      title: 'Je suis inscrit en auto-école',
      desc: "Je veux pratiquer entre mes leçons avec un proche qui a plus de 5 ans de permis, pour progresser plus vite.",
      pricing: 'Forfaits dès 199€',
      href: '/services',
      cta: 'Voir les forfaits',
    },
    {
      iconName: 'Compass',
      label: 'Candidat libre',
      title: 'Je passe mon permis sans auto-école',
      desc: "Je veux gérer mon apprentissage en autonomie, à mon rythme, avec un véhicule pédagogique et un accompagnateur proche.",
      pricing: 'Forfaits 5h / 10h / 20h',
      href: '/services',
      cta: 'Découvrir',
    },
    {
      iconName: 'Building2',
      label: 'Prescripteur',
      title: 'Je suis prescripteur (France Travail, Mission Locale…)',
      desc: "J'oriente un bénéficiaire en parcours d'insertion. Process en 3 étapes, fiche orientation, suivi.",
      pricing: 'Orientation en 24h',
      href: '/prescripteurs',
      cta: 'Orienter un bénéficiaire',
    },
    {
      iconName: 'Wallet',
      label: 'Titulaire CPF',
      title: "J'ai un CPF et je veux financer mon permis",
      desc: "Formation à 1 450€ avec moniteur agréé ADAM. Le CPF couvre jusqu'à 900€, le reste est payable en 3 fois.",
      pricing: '183€/mois',
      href: '/cpf',
      cta: 'Vérifier mon CPF',
    },
  ],
}

// Page Fondateur (cf. brief Ouibo : page indexable Kah Faé)
export const founderContent = {
  hero: {
    eyebrow: 'Le fondateur',
    title: 'Kah Faé',
    subtitle: 'Fondateur Auto Conduite · Moselle',
    description:
      "Kah Faé est le fondateur d'Auto Conduite, dispositif de mobilité solidaire basé en Moselle. Engagé dans l'insertion par la mobilité, il porte un projet qui rapproche véhicules pédagogiques, accompagnement humain et financements adaptés.",
  },
  bio: {
    eyebrow: 'Parcours',
    title: 'Un projet ancré sur le terrain',
    paragraphs: [
      "Kah Faé fonde Auto Conduite en 2026 en Moselle pour répondre à un constat simple : le permis reste un frein majeur à l'emploi et à l'autonomie, particulièrement dans les zones rurales du Sud Mosellan.",
      "Le dispositif s'appuie sur un réseau de partenaires institutionnels (France Travail, Missions Locales, Région Grand Est, GEIQ Alemploi, ADAM) et propose des forfaits adaptés à toutes les bourses, du Pack 5h à 199€ jusqu'au Pack 20h CPF avec moniteur agréé.",
      "Au-delà de la location de véhicules pédagogiques, Auto Conduite porte une vision : faire de la mobilité une brique d'inclusion, accessible, légale et solidaire.",
    ],
  },
  mission: {
    eyebrow: 'La mission',
    title: 'Lever le frein mobilité, durablement',
    points: [
      {
        iconName: 'Sparkles',
        title: 'Pour toutes les bourses',
        desc: 'Tarifs solidaires, financements multiples (CPF, ALMA, ADIE, aide mobilité), pas de frais cachés.',
      },
      {
        iconName: 'Users',
        title: 'Réseau territorial',
        desc: 'Partenariats avec les structures d\'insertion mosellanes, du Sud Mosellan au Bassin Houiller.',
      },
      {
        iconName: 'ShieldCheck',
        title: 'Cadre légal',
        desc: 'Dispositif conforme aux articles L211-4 et R211-3 du Code de la route, assurance apprentissage incluse.',
      },
    ],
  },
  contact: {
    eyebrow: 'Échanger',
    title: 'Une question, un projet ?',
    description:
      "Pour toute demande institutionnelle, partenariat ou interview, contactez directement le fondateur.",
    name: 'Kah Faé',
    email: 'contact@auto-conduite.com',
    phone: '06 37 53 43 26',
  },
}

export const partnersContent = {
  eyebrow: 'Partenaires institutionnels',
  title: 'Ils nous font confiance',
  items: [
    {
      name: 'France Travail',
      logo: 'https://i.ibb.co/d0F4KXvL/France-travail-2023-svg.png',
    },
    {
      name: 'Mission Locale',
      logo: 'https://i.ibb.co/0RsZ1C9X/ml-logo-long-rvb.png',
    },
    {
      name: 'Région Grand Est',
      logo: 'https://i.ibb.co/35NMns1v/grand-est-logo.jpg',
    },
    {
      name: 'GEIQ Alemploi',
      logo: 'https://i.ibb.co/zTG3tr0b/Alemploi.png',
    },
    {
      name: 'ADAM',
      logo: null,
    },
  ],
}

export const testimonialsContent = {
  eyebrow: 'Témoignages',
  title: 'Ils ont choisi Auto Conduite',
  description:
    'Bénéficiaires, accompagnateurs, prescripteurs : ils témoignent de leur expérience.',
  items: [
    {
      name: 'Yassine K.',
      company: 'Bénéficiaire · Sarrebourg',
      text: "Sans Auto Conduite je n'aurais jamais pu m'entraîner autant. Le tarif est abordable et le cadre est rassurant.",
      stars: 5,
    },
    {
      name: 'Marie D.',
      company: 'Accompagnatrice proche',
      text: "J'accompagne mon fils chaque week-end. Le véhicule à double commande me donne confiance, je sais que je peux reprendre la main si besoin.",
      stars: 5,
    },
    {
      name: 'Thomas L.',
      company: 'Bénéficiaire · Demandeur d\'emploi',
      text: "Sans permis, pas d'embauche dans ma zone. Avec l'aide mobilité France Travail et Auto Conduite, j'ai enfin pu passer le cap.",
      stars: 5,
    },
    {
      name: 'Camille B.',
      company: 'Bénéficiaire · Jeune Mission Locale',
      text: "Ma conseillère m'a orienté vers Auto Conduite. Tout s'est fait en ligne, c'était simple et rapide.",
      stars: 5,
    },
    {
      name: 'Laurent M.',
      company: 'Père accompagnateur',
      text: 'On peut louer à la séance, à la journée, au pack. Très flexible et bien expliqué dès le départ.',
      stars: 5,
    },
    {
      name: 'Sophie R.',
      company: 'Conseillère Mission Locale Sud Mosellan',
      text: "Un dispositif idéal pour nos jeunes en parcours d'insertion. Le coût réduit et le cadre légal sont de vrais atouts.",
      stars: 5,
    },
    {
      name: 'Pierre V.',
      company: 'Bénéficiaire RSA',
      text: "Avec l'ADIE et le CPF, j'ai pu boucler le financement de mon Pack 20h. Le bilan IA après chaque séance m'aide à progresser.",
      stars: 5,
    },
    {
      name: 'Julie A.',
      company: 'Bénéficiaire · Conduite accompagnée',
      text: 'Avec mon père on a roulé partout dans la région. Le forfait à la semaine est vraiment avantageux.',
      stars: 5,
    },
  ],
}

export const galleryContent = {
  eyebrow: 'Galerie',
  title: 'Nos véhicules pédagogiques',
  images: images.homeGallery,
}

export const ctaContent = {
  eyebrow: 'Prêt à vous lancer ?',
  title: 'Vérifiez votre éligibilité en quelques minutes',
  description:
    "Un premier échange gratuit pour comprendre votre situation, vérifier votre éligibilité et vous orienter vers le forfait et le financement adaptés. Bénéficiaires et prescripteurs bienvenus.",
  button: 'Vérifier mon éligibilité',
  scrollImages: images.ctaScrollColumns,
}

// Rétro-compat (non affichée sur la home v1)
export const faqContent = {
  eyebrow: 'FAQ',
  title: 'Questions fréquentes',
  description: 'Les réponses aux questions courantes sur le dispositif Auto Conduite.',
  items: [
    {
      question: 'Suis-je éligible au dispositif ?',
      answer:
        "Il faut avoir obtenu son code de la route (NEPH), être en parcours d'insertion (ou particulier majeur) et disposer d'un accompagnateur proche titulaire du permis B depuis 5 ans minimum.",
    },
    {
      question: 'Le véhicule est-il assuré ?',
      answer:
        "Oui. Chaque véhicule pédagogique est couvert par une assurance spécifique apprentissage. L'élève et l'accompagnateur proche sont couverts pendant toute la durée de la location.",
    },
    {
      question: 'Quels sont les financements possibles ?',
      answer:
        "Selon votre profil : CPF (Pack 20h via ADAM), ALMA (paiement fractionné), ADIE (microcrédit personnel), aide mobilité France Travail (jusqu'à 1200€), Fonds d'Aide aux Jeunes via Mission Locale.",
    },
    {
      question: 'Où récupérer le véhicule ?',
      answer:
        "Aux points de dépôt du bassin Sarrebourg / Château-Salins : Parking Leclerc Sarrebourg (24/7), Gare de Sarrebourg, France Travail Sarrebourg, Intermarché Château-Salins (24/7).",
    },
  ],
}

// ============================================================================
//                          ABOUT (page À propos)
// ============================================================================

export const aboutContent = {
  hero: {
    eyebrow: 'Qui sommes-nous',
    title: 'La mobilité pour toutes les bourses',
    description:
      "Auto Conduite est une initiative de mobilité solidaire portée par M. Faé en Moselle. Notre mission : rendre la pratique de la conduite accessible aux personnes en parcours d'insertion, dans un cadre légal et sécurisé, en complément des dispositifs publics.",
    image: images.aboutHero,
  },
  values: [
    {
      iconName: 'Sparkles',
      title: 'Pour toutes les bourses',
      description:
        "Le permis ne doit plus être un frein à l'emploi. Nos forfaits sont pensés pour être compatibles avec le CPF, l'aide mobilité, le FAJ et les microcrédits ADIE.",
    },
    {
      iconName: 'ShieldCheck',
      title: 'Sécurité & cadre légal',
      description:
        "Véhicule pédagogique à double commande, assurance apprentissage incluse, dispositif conforme aux articles L211-4 et R211-3 du Code de la route (conduite accompagnée / supervisée). Service réservé aux majeurs (18 ans minimum).",
    },
    {
      iconName: 'Users',
      title: 'Brique de mobilité',
      description:
        "Nous complétons l'écosystème existant (auto-écoles, prescripteurs, financeurs), nous ne le remplaçons pas. Notre rôle : fournir le véhicule et le cadre.",
    },
  ],
  legal: [
    {
      iconName: 'Scale',
      title: 'Articles L211-4 et R211-3 : un cadre clair',
      paragraphs: [
        "La conduite accompagnée (AAC) et la conduite supervisée sont des dispositifs encadrés par le Code de la route. Le bénéficiaire doit avoir obtenu son NEPH, son code, et validé au minimum 20h de conduite en auto-école.",
        "L'accompagnateur proche doit être titulaire du permis B depuis au moins 5 ans, sans annulation ni suspension en cours, et sobre pendant toute la séance.",
      ],
    },
    {
      iconName: 'ShieldCheck',
      title: 'Candidat libre : expliqué simplement',
      paragraphs: [
        "Le candidat libre s'inscrit à l'examen via l'ANTS (ants.gouv.fr) sans passer par une auto-école. Auto Conduite met à disposition le véhicule pédagogique pour la phase d'entraînement, dans le respect total de la réglementation.",
        "Chaque véhicule pédagogique est régulièrement contrôlé, entretenu et équipé d'un double pédalier (frein + embrayage) homologué.",
      ],
    },
  ],
  institutions: [
    {
      title: 'France Travail',
      desc: "Aide mobilité jusqu'à 1200€ pour les demandeurs d'emploi.",
    },
    {
      title: 'Missions Locales',
      desc: "Accompagnement des jeunes 16-25 ans (FAJ, suivi parcours d'insertion).",
    },
    {
      title: 'GEIQ Alemploi',
      desc: "Levée du frein mobilité pour les salariés en insertion.",
    },
    {
      title: 'Département de la Moselle',
      desc: 'Abondement et conventions ESS (en cours de négociation).',
    },
  ],
  gallery: images.aboutGallery,
}

// ============================================================================
//                          FORFAITS (page Nos offres)
// ============================================================================

// Zones kilométriques officielles (cf. cahier des charges §3.3)
export const zones = [
  {
    code: 'A',
    range: '0 à 15 km',
    surcharge: 0,
    description: 'Zone proche d\'un point de dépôt',
  },
  {
    code: 'B',
    range: '15 à 35 km',
    surcharge: 15,
    description: 'Zone intermédiaire',
  },
  {
    code: 'C',
    range: '+ 35 km',
    surcharge: 30,
    description: 'Zone éloignée, supplément carburant',
  },
]

// Points de dépôt officiels (bassin Sarrebourg / Château-Salins)
export const depositPoints = [
  {
    name: 'Parking Leclerc Sarrebourg',
    address: 'Sarrebourg (57400)',
    hours: 'Accès 24h/24 · 7j/7 · parking ouvert',
  },
  {
    name: 'Parking Gare de Sarrebourg',
    address: 'Gare SNCF, Sarrebourg',
    hours: 'Accès 24h/24 · 7j/7 · parking ouvert',
  },
  {
    name: 'France Travail Sarrebourg',
    address: 'ZAC les Terrasses de la Sarre',
    hours: 'Accès 24h/24 · 7j/7 · parking ouvert',
  },
  {
    name: 'Parking Intermarché Château-Salins',
    address: 'Château-Salins (57170)',
    hours: 'Accès 24h/24 · 7j/7 · parking ouvert',
  },
  {
    name: 'Mission Locale Sud Mosellan',
    address: 'À confirmer',
    hours: 'Accès 24h/24 · 7j/7 · parking ouvert',
  },
]

export const servicesContent = {
  hero: {
    eyebrow: 'Forfaits & Tarifs',
    title: 'Des forfaits pour toutes les bourses',
    description:
      "3 packs au choix, ajustés selon votre zone kilométrique. Finançables CPF (Pack 20h), ALMA, ADIE ou aide mobilité France Travail.",
  },
  pricing: {
    eyebrow: 'Forfaits et Tarifs',
    title: 'Choisissez votre Pack',
    description:
      "Tous nos packs incluent un véhicule pédagogique récent, l'assurance apprentissage et le kilométrage illimité.",
    plans: [
      {
        iconName: 'Clock',
        name: 'Pack 5h',
        offer: '6h avec 1h offerte',
        prices: { A: 199, B: 214, C: 229 },
        description: 'Idéal pour une première prise en main ou des sessions ponctuelles.',
        features: [
          'Véhicule pédagogique à double commande',
          'Assurance apprentissage incluse',
          '1h offerte sur le pack',
          'Kilométrage illimité',
        ],
      },
      {
        iconName: 'Calendar',
        name: 'Pack 10h',
        offer: 'Le plus populaire',
        prices: { A: 329, B: 344, C: 359 },
        description: "Pour un entraînement régulier avant l'examen.",
        features: [
          'Véhicule pédagogique à double commande',
          'Assurance apprentissage incluse',
          'Validité 3 mois',
          'Créneaux prioritaires',
        ],
        popular: true,
      },
      {
        iconName: 'GraduationCap',
        name: 'Pack 20h Proche',
        offer: 'Avec votre accompagnateur',
        prices: { A: 620, B: 635, C: 650 },
        description: 'Le forfait complet pour pratiquer avec un proche, à votre rythme.',
        features: [
          'Véhicule pédagogique récent',
          'Assurance apprentissage incluse',
          'Pratique avec accompagnateur proche',
          'Idéal préparation examen',
        ],
      },
    ],
  },
  // Pack 20h CPF séparé (cf. brief Ouibo : moniteur agréé ADAM, 1450€, reste à charge 550€ = 183€/mois)
  cpfPack: {
    eyebrow: 'Option CPF · Moniteur agréé',
    name: 'Pack 20h CPF',
    headline: '183€/mois',
    subline: 'sur 3 fois sans frais',
    price: 1450,
    cpfCovered: 900,
    remaining: 550,
    monthly: 183,
    operator: 'ADAM',
    description:
      "Formation officielle avec moniteur agréé, finançable via votre Compte Personnel de Formation. Le CPF couvre jusqu'à 900€, le reste à charge de 550€ est payable en 3 fois sans frais.",
    features: [
      'Moniteur agréé ADAM',
      'Formation officielle reconnue',
      'CPF jusqu\'à 900€ (selon solde)',
      'Reste à charge 550€ en 3 fois',
    ],
    ctaPrimary: { label: 'Vérifier mon CPF', href: 'https://moncompteformation.gouv.fr', external: true },
    ctaSecondary: { label: 'Nous contacter', href: '/contact' },
  },
  zones: {
    eyebrow: 'Zones kilométriques',
    title: 'Le tarif s\'ajuste selon votre zone',
    description:
      "Le supplément carburant est calculé selon la distance entre votre domicile et le point de dépôt le plus proche.",
  },
  deposits: {
    eyebrow: 'Points de dépôt',
    title: 'Où récupérer le véhicule',
    description:
      'Bassin Sarrebourg / Château-Salins. D\'autres points de dépôt arriveront progressivement sur le département.',
  },
  funding: {
    eyebrow: 'Financements',
    title: "Plusieurs solutions selon votre profil",
    items: [
      {
        title: 'CPF (Pack 20h)',
        desc: 'Pack 20h finançable via moncompteformation.gouv.fr, portage assuré par ADAM. Plafond 900€ pour les demandeurs d\'emploi inscrits.',
      },
      {
        title: 'ALMA : paiement fractionné',
        desc: 'Paiement en 2x, 3x ou 4x pour le reste à charge. (Solution en cours d\'activation.)',
      },
      {
        title: 'Aide mobilité France Travail',
        desc: 'Jusqu\'à 1200€ pour les demandeurs d\'emploi. À demander auprès de votre conseiller.',
      },
      {
        title: 'FAJ : Fonds d\'Aide aux Jeunes',
        desc: 'Via Mission Locale, pour les 16-25 ans en parcours d\'insertion.',
      },
      {
        title: 'ADIE Lorraine',
        desc: 'Microcrédit personnel pour les bénéficiaires RSA sans solution CPF ou ALMA. adie.org',
      },
      {
        title: 'Abondement Département Moselle',
        desc: 'Convention en cours de négociation pour les publics du Département.',
      },
    ],
  },
  conditions: {
    eyebrow: 'Conditions',
    title: 'Qui peut en bénéficier ?',
    description:
      'Le dispositif est ouvert à tous les profils, dans un cadre légal et sécurisé.',
    groups: [
      {
        iconName: 'GraduationCap',
        title: "Pour le bénéficiaire",
        items: [
          'Avoir obtenu le code de la route (NEPH validé)',
          'Avoir validé 20h minimum en auto-école',
          'Être inscrit en conduite accompagnée (AAC) ou supervisée',
          'Fournir l\'attestation de fin de formation initiale',
        ],
      },
      {
        iconName: 'Users',
        title: "Pour l'accompagnateur proche",
        items: [
          'Titulaire du permis B depuis 5 ans minimum',
          "Pas d'annulation ou suspension en cours",
          "Sobre pendant toute la séance",
          'Désigné sur le contrat de location',
        ],
      },
      {
        iconName: 'Building2',
        title: 'Pour les prescripteurs',
        items: [
          'Convention de partenariat possible (FT, ML, GEIQ, social)',
          'Facturation directe ou prise en charge',
          'Reporting et suivi anonymisé',
          'Fiche synthétique téléchargeable',
        ],
      },
    ],
  },
}

// ============================================================================
//                  COMMENT ÇA MARCHE (page parcours bénéficiaire)
// ============================================================================
// Source : cahier des charges §3.2

export const howItWorksContent = {
  hero: {
    eyebrow: 'Comment ça marche',
    title: 'Votre parcours pas à pas',
    description:
      "Du NEPH à votre première séance, un parcours simple, légal et accompagné. Sept étapes claires pour bénéficier du dispositif Auto Conduite.",
  },
  // Parcours bénéficiaire en 7 étapes (cf. §3.2 du cahier : NEPH → inscription → forfait → paiement → briefing → réservation → séance)
  journey: [
    {
      iconName: 'FileText',
      title: 'Obtenez votre NEPH',
      desc: "Le NEPH (Numéro d'Enregistrement Préfectoral Harmonisé) est obligatoire pour s'inscrire à l'examen. Il s'obtient en ligne sur ants.gouv.fr, on vous guide pas à pas. Le code de la route peut être passé en parallèle via Codeclic (17€) ou en candidat libre dans un centre agréé.",
      link: { label: 'ants.gouv.fr', href: 'https://ants.gouv.fr', external: true },
    },
    {
      iconName: 'UserCheck',
      title: 'Inscrivez-vous au dispositif',
      desc: "Quelques questions simples : âge, NEPH, accompagnateur proche disponible. M. Faé vérifie votre éligibilité et vous répond en moins de 24h.",
      link: { label: 'Formulaire d\'éligibilité', href: '/contact', external: false },
    },
    {
      iconName: 'Coins',
      title: 'Choisissez votre forfait',
      desc: 'Pack 5h (avec 1h offerte), Pack 10h ou Pack 20h finançable CPF, tarif ajusté selon votre zone kilométrique (A, B ou C).',
      link: { label: 'Voir les forfaits', href: '/services', external: false },
    },
    {
      iconName: 'CreditCard',
      title: 'Réglez votre forfait',
      desc: 'Plusieurs financements possibles : CPF via ADAM, ALMA fractionné, aide mobilité France Travail, FAJ Mission Locale, ADIE pour les RSA.',
      link: { label: 'Voir le financement', href: '/financement', external: false },
    },
    {
      iconName: 'ShieldCheck',
      title: 'Validez le briefing sécurité',
      desc: "Une fois le dossier validé, vous recevez le briefing sécurité obligatoire (vidéo + quiz, score minimum 80%). Indispensable avant d'accéder au véhicule.",
      link: null,
    },
    {
      iconName: 'Calendar',
      title: 'Réservez votre créneau',
      desc: "Choisissez votre point de dépôt (Sarrebourg, Château-Salins…), votre date et l'horaire qui vous arrange. La réservation est confirmée par SMS et email.",
      link: null,
    },
    {
      iconName: 'CarFront',
      title: 'Effectuez votre séance',
      desc: "Récupérez le véhicule pédagogique à double commande au point de dépôt, démarrez la séance avec votre accompagnateur proche. Bilan IA automatique dans les 5 minutes qui suivent.",
      link: null,
    },
  ],
  // Vidéos prévues (cf. §5, contenus vidéo)
  videos: [
    {
      number: 1,
      title: "Comment s'inscrire",
      duration: '2-3 min',
      desc: 'NEPH → code → forfait → paiement → confirmation',
    },
    {
      number: 2,
      title: "Déroulement d'une séance",
      duration: '3-4 min',
      desc: 'Récupération du véhicule → rôle de l\'accompagnateur → séance → bilan',
    },
    {
      number: 4,
      title: "L'IA Auto Conduite",
      duration: '1-2 min',
      desc: 'Bilan post-séance automatique, rapport mensuel, conseils personnalisés',
    },
  ],
  // Bloc rôle de l'accompagnateur (cf. §3.2)
  accompagnateur: {
    eyebrow: 'Rôle clé',
    title: "L'accompagnateur proche",
    description:
      "Une personne de confiance, titulaire du permis B depuis 5 ans minimum, sobre et non suspendue. Elle accompagne le bénéficiaire pendant chaque séance, dans le respect strict du dispositif.",
    cta: { label: 'Page accompagnateur', href: '/accompagnateur' },
  },
  // FAQ courte (cf. §3.2)
  faq: {
    eyebrow: 'FAQ',
    title: 'Questions fréquentes',
    items: [
      {
        question: "Qu'est-ce que le NEPH et comment l'obtenir ?",
        answer:
          "Le NEPH est votre numéro candidat unique pour l'examen du permis. Vous l'obtenez sur ants.gouv.fr en quelques étapes (pièce d'identité, justificatif de domicile, photo d'identité numérique). Délai moyen : 7 à 15 jours.",
      },
      {
        question: 'Auto Conduite remplace-t-elle une auto-école ?',
        answer:
          "Non. Auto Conduite met à disposition un véhicule pédagogique à double commande pour la phase d'entraînement. Vous devez avoir validé au minimum 20h en auto-école avant d'accéder au dispositif. Auto Conduite est une brique de mobilité complémentaire.",
      },
      {
        question: 'Quelles sont les conditions pour mon accompagnateur ?',
        answer:
          "L'accompagnateur proche doit être titulaire du permis B depuis 5 ans minimum, sans annulation ni suspension en cours, et sobre pendant toute la séance. Voir la page Accompagnateur pour tous les détails.",
      },
      {
        question: 'Que se passe-t-il après ma demande ?',
        answer:
          "M. Faé valide votre dossier sous 24h. Vous recevez ensuite par email et SMS le briefing sécurité obligatoire (vidéo + quiz de validation). Une fois le quiz validé, vous pouvez réserver vos créneaux.",
      },
      {
        question: 'Comment se passe la première séance ?',
        answer:
          "Votre accompagnateur récupère le véhicule au point de dépôt convenu (Sarrebourg, Château-Salins…) à l'horaire réservé, vous rejoint, puis la séance démarre. Un bilan IA personnalisé vous est envoyé dans les 5 minutes qui suivent.",
      },
    ],
  },
}

// ============================================================================
//                  FINANCEMENT (page Financement)
// ============================================================================
// Source : cahier des charges §3.4

export const fundingContent = {
  hero: {
    eyebrow: 'Financement',
    title: 'Quatre solutions pour financer votre permis',
    description:
      "Le permis ne doit plus être un frein à l'emploi. Selon votre profil, plusieurs dispositifs peuvent prendre en charge tout ou partie de votre forfait. On vous oriente vers le bon.",
  },
  // 4 dispositifs simples (cf. brief Ouibo : sans détailler les conditions)
  solutions: [
    {
      iconName: 'GraduationCap',
      title: 'CPF',
      desc:
        "Compte Personnel de Formation. Finance le Pack 20h via notre partenaire ADAM.",
      link: { label: 'moncompteformation.gouv.fr', href: 'https://moncompteformation.gouv.fr', external: true },
    },
    {
      iconName: 'HandCoins',
      title: 'Aide mobilité',
      desc:
        "Aide France Travail jusqu'à 1 200€, à demander auprès de votre conseiller.",
      link: null,
    },
    {
      iconName: 'CreditCard',
      title: 'ALMA',
      desc:
        "Paiement fractionné en 3 fois sans frais sur le reste à charge.",
      link: null,
    },
    {
      iconName: 'Landmark',
      title: 'ADIE',
      desc:
        "Microcrédit personnel pour les bénéficiaires sans solution CPF ni ALMA.",
      link: { label: 'adie.org', href: 'https://adie.org', external: true },
    },
  ],
  // Rétro-compat : solutions détaillées masquées au rendu mais conservées
  legacySolutions: [
    {
      iconName: 'Building2',
      title: 'Abondement Département de la Moselle',
      desc:
        "Convention en cours de négociation avec le Département de la Moselle pour un abondement spécifique aux publics du Département (RSA, ASE, jeunes…).",
      link: null,
      status: 'Convention en cours',
    },
  ],
}

// ============================================================================
//                  PRESCRIPTEURS (page Prescripteurs)
// ============================================================================
// Source : cahier des charges §3.5

export const prescriberContent = {
  hero: {
    eyebrow: 'Prescripteurs',
    title: 'Un dispositif clé en main pour vos publics',
    description:
      "France Travail, Missions Locales, GEIQ, services sociaux, CCAS, associations d'insertion : orientez rapidement un bénéficiaire vers Auto Conduite et suivez son parcours.",
  },
  // Bénéfices pour le prescripteur (cf. §3.5)
  benefits: [
    {
      iconName: 'UserCheck',
      title: 'Orientation rapide',
      desc: "Formulaire en ligne de 5 champs max. Réponse de M. Faé sous 24h. Pas de paperasse côté prescripteur.",
    },
    {
      iconName: 'ShieldCheck',
      title: 'Conformité légale',
      desc: 'Dispositif conforme aux articles L211-4 et R211-3 du Code de la route (conduite accompagnée/supervisée). Véhicule pédagogique à double commande, assurance apprentissage incluse. Service réservé aux majeurs.',
    },
    {
      iconName: 'BarChart3',
      title: 'Reporting anonymisé',
      desc: "Espace prescripteur sécurisé (à venir) : rapports anonymisés mensuels sur les parcours des bénéficiaires que vous avez orientés.",
    },
    {
      iconName: 'FileText',
      title: 'Fiche synthétique',
      desc: 'Fiche PDF téléchargeable à présenter à votre bénéficiaire ou à votre équipe. (Document en cours de finalisation.)',
      action: { label: 'Télécharger la fiche (à venir)', href: '#', disabled: true },
    },
  ],
  // Formulaire d'orientation bénéficiaire (5 champs max, cf. §3.5)
  form: {
    eyebrow: 'Orientation bénéficiaire',
    title: 'Orienter un bénéficiaire',
    description: "Remplissez ces 5 informations, nous prenons contact directement avec votre bénéficiaire sous 24h.",
    fields: [
      { name: 'prescriber_org', label: 'Votre structure', placeholder: 'France Travail, Mission Locale, GEIQ Alemploi…', type: 'text' },
      { name: 'prescriber_name', label: 'Votre nom et contact', placeholder: 'Nom + téléphone ou email', type: 'text' },
      { name: 'beneficiary_name', label: 'Nom du bénéficiaire', placeholder: 'Prénom Nom', type: 'text' },
      { name: 'beneficiary_contact', label: 'Contact du bénéficiaire', placeholder: 'Téléphone ou email', type: 'text' },
      { name: 'beneficiary_profile', label: 'Profil / contexte', placeholder: 'DE / RSA / jeune / autre + besoin (Pack 5h, 10h, 20h)', type: 'textarea' },
    ],
    submitLabel: 'Envoyer la demande',
  },
  // Espace prescripteur (cf. §3.5 + §8.2, à venir)
  space: {
    title: 'Espace prescripteur sécurisé',
    description:
      "Bientôt disponible : un espace connecté avec suivi des bénéficiaires orientés (données anonymisées), rapport mensuel d'impact automatique, téléchargement des fiches synthétiques.",
    status: 'À venir',
  },
  // Clauses sociales (cf. §3.5, section dédiée)
  clauses: {
    title: 'Clauses sociales & insertion en Moselle',
    paragraphs: [
      "Auto Conduite peut intervenir comme support de levée du frein mobilité dans le cadre de marchés intégrant des clauses sociales d'insertion. Notre dispositif est compatible avec les exigences des donneurs d'ordre (collectivités, bailleurs, opérateurs).",
      "Nous mobilisons des données Moselle (taux de motorisation, taux d'emploi, situations d'isolement géographique) pour qualifier l'impact de notre intervention auprès des publics suivis.",
    ],
  },
  // Contacts directs (cf. §3.5)
  contact: {
    title: 'Contacts directs',
    name: 'M. Faé',
    phone: '06 37 53 43 26',
    email: 'contact@auto-conduite.com',
  },
}

// ============================================================================
//                  ACCOMPAGNATEUR (page Accompagnateur proche)
// ============================================================================
// Source : cahier des charges §3.6

export const companionContent = {
  hero: {
    eyebrow: 'Accompagnateur proche',
    title: 'Un rôle clé pour la réussite du bénéficiaire',
    description:
      "Vous êtes la personne de confiance qui accompagne un bénéficiaire pendant chaque séance. Voici tout ce qu'il faut savoir avant de prendre le volant à droite.",
  },
  // Conditions obligatoires (cf. §3.6)
  conditions: [
    {
      iconName: 'ShieldCheck',
      title: 'Permis B depuis 5 ans minimum',
      desc: "Vous devez être titulaire du permis B (catégorie voiture) depuis au moins 5 ans révolus, sans interruption.",
    },
    {
      iconName: 'Scale',
      title: 'Sans suspension ni annulation',
      desc: "Aucune suspension ni annulation en cours. Votre permis doit être valide et vous devez avoir tous vos points.",
    },
    {
      iconName: 'UserCheck',
      title: 'Sobre pendant toute la séance',
      desc: "Aucune consommation d'alcool ni de stupéfiants avant ou pendant la séance. Vous êtes responsable du véhicule et du bénéficiaire.",
    },
    {
      iconName: 'FileText',
      title: 'Désigné sur le contrat',
      desc: "Vous devez être nommément désigné sur le contrat de location et avoir transmis une copie de votre permis B (recto-verso).",
    },
  ],
  // Ce qu'il peut faire (cf. §3.6)
  do: {
    title: "Ce que vous pouvez faire",
    items: [
      'Récupérer le véhicule pédagogique au point de dépôt convenu',
      'Prendre le volant pour amener le bénéficiaire au point de départ de la séance',
      'Surveiller la conduite du bénéficiaire pendant toute la séance',
      "Intervenir via le double pédalier (frein et embrayage) en cas de besoin",
      "Reprendre le volant à tout moment si la situation l'exige",
      "Rapporter le véhicule au point de dépôt à la fin de la séance",
    ],
  },
  // Ce qu'il ne peut pas faire (cf. §3.6)
  dont: {
    title: 'Ce que vous ne pouvez pas faire',
    items: [
      "Confier la conduite à une autre personne que le bénéficiaire désigné",
      "Faire conduire le bénéficiaire sans être présent à ses côtés",
      "Consommer de l'alcool ou des stupéfiants avant ou pendant la séance",
      "Utiliser le véhicule en dehors de la séance d'apprentissage",
      "Faire monter d'autres passagers que ceux prévus au contrat",
      "Donner des consignes contraires au Code de la route",
    ],
  },
  // Guide pédagogique téléchargeable (cf. §3.6)
  guide: {
    title: "Guide pédagogique de l'accompagnateur",
    description: "Un document complet (PDF) à lire avant la première séance : bonnes pratiques pédagogiques, posture, gestion des situations de stress, sécurité.",
    action: { label: 'Télécharger le guide (à venir)', href: '#', disabled: true },
  },
  // Vidéo de briefing sécurité (cf. §3.6 + §5 vidéo n°3)
  video: {
    number: 3,
    title: 'Briefing sécurité obligatoire',
    duration: '5-8 min',
    desc: "Double commande, posture accompagnateur, règles de sécurité. Vidéo obligatoire à visionner et quiz à valider (score minimum 80%) avant l'accès au véhicule.",
    note: "La vidéo de briefing est délivrée dans votre espace personnel après validation du dossier.",
  },
}

// ============================================================================
//                          CONTACT (page Contact)
// ============================================================================

export const contactContent = {
  hero: {
    eyebrow: 'Contact',
    title: 'Vérifiez votre éligibilité ou posez vos questions',
    description:
      "Bénéficiaires, accompagnateurs, prescripteurs : remplissez le formulaire et nous vous recontactons sous 24h. Vous pouvez aussi nous joindre directement par téléphone ou WhatsApp.",
  },
  form: {
    title: 'Demande de contact / éligibilité',
    profileOptions: [
      'Bénéficiaire en parcours d\'insertion',
      'Accompagnateur proche',
      'Prescripteur (France Travail / Mission Locale / GEIQ / social)',
      'Visiteur institutionnel / partenaire',
      'Autre',
    ],
    submitLabel: 'Envoyer ma demande',
  },
}
