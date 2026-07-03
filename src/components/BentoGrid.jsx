import { motion } from "framer-motion";
import Avatar from "./Avatar.jsx";
import { Asterisk, Dots, DShapes, Gear } from "./glyphs.jsx";

const TILES = [
  { id: "logo", label: "Logo", glyph: <Asterisk />, hover: { rotate: 22.5, scale: 1.08 } },
  {
    id: "typo",
    label: "Typographie",
    glyph: <span className="specimen">Aa</span>,
    hover: { rotate: -5, scale: 1.12 },
  },
  { id: "color", label: "Color", glyph: <Dots />, hover: { scale: 1.12 } },
  { id: "inspi", label: "Inspi", glyph: <DShapes />, hover: { x: 12 } },
  {
    id: "avatar",
    label: null,
    glyph: <Avatar size="100%" title="Avatar Labo" />,
    hover: { rotate: -8, scale: 1.06 },
  },
  { id: "icono", label: "Iconography", glyph: <Gear />, hover: { rotate: 60 } },
];

const tileVariants = {
  hidden: { opacity: 0, y: 26 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.06, ease: "easeOut" },
  }),
};

export default function BentoGrid() {
  return (
    <section className="bento" aria-label="Ressources de marque">
      {TILES.map((t, i) => (
        <motion.article
          key={t.id}
          custom={i}
          className={`tile tile-${t.id}`}
          variants={tileVariants}
          initial="hidden"
          whileInView="show"
          whileHover="hover"
          viewport={{ once: true, amount: 0.2 }}
        >
          {t.label && <h2>{t.label}</h2>}
          <motion.div
            className="glyph"
            variants={{ hover: t.hover }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
          >
            {t.glyph}
          </motion.div>
        </motion.article>
      ))}
    </section>
  );
}
