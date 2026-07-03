import { motion } from "framer-motion";
import Avatar from "./Avatar.jsx";

// Segments de la grille (en % de la section) : cadre principal + croisillons
// des marges, comme sur la maquette.
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

const TITLE_LINES = ["C'est ici que je test,", "range, et améliore", "mes resources"];

const lineSpan = { hidden: { opacity: 0, y: "0.55em" }, show: { opacity: 1, y: 0 } };

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-lines" aria-hidden="true">
        {LINES.map((l, i) => {
          const isV = l.o === "v";
          const style = isV
            ? { left: `${l.x}%`, top: `${l.y0}%`, height: `${l.y1 - l.y0}%`, width: 1 }
            : { top: `${l.y}%`, left: `${l.x0}%`, width: `${l.x1 - l.x0}%`, height: 1 };
          return (
            <motion.span
              key={i}
              className="line"
              style={{ ...style, transformOrigin: isV ? "top" : "left" }}
              initial={{ [isV ? "scaleY" : "scaleX"]: 0 }}
              animate={{ [isV ? "scaleY" : "scaleX"]: 1 }}
              transition={{ duration: 0.65, delay: 0.1 + i * 0.05, ease: "easeOut" }}
            />
          );
        })}
      </div>

      <div className="hero-frame">
        <motion.h1
          className="hero-title"
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.09, delayChildren: 0.35 } } }}
        >
          {TITLE_LINES.map((line) => (
            <motion.span
              key={line}
              variants={lineSpan}
              transition={{ duration: 0.55, ease: [0.2, 0.65, 0.2, 1] }}
            >
              {line}
            </motion.span>
          ))}
        </motion.h1>

        <motion.div
          className="hero-avatar"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, type: "spring", stiffness: 220, damping: 18 }}
        >
          <Avatar size="100%" />
        </motion.div>
      </div>
    </section>
  );
}
