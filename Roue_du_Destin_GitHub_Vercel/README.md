# La Roue du Destin

Jeu de soirée en français : ajoutez 2 à 20 joueurs, faites tourner une roue pour leur durée de vie fictive (de 1 jour à 100 ans), puis une seconde roue pour leur fin improbable. Le jeu comporte 150 fins, dont beaucoup sont absurdes. Un récapitulatif termine la partie.

## Lancer en local

Ouvrez `index.html` dans un navigateur. Aucun compte, base de données, installation ou clé API n'est nécessaire. Une connexion Internet permet de charger les polices ; le jeu reste utilisable sans connexion.

## Mettre sur GitHub puis Vercel

1. Décompressez le ZIP, puis créez un dépôt GitHub et ajoutez **les quatre fichiers** (`index.html`, `styles.css`, `script.js` et ce README) à la racine du dépôt.
2. Dans Vercel : **Add New → Project → Import Git Repository** et sélectionnez ce dépôt.
3. Laissez le framework sur **Other**, sans commande de build. Laissez le dossier de sortie vide, puis cliquez sur **Deploy**.

Les deux roues et tous les résultats fonctionnent directement dans le navigateur. Aucun résultat n'est transmis ni stocké en ligne. Les résultats sont effacés quand on recharge la page.

## Modifier les fins

Éditez le tableau `DEATHS` au début de `script.js`. Chaque chaîne est une fin possible ; gardez la tournure qui suit naturellement « [prénom] termine son histoire… » dans le récapitulatif.
