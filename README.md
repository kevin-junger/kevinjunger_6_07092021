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
- JavaScript (ES6) avec utilisation de programmation orientée objet et de _design patterns_ (_Factory Method_ et _MVC_)
- JSON (pour la "base de données")

## Environnement

- Le projet a été réalisé sur Visual Studio équipé des _plugins_ Live Server, Prettier et ESLint, le tout avec NodeJS et npm, sous Linux.
- Plusieurs modules NodeJS ont été utilisés : `eslint`, `eslint-config-airbnb-base`, `eslint-config-prettier`, `eslint-plugin-import`, `eslint-plugin-prettier`, `prettier` et `sass`. Les fichiers de configuration du projet sont fournis, mais les dépendances doivent être installées en local par la suite.
- La majorité des débogages et tests de compatibilité ont été réalisés sous Mozilla Firefox et Google Chrome dans leurs dernières versions au moment de l'écriture, sur ordinateur (Linux) et téléphone (Android).
- Les tests impliquant l'utilisation de **lecteurs d'écrans** ont été effectués sur **3 configurations différentes** :
  1.  _Mozilla Firefox sous Linux (Ubuntu 20.04 LTS) avec lecteur d'écran Orca (fourni avec l'environnement de bureau par défaut)_
  2.  _Google Chrome sous Linux (Ubuntu 20.04 LTS) avec lecteur d'écran ChromeVox (installé en tant qu'extension au sein du navigateur)_
  3.  _Microsoft Edge sous Windows 10 (révision 21H1) en machine virtuelle, avec lecteur d'écran NVDA 2021.2_
  4.  _Google Chrome sous Windows 10 (révision 21H1) avec lecteur d'écran ChromeVox (installé en tant qu'extension au sein du navigateur)_
- N'ayant pas en ma possession d'appareils sous macOS ou iOS, la compatibilité avec Safari n'a pu être vérifiée.

## Problèmes connus

- En utilisant **Google Chrome sous Linux avec l'extension ChromeVox**, lors de l'ouverture de la _lightbox_, le focus n'est pas redirigé sur le média. L'affichage du média précédant ou suivant avec les flèches du clavier fonctionne cependant, le focus se fait à ce moment-là et le média est retranscrit comme prévu. La même combinaison de navigateur et extension sous Windows n'occasionne pas ce problème.
- À l'inverse, en utilisant **Orca (Linux)** ou **NVDA (Windows)**, le focus se fait et la retranscription se fait correctement. En revanche, le défilement au clavier ne marche pas, il faut utiliser les boutons de l'interface en sélectionnant avec Tab ou Shift+Tab.
- Dans les deux cas, la touche Echap est fonctionnelle pour sortir de la _lightbox_, et le bouton fermer a été rendu inaccessible afin d'éviter une redondance.
- En utilisant **Google Chrome avec l'extension ChromeVox**, quel que soit le système d'exploitation, l'ouverture du menu déroulant permettant le choix de la méthode de tri de la galerie grâce à la touche Entrée n'est pas possible. En revanche, sélectionner la méthode de tri avec les touches Haut et Bas du clavier fonctionne.
- En utilisant **Orca sous Linux**, lors de l'affichage de la boîte de dialogue à la soumission du formulaire, le lecteur ne lit pas le message de cette boîte de dialogue, bien que le focus soit au bon endroit.
