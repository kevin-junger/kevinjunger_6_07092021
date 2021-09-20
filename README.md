# FishEye

> Sixième projet du parcours _développeur front-end_ chez OpenClassrooms.

## Contexte

FishEye est un site web qui permet aux photographes indépendants de créer leur portfolio pour présenter leurs meilleurs travaux, simplement, à de potentiels clients.

Le site web est obsolète et nécessite une refonte afin notamment de le rendre dynamique, _responsive_ et accessible (notamment aux utilisateurs malvoyants).

## Éléments fournis

- **Les [notes de réunion](https://s3.eu-west-1.amazonaws.com/course.oc-static.com/projects/Front-End+V2/P5+Javascript+%26+Accessibility/Notes+de+r%C3%A9union.pdf)** détaillant les principales fonctionnalités et exigences techniques à mettre en oeuvre ;
- **La [maquette du site](https://www.figma.com/file/pt8xJxC1QffW4HX16QhGZJ/UI-Design-FishEye-FR)**, en variante _desktop_ et _mobile_ ;
- **Des photos et vidéos d'exemple**, à utiliser pour la conception des pages ;
- **Un set de données au format JSON**, à utiliser en guise de base de données pour les besoins du développement.

## Cahier des charges

- **Généralités** : dépôt GitHub, séparation des fichiers HTML, CSS et JavaScript, validation W3C et WCAG (AChecker).
- Une attention toute particulière doit être portée sur **l'accessibilité**, aussi les attributs `alt` et _ARIA_ doivent être utilisés (ou créés, dans le cas d'éléments personnalisés).
- Les événements claviers doivent être gérées afin de faciliter la **navigation au clavier**.
- L'ergonomie du site pour les personnes malvoyantes devra être testée et validée par l'utilisation d'un **lecteur d'écran**.
- Le code doit être **commenté** et **testé**.

## Technologies mises en oeuvre

- HTML5 avec balises sémantiques et d'accessibilité (ARIA)
- CSS3 (Sass, Autoprefixer, `normalize.css`)
- Google Fonts (fonte de caractères _DM Sans_)
- Font Awesome (icônes)
- JavaScript (ES6) avec utilisation de programmation orientée objet et de _design patterns_
- JSON (pour la "base de données")

## Environnement

- Le projet a été réalisé sur Visual Studio équipé des _plugins_ Live Server, Prettier et ESLint, le tout avec NodeJS et npm, sous Linux.
- Plusieurs modules NodeJS ont été utilisés : `autoprefixer`, `chokidar-cli`, `eslint`, `eslint-config-airbnb-base`, `eslint-plugin-import`, `node-sass-chokidar`, `postcss` et `postcss-cli`.
- La majorité des débogages et tests de compatibilité ont été réalisés sous Mozilla Firefox et Google Chrome dans leurs dernières versions au moment de l'écriture, sur ordinateur (Linux) et téléphone (Android).
- N'ayant pas en ma possession les appareils nécessaires, la compatibilité avec Safari n'a pu être vérifiée à 100%, malgré l'emploi d'un navigateur (Epiphany) reposant sur le même moteur de rendu (WebKit).
