# La Compagnie Padacor — site officiel

Site vitrine de **La Compagnie Padacor**, troupe de théâtre d'improvisation en Normandie.
Construit avec **Jekyll**, hébergé sur **GitHub Pages**.

## Démarrer en local

Pré-requis : Ruby + Bundler.

```bash
bundle install
bundle exec jekyll serve --livereload
```

Le site est alors disponible sur <http://localhost:4000>.

## Contenu à mettre à jour au quotidien

- **Ajouter une date** → un fichier dans `_evenements/` (voir `CLAUDE.md` pour les champs).
- **Ajouter/modifier un spectacle** → un fichier dans `_spectacles/`.
- **L'équipe** → `_data/equipe.yml`.
- **Les avis** → `_data/temoignages.yml`.
- **Réseaux, e-mail, billetterie par défaut, domaine** → `_config.yml`.

## Documentation

Voir **`CLAUDE.md`** : parti pris visuel, architecture, gestion de l'agenda, référencement et
liste des éléments à brancher (billetterie, formulaires, mentions légales).

## Licence

© La Compagnie Padacor. Tous droits réservés.
