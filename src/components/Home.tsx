import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Amenities from "../components/Amenities";
import Footer from "../components/Footer";
import RoomCard from "../components/book-comp/RoomCard";

import { rooms } from "../data/rooms";

export default function Home(): JSX.Element {
  return (
    <main
      style={{
        background:
          "linear-gradient(to bottom, #f7f1e8, #efe2d0)",
        overflowX: "hidden",
        minHeight: "100vh",
      }}
    >
      <Navbar />

      <Hero />

      <section
        style={{
          padding: "5rem 1.5rem",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "4rem",
          }}
        >
          <p
            style={{
              letterSpacing: "0.2em",
              fontSize: "0.85rem",
              opacity: 0.7,
              marginBottom: "1rem",
            }}
          >
            STAY COLLECTION
          </p>

          <h2
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              lineHeight: 1,
              marginBottom: "1rem",
            }}
          >
            Choose Your Chapter
          </h2>

          <p
            style={{
              maxWidth: "700px",
              margin: "0 auto",
              lineHeight: 1.8,
              opacity: 0.8,
            }}
          >
            Shared living chapters and private
            residences inspired by the artistic,
            coastal, and heritage spirit of Fort Kochi.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(300px,1fr))",
            gap: "2rem",
          }}
        >
          {rooms.map((room) => (
            <RoomCard
              key={room.slug}
              room={room}
            />
          ))}
        </div>
      </section>

      <Amenities />

      <Footer />
    </main>
  );
}