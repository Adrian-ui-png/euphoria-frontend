import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import styles from "./components-css/Hero.module.css";
import hero1 from "../assets/hero-photos/1.jpg";
import hero2 from "../assets/hero-photos/2.jpg";
import hero3 from "../assets/hero-photos/3.jpg";
import hero4 from "../assets/hero-photos/4.jpg";

const badges: string[] = [
  "✦ Boutique Fort Kochi Stay",
  "★ 4.9 Rated Experience",
  "✦ Shared Chapters & Private Residences",
];

const heroImages: string[] = [
  hero1,
  hero2,
  hero3,
  hero4,
];

export default function Hero(): JSX.Element {
  const [currentImage, setCurrentImage] =
    useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) =>
        prev === heroImages.length - 1
          ? 0
          : prev + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id: string): void =>
    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: "smooth",
      });

  return (
    <section
      className={styles.hero}
      aria-label="Euphoria Chapters Hero Section"
    >
      <div className={styles.videoOverlay}></div>

      <div className={styles.texture}></div>

      <AnimatePresence mode="wait">
        <motion.img
          key={currentImage}
          className={styles.heroImage}
          src={heroImages[currentImage]}
          alt="Boutique stay in Fort Kochi"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 1.2,
          }}
        />
      </AnimatePresence>

      <div className={styles.gradientGlow}></div>

      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <p className={styles.eyebrow}>
          FORT KOCHI • KERALA
        </p>

        <h1 className={styles.title}>
          Euphoria
          <span> Homestay</span>
        </h1>

        <p className={styles.subtitle}>
          Euphoria Chapters is a boutique stay inspired by
          tropical calm, artistic living, heritage streets,
          coastal mornings, and the slow rhythm of Fort Kochi.
        </p>

        <div className={styles.badges}>
          {badges.map((b, index) => (
            <motion.span
              key={b}
              className={styles.badge}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.12,
              }}
            >
              {b}
            </motion.span>
          ))}
        </div>

        <div className={styles.actions}>
          <button
            className={styles.btnPrimary}
            onClick={() => scrollTo("rooms")}
          >
            Reserve Your Chapter
          </button>

          <button
            className={styles.btnSecondary}
            onClick={() => scrollTo("gallery")}
          >
            Explore Fort Kochi
          </button>
        </div>

        <div className={styles.locationStrip}>
          <span>☕ Café District</span>
          <span>🌊 Beach Walks</span>
          <span>🎨 Biennale Area</span>
          <span>🛺 Walkable Streets</span>
        </div>
      </motion.div>

      <motion.div
        className={styles.floatingCard}
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <div className={styles.cardTop}>
          <span>FORT KOCHI EXPERIENCE</span>
        </div>

        <h3>6 Unique Chapters</h3>

        <p>
          Four artistic shared-living chapters and
          two private BHK residences inspired by
          Fort Kochi’s colours and textures.
        </p>

        <div className={styles.cardStats}>
          <div>
            <strong>3 min</strong>
            <span>Kashi Café</span>
          </div>

          <div>
            <strong>5 min</strong>
            <span>Beach Walk</span>
          </div>

          <div>
            <strong>Nearby</strong>
            <span>Restaurants</span>
          </div>
        </div>
      </motion.div>

      <div className={styles.scrollHint}>
        <span>Scroll to explore</span>

        <motion.div
          className={styles.scrollLine}
          animate={{
            y: [0, 12, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 1.8,
          }}
        />
      </div>
    </section>
  );
}