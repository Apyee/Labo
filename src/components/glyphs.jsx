// Glyphes SVG des tuiles — dessinés en interne, couleur héritée via currentColor.

export function Asterisk() {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true">
      <g fill="currentColor">
        {[0, 45, 90, 135].map((deg) => (
          <rect
            key={deg}
            x="40"
            y="0"
            width="20"
            height="100"
            rx="1"
            transform={`rotate(${deg} 50 50)`}
          />
        ))}
      </g>
    </svg>
  );
}

export function Dots() {
  const pos = [18, 60, 102];
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true">
      <g fill="currentColor">
        {pos.map((cy) =>
          pos.map((cx) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="13.5" />),
        )}
      </g>
    </svg>
  );
}

export function DShapes() {
  return (
    <svg viewBox="0 0 132 100" aria-hidden="true">
      <g fill="currentColor">
        <path d="M10 2 A48 48 0 0 1 10 98 Z" />
        <path d="M72 14 A42 42 0 0 1 72 98 Z" />
      </g>
    </svg>
  );
}

// Engrenage à pétales arrondis, généré par arcs alternés (pétale / cercle de base).
function gearD(cx, cy, r, petals = 8) {
  const pt = (a) => `${(cx + r * Math.cos(a)).toFixed(2)} ${(cy + r * Math.sin(a)).toFixed(2)}`;
  const step = (2 * Math.PI) / petals;
  const half = step * 0.32;
  const pr = (r * 0.34).toFixed(2);
  let d = `M ${pt(-half)} `;
  for (let i = 0; i < petals; i++) {
    const a = i * step;
    d += `A ${pr} ${pr} 0 0 1 ${pt(a + half)} `;
    d += `A ${r} ${r} 0 0 1 ${pt(a + step - half)} `;
  }
  return d + "Z";
}

export function Gear() {
  return (
    <svg viewBox="0 0 80 80" aria-hidden="true">
      <path
        d={gearD(40, 40, 26)}
        fill="none"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinejoin="round"
      />
      <circle cx="40" cy="40" r="10" fill="none" stroke="currentColor" strokeWidth="7" />
    </svg>
  );
}
