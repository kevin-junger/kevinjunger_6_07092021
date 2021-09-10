# FishEye

> Sixième projet du parcours *développeur front-end* chez OpenClassrooms.

## Contexte

FishEye est un site web qui permet aux photographes indépendants de créer leur portfolio pour présenter leurs meilleurs travaux, simplement, à de potentiels clients.

Le site web est obsolète et nécessite une refonte afin notamment de le rendre dynamique, responsive et accessible (notamment aux utilisateurs malvoyants).

## Éléments fournis

- **Les [notes de réunion](https://s3.eu-west-1.amazonaws.com/course.oc-static.com/projects/Front-End+V2/P5+Javascript+%26+Accessibility/Notes+de+r%C3%A9union.pdf)** détaillant les principales fonctionnalités et exigences techniques à mettre en oeuvre ;
- **La [maquette du site](https://www.figma.com/file/pt8xJxC1QffW4HX16QhGZJ/UI-Design-FishEye-FR)**, en variante *desktop* et *mobile* ;
- **Des photos et vidéos d'exemple**, à utiliser pour la conception des pages ;
- **Un set de données au format JSON**, à utiliser en guise de base de données pour les besoins du développement.

## Cahier des charges

- **Généralités** : dépôt GitHub, séparation des fichiers HTML, CSS et JavaScript, validation W3C et WCAG (AChecker).
- Une attention toute particulière doit être portée sur **l'accessibilité**, aussi les attributs *alt* et *ARIA* doivent être utilisés (ou créés, dans le cas d'éléments personnalisés).
- Les événements claviers doivent être gérées afin de faciliter la **navigation au clavier**.
- L'ergonomie du site pour les personnes malvoyantes devra être testée et validée par l'utilisation d'un **lecteur d'écran**.
- Le code doit être **commenté** et **testé**.

## Technologies mises en oeuvre

- HTML5 avec balises sémantiques et d'accessibilité (ARIA)
- CSS3 (Sass, Autoprefixer, Normalize)
- Google Fonts (fonte de caractères *DM Sans*)
- Font Awesome (icônes)
- JavaScript (ES6) avec utilisation de programmation orientée objet et de design patterns
- JSON (pour la "base de données")

## Environnement

- Le projet a été réalisé sur Visual Studio équipé des plugins Live Server, Prettier et ES Lint, le tout sous Linux (Pop!_OS 20.04 LTS).
- La majorité des débogages et tests de compatibilité ont été réalisés sous Mozilla Firefox et Google Chrome dans leurs dernières versions au moment de l'écriture, sur ordinateur (Linux et Windows) et téléphone (Android).
- La compatibilité avec Safari n'a pu être vérifiée à 100%, malgré l'emploi d'un navigateur (Epiphany) reposant sur le même moteur de rendu.