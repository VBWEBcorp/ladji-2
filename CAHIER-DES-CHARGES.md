# AUTO CONDUITE — Cahier des Charges Site Internet

> **Document de référence officiel** — M. Faé — Moselle, Mai 2026
> *Version V1.0 — Territoire : Moselle (Grand Est) — Langue principale : français — Statut : à développer*

## 1. Contexte et objectif du site

Auto Conduite est un service de **mobilité solidaire** basé en Moselle. Il met à disposition des véhicules pédagogiques à double commande pour des personnes en parcours d'insertion professionnelle, orientées par France Travail, les Missions Locales et le Département de la Moselle.

Le site internet est le point d'entrée unique du service. Il doit permettre à un bénéficiaire de comprendre le dispositif, vérifier son éligibilité, uploader ses documents, choisir son forfait, payer et accéder au dispositif — le tout sans intervention manuelle de M. Faé sauf pour la validation finale du dossier.

### Règle absolue de positionnement

Auto Conduite **n'est PAS une auto-école**. Le site ne doit jamais utiliser les termes : *cours de conduite, leçon, moniteur officiel, formation réglementaire*.

Formuler systématiquement : **outil pédagogique à double commande**, **brique de mobilité**, **véhicule pédagogique**.

## 2. Cibles et profils utilisateurs

| Profil | Qui c'est | Ce qu'il cherche sur le site |
|---|---|---|
| **Bénéficiaire** | Personne en insertion, orientée par un prescripteur. Peut être peu à l'aise avec le numérique. | Comprendre simplement, vérifier son éligibilité, s'inscrire, payer, réserver. |
| **Accompagnateur proche** | Proche de confiance avec permis B depuis 5 ans minimum. | Comprendre son rôle, les règles de sécurité, comment ça se passe. |
| **Prescripteur** | Conseiller France Travail, Mission Locale, assistant social, GEIQ. | Orienter rapidement un bénéficiaire, accéder à une fiche de synthèse, suivre ses dossiers. |
| **Visiteur institutionnel** | Collectivité, financeur, partenaire potentiel. | Comprendre le dispositif, son impact social, ses partenaires. |

## 3. Structure des pages

### 3.1 Accueil
- Accroche principale : « Pour toutes les bourses » — lisible en 3 secondes
- Explication du dispositif en 3 étapes simples (icônes + texte court)
- Bouton CTA principal : « Vérifier mon éligibilité »
- Bouton secondaire : « Voir les forfaits »
- Vidéo de présentation intégrée (voir Section 5)
- Logos partenaires : France Travail, Mission Locale, Région Grand Est, GEIQ Alemploi, ADAM
- Section témoignages bénéficiaires (à alimenter progressivement)
- Bouton WhatsApp Business visible en permanence (bas de page)
- Bouton appel direct mobile (cliquable sur smartphone)

### 3.2 Comment ça marche
- Parcours bénéficiaire étape par étape : NEPH → inscription → forfait → paiement → briefing → réservation → séance
- Vidéo d'explication du déroulement d'une séance
- Explication du rôle de l'accompagnateur proche
- Lien vers ants.gouv.fr pour obtenir le NEPH (guide pas à pas)
- Lien vers Codeclic pour le code de la route en ligne (17€)
- FAQ courte intégrée en bas de page

### 3.3 Forfaits et Tarifs
*Page centrale du parcours commercial. Intègre la carte dynamique et l'ajustement automatique des prix selon la zone kilométrique.*

- Carte dynamique Google Maps — adresse → détection zone A/B/C → prix en temps réel
- Affichage des 3 forfaits avec prix ajustés
- Tableau récapitulatif des zones (A : 0-15 km / B : 15-35 km / C : +35 km)
- Suppléments carburant : Zone A +0€ / Zone B +15€ / Zone C +30€ par forfait
- Bouton de paiement Stripe intégré
- Solution ALMA (paiement fractionné 2x/3x/4x) — *compte à ouvrir*
- Lien vers moncompteformation.gouv.fr (Pack 20h CPF)
- Calculateur de financement selon profil (DE, RSA, salarié IAE, jeune Mission Locale)
- Mention ADIE pour bénéficiaires RSA sans CPF ni ALMA

**Forfaits officiels — tarifs de référence**

| Forfait | Zone A | Zone B (+15€) | Zone C (+30€) |
|---|---|---|---|
| Pack 5h (6h avec 1h offerte) | 199 € | 214 € | 229 € |
| Pack 10h | 329 € | 344 € | 359 € |
| Pack 20h (finançable CPF) | 620 € | 635 € | 650 € |

### 3.4 Financement
- Explication du CPF : moncompteformation.gouv.fr, plafond 900€ pour DE inscrits France Travail
- Tableau des financeurs selon profil (DE / RSA / jeune 16-25 / salarié IAE / sans solution)
- ALMA : paiement fractionné pour le reste à charge — compte à ouvrir
- ADIE : microcrédit personnel pour bénéficiaires RSA sans CPF suffisant ni ALMA (lien ADIE Lorraine)
- Aide mobilité France Travail (jusqu'à 1200€)
- Fonds d'Aide aux Jeunes (FAJ) via Mission Locale
- Abondement Département de la Moselle (convention en cours de négociation)

### 3.5 Prescripteurs
- Fiche synthétique du dispositif téléchargeable en PDF
- Formulaire d'orientation bénéficiaire en ligne (5 champs max)
- Accès à l'espace prescripteur sécurisé (rapports anonymisés mensuels)
- Contacts directs : M. Faé — 06 37 53 43 26 — faeladg@icloud.com
- Section dédiée aux clauses sociales avec données Moselle

### 3.6 Accompagnateur
- Rôle exact de l'accompagnateur proche
- Conditions obligatoires : permis B depuis 5 ans minimum, non suspendu, sobre
- Ce qu'il peut faire / ce qu'il ne peut pas faire
- Guide pédagogique de l'accompagnateur (téléchargeable)
- Vidéo de briefing sécurité

### 3.7 Pages légales et institutionnelles
- Qui sommes-nous — fondateur, mission ESS, valeurs
- Cadre légal — loi L221-7, candidat libre expliqué simplement
- Partenaires — logos et liens
- Blog / Actualités (SEO + visibilité institutionnelle)
- Mentions légales
- CGU — avec clause zones kilométriques et carburant
- Politique de confidentialité RGPD
- Politique de cookies
- Accessibilité RGAA (obligation légale)

## 4. Fonctionnalités techniques

### 4.1 Carte dynamique zones kilométriques

**Fonctionnement attendu**
1. Le bénéficiaire entre son adresse sur la page Forfaits
2. Google Maps API calcule la distance entre son adresse et le point de dépôt le plus proche
3. La zone est détectée automatiquement (A / B / C) et colorisée sur la carte
4. Les 3 forfaits s'affichent avec le bon prix en temps réel selon la zone
5. Le bénéficiaire voit aussi le point de dépôt le plus proche

**Points de dépôt à intégrer** (bassin Sarrebourg / Château-Salins) :
- Parking Leclerc Sarrebourg — accessible 24h/24, 7j/7
- Parking Gare de Sarrebourg — pour bénéficiaires arrivant en train
- France Travail Sarrebourg — ZAC les Terrasses de la Sarre
- Parking Intermarché Château-Salins — accessible 24h/24, 7j/7
- Mission Locale Sud Mosellan — à confirmer

### 4.2 Formulaire d'éligibilité et upload de documents

**Documents obligatoires à uploader** :
- Pièce d'identité (CNI recto-verso ou passeport)
- Numéro NEPH — justificatif d'inscription à l'examen
- Attestation code de la route réussi
- Coordonnées de l'accompagnateur proche (nom, prénom, numéro de permis B, date de validité)
- Justificatif de domicile — pour calcul automatique de la zone kilométrique

**Flux après upload** :
- n8n reçoit le dossier complet et génère une fiche récapitulative pour M. Faé
- M. Faé valide le dossier manuellement (2 à 3 minutes par dossier)
- Après validation : création manuelle du compte TMOBILITY par M. Faé
- n8n déclenche automatiquement l'onboarding : SMS + email de bienvenue + briefing obligatoire

### 4.3 Paiement

| Solution | Statut | Usage |
|---|---|---|
| **Stripe** | ✅ Actif | Paiement comptant sécurisé. Pré-autorisation caution 600€ par réservation. |
| **ALMA** | ⏳ À mettre en place | Paiement fractionné 2x/3x/4x. Compte à ouvrir. |
| **CPF via ADAM** | ✅ Actif | Pack 20h finançable. ADAM gère le portage. Lien moncompteformation.gouv.fr. |
| **ADIE Lorraine** | ⏳ Partenariat à formaliser | Microcrédit personnel pour bénéficiaires RSA. |

### 4.4 Briefing obligatoire intégré
- Vidéo de briefing sécurité obligatoire — visionnage traçé
- Quiz de validation (score minimum 80% requis)
- Blocage automatique de l'accès au véhicule si quiz non validé
- Attestation de visionnage générée automatiquement
- Nouveau lien quiz envoyé si score insuffisant — avec encouragements

### 4.5 Liens externes intégrés

| Lien | URL | Usage |
|---|---|---|
| Inscription NEPH | ants.gouv.fr | Obtenir le NEPH (guide pas à pas) |
| Code de la route | codeclic.fr | Passage du code en ligne à 17€ |
| CPF | moncompteformation.gouv.fr | Accès au forfait 20h finançable |
| Réservation examen | ants.gouv.fr | Réservation de la date d'examen |
| ADIE Lorraine | adie.org | Microcrédit pour RSA sans CPF suffisant |

### 4.6 Communication et support
- Chatbot LIMOVA intégré 24h/24 — visible sur toutes les pages
- Bouton WhatsApp Business — contact direct en un clic
- Bouton appel direct mobile — 06 37 53 43 26 cliquable
- Formulaire de contact standard — réponse automatique sous 2h via n8n
- Réponse automatique emails entrants via LIMOVA

## 5. Contenus vidéo à intégrer

*Budget vidéo disponible : 700€ maximum.*

| N° | Titre | Durée | Page | Contenu |
|---|---|---|---|---|
| 1 | Comment s'inscrire | 2-3 min | Accueil / Comment ça marche | NEPH → code → forfait → paiement → confirmation |
| 2 | Déroulement d'une séance | 3-4 min | Comment ça marche | Récupération véhicule → rôle accompagnateur → séance → bilan |
| 3 | Briefing sécurité obligatoire | 5-8 min | Briefing (accès restreint) | Double commande → posture accompagnateur → règles sécurité + quiz |
| 4 | L'IA Auto Conduite | 1-2 min | Accueil / Comment ça marche | Bilan post-séance automatique, rapport mensuel, conseils personnalisés |

## 6. Multilingue

Le bassin Sarrebourg/Moselle est frontalier avec l'Allemagne et accueille des populations turques et d'Europe de l'Est. Le site doit être accessible dans 4 langues.

| Langue | Priorité | Justification |
|---|---|---|
| **Français** | 🔴 Principal | Langue de service — 100% du contenu |
| **Allemand** | 🔴 Prioritaire | Bassin frontalier — travailleurs frontaliers, familles germanophones |
| **Turc** | 🔴 Important | Population significative sur le bassin Moselle |
| **Anglais** | 🔴 Important | Langue universelle — publics européens variés |

## 7. Exigences techniques

### 7.1 Priorités de développement
- **Mobile first** — la majorité des bénéficiaires accèdent via smartphone
- Temps de chargement < 3 secondes sur mobile (LCP < 2,5s)
- Compatibilité : Chrome, Firefox, Safari, Edge — iOS et Android
- Technologie à confirmer (pas WordPress de préférence)

### 7.2 Intégrations techniques requises

| Outil | Statut | Rôle sur le site |
|---|---|---|
| Google Maps API | ⏳ À configurer | Carte dynamique zones A/B/C + points de dépôt |
| Stripe | ✅ Actif | Paiement forfaits + pré-autorisation caution 600€ |
| ALMA | ⏳ À mettre en place | Paiement fractionné reste à charge |
| LIMOVA | ✅ Actif | Chatbot 24h/24 intégré sur le site |
| n8n | ✅ Architecture définie | Réception webhooks formulaire + déclenchement workflows |
| Google Analytics 4 | ⏳ À configurer | Suivi trafic et conversions |
| Pixel Meta | ⏳ À configurer | Campagnes publicitaires futures |
| WhatsApp Business | ⏳ À configurer | Bouton contact direct |

### 7.3 Conformité légale
- RGPD — politique de confidentialité, registre des traitements, consentements traçés
- RGAA — accessibilité numérique (obligation légale pour services publics et assimilés)
- Cookies — bandeau de consentement conforme CNIL
- CGU intégrant la clause zones kilométriques et suppléments carburant
- Mentions légales complètes
- Hébergeur en Europe (conformité RGPD sur localisation des données)

### 7.4 Sécurité
- HTTPS obligatoire — certificat SSL
- Upload de documents sécurisé — stockage chiffré
- Authentification espace prescripteur — accès sécurisé
- Aucune donnée bénéficiaire en clair dans les URLs
- Logs d'accès activés

## 8. Espaces connectés

### 8.1 Espace bénéficiaire
- Suivi des heures restantes dans le forfait
- Historique des séances
- Accès au bilan IA post-séance
- Statut du briefing (non validé / validé)
- Lien de réservation TMOBILITY
- Documents uploadés et statut de validation

### 8.2 Espace prescripteur
- Formulaire d'orientation bénéficiaire simplifié (5 champs)
- Suivi des bénéficiaires orientés (données anonymisées)
- Rapport mensuel d'impact automatique
- Téléchargement des fiches synthétiques Auto Conduite

## 9. Flux complet bénéficiaire sur le site

| N° | Étape | Détail |
|---|---|---|
| 1 | Arrivée sur le site | Via lien prescripteur, recherche Google ou QR code |
| 2 | Compréhension du dispositif | Page d'accueil + vidéo présentation (2-3 min) |
| 3 | Vérification éligibilité | Formulaire simple : âge, NEPH, accompagnateur disponible |
| 4 | Choix du forfait | Carte dynamique → zone détectée → prix affiché → forfait choisi |
| 5 | Upload des documents | CNI, NEPH, permis accompagnateur, justificatif domicile |
| 6 | Paiement | Stripe comptant OU ALMA fractionné OU CPF via ADAM |
| 7 | Validation par M. Faé | n8n génère la fiche → M. Faé valide en 1 clic |
| 8 | Onboarding automatique | n8n déclenche SMS + email + briefing |
| 9 | Briefing sécurité | Vidéo + quiz 80% minimum → déblocage accès TMOBILITY |
| 10 | Réservation | Bénéficiaire réserve son créneau sur TMOBILITY |
| 11 | Rappels automatiques | SMS J-1 et H-2 avant la séance via n8n |
| 12 | Séance | Accompagnateur récupère le véhicule → rejoint le bénéficiaire |
| 13 | Bilan IA | Bilan personnalisé envoyé dans les 5 minutes après la séance |

## 10. Livrables attendus et priorités

| # | Livrable | Priorité | Statut |
|---|---|---|---|
| 1 | Site complet mobile first avec toutes les pages | OBLIGATOIRE | À développer |
| 2 | Carte dynamique Google Maps zones A/B/C | OBLIGATOIRE | API à configurer |
| 3 | Formulaire éligibilité + upload documents sécurisé | OBLIGATOIRE | À développer |
| 4 | Intégration Stripe paiement | OBLIGATOIRE | Compte actif |
| 5 | Briefing vidéo + quiz bloquant intégré | OBLIGATOIRE | Vidéos à produire |
| 6 | Chatbot LIMOVA intégré | OBLIGATOIRE | LIMOVA actif |
| 7 | Espace bénéficiaire + espace prescripteur | IMPORTANT | À développer |
| 8 | Intégration ALMA paiement fractionné | IMPORTANT | Compte ALMA à ouvrir |
| 9 | Multilingue FR / DE / TR / EN | IMPORTANT | À développer |
| 10 | Google Analytics 4 + Pixel Meta | IMPORTANT | À configurer |
| 11 | Conformité RGPD / RGAA / CGU | IMPORTANT | À rédiger + intégrer |
| 12 | Blog / Actualités | SECONDAIRE | À développer |

## 11. Contacts et validation

**Porteur du projet : M. Faé — Auto Conduite**
- Email : faeladg@icloud.com
- Téléphone : 06 37 53 43 26
- Territoire : Moselle — Bassin Sarrebourg / Château-Salins

*Toute question technique sur ce cahier des charges doit être adressée directement à M. Faé avant le début du développement.*

---

*Auto Conduite — Pour toutes les bourses — Moselle, Mai 2026*
