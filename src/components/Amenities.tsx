import { motion } from "framer-motion";
import styles from "./components-css/Amenities.module.css";
import pict1 from "../assets/hero-photos/1.jpg";

interface Amenity {
  icon: string;
  name: string;
  desc: string;
}

const amenities: Amenity[] = [
  {
    icon: "☕",
    name: "Café Walks",
    desc: "Walk to Fort Kochi’s iconic cafés, bakeries, and art spaces.",
  },
  {
    icon: "🌊",
    name: "Coastal Mornings",
    desc: "Slow tropical mornings inspired by Kerala’s coastal charm.",
  },
  {
    icon: "🎨",
    name: "Art & Culture",
    desc: "Close to galleries, Biennale spaces, and heritage streets.",
  },
  {
    icon: "🍛",
    name: "Shared Kitchen",
    desc: "Community-style kitchen and lounge for shared-living chapters.",
  },
  {
    icon: "🏡",
    name: "Private Residences",
    desc: "Two full private BHK residences for long peaceful stays.",
  },
  {
    icon: "🌿",
    name: "Tropical Garden",
    desc: "Relax in peaceful green corners filled with Kerala greenery.",
  },
  {
    icon: "📶",
    name: "Workation Ready",
    desc: "High-speed Wi-Fi for creators, remote workers, and travelers.",
  },
  {
    icon: "🛺",
    name: "Fort Kochi Access",
    desc: "Walkable access to restaurants, cafés, beaches, and tuk-tuks.",
  },
];

const chapters = [
  {
    title: "Green Chapter",
    color: "#547c62",
    desc: "Earthy tropical interiors inspired by Kerala greenery.",
  },
  {
    title: "Blue Chapter",
    color: "#4d6c8f",
    desc: "Calm coastal spaces inspired by Fort Kochi mornings.",
  },
  {
    title: "Yellow Chapter",
    color: "#eaec60",
    desc: "Warm Portuguese colonial tones and heritage textures.",
  },
  {
    title: "Red Chapter",
    color: "#a54e4e",
    desc: "Minimal peaceful interiors with soft luxury aesthetics.",
  },
];

export default function Amenities(): JSX.Element {
  return (
    <section
      className={styles.section}
      id="amenities"
      aria-labelledby="amenities-heading"
    >
      <div className={styles.texture}></div>

      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 70 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <p className={styles.eyebrow}>FORT KOCHI EXPERIENCE</p>

        <h2 className={styles.title} id="amenities-heading">
          Boutique Fort Kochi stay inspired by art,
          heritage, and slow coastal living
        </h2>

        <p className={styles.sub}>
          Euphoria Chapters blends tropical calm, artistic interiors,
          and the cultural soul of Fort Kochi into one immersive stay experience.
        </p>
      </motion.div>

      <motion.div
        className={styles.heroImage}
        initial={{ opacity: 0, scale: 1.08 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <img
          src={pict1}
          alt="Euphoria Chapters Fort Kochi"
        />

        <div className={styles.heroOverlay}>
          <span>Slow Living • Heritage • Coastal Calm</span>
        </div>
      </motion.div>

      <div className={styles.locationStats}>
        <div className={styles.statCard}>
          <h4>3 min</h4>
          <p>Kashi Art Café</p>
        </div>

        <div className={styles.statCard}>
          <h4>5 min</h4>
          <p>Fort Kochi Beach</p>
        </div>

        <div className={styles.statCard}>
          <h4>Walkable</h4>
          <p>Colonial Streets</p>
        </div>

        <div className={styles.statCard}>
          <h4>Nearby</h4>
          <p>Restaurants & Cafés</p>
        </div>
      </div>

      <motion.div
        className={styles.mapSection}
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className={styles.mapHeader}>
          <span>OUR LOCATION</span>

          <h3 >Stay in the heart of Fort Kochi</h3>

          <p>
            Beaches, cafés, heritage streets, galleries,
            and coastal experiences — all around you.
          </p>
        </div>

        <div className={styles.mapContainer}>
          <iframe
            title="Euphoria Chapters Location"
            src="https://www.google.com/maps?q=Euphoria+Homestay+Fort+Kochi&z=17&output=embed"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>

          <div className={styles.mapOverlay}>
            <h4>Euphoria Chapters</h4>

            <p>Fort Kochi, Kerala</p>

            <span>
              Near beaches, cafés, galleries & heritage streets
            </span>
          </div>
        </div>
      </motion.div>

      <div className={styles.chaptersSection}>
        <div className={styles.chapterHeader}>
          <span>6 Unique Stays</span>

          <h3>The Euphoria Chapters</h3>

          <p>
            Four shared-living chapters and two private residences,
            each inspired by the colours and textures of Fort Kochi.
          </p>
        </div>

        <div className={styles.chapterGrid}>
          {chapters.map((chapter, index) => (
            <motion.div
              key={chapter.title}
              className={styles.chapterCard}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              viewport={{ once: true }}
              style={{
                borderTop: `4px solid ${chapter.color}`,
              }}
            >
              <div
                className={styles.chapterGlow}
                style={{
                  background: chapter.color,
                }}
              ></div>

              <h4>{chapter.title}</h4>

              <p>{chapter.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className={styles.grid}>
        {amenities.map((a, index) => (
          <motion.div
            key={a.name}
            className={styles.card}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: index * 0.06,
            }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
          >
            <div className={styles.glow}></div>

            <span className={styles.icon}>{a.icon}</span>

            <div>
              <h3 className={styles.name}>{a.name}</h3>

              <p className={styles.desc}>{a.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      
    </section>
  );
}