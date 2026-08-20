import { motion, MotionConfig } from "framer-motion";
import Avatar from "./Avatar.jsx";
import { Asterisk, Dots, DShapes, Gear } from "./glyphs.jsx";
import { CATEGORIES } from "../data/site.js";

const GLYPHS = {
  asterisk: <Asterisk />,
  dots: <Dots />,
  dshapes: <DShapes />,
  gear: <Gear />,
  specimen: <span className="specimen">Aa</span>,
};

// Mouvement propre à chaque tuile au survol : la grille reste lisible mais
// chaque case réagit à sa manière.
const HOVER = {
  logo: { rotate: 22.5, scale: 1.08 },
  typo: { rotate: -5, scale: 1.12 },
  color: { scale: 1.12 },
  inspi: { x: 12 },
  icono: { rotate: 60 },
};

const tileVariants = {
  hidden: { opacity: 0, y: 26 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.06, ease: "easeOut" },
  }),
};

function countLabel(n) {
  if (n === 0) return "À remplir";
  return `${n} outil${n > 1 ? "s" : ""}`;
}

export default function BentoGrid() {
  return (
    <MotionConfig reducedMotion="user">
      <nav className="bento" aria-label="Catégories du labo">
        {CATEGORIES.map((c, i) => (
          <motion.a
            key={c.slug}
            href={`/${c.slug}`}
            custom={i}
            className={`tile tile-${c.accent}`}
            variants={tileVariants}
            initial="hidden"
            whileInView="show"
            whileHover="hover"
            whileFocus="hover"
            viewport={{ once: true, amount: 0.2 }}
          >
            <span className="tile-head">
              <h2>{c.label}</h2>
              <span className="tile-count">{countLabel(c.tools.length)}</span>
            </span>

            <motion.span
              className="glyph"
              variants={{ hover: HOVER[c.accent] }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
            >
              {GLYPHS[c.glyph]}
            </motion.span>
          </motion.a>
        ))}

        {/* Case portrait : décorative, elle n'ouvre aucune page. */}
        <motion.div
          className="tile tile-avatar"
          custom={CATEGORIES.length}
          variants={tileVariants}
          initial="hidden"
          whileInView="show"
          whileHover="hover"
          viewport={{ once: true, amount: 0.2 }}
          aria-hidden="true"
        >
          <motion.span
            className="glyph"
            variants={{ hover: { rotate: -8, scale: 1.06 } }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
          >
            <Avatar size="100%" title="" />
          </motion.span>
        </motion.div>
      </nav>
    </MotionConfig>
  );
}
