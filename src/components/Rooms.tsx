import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import styles from "./components-css/Rooms.module.css";

import { useState, useEffect } from "react";
import { getRooms, Room } from "../data/roomsStore";

import blue from "../assets/rooms/blue-chapter.jpg";

export default function Rooms(): JSX.Element {
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    const refreshRooms = () => {
      setRooms(getRooms());
    };

    refreshRooms();

    window.addEventListener("storage", refreshRooms);
    window.addEventListener("pageshow", refreshRooms);
    window.addEventListener("focus", refreshRooms);

    // Load Elfsight Google Reviews script
    const scriptId = "elfsight-platform-script";
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://elfsightcdn.com/platform.js";
      script.async = true;
      document.body.appendChild(script);
    }

    return () => {
      window.removeEventListener("storage", refreshRooms);
      window.removeEventListener("pageshow", refreshRooms);
      window.removeEventListener("focus", refreshRooms);
    };
  }, []);
  return (
    <section
      className={styles.section}
      id="rooms"
      aria-labelledby="rooms-heading"
    >
      <div className={styles.texture}></div>

      <motion.div
        className={styles.header}
        initial={{
          opacity: 0,
          y: 60,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.7,
        }}
        viewport={{
          once: true,
        }}
      >
        <p className={styles.eyebrow}>
          THE EUPHORIA CHAPTERS
        </p>

        <h2
          className={styles.title}
          id="rooms-heading"
        >
          Six unique stays
          inspired by
          Fort Kochi
        </h2>

        <p className={styles.sub}>
          Four artistic shared-living chapters and
          two private BHK residences inspired by
          Kerala textures, heritage architecture,
          and slow coastal living.
        </p>

        <div className={styles.hostMessage}>
          <p className={styles.hostLabel}>
            A Message From Your Host
          </p>
          <p className={styles.hostText}>
            “Hi, I’m Antony. I run Euphoria Homestay, a cozy and welcoming space designed for travelers who want to experience the charm, history, and culture of this beautiful coastal town. At Euphoria Homestay, we aim to provide a peaceful stay with a local touch, making you feel at home while you explore Fort Kochi. Looking forward to hosting you!”
          </p>
        </div>
      </motion.div>

      <div className={styles.storyBanner}>
        <div className={styles.storyOverlay}></div>

        <img
          src={blue}
          alt="Fort Kochi boutique stay"
        />

        <div className={styles.storyContent}>
          <span>
            BOUTIQUE FORT KOCHI EXPERIENCE
          </span>

          <h3>
            Stay near cafés,
            heritage streets,
            beaches,
            and the artistic soul
            of Fort Kochi.
          </h3>
        </div>
      </div>

      <div className={styles.grid}>
        {rooms.map((room, index) => (
          <motion.div
            key={room.id}
            className={`${styles.card} ${
              room.featured
                ? styles.featured
                : ""
            }`}
            initial={{
              opacity: 0,
              y: 60,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
              delay: index * 0.08,
            }}
            viewport={{
              once: true,
            }}
          >
            {room.featured && (
              <div
                className={styles.featuredBadge}
              >
                Most Popular Chapter
              </div>
            )}

            <div
              className={styles.imageWrapper}
            >
              <img
                src={room.image}
                alt={room.name}
              />

              <div
                className={styles.imageOverlay}
              ></div>

              <div
                className={styles.imageContent}
              >
                <span>{room.type}</span>

                <h3>{room.name}</h3>
              </div>
            </div>

            <div className={styles.body}>
              <p className={styles.tagline}>
                {room.tagline}
              </p>

              <p className={styles.desc}>
                {room.description}
              </p>

              <div
                className={styles.amenities}
              >
                {room.amenities.map((a) => (
                  <span
                    key={a}
                    className={styles.amenity}
                  >
                    {a}
                  </span>
                ))}
              </div>

              <div className={styles.footer}>
                <div className={styles.price}>
                  ₹
                  {room.price.toLocaleString(
                    "en-IN"
                  )}

                  <span
                    className={styles.perNight}
                  >
                    {" "}
                    / night
                  </span>
                </div>

                <Link
                  to={`/rooms/${room.slug}`}
                  className={styles.bookBtn}
                >
                  View Chapter →
                </Link>
              </div>
            </div>

            <div
              className={styles.cardGlow}
              style={{
                background: room.color,
              }}
            ></div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className={styles.bottomQuote}
        initial={{
          opacity: 0,
          y: 40,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.7,
        }}
        viewport={{
          once: true,
        }}
      >
        <p>
          “More than just rooms —
          every chapter is designed to reflect
          the colours, textures, and slow rhythm
          of Fort Kochi.”
        </p>
      </motion.div>

      {/* Google Reviews Section */}
      <motion.div
        className={styles.reviewsContainer}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <p className={styles.reviewsEyebrow}>GUEST STORIES</p>
        <h3 className={styles.reviewsTitle}>Hear From Our Guests</h3>
        
        <div style={{ marginTop: "2.5rem" }}>
          <div className="elfsight-app-c83c6a34-be80-4c4e-a477-3b324c9db4ee" data-elfsight-app-lazy="" />
        </div>
      </motion.div>
    </section>
  );
}