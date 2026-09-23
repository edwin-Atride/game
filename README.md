# La Roue du Destin

Jeu de soirée en français : ajoutez 2 à 20 joueurs, faites tourner une roue pour leur durée de vie fictive (de 1 jour à 100 ans), puis une seconde roue pour leur fin. Le jeu comporte **335 fins distinctes** inspirées de situations plausibles. La première roue possède **1 383 résultats libellés** en jours (1–31), semaines (1–52), mois (1–1 200) ou années (1–100). Elle affiche le résultat dans l'unité tirée : « 48 mois » reste « 48 mois ». Un récapitulatif termine la partie.

## Lancer en local

Ouvrez `index.html` dans un navigateur. Aucun compte, base de données, installation ou clé API n'est nécessaire. Une connexion Internet permet de charger les polices ; le jeu reste utilisable sans connexion.

## Mettre sur GitHub puis Vercel

1. Décompressez le ZIP, puis créez un dépôt GitHub et ajoutez **les cinq fichiers** (`index.html`, `styles.css`, `script.js`, `deaths.js` et ce README) à la racine du dépôt.
2. Dans Vercel : **Add New → Project → Import Git Repository** et sélectionnez ce dépôt.
3. Laissez le framework sur **Other**, sans commande de build. Laissez le dossier de sortie vide, puis cliquez sur **Deploy**.

Les deux roues et tous les résultats fonctionnent directement dans le navigateur. Aucun résultat n'est transmis ni stocké en ligne. Les résultats sont effacés quand on recharge la page.

## Modifier les fins

Éditez les groupes dans `deaths.js`. Chaque chaîne est une fin possible. Les tirages des durées se règlent dans la fonction `randomLife` de `script.js`.
