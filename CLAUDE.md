# CLAUDE.md — La Compagnie Padacor

Mémoire de travail pour ce projet. À lire avant toute intervention.

## Le projet en une phrase

Site vitrine de **La Compagnie Padacor**, troupe de **théâtre d'improvisation normande**,
construit en **Jekyll** pour un hébergement **GitHub Pages**. Objectif n°1 : le
**référencement**, puis conduire le public vers la **billetterie** des spectacles.

## Marque & ton

- **Activité** : théâtre d'improvisation.
- **Cible** : public normand, tout âge.
- **Ton** : poétique, onirique, guinguette.
- **Écriture inclusive OBLIGATOIRE** partout (point médian : `comédien·nes`, `spectateur·rices`,
  `celles et ceux`, `chacun·e`…). C'est une contrainte non négociable du client.
- **Concurrents repères** : steacfrit.fr, euximpro.fr.

## Parti pris visuel (v1)

« La guinguette, à la tombée du soir ». Élégant, sobre, noir, stylé.

- **Couleurs** (voir `_sass/_tokens.scss`) : nuit chaude `#12100D`, or de guirlande `#E9B949`,
  halo `#F7E2A8`, crème `#F4EEE2`, brume `#A89F8E`. Pointe rose `#E0A6A0` très parcimonieuse.
- **Typos** : Fraunces (display, poétique), Ephesis (script « à la main »), Figtree (corps).
  Chargées via Google Fonts dans `_includes/head.html`.
- **Signature** : la **guirlande guinguette** en SVG (`_includes/guirlande.html`, styles dans
  `_sass/_guirlande.scss`) qui pend entre les sections et scintille (respecte
  `prefers-reduced-motion`). Élément identitaire directement tiré du logo — à préserver.
- Le client a prévenu que **ça peut changer** : garder le design tokenisé (variables CSS) pour
  pouvoir repeindre le site en changeant `_sass/_tokens.scss` uniquement.

## Architecture

```
_config.yml            Config, navigation (site.nav), réseaux, collections
Gemfile                Dépendances (github-pages + plugins)
index.html             Accueil (hero + agenda + spectacles + presse + équipe + newsletter)
404.html               Page d'erreur
robots.txt             SEO

pages/                 Pages fixes (URL fixée par le permalink de chaque fichier,
  agenda.html            /agenda/  — liste à venir + passés, billetterie
  spectacles.html        /spectacles/ — catalogue des formats
  iels-parlent-de-nous.html  /iels-parlent-de-nous/ — tous les articles de presse
  la-compagnie.md        /la-compagnie/ — histoire + démarche + équipe
  contact.html           /contact/ — formulaire (à brancher) + coordonnées
  mentions-legales.md    /mentions-legales/
  # NB : l'emplacement du fichier n'affecte PAS l'URL — c'est le champ
  #      `permalink:` en tête de fichier qui la fixe. index.html et 404.html
  #      doivent rester à la racine (contrainte Jekyll).

_layouts/   default, page, spectacle, evenement
_includes/  head, header, footer, guirlande, carte-evenement, carte-presse, reseaux, jsonld
_data/      equipe.yml, presse.yml, mois.yml (mois FR)
_sass/      _tokens, _base, _layout, _composants, _guirlande, _prose
_evenements/  collection Agenda (1 fichier = 1 date)
_spectacles/  collection Catalogue (1 fichier = 1 format)
assets/     css/main.scss, js/main.js, images/logo.jpg
```

## Gérer les événements (agenda + billetterie)

Un événement = **un fichier** dans `_evenements/`, nommé `AAAA-MM-JJ-slug.md`. Champs :

```yaml
titre: "Nom du spectacle"
date: 2026-08-14 20:30:00 +0200   # sert au tri ET au calcul à venir / passé
lieu: "Nom de la salle"
ville: "Caen"
spectacle: "Ces petits riens"      # rappel du format joué
prix: "12 € / 8 € réduit"
billetterie: "https://…"           # URL externe ; vide => bouton « Nous écrire »
complet: false                      # true => badge « Complet », masque la billetterie
photo: "/assets/images/evenements/…"  # optionnelle ; vide => pas de photo dans la pop-up
```

- **Pop-up de détails** : un clic sur une carte de l'agenda (accueil ou `/agenda/`) ouvre une
  pop-up avec la photo (si renseignée), la description longue (le corps Markdown du fichier,
  comme sur la page dédiée `/agenda/:slug/`) et le bouton « Réserver ». Généré dans
  `_includes/carte-evenement.html`, comportement dans `assets/js/main.js`.

- **À venir vs passé** : calculé en Liquid par comparaison `date >= site.time`. `site.time` est
  figé au **moment du build**. Un événement ne bascule donc en « passé » qu'au prochain déploiement.
  → Pour que l'agenda reste juste, prévoir une **reconstruction planifiée** (GitHub Actions cron,
  ex. quotidien) si les mises à jour manuelles ne suffisent pas.
- Les dates s'affichent en français via `_data/mois.yml` (indépendant de la locale serveur).

## Ajouter un format de spectacle

Un fichier dans `_spectacles/` (champs : `titre`, `format`, `accroche`, `duree`, `jauge`,
`public`, `ordre`, `excerpt`). Le corps Markdown est la page détaillée.

## Ajouter un article de presse (« Iels parlent de nous »)

Une entrée dans `_data/presse.yml` (champs : `titre`, `media`, `date`, `url` — lien vers
l'article en ligne —, `image` — photo/scan de l'article utilisée si `url` est vide, à déposer
dans `assets/images/presse/`). Triée par date décroissante automatiquement. L'accueil affiche les
3 articles les plus récents (bouton « Voir plus d'articles »), la page `/iels-parlent-de-nous/`
(accessible depuis le menu) affiche tous les articles.

## Référencement (priorité n°1)

- `jekyll-seo-tag` (balises title/description/OG/Twitter/canonical), `jekyll-sitemap`, `jekyll-feed`.
- **JSON-LD** dans `_includes/jsonld.html` : `PerformingGroup` partout + `TheaterEvent` pour
  chaque date à venir (accueil + agenda). Vérifier avec l'outil de test des résultats enrichis
  Google après mise en ligne.
- `robots.txt` + `sitemap.xml` générés. Renseigner `url:`/`baseurl:` dans `_config.yml` avec le
  domaine final avant déploiement (indispensable pour les URLs absolues du SEO/JSON-LD).
- Chaque page a un `title` + `description` propres. Garder cette discipline.

## À brancher / à compléter (placeholders volontaires)

- **Billetterie** : URLs `helloasso.com` factices dans les événements → mettre les vraies.
- **Photos des événements** : champ `photo:` vide dans tous les fichiers `_evenements/` → déposer
  une image par événement (ex. dans `assets/images/evenements/`) pour qu'elle apparaisse dans la
  pop-up de détails.
- **Formulaires** (contact + newsletter) : `action="#"` → brancher un service sans serveur
  (Formspree, Basin, HelloAsso, Brevo…).
- **Réseaux** : URLs d'exemple dans `_config.yml > reseaux` (vide = pastille masquée).
- **Presse** : entrées de démonstration dans `_data/presse.yml` → remplacer par les vraies
  parutions (titre, média, date, lien ou photo de l'article).
- **Équipe** : `_data/equipe.yml` — ajouter les photos (`photo:`) sinon une initiale dorée est
  générée. Sébastien et Alison figurent dans le PDF source ; Manon/Steeven/Clément aussi.
- **Textes** : témoignages et bios sont des placeholders (le PDF source contenait du faux texte).
- **Mentions légales** : compléter SIRET, licence entrepreneur·se de spectacles, responsable publication.

## Lancer en local

```bash
bundle install
bundle exec jekyll serve --livereload
# http://localhost:4000
```

## Déploiement GitHub Pages

Pousser sur la branche `main`. Dans Settings > Pages, choisir la source. Si c'est un site de
**projet** (`compte.github.io/repo`), renseigner `baseurl: "/repo"` dans `_config.yml`. Pour un
domaine personnalisé, ajouter un fichier `CNAME` et ajuster `url:`.
