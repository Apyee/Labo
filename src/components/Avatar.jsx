// Placeholder illustré (casquette + casque audio) — à remplacer par le vrai
// avatar : déposer l'image dans src/assets/ et l'utiliser à la place de ce SVG.
export default function Avatar({ size = 96, title = "Avatar Labo" }) {
  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      role="img"
      aria-label={title}
      style={{ display: "block" }}
    >
      <circle cx="60" cy="60" r="60" fill="var(--blue)" />
      {/* arceau du casque */}
      <path
        d="M28 64 C28 26 92 26 92 64"
        fill="none"
        stroke="#101010"
        strokeWidth="5"
        strokeLinecap="round"
      />
      {/* tête */}
      <ellipse
        cx="60"
        cy="71"
        rx="24"
        ry="27"
        fill="#f0f0f0"
        stroke="#101010"
        strokeWidth="3"
      />
      {/* cheveux latéraux */}
      <path d="M38 62 q-3 10 2 17 l5 -3 q-4 -7 -2 -13 Z" fill="#101010" />
      <path d="M82 62 q3 10 -2 17 l-5 -3 q4 -7 2 -13 Z" fill="#101010" />
      {/* casquette */}
      <path
        d="M36 56 C38 36 82 36 84 56 C68 50 52 50 36 56 Z"
        fill="#ffffff"
        stroke="#101010"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M36 56 Q28 58 26 62 Q38 60 48 58 Z"
        fill="#ffffff"
        stroke="#101010"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* visage */}
      <circle cx="51" cy="72" r="2.6" fill="#101010" />
      <circle cx="69" cy="72" r="2.6" fill="#101010" />
      <path d="M46 66 q5 -4 9 -1" fill="none" stroke="#101010" strokeWidth="2" strokeLinecap="round" />
      <path d="M65 65 q5 -3 9 1" fill="none" stroke="#101010" strokeWidth="2" strokeLinecap="round" />
      <path d="M60 72 q-3 7 1 9" fill="none" stroke="#101010" strokeWidth="2" strokeLinecap="round" />
      <path d="M54 88 q6 4 12 0" fill="none" stroke="#101010" strokeWidth="2.4" strokeLinecap="round" />
      {/* écouteurs */}
      <rect x="84" y="58" width="11" height="20" rx="5" fill="#101010" />
      <rect x="25" y="58" width="9" height="18" rx="4" fill="#101010" />
      {/* fil */}
      <path
        d="M90 78 q7 12 -3 20"
        fill="none"
        stroke="#101010"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
