# Labo

Site statique où je range, teste et documente les outils que j'utilise en tant
que designer UX/UI.

Construit avec [Astro](https://astro.build) : chaque page est générée en HTML
au build. Les deux blocs animés de l'accueil (le hero et la grille) sont des
composants React chargés en îlots ; les pages de catégorie, elles, ne
téléchargent aucun framework.

## Démarrer

```sh
npm install
npm run dev      # serveur de développement
npm run build    # génère le site dans dist/
npm run preview  # sert dist/ comme en production
```

## Ajouter un outil

Tout le contenu vit dans `src/data/site.js`. Pour ajouter une fiche, ajoute un
objet au tableau `tools` de la catégorie concernée :

```js
{
  name: "Nom de l'outil",
  url: "https://exemple.com",
  summary: "Ce qu'il fait, et pourquoi il mérite sa place ici.",
  tags: ["Gratuit", "Palette"],
}
```

Les fiches livrées avec le site portent `example: true` et affichent un badge
« exemple ». Retire ce champ quand tu remplaces une fiche par la tienne.

Ajouter une catégorie revient à ajouter une entrée à `CATEGORIES` : la page,
l'entrée de navigation, la tuile de l'accueil et le lien de pied de page en
découlent automatiquement. Son `accent` doit correspondre à une paire de
couleurs déclarée dans `src/styles/site.css` (`--logo-bg` / `--logo-fg`, etc.),
et son `glyph` à une clé de la table `GLYPHS`.

## Le portrait

Le hero affiche `/Profil.png` en pastille circulaire. Dépose une image carrée
(512 px minimum) dans `public/Profil.png` : aucun autre changement n'est
nécessaire. Tant que le fichier est absent, l'avatar SVG de
`src/components/Avatar.jsx` prend le relais.

## Avant de mettre en ligne

`astro.config.mjs` contient `site: "https://labo.local"`. Remplace cette valeur
par l'URL réelle : elle sert aux balises canoniques et Open Graph, et reste
fausse tant qu'elle n'est pas corrigée.

## Structure

```
src/
  data/site.js          contenu : catégories et outils
  layouts/Base.astro    <head>, métadonnées, en-tête et pied de page
  pages/
    index.astro         accueil : hero + grille
    [category].astro    une page par catégorie
  components/
    Hero.jsx            hero animé (React + Framer Motion)
    BentoGrid.jsx       grille-sommaire animée
    SiteHeader.astro    barre de navigation
    ToolCard.astro      fiche outil
  styles/site.css       design system et mises en page
```
