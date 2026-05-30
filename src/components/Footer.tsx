import { motion } from "framer-motion";
import styles from "./components-css/Footer.module.css";
import ph1 from "../assets/hero-photos/1.jpg"
import ph2 from "../assets/hero-photos/2.jpg"
import ph3 from "../assets/hero-photos/3.jpg"
import ph4 from "../assets/hero-photos/4.jpg"

interface LinkGroup {
  title: string;
  links: {
    label: string;
    href: string;
  }[];
}

const linkGroups: LinkGroup[] = [
  {
    title: "Explore",
    links: [
      { label: "Euphoria Chapters", href: "#rooms" },
      { label: "Fort Kochi Gallery", href: "#gallery" },
      { label: "Amenities", href: "#amenities" },
      { label: "Reserve Your Stay", href: "#rooms" },
    ],
  },
  {
    title: "Fort Kochi Nearby",
    links: [
      { label: "Kashi Art Café", href: "#" },
      { label: "Fort Kochi Beach", href: "#" },
      { label: "Biennale Spaces", href: "#" },
      { label: "Colonial Streets", href: "#" },
    ],
  },
  {
    title: "Connect",
    links: [
      {
        label: "+91 9895599608",
        href: "tel:+919895599608",
      },
      {
        label: "euphoriafortkochi@gmail.com",
        href: "mailto:euphoriafortkochi@gmail.com",
      },
      {
        label: "Fort Kochi, Kerala",
        href: "#",
      },
    ],
  },
];

export default function Footer(): JSX.Element {
  return (
    <footer className={styles.footer}>
      <div className={styles.texture}></div>

      <div className={styles.glow}></div>

      <div className={styles.topSection}>
        <motion.div
          className={styles.hero}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <p className={styles.eyebrow}>
            SLOW LIVING IN FORT KOCHI
          </p>

          <h2>
            Stay inspired by
            heritage streets,
            coastal mornings,
            and artistic living.
          </h2>

          <p className={styles.description}>
            Euphoria Chapters is a boutique Fort Kochi stay
            designed around tropical calm, artistic interiors,
            and the warmth of Kerala hospitality.
          </p>

          <div className={styles.locationPills}>
            <span>☕ Café District</span>
            <span>🌊 Beach Walks</span>
            <span>🎨 Biennale Area</span>
            <span>🛺 Walkable Streets</span>
          </div>
        </motion.div>

        <div className={styles.galleryStrip}>
          {[
            ph1,
            ph2,
            ph3,
            ph4,
          ].map((img, index) => (
            <motion.div
              key={img}
              className={styles.galleryCard}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
              }}
              viewport={{ once: true }}
            >
              <img
                src={img}
                alt={`Fort Kochi gallery ${index + 1}`}
              />
            </motion.div>
          ))}
        </div>
      </div>

      <div className={styles.inner}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            ✦ Euphoria Chapters
          </div>

          <p className={styles.tagline}>
            Boutique shared-living chapters and private
            residences inspired by the artistic soul of
            Fort Kochi.
          </p>

          <div className={styles.socials}>
            <a href="#">Instagram</a>
            <a href="#">Airbnb</a>
            <a href="#">WhatsApp</a>
          </div>
        </div>

        <div className={styles.links}>
          {linkGroups.map((group) => (
            <div
              key={group.title}
              className={styles.linkGroup}
            >
              <h3 className={styles.linkTitle}>
                {group.title}
              </h3>

              {group.links.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className={styles.link}
                >
                  {label}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.bottom}>
        <span>
          © 2026 Euphoria Chapters.
          All rights reserved.
        </span>

        <span>
          Crafted for slow living in Fort Kochi.
        </span>
      </div>
    </footer>
  );
}