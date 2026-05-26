// Source unique des articles de blog Auto Conduite.
// Utilisé par : publish-blog.mjs (insertion Mongo), gen-blog-md.mjs (doc .md),
// gen-blog-covers.mjs (images de couverture).
//
// Vocabulaire imposé (cahier des charges) : « véhicule pédagogique à double
// commande », « brique de mobilité », « accompagnateur », « parcours d'insertion ».
// Interdit : « cours de conduite », « leçon », « moniteur », « auto-école »,
// « formation réglementaire ». Pas de tiret cadratin.

const AUTHOR = "L'équipe Auto Conduite"

// Les articles sont publiés un par un. Le premier est visible immédiatement,
// les suivants sont planifiés toutes les 2 semaines (invisibles jusqu'à leur date).
export const PUBLISH_INTERVAL_DAYS = 14

export const articles = [
  // 1 — VISIBLE IMMÉDIATEMENT
  {
    title: "La mobilité, premier frein à l'emploi en Moselle (et comment le lever)",
    slug: 'mobilite-premier-frein-emploi-moselle',
    category: 'Insertion & mobilité',
    tags: ['mobilité', 'insertion', 'emploi', 'Moselle'],
    author: AUTHOR,
    excerpt:
      "Dans le sud mosellan, un emploi ou une formation se jouent souvent sur une seule question : comment s'y rendre ? Voici pourquoi la mobilité reste le premier obstacle, et comment une brique de mobilité accessible change la donne.",
    metaTitle: "Mobilité et emploi en Moselle : lever le premier frein | Auto Conduite",
    metaDescription:
      "Pourquoi l'absence de permis bloque l'accès à l'emploi dans le sud mosellan, et comment une solution de mobilité solidaire aide à reprendre le volant, pour toutes les bourses.",
    content: `
<p>Vous avez décroché un entretien, une promesse d'embauche ou une place en formation, et puis vient la question qui change tout : « Vous avez le permis ? Vous êtes véhiculé ? » Dans le bassin de Sarrebourg et de Château-Salins, cette question ferme chaque année des portes que rien d'autre ne fermait. Les compétences sont là, la motivation aussi. Ce qui manque, c'est le moyen de se déplacer.</p>

<h2>Un territoire où tout se compte en kilomètres</h2>
<p>La Moselle rurale, ce sont des villages reliés par des routes plutôt que par des lignes de bus. Les horaires de travail commencent tôt ou finissent tard, quand les transports ne circulent plus. Une mission d'intérim à vingt kilomètres, un chantier dans la zone d'activité voisine, une formation à Sarrebourg : sans voiture, chaque trajet devient un casse-tête, et chaque casse-tête finit par décourager.</p>
<p>Les conseillers <strong>France Travail</strong>, les <strong>Missions Locales</strong> et les travailleurs sociaux le constatent tous les jours. La mobilité n'est pas un détail logistique : c'est souvent la condition qui décide si un parcours d'insertion aboutit ou s'arrête net.</p>

<h2>Quand l'absence de permis verrouille tout le reste</h2>
<p>Le problème se mord la queue. Sans emploi, financer le permis paraît hors de portée. Sans permis, l'emploi reste inaccessible. On parle d'un budget qui dépasse souvent mille euros dans le circuit classique, une somme qui n'a aucun sens quand on vit avec le RSA ou une allocation.</p>
<p>Résultat : des personnes parfaitement employables restent au bord de la route, pas par manque de volonté, mais parce que la première marche est trop haute.</p>

<blockquote>La mobilité ne devrait pas être un luxe réservé à ceux qui peuvent déjà se déplacer. C'est exactement l'inégalité qu'Auto Conduite cherche à corriger.</blockquote>

<h2>La mobilité, ça se construit par étapes</h2>
<p>Auto Conduite n'est pas une auto-école. C'est un service de mobilité solidaire qui met à disposition un <strong>véhicule pédagogique à double commande</strong>, que vous utilisez accompagné d'un proche de confiance. Vous préparez le permis B en candidat libre, à votre rythme, avec un outil pensé pour la pratique en sécurité.</p>
<p>Concrètement, vous récupérez le véhicule sur un point de dépôt proche de chez vous, votre <a href="/accompagnateur">accompagnateur</a> vous rejoint, et vous vous exercez sur des trajets réels. Pas de salle d'attente, pas d'horaires imposés depuis l'autre bout du département : la mobilité se construit là où vous vivez.</p>

<h2>Une brique de mobilité pensée pour toutes les bourses</h2>
<p>Notre devise tient en quatre mots : <strong>pour toutes les bourses</strong>. Les forfaits démarrent à quelques heures de pratique et vont jusqu'à un pack de 20 heures finançable avec le <a href="/cpf">CPF</a>. Selon votre situation, plusieurs aides peuvent réduire, voire couvrir le reste à charge. Nous détaillons tout cela sur la page <a href="/financement">Financement</a>.</p>
<p>L'idée n'est pas de vous vendre un produit, mais de retirer le caillou qui bloque la chaussure : une fois le permis en poche, l'emploi, la formation et l'autonomie redeviennent atteignables.</p>

<h2>Par où commencer</h2>
<ol>
  <li>Demandez votre <strong>numéro NEPH</strong> sur <a href="https://www.ants.gouv.fr" target="_blank" rel="noopener noreferrer">ants.gouv.fr</a> (c'est gratuit et indispensable pour passer l'examen).</li>
  <li>Préparez le code de la route en ligne, par exemple via <a href="https://www.codeclic.fr" target="_blank" rel="noopener noreferrer">Codeclic</a> pour 17 €.</li>
  <li>Identifiez un accompagnateur : un proche titulaire du permis B depuis au moins 5 ans.</li>
  <li>Découvrez le déroulement complet sur notre page <a href="/comment-ca-marche">Comment ça marche</a>.</li>
</ol>
<p>Un doute sur votre éligibilité ou votre financement ? <a href="/contact">Parlons-en</a>, c'est sans engagement. La mobilité est un droit, pas un privilège, et il existe presque toujours une solution adaptée à votre budget.</p>
`,
  },

  // 2 — CPF
  {
    title: "Financer son permis avec le CPF : le guide simple en 2026",
    slug: 'financer-permis-cpf-guide',
    category: 'Financement',
    tags: ['CPF', 'financement', 'permis B', 'mon compte formation'],
    author: AUTHOR,
    excerpt:
      "Le permis B fait partie des formations finançables avec votre Compte Personnel de Formation. On vous explique, sans jargon, comment vérifier vos droits et mobiliser votre CPF pour un pack de 20 heures.",
    metaTitle: "Financer son permis avec le CPF en 2026 : mode d'emploi | Auto Conduite",
    metaDescription:
      "Comment utiliser votre CPF pour financer le permis B en Moselle : vérifier ses droits, le plafond pour les demandeurs d'emploi, et le pack 20h finançable Auto Conduite.",
    content: `
<p>Vous avez peut-être des centaines d'euros qui dorment sur votre Compte Personnel de Formation sans le savoir. Bonne nouvelle : le permis B fait partie des formations que l'on peut financer avec le CPF. Voici comment ça marche, expliqué simplement.</p>

<h2>Le CPF, c'est quoi exactement ?</h2>
<p>Le Compte Personnel de Formation est un droit attaché à votre personne, pas à votre employeur. Dès que vous avez travaillé, même un peu, une somme s'y accumule chaque année. Cet argent sert à financer des formations, et le permis de conduire en fait partie dès lors qu'il sert un projet professionnel.</p>
<p>Pour consulter votre solde, rendez-vous sur <a href="https://www.moncompteformation.gouv.fr" target="_blank" rel="noopener noreferrer">moncompteformation.gouv.fr</a> et connectez-vous avec FranceConnect. Le montant disponible s'affiche en quelques secondes.</p>

<h2>Et si je suis demandeur d'emploi ?</h2>
<p>C'est souvent là que la situation se débloque. Si vous êtes inscrit à <strong>France Travail</strong>, un abondement peut compléter votre solde, dans la limite d'un plafond d'environ 900 € pour le financement du permis. Concrètement, même un compte presque vide peut être complété pour atteindre le coût d'un forfait.</p>
<p>Votre conseiller France Travail est votre meilleur allié pour vérifier ce point. N'hésitez pas à lui parler de votre projet de mobilité : c'est précisément le genre de démarche qu'il est là pour soutenir.</p>

<h2>Le pack 20 heures, finançable CPF</h2>
<p>Chez Auto Conduite, le <strong>pack de 20 heures est éligible au CPF</strong>. Le portage administratif est assuré par notre partenaire ADAM, ce qui veut dire que vous n'avez pas à gérer la paperasse compliquée : vous mobilisez vos droits, et la pratique se déroule avec votre <a href="/accompagnateur">accompagnateur</a> sur notre véhicule pédagogique à double commande.</p>

<blockquote>Le CPF transforme un budget qui semblait inatteignable en quelques clics sur une plateforme officielle. Beaucoup de personnes éligibles ne le savent simplement pas.</blockquote>

<h2>Les étapes, dans l'ordre</h2>
<ol>
  <li>Vérifiez votre solde sur moncompteformation.gouv.fr.</li>
  <li>Si vous êtes demandeur d'emploi, demandez à votre conseiller France Travail si un abondement est possible.</li>
  <li>Assurez-vous d'avoir votre <strong>NEPH</strong> et votre code de la route (ou d'être en train de le préparer).</li>
  <li>Choisissez le pack 20h et laissez-vous guider pour la mobilisation CPF.</li>
</ol>

<h2>Et s'il reste un montant à payer ?</h2>
<p>Si vos droits ne couvrent pas tout, d'autres dispositifs existent : aide à la mobilité, microcrédit, paiement en plusieurs fois. Nous passons tout cela en revue sur la page <a href="/financement">Financement</a>. L'objectif reste le même : un permis accessible, pour toutes les bourses.</p>
<p>Une question sur vos droits CPF ? <a href="/contact">Contactez-nous</a>, nous vous aidons à y voir clair.</p>
`,
  },

  // 3 — AIDES
  {
    title: "Permis et petit budget : quelles aides quand on cherche un emploi ?",
    slug: 'aides-financement-permis-recherche-emploi',
    category: 'Financement',
    tags: ['aides', 'France Travail', 'ADIE', 'FAJ', 'RSA'],
    author: AUTHOR,
    excerpt:
      "CPF épuisé, pas de CPF du tout, budget serré : il existe plusieurs aides pour financer le permis quand on est en recherche d'emploi ou bénéficiaire du RSA. Tour d'horizon clair, dispositif par dispositif.",
    metaTitle: "Aides pour financer le permis en recherche d'emploi | Auto Conduite",
    metaDescription:
      "Aide à la mobilité France Travail, microcrédit ADIE, Fonds d'Aide aux Jeunes : les dispositifs pour financer le permis quand on a un petit budget en Moselle.",
    content: `
<p>« Je n'ai pas les moyens de payer le permis. » C'est la phrase que nous entendons le plus souvent, et c'est aussi celle qui mérite la réponse la plus précise. Car entre le CPF, les aides à la mobilité et le microcrédit, il existe presque toujours un montage qui rend le permis accessible. Voici les principales pistes.</p>

<h2>L'aide à la mobilité de France Travail</h2>
<p>Si vous êtes inscrit à <strong>France Travail</strong>, vous pouvez, sous conditions, bénéficier d'une aide à la mobilité pouvant aller jusqu'à 1 200 €. Elle s'adresse aux personnes pour qui le permis est un levier direct vers un emploi ou une formation. La demande se fait avec votre conseiller, qui évalue votre situation et le projet associé.</p>
<p>Le conseil : préparez votre demande en montrant en quoi le permis débloque concrètement votre retour à l'emploi (zone mal desservie, horaires décalés, poste exigeant un véhicule).</p>

<h2>Le microcrédit personnel de l'ADIE</h2>
<p>Pas de CPF suffisant ? Pas d'aide mobilisable ? L'<a href="https://www.adie.org" target="_blank" rel="noopener noreferrer">ADIE</a> propose un microcrédit personnel pensé pour les projets de mobilité, y compris pour les bénéficiaires du RSA. Les montants sont raisonnables, les mensualités adaptées, et l'accompagnement humain. C'est une solution solide quand les dispositifs gratuits ne suffisent pas.</p>

<h2>Le Fonds d'Aide aux Jeunes (FAJ)</h2>
<p>Vous avez entre 16 et 25 ans ? Le <strong>Fonds d'Aide aux Jeunes</strong>, accessible via votre <strong>Mission Locale</strong>, peut participer au financement du permis dans le cadre d'un parcours d'insertion. Là encore, le conseiller Mission Locale est la bonne porte d'entrée.</p>

<blockquote>Aucun de ces dispositifs n'est automatique, mais cumulés ou pris isolément, ils transforment souvent un « impossible » en « faisable ».</blockquote>

<h2>Le paiement en plusieurs fois</h2>
<p>Pour le reste à charge éventuel, des solutions de paiement fractionné permettent d'étaler la dépense sur plusieurs mois. L'idée est d'éviter le mur d'un paiement unique et de lisser l'effort.</p>

<h2>Comment savoir ce à quoi j'ai droit</h2>
<p>Chaque situation est différente : demandeur d'emploi, bénéficiaire du RSA, jeune suivi par la Mission Locale, salarié en insertion. Le plus simple est de partir de votre profil et de remonter vers les dispositifs adaptés. Notre page <a href="/financement">Financement</a> récapitule les pistes par situation.</p>
<p>Vous n'êtes pas obligé de démêler tout cela seul. <a href="/contact">Écrivez-nous</a> ou parlez-en à votre <a href="/prescripteurs">prescripteur</a> : on construit ensemble le montage le plus léger possible pour votre budget.</p>
`,
  },

  // 4 — DOUBLE COMMANDE
  {
    title: "Le véhicule à double commande : comment s'exercer en toute sécurité avec un proche",
    slug: 'vehicule-double-commande-securite-accompagnateur',
    category: 'Conduite & permis',
    tags: ['double commande', 'accompagnateur', 'sécurité', 'pratique'],
    author: AUTHOR,
    excerpt:
      "Pédales côté passager, accompagnateur de confiance, trajets réels : voici comment fonctionne le véhicule pédagogique à double commande qui vous permet de progresser sans stress, et sans auto-école.",
    metaTitle: "Véhicule à double commande : s'exercer en sécurité | Auto Conduite",
    metaDescription:
      "Comment fonctionne un véhicule pédagogique à double commande avec un accompagnateur : sécurité, progression, et différence avec une auto-école classique.",
    content: `
<p>L'outil au cœur du dispositif Auto Conduite porte un nom un peu technique : le <strong>véhicule pédagogique à double commande</strong>. Derrière ce terme se cache une idée simple et rassurante. Voici comment ça marche, concrètement.</p>

<h2>La double commande, c'est quoi ?</h2>
<p>Le véhicule est équipé d'une seconde pédale de frein (et souvent d'embrayage) côté passager. Votre <a href="/accompagnateur">accompagnateur</a> peut ainsi intervenir à tout moment si une situation l'exige. Cette sécurité change tout : vous prenez le volant en sachant qu'un garde-fou existe, ce qui libère la confiance et accélère la progression.</p>

<h2>Un proche, pas un inconnu</h2>
<p>La grande différence avec le circuit classique, c'est que vous ne pratiquez pas avec un professionnel facturé à l'heure, mais avec un <strong>proche de confiance</strong> : un parent, un conjoint, un ami titulaire du permis B depuis au moins 5 ans. Cette relation de confiance enlève une bonne partie du stress, surtout quand on débute ou qu'on reprend le volant après une interruption.</p>
<p>L'accompagnateur n'a pas besoin d'être pédagogue de métier. Auto Conduite l'aide avec un briefing de sécurité et des repères clairs sur son rôle : encourager, sécuriser, et laisser faire.</p>

<blockquote>Apprendre à côté de quelqu'un en qui on a confiance, sur des routes que l'on connaît, c'est souvent le déclic qui manquait.</blockquote>

<h2>Des trajets réels, près de chez vous</h2>
<p>Vous récupérez le véhicule sur un point de dépôt proche (parking, gare, agence), puis vous vous exercez sur de vrais trajets : ronds-points, routes de campagne, créneaux en ville. Vous progressez dans les conditions exactes que vous rencontrerez à l'examen et, surtout, au quotidien.</p>

<h2>En quoi est-ce différent d'une auto-école ?</h2>
<p>Auto Conduite n'est pas une auto-école et ne remplace pas le cadre officiel de l'examen. Nous mettons à disposition un <strong>outil pédagogique</strong> pour vous entraîner en candidat libre, à votre rythme et à un coût pensé pour toutes les bourses. Vous passez ensuite l'épreuve pratique comme tout candidat libre. Le cadre légal de la pratique accompagnée est expliqué sur notre page <a href="/cadre-legal">Cadre légal</a>.</p>

<h2>Et la sécurité dans tout ça ?</h2>
<ul>
  <li>Double commande pour une intervention immédiate de l'accompagnateur.</li>
  <li>Briefing de sécurité obligatoire avant la première séance.</li>
  <li>Accompagnateur expérimenté (permis B depuis 5 ans, non suspendu, sobre).</li>
  <li>Véhicule entretenu et assuré pour cet usage.</li>
</ul>
<p>Envie de voir le déroulement d'une séance de bout en bout ? Tout est détaillé sur <a href="/comment-ca-marche">Comment ça marche</a>.</p>
`,
  },

  // 5 — CANDIDAT LIBRE
  {
    title: "Passer le permis B en candidat libre : le guide étape par étape",
    slug: 'permis-b-candidat-libre-guide-etapes',
    category: 'Conduite & permis',
    tags: ['candidat libre', 'permis B', 'NEPH', 'examen'],
    author: AUTHOR,
    excerpt:
      "Le permis en candidat libre est un droit, et c'est souvent la voie la plus économique. NEPH, code, place d'examen : on déroule chaque étape pour que vous sachiez exactement quoi faire.",
    metaTitle: "Permis B en candidat libre : guide étape par étape | Auto Conduite",
    metaDescription:
      "Comment passer le permis B en candidat libre en 2026 : obtenir son NEPH sur l'ANTS, passer le code, réserver sa place d'examen et s'entraîner à moindre coût.",
    content: `
<p>Beaucoup de gens l'ignorent : on peut passer le permis B sans passer par une auto-école, en candidat libre. C'est parfaitement légal, encadré par la loi, et c'est souvent la voie la plus économique. Voici le parcours complet, étape par étape.</p>

<h2>Étape 1 : obtenir son NEPH</h2>
<p>Le <strong>NEPH</strong> (Numéro d'Enregistrement Préfectoral Harmonisé) est votre identifiant de candidat. Il est indispensable pour passer le code comme l'épreuve pratique. On le demande gratuitement en ligne sur <a href="https://www.ants.gouv.fr" target="_blank" rel="noopener noreferrer">ants.gouv.fr</a>, en remplissant le formulaire d'inscription au permis. Prévoyez une pièce d'identité, une photo agréée et un justificatif de domicile.</p>

<h2>Étape 2 : passer le code de la route</h2>
<p>Le code se prépare très bien en ligne, à votre rythme. Des plateformes comme <a href="https://www.codeclic.fr" target="_blank" rel="noopener noreferrer">Codeclic</a> proposent l'entraînement et l'inscription à l'examen pour environ 17 €. Une fois le code obtenu, il reste valable cinq ans, le temps de décrocher la pratique.</p>

<h2>Étape 3 : s'entraîner à la conduite</h2>
<p>C'est ici qu'Auto Conduite entre en jeu. Avec notre <strong>véhicule pédagogique à double commande</strong> et votre <a href="/accompagnateur">accompagnateur</a>, vous pratiquez sur des trajets réels, à votre rythme, sans payer le tarif horaire d'une auto-école. Vous choisissez un forfait adapté à votre niveau (voir nos <a href="/services">forfaits</a>).</p>

<blockquote>Candidat libre ne veut pas dire seul. Cela veut dire libre de choisir comment, où et avec qui vous vous préparez.</blockquote>

<h2>Étape 4 : réserver sa place d'examen</h2>
<p>En candidat libre, c'est à vous de réserver votre place pour l'épreuve pratique, là encore via l'<a href="https://www.ants.gouv.fr" target="_blank" rel="noopener noreferrer">ANTS</a> ou la plateforme dédiée de votre département. Le jour J, vous vous présentez avec un véhicule à double commande conforme et un accompagnateur. Auto Conduite vous aide à réunir ces conditions.</p>

<h2>Étape 5 : le jour de l'examen</h2>
<ul>
  <li>Apportez votre pièce d'identité et votre convocation.</li>
  <li>Présentez-vous avec un véhicule à double commande en règle.</li>
  <li>Gardez en tête que l'inspecteur évalue la sécurité et l'autonomie, pas la perfection.</li>
</ul>

<h2>Combien ça coûte, au total ?</h2>
<p>En additionnant le code (environ 17 €) et un forfait de pratique Auto Conduite, la facture reste très en dessous d'un parcours classique. Et avec le <a href="/cpf">CPF</a> ou les <a href="/financement">aides au financement</a>, le reste à charge peut fondre, voire disparaître.</p>
<p>Vous voulez qu'on vérifie ensemble votre éligibilité et votre point de départ ? <a href="/contact">Contactez-nous</a>, on vous oriente pas à pas.</p>
`,
  },

  // 6 — ACCOMPAGNATEUR
  {
    title: "Qui peut être accompagnateur ? Le rôle clé du proche qui vous épaule",
    slug: 'role-accompagnateur-conditions-permis-b',
    category: 'Conduite & permis',
    tags: ['accompagnateur', 'permis B 5 ans', 'sécurité', 'proche'],
    author: AUTHOR,
    excerpt:
      "Derrière chaque parcours réussi, il y a souvent un proche au siège passager. Quelles sont les conditions pour être accompagnateur, et en quoi consiste vraiment ce rôle ? On fait le point.",
    metaTitle: "Accompagnateur permis : conditions et rôle expliqués | Auto Conduite",
    metaDescription:
      "Qui peut accompagner un candidat libre sur un véhicule à double commande : permis B depuis 5 ans, conditions, rôle exact et ce qu'il faut savoir pour bien épauler.",
    content: `
<p>Dans le dispositif Auto Conduite, l'accompagnateur n'est pas un figurant. C'est lui, ou elle, qui s'installe côté passager, rassure, encourage et veille à la sécurité. Choisir le bon accompagnateur, c'est se donner toutes les chances de progresser sereinement. Voici ce qu'il faut savoir.</p>

<h2>Les conditions obligatoires</h2>
<p>Pour accompagner un candidat sur notre véhicule pédagogique à double commande, votre proche doit remplir des conditions simples mais non négociables :</p>
<ul>
  <li>Être titulaire du <strong>permis B depuis au moins 5 ans</strong>, sans interruption.</li>
  <li>Avoir un permis valide et <strong>non suspendu</strong>.</li>
  <li>Être <strong>sobre</strong> pendant toute la durée de la séance, évidemment.</li>
</ul>
<p>Ces règles ne sont pas de la paperasse : elles garantissent qu'au moindre imprévu, une personne expérimentée et lucide peut reprendre la main grâce à la double commande.</p>

<h2>Qui peut jouer ce rôle ?</h2>
<p>Un parent, un conjoint, un frère ou une sœur, un ami de confiance. Peu importe le lien, ce qui compte c'est la confiance et la disponibilité. Beaucoup de bénéficiaires découvrent d'ailleurs qu'un proche est ravi de les aider, dès lors qu'on lui explique clairement son rôle.</p>

<blockquote>Un bon accompagnateur n'est pas celui qui conduit à votre place, c'est celui qui vous laisse conduire en sécurité.</blockquote>

<h2>Ce que l'accompagnateur fait (et ne fait pas)</h2>
<p>Son rôle est d'<strong>encourager, sécuriser et observer</strong>. Il rappelle les bons réflexes, garde un œil sur la circulation, et n'intervient sur les commandes qu'en cas de réelle nécessité. Il n'est pas là pour faire un contrôle technique de chaque manœuvre ni pour mettre la pression. La bienveillance fait progresser bien plus vite que la critique.</p>
<p>Pour aider votre proche à bien démarrer, Auto Conduite prévoit un <strong>briefing de sécurité obligatoire</strong> avant la première séance. Tout est expliqué sur notre page dédiée <a href="/accompagnateur">Accompagnateur</a>.</p>

<h2>Et s'il n'a jamais « appris » à quelqu'un ?</h2>
<p>Aucun souci. Conduire depuis des années suffit largement : les bons réflexes sont là. Le briefing et nos repères pédagogiques font le reste. L'accompagnateur idéal n'est pas un expert, c'est une personne calme, patiente et présente.</p>

<h2>Pas d'accompagnateur sous la main ?</h2>
<p>Parlez-en autour de vous : un voisin, un collègue, un membre de la famille élargie. Et si la situation est vraiment bloquée, <a href="/contact">contactez-nous</a> : on cherche ensemble une solution, car ce détail ne doit jamais faire échouer un projet de mobilité.</p>
`,
  },

  // 7 — REPRENDRE CONFIANCE
  {
    title: "Reprendre confiance au volant après une longue interruption",
    slug: 'reprendre-confiance-volant-apres-interruption',
    category: 'Conduite & permis',
    tags: ['confiance', 'reprise', 'stress', 'pratique'],
    author: AUTHOR,
    excerpt:
      "Code en poche depuis longtemps, mais le volant vous intimide ? Reprendre après des mois ou des années d'arrêt, c'est normal et surmontable. Quelques repères pour avancer sans pression.",
    metaTitle: "Reprendre confiance au volant après une pause | Auto Conduite",
    metaDescription:
      "Peur de conduire, longue interruption, manque de pratique : comment reprendre le volant en douceur avec un accompagnateur et un véhicule à double commande.",
    content: `
<p>Il y a ceux qui ont eu leur code il y a longtemps sans jamais vraiment conduire. Ceux qui ont arrêté après un déménagement, une période sans voiture, ou tout simplement la peur. Si le volant vous intimide aujourd'hui, sachez une chose : c'est extrêmement courant, et ça se surmonte.</p>

<h2>L'appréhension n'est pas un défaut</h2>
<p>Avoir le cœur qui bat avant de démarrer, redouter les ronds-points ou l'autoroute, ce n'est pas un signe d'incapacité. C'est le signe que vous prenez la route au sérieux. La confiance ne se décrète pas, elle se reconstruit, kilomètre après kilomètre, dans un cadre rassurant.</p>

<h2>Pourquoi le cadre change tout</h2>
<p>Reprendre seul, dans la circulation, avec une voiture classique, c'est le meilleur moyen de renforcer la peur. À l'inverse, s'exercer sur un <strong>véhicule pédagogique à double commande</strong>, aux côtés d'un <a href="/accompagnateur">accompagnateur</a> de confiance, crée un filet de sécurité. Vous savez qu'en cas de doute, quelqu'un peut intervenir. Cette certitude suffit souvent à débloquer les choses.</p>

<blockquote>On ne reprend pas confiance en évitant le volant. On la reprend en y retournant, mais dans de bonnes conditions.</blockquote>

<h2>Y aller par petites étapes</h2>
<ol>
  <li>Commencez sur des trajets calmes que vous connaissez : un parking, une route de campagne peu fréquentée.</li>
  <li>Augmentez progressivement la difficulté : circulation en ville, ronds-points, créneaux.</li>
  <li>Fixez-vous des objectifs simples par séance, sans chercher la perfection.</li>
  <li>Célébrez les progrès, même petits : chaque sortie réussie nourrit la confiance.</li>
</ol>

<h2>Un rythme qui est le vôtre</h2>
<p>L'un des grands avantages d'Auto Conduite, c'est l'absence de pression et de chronomètre. Vous choisissez un <a href="/services">forfait</a> adapté, vous avancez à votre rythme, et vous décidez quand vous sentez prêt pour l'examen ou pour rouler en autonomie. Pas de regard extérieur qui juge, juste un proche qui vous accompagne.</p>

<h2>Et après ?</h2>
<p>Beaucoup de personnes nous disent la même chose une fois le cap passé : « Si j'avais su, j'aurais recommencé bien plus tôt. » Reprendre le volant, c'est souvent reprendre la main sur son autonomie, son emploi, sa vie quotidienne.</p>
<p>Vous hésitez à franchir le pas ? <a href="/contact">Écrivez-nous</a> simplement. On avance à votre rythme, pour toutes les bourses et pour toutes les histoires.</p>
`,
  },

  // 8 — FORFAITS / ZONES
  {
    title: "Forfaits et zones : combien coûte un parcours de mobilité chez Auto Conduite ?",
    slug: 'forfaits-tarifs-zones-explications',
    category: 'Forfaits',
    tags: ['forfaits', 'tarifs', 'zones', 'Sarrebourg'],
    author: AUTHOR,
    excerpt:
      "Pack 5h, 10h ou 20h, zones A, B et C : nos tarifs sont pensés pour être lisibles et accessibles. On vous explique comment se calcule le prix de votre forfait, sans surprise.",
    metaTitle: "Forfaits et tarifs Auto Conduite : zones A, B, C expliquées",
    metaDescription:
      "Découvrez les forfaits Auto Conduite (5h, 10h, 20h) et le calcul des zones A/B/C selon la distance au point de dépôt en Moselle. Des tarifs clairs, pour toutes les bourses.",
    content: `
<p>Chez Auto Conduite, on déteste les mauvaises surprises sur le prix. Nos forfaits sont conçus pour être simples à comprendre et accessibles à tous les budgets. Voici comment se calcule le coût de votre parcours de mobilité.</p>

<h2>Trois forfaits, trois besoins</h2>
<p>Que vous débutiez ou que vous ayez besoin de quelques heures pour finaliser votre préparation, il y a un forfait pour vous :</p>
<ul>
  <li><strong>Pack 5h</strong> (6 heures, avec 1 heure offerte) : idéal pour découvrir, reprendre confiance ou compléter.</li>
  <li><strong>Pack 10h</strong> : pour progresser sérieusement et viser l'autonomie.</li>
  <li><strong>Pack 20h, finançable CPF</strong> : le parcours complet pour préparer l'examen sereinement.</li>
</ul>

<h2>Les zones A, B et C, en clair</h2>
<p>Le prix dépend aussi de la distance entre votre domicile et le <strong>point de dépôt le plus proche</strong>. Plus le véhicule doit faire de route pour vous, plus le supplément carburant est élevé. C'est tout. Trois zones suffisent à couvrir le bassin :</p>
<ul>
  <li><strong>Zone A</strong> (0 à 15 km) : aucun supplément.</li>
  <li><strong>Zone B</strong> (15 à 35 km) : supplément de 15 € par forfait.</li>
  <li><strong>Zone C</strong> (plus de 35 km) : supplément de 30 € par forfait.</li>
</ul>

<h2>Les tarifs de référence</h2>
<p>À titre indicatif, voici les prix par forfait et par zone :</p>
<ul>
  <li><strong>Pack 5h</strong> : 199 € (zone A), 214 € (zone B), 229 € (zone C).</li>
  <li><strong>Pack 10h</strong> : 329 € (zone A), 344 € (zone B), 359 € (zone C).</li>
  <li><strong>Pack 20h (CPF)</strong> : 620 € (zone A), 635 € (zone B), 650 € (zone C).</li>
</ul>

<blockquote>Le prix s'ajuste à la distance, jamais à votre tête. La grille est la même pour tout le monde, c'est ça « pour toutes les bourses ».</blockquote>

<h2>Et le financement dans tout ça ?</h2>
<p>Ces tarifs sont des points de départ, pas une fatalité. Le pack 20h est <a href="/cpf">finançable avec le CPF</a>, et selon votre situation, des <a href="/financement">aides</a> peuvent réduire fortement le reste à charge : aide à la mobilité France Travail, microcrédit ADIE, Fonds d'Aide aux Jeunes. Un paiement en plusieurs fois est également possible pour lisser la dépense.</p>

<h2>Comment connaître votre prix exact</h2>
<p>Le plus simple est de partir de votre adresse pour déterminer votre zone, puis de choisir votre forfait. Rendez-vous sur la page <a href="/services">Forfaits</a> pour le détail, ou <a href="/contact">contactez-nous</a> : on calcule votre tarif avec vous, en toute transparence.</p>
`,
  },

  // 9 — PRESCRIPTEURS
  {
    title: "Prescripteurs : comment orienter un bénéficiaire vers une solution de mobilité",
    slug: 'prescripteurs-orienter-beneficiaire-mobilite',
    category: 'Prescripteurs',
    tags: ['prescripteurs', 'France Travail', 'Mission Locale', 'GEIQ'],
    author: AUTHOR,
    excerpt:
      "Conseiller France Travail, Mission Locale, travailleur social ou GEIQ : quand la mobilité bloque un parcours, voici comment orienter simplement et rapidement un bénéficiaire vers Auto Conduite.",
    metaTitle: "Orienter un bénéficiaire vers une solution de mobilité | Auto Conduite",
    metaDescription:
      "Guide pour les prescripteurs (France Travail, Mission Locale, GEIQ) : comment orienter un bénéficiaire en insertion vers Auto Conduite et lever le frein mobilité.",
    content: `
<p>Vous accompagnez des personnes en insertion, et vous le voyez chaque semaine : un parcours bien engagé peut caler sur une seule question, celle de la mobilité. Cet article s'adresse à vous, conseillers <strong>France Travail</strong>, <strong>Missions Locales</strong>, travailleurs sociaux et <strong>GEIQ</strong>, pour orienter vite et bien.</p>

<h2>Quand penser à Auto Conduite ?</h2>
<p>Dès qu'un frein mobilité apparaît dans un parcours : un emploi accessible seulement en voiture, une formation à l'autre bout du bassin, des horaires incompatibles avec les transports. Si votre bénéficiaire a (ou peut obtenir) son code et dispose d'un proche pour l'accompagner, le dispositif est sans doute adapté.</p>

<h2>Le profil idéal pour le dispositif</h2>
<ul>
  <li>Personne en parcours d'insertion (demandeur d'emploi, RSA, jeune suivi, salarié IAE).</li>
  <li>Capable d'obtenir un <strong>NEPH</strong> et de préparer le code de la route.</li>
  <li>Disposant d'un <strong>accompagnateur</strong> : un proche titulaire du permis B depuis 5 ans.</li>
  <li>Pour qui le permis lève un frein concret et identifié vers l'emploi.</li>
</ul>

<blockquote>Notre rôle n'est pas de remplacer votre accompagnement, mais de fournir la brique de mobilité qui lui manquait pour aboutir.</blockquote>

<h2>Une orientation simple et rapide</h2>
<p>Pas de circuit administratif lourd. Vous pouvez orienter un bénéficiaire en quelques minutes via notre page <a href="/prescripteurs">Prescripteurs</a>, qui réunit l'essentiel : présentation du dispositif, conditions d'éligibilité et formulaire d'orientation court. Une fiche de synthèse du dispositif est également disponible pour vos rendez-vous.</p>

<h2>Articuler avec les financements</h2>
<p>Le dispositif s'intègre naturellement avec les aides que vous mobilisez déjà : <a href="/cpf">CPF</a> (avec abondement possible pour les demandeurs d'emploi), aide à la mobilité France Travail, Fonds d'Aide aux Jeunes via la Mission Locale, microcrédit ADIE. Le détail figure sur la page <a href="/financement">Financement</a>. Le pack 20h étant finançable CPF, il s'inscrit facilement dans un plan de financement existant.</p>

<h2>Un impact mesurable</h2>
<p>Lever le frein mobilité, c'est souvent débloquer tout le reste : reprise d'emploi, entrée en formation, autonomie retrouvée. C'est exactement le type de résultat concret que recherchent les financeurs et les partenaires institutionnels du territoire.</p>

<h2>Échangeons directement</h2>
<p>Vous avez une situation précise à nous soumettre, ou vous souhaitez une présentation du dispositif pour votre équipe ? <a href="/contact">Contactez-nous</a>. On répond vite, et on construit l'orientation la plus simple pour vous comme pour le bénéficiaire.</p>
`,
  },

  // 10 — POINTS DE DÉPÔT / LOCAL
  {
    title: "Mobilité solidaire en Moselle : où récupérer votre véhicule pédagogique",
    slug: 'points-de-depot-vehicule-moselle-sarrebourg',
    category: 'Insertion & mobilité',
    tags: ['Sarrebourg', 'Château-Salins', 'points de dépôt', 'Moselle'],
    author: AUTHOR,
    excerpt:
      "Parking accessible 24h/24, gare, agence France Travail : Auto Conduite a choisi ses points de dépôt pour vous simplifier la vie dans le bassin de Sarrebourg et de Château-Salins. Tour d'horizon.",
    metaTitle: "Points de dépôt Auto Conduite à Sarrebourg et Château-Salins",
    metaDescription:
      "Où récupérer votre véhicule pédagogique à double commande dans le sud mosellan : Sarrebourg, Château-Salins et environs. Des points de dépôt pensés pour la proximité.",
    content: `
<p>Une solution de mobilité n'a de sens que si elle est, justement, à portée de main. C'est pourquoi Auto Conduite a choisi ses points de dépôt avec soin, dans le bassin de <strong>Sarrebourg</strong> et de <strong>Château-Salins</strong>, là où vivent et travaillent nos bénéficiaires.</p>

<h2>Récupérer le véhicule près de chez vous</h2>
<p>Le principe est simple : vous récupérez le <strong>véhicule pédagogique à double commande</strong> sur le point de dépôt le plus proche, votre <a href="/accompagnateur">accompagnateur</a> vous y rejoint, et votre séance commence. Pas de détour inutile, pas de kilomètres perdus avant même d'avoir commencé.</p>

<h2>Les points de dépôt du bassin</h2>
<ul>
  <li><strong>Parking Leclerc Sarrebourg</strong> : accessible 24h/24 et 7j/7, idéal pour des horaires flexibles.</li>
  <li><strong>Parking de la gare de Sarrebourg</strong> : parfait si vous arrivez en train depuis une commune voisine.</li>
  <li><strong>France Travail Sarrebourg</strong> (ZAC les Terrasses de la Sarre) : pratique pour combiner rendez-vous et séance.</li>
  <li><strong>Parking Intermarché Château-Salins</strong> : accessible 24h/24 et 7j/7, pour couvrir le secteur sud.</li>
  <li><strong>Mission Locale Sud Mosellan</strong> : point en cours de finalisation pour les jeunes accompagnés.</li>
</ul>

<blockquote>La proximité n'est pas un confort, c'est une condition. Plus le véhicule est proche, plus la mobilité devient réelle.</blockquote>

<h2>Comment la zone influence votre tarif</h2>
<p>La distance entre votre domicile et le point de dépôt le plus proche détermine votre zone (A, B ou C) et donc un éventuel supplément carburant. Rien de compliqué : la zone A (0 à 15 km) n'ajoute aucun supplément, la zone B en ajoute un léger, la zone C un peu plus. Tout est détaillé dans notre article sur les <a href="/blog/forfaits-tarifs-zones-explications">forfaits et zones</a> et sur la page <a href="/services">Forfaits</a>.</p>

<h2>Un maillage qui s'étoffe</h2>
<p>Nous faisons évoluer nos points de dépôt en fonction des besoins du territoire et de nos partenariats avec les acteurs locaux de l'insertion. Si un point manque près de chez vous, dites-le nous : votre retour nous aide à mieux couvrir le sud mosellan.</p>

<h2>Trouver votre point de dépôt</h2>
<p>Pour savoir quel point est le plus proche de votre domicile et connaître votre zone, le plus simple est de nous <a href="/contact">contacter</a> ou de consulter la page <a href="/comment-ca-marche">Comment ça marche</a>. La mobilité commence par un premier pas, et il est plus près que vous ne le pensez.</p>
`,
  },
]

export const blogSettings = {
  enabled: true,
  eyebrow: 'Le blog',
  title: 'Actualités & mobilité',
  description:
    "Conseils pratiques, financement du permis et mobilité solidaire en Moselle. Tout ce qu'il faut savoir pour avancer dans votre parcours, pour toutes les bourses.",
  categories: [
    'Insertion & mobilité',
    'Financement',
    'Conduite & permis',
    'Forfaits',
    'Prescripteurs',
  ],
}
