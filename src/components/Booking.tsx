import { motion } from "framer-motion";
import styles from "./components-css/Booking.module.css";
import ph1 from "../assets/hero-photos/4.jpg";

interface Room {
  id: string;
  name: string;
  price: number;
  type: string;
  description: string;
}

const rooms: Room[] = [
  {
    id: "green-chapter",
    name: "Green Chapter",
    type: "Shared Living Chapter",
    price: 2200,
    description:
      "Earthy tropical interiors inspired by Kerala greenery and slow living.",
  },
  {
    id: "blue-chapter",
    name: "Blue Chapter",
    type: "Shared Living Chapter",
    price: 2200,
    description:
      "Calm coastal aesthetics inspired by Fort Kochi mornings.",
  },
  {
    id: "yellow-chapter",
    name: "Yellow Chapter",
    type: "Shared Living Chapter",
    price: 2400,
    description:
      "Warm Portuguese colonial tones with artistic textures.",
  },
  {
    id: "red-chapter",
    name: "Red Chapter",
    type: "Shared Living Chapter",
    price: 2400,
    description:
      "Minimal peaceful interiors with elegant neutral palettes.",
  },
  {
    id: "courtyard-residence",
    name: "gentle-rise",
    type: "Private Full BHK",
    price: 4800,
    description:
      "Private residence perfect for families and long relaxing stays.",
  },
  {
    id: "balcony-residence",
    name: "Balcony Residence",
    type: "Private Full BHK",
    price: 5200,
    description:
      "Premium private residence with spacious interiors and privacy.",
  },
];

export default function Booking(): JSX.Element {
  const openWhatsApp = (): void => {
    const msg = encodeURIComponent(
      `Hi! I'd like to know more about booking a stay at Euphoria Homestay in Fort Kochi.`
    );

    window.open(
      `https://wa.me/919876543210?text=${msg}`,
      "_blank"
    );
  };

  return (
    <section
      className={styles.section}
      id="booking"
      aria-labelledby="booking-heading"
    >
      <div className={styles.texture}></div>

      <div className={styles.bookingHero}>
        <div className={styles.bookingOverlay}></div>

        <img
          src={ph1}
          alt="Boutique stay in Fort Kochi"
        />

        <div className={styles.bookingContent}>
          <p className={styles.eyebrow}>
            BOUTIQUE FORT KOCHI STAY
          </p>

          <h2 id="booking-heading">
            Choose your chapter
            in the heart of Fort Kochi
          </h2>

          <p>
            Stay minutes away from heritage cafés,
            colonial streets, beaches, seafood restaurants,
            art spaces, and the cultural soul of Fort Kochi.
          </p>

          <div className={styles.locationPills}>
            <span>☕ Café District</span>
            <span>🌊 Beach Nearby</span>
            <span>🎨 Biennale Area</span>
            <span>🛺 Walkable Streets</span>
          </div>
        </div>
      </div>

      <div className={styles.chapterPreviewGrid}>
        {rooms.slice(0, 4).map((room, index) => (
          <motion.div
            key={room.id}
            className={styles.chapterPreview}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
            }}
            viewport={{ once: true }}
          >
            <h3>{room.name}</h3>

            <span>{room.type}</span>

            <p>{room.description}</p>

            <div className={styles.roomPrice}>
              ₹{room.price.toLocaleString("en-IN")}
              <small>/night</small>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className={styles.bookingCard}
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
       
       
      </motion.div>
    </section>
  );
}