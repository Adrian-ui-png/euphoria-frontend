import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./components-css/Navbar.module.css";

import logo from "../assets/image.jpg";

type NavLink =
  | "rooms"
  | "gallery"
  | "amenities"
  | "booking";

const navLinks: {
  id: NavLink;
  label: string;
}[] = [
  {
    id: "rooms",
    label: "Chapters",
  },
  {
    id: "gallery",
    label: "Gallery",
  },
  {
    id: "amenities",
    label: "Experience",
  },
  {
    id: "rooms",
    label: "Reserve",
  },
];

export default function Navbar(): JSX.Element {
  const [scrolled, setScrolled] =
    useState<boolean>(false);

  const [menuOpen, setMenuOpen] =
    useState<boolean>(false);

  useEffect(() => {
    const onScroll = (): void => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", onScroll);

    return () =>
      window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string): void => {
    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: "smooth",
      });

    setMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        className={`${styles.nav} ${
          scrolled ? styles.scrolled : ""
        }`}
        initial={{ y: -120 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div
          className={styles.logo}
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
        >
          <div className={styles.logoIcon}>
            <img src={logo} alt="Euphoria Chapters Logo" width="40" height="40" />
          </div>

          <div className={styles.logoContent}>
            <span className={styles.logoText}>
              Euphoria Chapters
            </span>

            <span className={styles.logoSub}>
              Fort Kochi • Kerala
            </span>
          </div>
        </div>

        <div className={styles.desktopLinks}>
          {navLinks.map((link) => (
            <button
              key={link.id}
              className={styles.link}
              onClick={() =>
                scrollTo(link.id)
              }
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className={styles.rightActions}>
          <div className={styles.locationBadge}>
            ☕ Café District
          </div>

          <button
            className={styles.bookBtn}
            onClick={() =>
              scrollTo("rooms")
            }
          >
            Reserve Your Stay
          </button>
        </div>

        <button
          className={styles.menuToggle}
          onClick={() =>
            setMenuOpen((prev) => !prev)
          }
          aria-label="Toggle menu"
        >
          <span
            className={
              menuOpen
                ? styles.bar1open
                : styles.bar
            }
          />

          <span
            className={
              menuOpen
                ? styles.bar2open
                : styles.bar
            }
          />

          <span
            className={
              menuOpen
                ? styles.bar3open
                : styles.bar
            }
          />
        </button>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{
              opacity: 0,
              y: -30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -30,
            }}
            transition={{
              duration: 0.3,
            }}
          >
            <div className={styles.mobileContent}>
              <div className={styles.mobileTop}>
                <span>
                  BOUTIQUE FORT KOCHI STAY
                </span>

                <h2>
                  Slow living
                  inspired by
                  art & heritage
                </h2>
              </div>

              <div className={styles.mobileLinks}>
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    className={styles.mobileLink}
                    onClick={() =>
                      scrollTo(link.id)
                    }
                  >
                    {link.label}
                  </button>
                ))}
              </div>

              <div className={styles.mobileFooter}>
                <span>
                  ☕ Walkable cafés
                </span>

                <span>
                  🌊 Beach nearby
                </span>

                <span>
                  🎨 Biennale area
                </span>
              </div>

              <button
                className={styles.mobileBookBtn}
                onClick={() =>
                  scrollTo("rooms")
                }
              >
                Reserve Your Chapter
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}