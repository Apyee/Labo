export const SITE = {
  name: "Labo",
  tagline: "Les outils d'un designer UX/UI",
  description:
    "Le labo où je range, teste et documente les outils que j'utilise au quotidien en tant que designer UX/UI.",
};

/**
 * Une catégorie = une page du site.
 *
 * `accent` référence les paires de couleurs déjà définies dans site.css
 * (--logo-bg / --logo-fg, etc.), pour que la grille et les pages restent
 * sur la même palette.
 *
 * Pour ajouter un outil : copier un objet de `tools` et retirer
 * `example: true`. Les fiches marquées `example` affichent un badge
 * « exemple » et sont là uniquement pour montrer le gabarit.
 */
export const CATEGORIES = [
  {
    slug: "logo",
    label: "Logo",
    accent: "logo",
    glyph: "asterisk",
    intro:
      "Générateurs de marques, banques de logos et outils de vectorisation pour dessiner et décliner une identité.",
    tools: [],
  },
  {
    slug: "typographie",
    label: "Typographie",
    accent: "typo",
    glyph: "specimen",
    intro:
      "Fonderies, catalogues et outils d'appairage pour choisir une police et vérifier qu'elle tient à toutes les tailles.",
    tools: [
      {
        name: "Fontshare",
        url: "https://www.fontshare.com",
        summary:
          "Fonderie indienne qui publie ses familles en licence libre, usage commercial compris. Le catalogue est court, ce qui est précisément son intérêt : tout y est utilisable.",
        tags: ["Gratuit", "Fonderie"],
        example: true,
      },
      {
        name: "Fonts In Use",
        url: "https://fontsinuse.com",
        summary:
          "Archive de typographies vues en contexte réel — affiches, emballages, sites. Utile pour juger une police sur pièce plutôt que sur un specimen.",
        tags: ["Gratuit", "Référence"],
        example: true,
      },
      {
        name: "Wakamai Fondue",
        url: "https://wakamaifondue.com",
        summary:
          "On y dépose un fichier de police et il en sort tout ce qu'elle sait faire : axes variables, ligatures, jeux de caractères, fonctionnalités OpenType.",
        tags: ["Gratuit", "Inspection"],
        example: true,
      },
    ],
  },
  {
    slug: "couleur",
    label: "Couleur",
    accent: "color",
    glyph: "dots",
    intro:
      "Constructeurs de palettes et vérificateurs de contraste, pour composer une gamme qui reste lisible une fois à l'écran.",
    tools: [
      {
        name: "Realtime Colors",
        url: "https://www.realtimecolors.com",
        summary:
          "Applique une palette sur une maquette de page complète en direct. Beaucoup plus parlant qu'une rangée de pastilles pour juger un contraste.",
        tags: ["Gratuit", "Palette"],
        example: true,
      },
      {
        name: "APCA Contrast Calculator",
        url: "https://www.myndex.com/APCA/",
        summary:
          "Le calcul de contraste qui remplace le ratio WCAG 2 : il tient compte du poids et de la taille du texte, pas seulement des deux couleurs.",
        tags: ["Gratuit", "Accessibilité"],
        example: true,
      },
    ],
  },
  {
    slug: "inspiration",
    label: "Inspiration",
    accent: "inspi",
    glyph: "dshapes",
    intro:
      "Galeries et archives à parcourir quand une direction artistique ne vient pas — ou qu'elle vient trop vite et se ressemble.",
    tools: [],
  },
  {
    slug: "iconographie",
    label: "Iconographie",
    accent: "icono",
    glyph: "gear",
    intro:
      "Jeux d'icônes cohérents et outils de retouche vectorielle, pour ne pas mélanger cinq grammaires dans une même interface.",
    tools: [],
  },
];

export const getCategory = (slug) => CATEGORIES.find((c) => c.slug === slug);
