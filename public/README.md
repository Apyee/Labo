# public/

Fichiers servis tels quels à la racine du site (`public/Profil.png` → `/Profil.png`).

## Profil.png

Le Hero affiche `/Profil.png` en pastille circulaire. Dépose ton portrait ici sous
ce nom exact — aucun autre changement n'est nécessaire.

- Format : PNG ou JPG, carré de préférence (l'image est recadrée en `object-fit: cover`)
- Taille conseillée : 512 × 512 px minimum (la pastille monte à ~96 px, ×2 pour les écrans HiDPI)

Tant que le fichier est absent, le Hero retombe automatiquement sur l'avatar SVG
de `src/components/Avatar.jsx` — la page ne casse jamais.
