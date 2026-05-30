import { motion } from "framer-motion";
import styles from "./components-css/Gallery.module.css";

// Import images
import ph1 from "../assets/hero-photos/1.jpg";
import ph3 from "../assets/hero-photos/3.jpg";
import ph4 from "../assets/hero-photos/4.jpg";

import bq1 from "../assets/bq/1.jpg";
import bq2 from "../assets/bq/2.jpg";
import bq3 from "../assets/bq/3.jpg";

export default function Gallery(): JSX.Element {
  return (
    <section className={styles.section} id="gallery" aria-labelledby="gallery-heading">
      <div className={styles.texture}></div>

      {/* Main Header */}
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <p className={styles.eyebrow}>MEET YOUR HOST & SANCTUARY</p>
        <h2 className={styles.title} id="gallery-heading">
          Welcome to Euphoria
        </h2>
        <p className={styles.sub}>
          A cozy, art-filled retreat in Fort Kochi designed for slow living, coastal adventure, and local heritage.
        </p>
      </motion.div>

      {/* Antony's Story Section */}
      <motion.div
        className={styles.topStorySection}
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        viewport={{ once: true }}
      >
        <div className={styles.storyImage}>
          <img src={ph3} alt="Euphoria Homestay Cozy Ambiance" />
          <div className={styles.storyOverlay}>
            <span>Your Host, Antony</span>
            <h3>“Feel at home while you discover the heritage, charm, and soul of Fort Kochi.”</h3>

          </div>
        </div>
      </motion.div>

      {/* Accommodation Details Cards */}
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <p style={{ letterSpacing: "0.2em", fontSize: "0.85rem", opacity: 0.7, color: "#b06f4f", textTransform: "uppercase", marginBottom: "0.5rem" }}>
          OUR ACCOMMODATIONS
        </p>
        <h3 style={{ fontSize: "2rem", color: "#2d231a", fontFamily: "Playfair Display, serif", marginBottom: "1rem" }}>
          Flexible Options For Every Traveler
        </h3>
        <p style={{ maxWidth: "600px", margin: "0 auto", color: "#67584d", lineHeight: 1.7 }}>
          Whether you enjoy a shared community experience or seek the ultimate privacy of an independent apartment, we have a chapter for you.
        </p>
      </div>

      <div className={styles.statsRow}>
        <motion.div
          className={styles.statCard}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🍛</div>
          <h4 style={{ fontSize: "1.35rem", color: "#2f5f50", fontWeight: "600", marginBottom: "0.5rem" }}>4 Cozy Rooms</h4>
          <p style={{ fontSize: "0.95rem", color: "#66584d", lineHeight: 1.6 }}>
            Well-maintained spaces with access to a shared kitchen & dining area, perfect for guests who enjoy a homely community vibe.
          </p>
        </motion.div>

        <motion.div
          className={styles.statCard}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🏡</div>
          <h4 style={{ fontSize: "1.35rem", color: "#2f5f50", fontWeight: "600", marginBottom: "0.5rem" }}>Private 1 BHK</h4>
          <p style={{ fontSize: "0.95rem", color: "#66584d", lineHeight: 1.6 }}>
            A fully private 1 BHK apartment offering complete independence, comfort, and quietude for long-term travelers or families.
          </p>
        </motion.div>

        <motion.div
          className={styles.statCard}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🌿</div>
          <h4 style={{ fontSize: "1.35rem", color: "#2f5f50", fontWeight: "600", marginBottom: "0.5rem" }}>Rooftop 1 BHK</h4>
          <p style={{ fontSize: "0.95rem", color: "#66584d", lineHeight: 1.6 }}>
            A charming rooftop retreat with a highly relaxing ambiance, breezy open feel, and great views over the tree line.
          </p>
        </motion.div>

        <motion.div
          className={styles.statCard}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>✨</div>
          <h4 style={{ fontSize: "1.35rem", color: "#2f5f50", fontWeight: "600", marginBottom: "0.5rem" }}>Local Touch</h4>
          <p style={{ fontSize: "0.95rem", color: "#66584d", lineHeight: 1.6 }}>
            A peaceful homestay experience with local advice, custom café recommendations, and authentic host assistance.
          </p>
        </motion.div>
      </div>

      {/* Fort Kochi Discover Section */}
      <div style={{ textAlign: "center", marginTop: "6rem", marginBottom: "4rem" }}>
        <p style={{ letterSpacing: "0.2em", fontSize: "0.85rem", opacity: 0.7, color: "#b06f4f", textTransform: "uppercase", marginBottom: "0.5rem" }}>
          LOCAL INSIGHTS
        </p>
        <h3 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#2d231a", fontFamily: "Playfair Display, serif", marginBottom: "1rem" }}>
          Discover the Magic of Fort Kochi
        </h3>
        <p style={{ maxWidth: "700px", margin: "0 auto", color: "#67584d", lineHeight: 1.8 }}>
          Located in the heart of town, Euphoria Homestay is surrounded by legendary landmarks, colonial architecture, and a buzzing contemporary art scene.
        </p>
      </div>

      <div className={styles.grid}>
        {/* Card 1: Colonial Streets & Heritage (Large) */}
        <motion.div
          className={`${styles.card} ${styles.large}`}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <img src={ph4} alt="Colonial Streets of Fort Kochi" />
          <div className={styles.overlay}></div>
          <div className={styles.content}>
            <span>HISTORIC CHARM</span>
            <h3>Colonial Heritage Streets</h3>
            <p style={{ color: "rgba(255, 255, 255, 0.85)", fontSize: "0.95rem", marginTop: "0.5rem", maxWidth: "500px", lineHeight: 1.6 }}>
              Wander down streets reflecting Portuguese, Dutch, and British architectural influences. A living museum around every corner.
            </p>
          </div>
        </motion.div>

        {/* Card 2: Chinese Fishing Nets (Standard) */}
        <motion.div
          className={styles.card}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <img src={bq1} alt="Chinese Fishing Nets" />
          <div className={styles.overlay}></div>
          <div className={styles.content}>
            <span>ICONIC SYMBOL</span>
            <h3>Chinese Fishing Nets</h3>
            <p style={{ color: "rgba(255, 255, 255, 0.85)", fontSize: "0.9rem", marginTop: "0.5rem", lineHeight: 1.5 }}>
              Giant cantilevered nets line the coast, framing breathtaking golden sunsets.
            </p>
          </div>
        </motion.div>

        {/* Card 3: St. Francis Church (Standard) */}
        <motion.div
          className={styles.card}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <img src={bq2} alt="St. Francis Church" />
          <div className={styles.overlay}></div>
          <div className={styles.content}>
            <span>HISTORY</span>
            <h3>St. Francis Church</h3>
            <p style={{ color: "rgba(255, 255, 255, 0.85)", fontSize: "0.9rem", marginTop: "0.5rem", lineHeight: 1.5 }}>
              The oldest European church built in India, where Vasco da Gama was once buried.
            </p>
          </div>
        </motion.div>

        {/* Card 4: Art Cafés & Biennale (Large) */}
        <motion.div
          className={`${styles.card} ${styles.large}`}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <img src={ph1} alt="Kashi Art Cafe and galleries" />
          <div className={styles.overlay}></div>
          <div className={styles.content}>
            <span>ART & CAFE CULTURE</span>
            <h3>Art Cafés & Local Markets</h3>
            <p style={{ color: "rgba(255, 255, 255, 0.85)", fontSize: "0.95rem", marginTop: "0.5rem", maxWidth: "500px", lineHeight: 1.6 }}>
              Explore nearby art cafés, heritage walks, and vibrant local markets. Steps away from the iconic Kashi Art Café and Biennale venues.
            </p>
          </div>
        </motion.div>

        {/* Card 5: Santa Cruz Basilica (Standard) */}
        <motion.div
          className={styles.card}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <img src={bq3} alt="Santa Cruz Basilica" />
          <div className={styles.overlay}></div>
          <div className={styles.content}>
            <span>ARCHITECTURE</span>
            <h3>Santa Cruz Basilica</h3>
            <p style={{ color: "rgba(255, 255, 255, 0.85)", fontSize: "0.9rem", marginTop: "0.5rem", lineHeight: 1.5 }}>
              A majestic, historic basilica that stands as one of India's finest heritage structures.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Closing Quote */}
      <motion.div
        className={styles.quoteSection}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <p>
          “Fort Kochi isn’t just a destination — it’s a feeling. We can’t wait to welcome you to our quiet corner of this historic haven.”
        </p>
      </motion.div>
    </section>
  );
}
