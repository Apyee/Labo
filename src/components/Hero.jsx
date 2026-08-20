import { useLayoutEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Avatar from "./Avatar.jsx";

/* ------------------------------------------------------------------ *
 * Contenu
 * ------------------------------------------------------------------ */

const TITLE = {
  lead: "Bienvenue dans mon Labo.",
  body: "Ici, je documente tous les outils que j'utilise en tant que UX/UI designer.",
};

// Mots aplatis en une seule séquence : le stagger reste continu d'un
// niveau typographique à l'autre.
const WORDS = [
  ...TITLE.lead.split(" ").map((text) => ({ text, tier: "lead" })),
  ...TITLE.body.split(" ").map((text) => ({ text, tier: "body" })),
];

// Segments de la grille éditoriale (en % de la section) : cadre principal
// + croisillons des marges.
const LINES = [
  { o: "v", x: 14, y0: 0, y1: 100 },
  { o: "v", x: 86, y0: 0, y1: 100 },
  { o: "h", y: 8, x0: 0, x1: 100 },
  { o: "h", y: 92, x0: 0, x1: 100 },
  { o: "v", x: 42.5, y0: 0, y1: 8 },
  { o: "v", x: 57.5, y0: 0, y1: 8 },
  { o: "v", x: 42.5, y0: 92, y1: 100 },
  { o: "v", x: 57.5, y0: 92, y1: 100 },
  { o: "h", y: 39, x0: 0, x1: 14 },
  { o: "h", y: 61, x0: 0, x1: 14 },
  { o: "h", y: 39, x0: 86, x1: 100 },
  { o: "h", y: 61, x0: 86, x1: 100 },
];

/* ------------------------------------------------------------------ *
 * Animation
 * ------------------------------------------------------------------ */

// Easing « slick » demandé : cubic-bezier(0.16, 1, 0.3, 1).
const EASE = [0.16, 1, 0.3, 1];

const AVATAR_IN = 0.1; // l'avatar entre en premier
const WORDS_IN = 0.5; // puis les mots
const WORD_STEP = 0.045;

const variants = {
  avatar: {
    hidden: { opacity: 0, scale: 0.95 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.9, delay: AVATAR_IN, ease: EASE },
    },
  },

  word: {
    hidden: { opacity: 0, y: 20 },
    show: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: WORDS_IN + i * WORD_STEP,
        ease: EASE,
      },
    }),
  },

  line: {
    hidden: (isV) => ({ [isV ? "scaleY" : "scaleX"]: 0 }),
    show: (isV) => ({
      [isV ? "scaleY" : "scaleX"]: 1,
      transition: { duration: 0.65, ease: EASE },
    }),
  },

  hint: {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: WORDS_IN + WORDS.length * WORD_STEP,
        ease: EASE,
      },
    },
    exit: { opacity: 0, y: 10, transition: { duration: 0.3, ease: "easeOut" } },
  },

  // Flèche en boucle continue sous l'indicateur de scroll.
  arrow: {
    show: {
      y: [0, 7, 0],
      transition: { duration: 1.6, repeat: Infinity, ease: "easeInOut" },
    },
  },
};

/* ------------------------------------------------------------------ *
 * Composant
 * ------------------------------------------------------------------ */

// Taille de l'avatar une fois calé en haut de page, et sa marge au bord.
const DOCK_SIZE = 44;
const DOCK_SIZE_SM = 34;
const DOCK_PAD = 20;
const DOCK_PAD_SM = 14;

export default function Hero() {
  const sectionRef = useRef(null);
  const anchorRef = useRef(null);
  const reduced = useReducedMotion();

  const [imgOk, setImgOk] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  // Position de repos de l'avatar, mesurée sur son ancre dans la grille.
  const [rest, setRest] = useState({ top: 0, left: 0, size: 80 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // L'ancre reste dans le flux : elle réserve la place et donne la position
  // de repos, pendant que l'avatar lui-même est en `fixed` par-dessus.
  useLayoutEffect(() => {
    const measure = () => {
      const el = anchorRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      setRest({
        // Coordonnées viewport ramenées à scroll = 0.
        top: r.top + window.scrollY,
        left: r.left + window.scrollX,
        size: r.width,
      });
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (v) => setScrolled(v > 0.01));

  const small = rest.size <= 72;
  const dockSize = small ? DOCK_SIZE_SM : DOCK_SIZE;
  const dockPad = small ? DOCK_PAD_SM : DOCK_PAD;

  // Trajet repos → position calée en haut à gauche. `transformOrigin: top left`
  // pour que l'échelle ne décale pas la translation.
  const progress = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 40,
    restDelta: 0.001,
  });

  const avatarX = useTransform(progress, [0, 1], [0, dockPad - rest.left]);
  const avatarY = useTransform(progress, [0, 1], [0, dockPad - rest.top]);
  const avatarScale = useTransform(
    progress,
    [0, 1],
    [1, dockSize / (rest.size || 1)],
  );

  // Parallaxe + estompage du texte.
  const textY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  // 3 arrêts explicites : le palier final maintient 0.2 jusqu'au bout. Avec
  // une plage d'entrée partielle ([0, 0.65]), la valeur remonte vers 1 au lieu
  // de rester clampée.
  const textOpacity = useTransform(scrollYProgress, [0, 0.65, 1], [1, 0.2, 0.2]);

  const still = { x: 0, y: 0, scale: 1 }; // fallback prefers-reduced-motion

  return (
    <section className="hero" ref={sectionRef}>
      <div className="hero-lines" aria-hidden="true">
        {LINES.map((l, i) => {
          const isV = l.o === "v";
          const style = isV
            ? {
                left: `${l.x}%`,
                top: `${l.y0}%`,
                height: `${l.y1 - l.y0}%`,
                width: 1,
              }
            : {
                top: `${l.y}%`,
                left: `${l.x0}%`,
                width: `${l.x1 - l.x0}%`,
                height: 1,
              };

          return (
            <motion.span
              key={i}
              className="line"
              style={{ ...style, transformOrigin: isV ? "top" : "left" }}
              custom={isV}
              variants={variants.line}
              initial="hidden"
              animate="show"
              transition={{ delay: 0.1 + i * 0.05 }}
            />
          );
        })}
      </div>

      <div className="hero-frame">
        {/* Réserve la place de l'avatar dans la grille (l'avatar est en fixed). */}
        <div
          className="hero-avatar-anchor"
          ref={anchorRef}
          aria-hidden="true"
        />

        {/* Le wrapper porte les transformations de scroll, le h1 porte les
            variants d'entrée : deux cycles de vie distincts, deux éléments. */}
        <motion.div
          className="hero-title-wrap"
          style={reduced ? undefined : { y: textY, opacity: textOpacity }}
        >
          <motion.h1 className="hero-title" initial="hidden" animate="show">
            <span className="hero-lead">
              {WORDS.filter((w) => w.tier === "lead").map((w, i) => (
                <motion.span
                  key={`${w.text}-${i}`}
                  className="hero-word"
                  custom={i}
                  variants={variants.word}
                >
                  {w.text}
                </motion.span>
              ))}
            </span>

            <span className="hero-body">
              {WORDS.filter((w) => w.tier === "body").map((w, i) => {
                const index = TITLE.lead.split(" ").length + i;
                return (
                  <motion.span
                    key={`${w.text}-${i}`}
                    className="hero-word"
                    custom={index}
                    variants={variants.word}
                  >
                    {w.text}
                  </motion.span>
                );
              })}
            </span>
          </motion.h1>
        </motion.div>

        <AnimatePresence>
          {!scrolled && (
            <motion.div
              className="hero-hint"
              variants={variants.hint}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              <span>Scroll</span>
              <motion.svg
                className="hero-hint-arrow"
                viewBox="0 0 12 20"
                variants={reduced ? undefined : variants.arrow}
                animate="show"
                aria-hidden="true"
              >
                <path
                  d="M6 1 V17 M1 12 L6 18 L11 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Avatar : pastille circulaire qui glisse de la grille vers le haut de page. */}
      <motion.div
        className="hero-avatar"
        style={{
          top: rest.top,
          left: rest.left,
          width: rest.size,
          height: rest.size,
          transformOrigin: "top left",
          ...(reduced ? still : { x: avatarX, y: avatarY, scale: avatarScale }),
        }}
      >
        <motion.div
          className="hero-avatar-media"
          variants={variants.avatar}
          initial="hidden"
          animate="show"
        >
          {imgOk ? (
            <img
              src="/Profil.png"
              alt="Portrait — Labo"
              className="hero-avatar-img"
              onError={() => setImgOk(false)}
            />
          ) : (
            <Avatar size="100%" title="Portrait — Labo" />
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}
