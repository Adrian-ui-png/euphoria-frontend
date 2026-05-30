import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { getRoomBySlug, Room } from "../data/roomsStore";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import RoomGallery from "../components/book-comp/RoomGallery";
import BookingModal from "../components/book-comp/BookingModal";

export default function RoomDetails(): JSX.Element {
  const { slug } = useParams();

  const [isBookingOpen, setIsBookingOpen] =
    useState(false);

  const [room, setRoom] = useState<Room | undefined>(undefined);

  useEffect(() => {
    window.scrollTo(0, 0);
    const refreshRoom = () => {
      if (slug) {
        setRoom(getRoomBySlug(slug));
      }
    };

    refreshRoom();

    window.addEventListener("storage", refreshRoom);
    window.addEventListener("pageshow", refreshRoom);
    window.addEventListener("focus", refreshRoom);

    return () => {
      window.removeEventListener("storage", refreshRoom);
      window.removeEventListener("pageshow", refreshRoom);
      window.removeEventListener("focus", refreshRoom);
    };
  }, [slug]);

  if (!room) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          fontSize: "2rem",
        }}
      >
        Room not found
      </div>
    );
  }

  return (
    <main
      style={{
        background:
          "linear-gradient(to bottom, #f7f1e8, #efe2d0)",

        minHeight: "100vh",
      }}
    >
      <Navbar />

      {/* ROOM GALLERY */}

      <section
        style={{
          paddingTop: "8rem",

          maxWidth: "1400px",

          margin: "0 auto",

          paddingInline: "1rem",
        }}
      >
        <RoomGallery
          images={room.gallery}
          title={room.name}
        />
      </section>

      {/* ROOM DETAILS */}

      <section
        style={{
          maxWidth: "1200px",

          margin: "0 auto",

          padding:
            "5rem 1.5rem",
        }}
      >
        <div
          style={{
            display: "grid",

            gridTemplateColumns:
              "repeat(auto-fit,minmax(320px,1fr))",

            gap: "4rem",

            alignItems: "start",
          }}
        >
          {/* LEFT */}

          <div>
            <p
              style={{
                letterSpacing: "0.2em",

                fontSize: "0.85rem",

                opacity: 0.7,

                marginBottom: "1rem",
              }}
            >
              EUPHORIA CHAPTERS
            </p>

            <h1
              style={{
                fontSize:
                  "clamp(3rem,7vw,5.5rem)",

                lineHeight: 1,

                marginBottom: "1rem",
              }}
            >
              {room.name}
            </h1>

            <p
              style={{
                fontSize: "1.1rem",

                lineHeight: 1.9,

                opacity: 0.8,

                marginBottom: "2rem",
              }}
            >
              {room.description}
            </p>

            <div
              style={{
                display: "flex",

                gap: "1rem",

                flexWrap: "wrap",

                marginBottom: "2rem",
              }}
            >
              {room.amenities.map(
                (item, index) => (
                  <div
                    key={index}
                    style={{
                      padding:
                        "0.9rem 1.3rem",

                      borderRadius:
                        "999px",

                      background:
                        "rgba(255,255,255,0.5)",

                      backdropFilter:
                        "blur(8px)",
                    }}
                  >
                    {item}
                  </div>
                )
              )}
            </div>
          </div>

          {/* RIGHT */}

          <div
            style={{
              padding: "2rem",

              borderRadius: "30px",

              background:
                "rgba(255,255,255,0.5)",

              backdropFilter:
                "blur(12px)",

              position: "sticky",

              top: "120px",
            }}
          >
            <p
              style={{
                opacity: 0.7,

                marginBottom: "0.5rem",
              }}
            >
              STARTING FROM
            </p>

            <h2
              style={{
                fontSize: "3rem",

                marginBottom: "2rem",
              }}
            >
              ₹
              {room.price.toLocaleString(
                "en-IN"
              )}

              <span
                style={{
                  fontSize: "1rem",

                  opacity: 0.6,
                }}
              >
                /night
              </span>
            </h2>

            {/* BOOK BUTTON */}

            <button
              onClick={() =>
                setIsBookingOpen(true)
              }
              style={{
                width: "100%",

                padding: "1rem",

                border: "none",

                borderRadius:
                  "999px",

                background:
                  "#25d366",

                color: "white",

                fontSize: "1rem",

                cursor: "pointer",

                marginBottom: "1rem",
              }}
            >
              💬 Book Your Stay
            </button>

            <div
              style={{
                marginTop: "2rem",

                lineHeight: 1.8,

                opacity: 0.75,

                fontSize: "0.95rem",
              }}
            >
              <p>
                ✓ Walkable to cafés &
                beach
              </p>

              <p>
                ✓ Artistic boutique
                interiors
              </p>

              <p>
                ✓ Fast WiFi &
                work-friendly
              </p>

              <p>
                ✓ Ideal for couples &
                creators
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BOOKING MODAL */}

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() =>
          setIsBookingOpen(false)
        }
        roomName={room.name}
      />

      <Footer />
    </main>
  );
}