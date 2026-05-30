import Modal from "react-modal";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { getRooms } from "../../data/roomsStore";

Modal.setAppElement("#root");

interface Props {
  isOpen: boolean;
  onClose: () => void;
  roomName: string;
}

export default function BookingModal({
  isOpen,
  onClose,
  roomName,
}: Props): JSX.Element {
  const [name, setName] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [checkin, setCheckin] =
    useState("");

  const [checkout, setCheckout] =
    useState("");

  const [guests, setGuests] =
    useState("2");

  const [isGroupBooking, setIsGroupBooking] = useState(false);
  const [selectedRooms, setSelectedRooms] = useState<string[]>([roomName]);

  useEffect(() => {
    if (isOpen) {
      setSelectedRooms([roomName]);
      setIsGroupBooking(false);
      setGuests("2");
    }
  }, [isOpen, roomName]);

  const getNights = (): number => {
    if (!checkin || !checkout) return 0;
    const inDate = new Date(checkin);
    const outDate = new Date(checkout);
    const diffTime = outDate.getTime() - inDate.getTime();
    if (isNaN(diffTime) || diffTime <= 0) return 0;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getPricePerNight = (): number => {
    const rooms = getRooms();
    if (isGroupBooking) {
      return rooms
        .filter((r) => selectedRooms.includes(r.name))
        .reduce((sum, r) => sum + r.price, 0);
    } else {
      const r = rooms.find((r) => r.name === roomName);
      return r ? r.price : 0;
    }
  };

  const openWhatsApp = async (): Promise<void> => {
    if (
      !name ||
      !phone ||
      !checkin ||
      !checkout
    ) {
      alert(
        "Please fill all booking details."
      );

      return;
    }

    const nights = getNights();
    if (nights <= 0) {
      alert("Check-out date must be after check-in date.");
      return;
    }

    if (!guests || parseInt(guests) <= 0) {
      alert("Please enter a valid number of guests.");
      return;
    }

    const roomsText = isGroupBooking 
      ? selectedRooms.map(r => `• ${r}`).join("\n") 
      : `• ${roomName}`;

    const msg = encodeURIComponent(
      `
🌿 Booking Request — Euphoria Chapters

🏡 Room(s):
${roomsText}

${isGroupBooking ? `👥 Type: Group Booking (${selectedRooms.length} Rooms)\n` : ""}📅 Check-in: ${checkin}
📅 Check-out: ${checkout}
🌙 Nights: ${nights}

👥 Guests: ${guests}

🙋 Name: ${name}
📞 Phone: ${phone}

💰 Est. Total: ₹${(getPricePerNight() * nights).toLocaleString("en-IN")}
      `
    );

    window.open(
      `https://wa.me/919895599608?text=${msg}`,
      "_blank"
    );
  };

  const sendEmailInquiry = (): void => {
    if (
      !name ||
      !phone ||
      !checkin ||
      !checkout
    ) {
      alert(
        "Please fill all booking details."
      );
      return;
    }

    const nights = getNights();
    if (nights <= 0) {
      alert("Check-out date must be after check-in date.");
      return;
    }

    if (!guests || parseInt(guests) <= 0) {
      alert("Please enter a valid number of guests.");
      return;
    }

    const roomsText = isGroupBooking 
      ? selectedRooms.join(", ") 
      : roomName;

    const emailSubject = encodeURIComponent(
      isGroupBooking
        ? `Group Booking Inquiry - ${selectedRooms.length} Rooms - ${name}`
        : `Booking Inquiry - ${roomName} - ${name}`
    );

    const emailBody = encodeURIComponent(
      `Hello Antony,\n\nI would like to inquire about booking a stay at Euphoria Homestay.\n\n` +
      `Stay Details:\n` +
      `- Room(s)/Apartment(s): ${roomsText}\n` +
      `- Check-in Date: ${checkin}\n` +
      `- Check-out Date: ${checkout}\n` +
      `- Nights: ${nights}\n` +
      `- Guests: ${guests}\n` +
      `- Estimated Total: ₹${(getPricePerNight() * nights).toLocaleString("en-IN")}\n\n` +
      `Contact Details:\n` +
      `- Name: ${name}\n` +
      `- Phone: ${phone}\n\n` +
      `Thank you!`
    );

    window.open(
      `mailto:euphoriafortkochi@gmail.com?subject=${emailSubject}&body=${emailBody}`,
      "_blank"
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      closeTimeoutMS={250}
      style={{
        overlay: {
          background:
            "rgba(0,0,0,0.6)",

          backdropFilter: "blur(10px)",

          zIndex: 9999,

          padding: "1rem",

          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },

        content: {
          position: "relative",

          inset: "unset",

          width: "100%",
          maxWidth: "620px",
          maxHeight: "90vh",

          borderRadius: "32px",

          border:
            "1px solid rgba(255,255,255,0.15)",

          padding: "0",

          overflowY: "auto",
          overflowX: "hidden",

          background:
            "linear-gradient(to bottom, #f7f1e8, #efe2d0)",

          boxShadow:
            "0 30px 80px rgba(0,0,0,0.25)",
        },
      }}
    >
      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          y: 30,
        }}
        transition={{
          duration: 0.35,
        }}
      >
        {/* TOP HERO */}

        <div
          style={{
            padding: "2rem 2rem 1rem",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,

              background:
                "radial-gradient(circle at top right, rgba(255,255,255,0.4), transparent 60%)",
            }}
          />

          <button
            onClick={onClose}
            style={{
              position: "absolute",
              right: "1.2rem",
              top: "1rem",

              width: "42px",
              height: "42px",

              borderRadius: "50%",

              border: "none",

              background:
                "rgba(255,255,255,0.6)",

              backdropFilter:
                "blur(10px)",

              cursor: "pointer",

              fontSize: "1.2rem",
            }}
          >
            ✕
          </button>

          <p
            style={{
              letterSpacing: "0.18em",
              fontSize: "0.82rem",
              opacity: 0.7,
              marginBottom: "1rem",
            }}
          >
            RESERVE YOUR STAY
          </p>

          <h2
            style={{
              fontSize:
                "clamp(2rem,5vw,3rem)",

              lineHeight: 1.05,

              marginBottom: "1rem",
            }}
          >
            {roomName}
          </h2>

          <p
            style={{
              opacity: 0.75,
              lineHeight: 1.8,
              maxWidth: "500px",
            }}
          >
            Experience slow coastal living,
            artistic interiors, and the soul
            of Fort Kochi.
          </p>
        </div>

        {/* FORM */}

        <div
          style={{
            padding: "0 2rem 2rem",
            display: "grid",
            gap: "0.8rem",
          }}
        >
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            style={inputStyle}
          />

          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
            style={inputStyle}
          />

          {/* GROUP BOOKING TOGGLE */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.8rem",
              background: "rgba(255, 255, 255, 0.45)",
              padding: "0.9rem 1.2rem",
              borderRadius: "18px",
              border: "1px solid rgba(0, 0, 0, 0.06)",
            }}
          >
            <input
              type="checkbox"
              id="group-booking-checkbox"
              checked={isGroupBooking}
              onChange={(e) => {
                setIsGroupBooking(e.target.checked);
                if (e.target.checked) {
                  setSelectedRooms([roomName]);
                }
              }}
              style={{
                width: "20px",
                height: "20px",
                accentColor: "#c27a53",
                cursor: "pointer",
              }}
            />
            <label
              htmlFor="group-booking-checkbox"
              style={{
                fontSize: "0.98rem",
                fontWeight: 600,
                color: "#2d231a",
                cursor: "pointer",
                userSelect: "none",
                flexGrow: 1,
              }}
            >
              👨‍👩‍👧‍👦 Book Multiple Rooms (Group Booking)
            </label>
          </div>

          {/* ROOMS SELECTION (only for Group Booking) */}
          {isGroupBooking && (
            <div
              style={{
                padding: "1.2rem",
                borderRadius: "22px",
                border: "1px solid rgba(0,0,0,0.08)",
                background: "rgba(255,255,255,0.45)",
                display: "grid",
                gap: "0.8rem",
              }}
            >
              <p
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  color: "#8c7664",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  margin: 0,
                }}
              >
                Select Rooms for your Group
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "0.8rem",
                }}
              >
                {getRooms().map((r) => {
                  const isCurrentRoom = r.name === roomName;
                  const isChecked = selectedRooms.includes(r.name);
                  return (
                    <label
                      key={r.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.7rem",
                        fontSize: "0.9rem",
                        cursor: isCurrentRoom ? "not-allowed" : "pointer",
                        opacity: isCurrentRoom ? 0.75 : 1,
                        background: isChecked
                          ? "rgba(194, 122, 83, 0.12)"
                          : "rgba(255,255,255,0.6)",
                        padding: "0.5rem 0.7rem",
                        borderRadius: "14px",
                        border: isChecked
                          ? "1px solid rgba(194, 122, 83, 0.4)"
                          : "1px solid rgba(0,0,0,0.05)",
                        transition: "all 0.2s ease",
                        userSelect: "none",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        disabled={isCurrentRoom}
                        onChange={(e) => {
                          if (isCurrentRoom) return;
                          if (e.target.checked) {
                            setSelectedRooms([...selectedRooms, r.name]);
                          } else {
                            setSelectedRooms(
                              selectedRooms.filter((name) => name !== r.name)
                            );
                          }
                        }}
                        style={{
                          accentColor: "#c27a53",
                          cursor: isCurrentRoom ? "not-allowed" : "pointer",
                        }}
                      />
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <span style={{ fontWeight: 600, color: "#2d231a" }}>
                          {r.name}
                        </span>
                        <span style={{ fontSize: "0.75rem", color: "#8c7664" }}>
                          ₹{r.price.toLocaleString("en-IN")}/night
                        </span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          <div
            style={{
              display: "grid",

              gridTemplateColumns:
                "1fr 1fr",

              gap: "1rem",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#8c7664", textTransform: "uppercase", letterSpacing: "0.05em", paddingLeft: "0.2rem" }}>
                Check-in Date
              </label>
              <input
                type="date"
                value={checkin}
                onChange={(e) =>
                  setCheckin(
                    e.target.value
                  )
                }
                style={inputStyle}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#8c7664", textTransform: "uppercase", letterSpacing: "0.05em", paddingLeft: "0.2rem" }}>
                Check-out Date
              </label>
              <input
                type="date"
                value={checkout}
                onChange={(e) =>
                  setCheckout(
                    e.target.value
                  )
                }
                style={inputStyle}
              />
            </div>
          </div>

          {!isGroupBooking ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#8c7664", textTransform: "uppercase", letterSpacing: "0.05em", paddingLeft: "0.2rem" }}>
                Guests
              </label>
              <select
                value={guests}
                onChange={(e) =>
                  setGuests(e.target.value)
                }
                style={inputStyle}
              >
                {[
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                ].map((g) => (
                  <option key={g} value={g}>
                    {g} Guest{g !== "1" ? "s" : ""}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#8c7664", textTransform: "uppercase", letterSpacing: "0.05em", paddingLeft: "0.2rem" }}>
                Total Guests
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={guests}
                onChange={(e) =>
                  setGuests(e.target.value)
                }
                placeholder="Total number of guests"
                style={inputStyle}
              />
            </div>
          )}

          {/* ESTIMATED PRICE SUMMARY */}
          {(() => {
            const nights = getNights();
            const pricePerNight = getPricePerNight();
            const invalidDates = checkin && checkout && nights <= 0;
            
            if (invalidDates) {
              return (
                <p style={{ color: "#d9534f", fontSize: "0.85rem", paddingLeft: "0.2rem", margin: 0 }}>
                  ⚠️ Checkout date must be after the check-in date.
                </p>
              );
            }
            
            if (checkin && checkout && nights > 0) {
              const totalEst = pricePerNight * nights;
              return (
                <div style={{
                  background: "rgba(255, 255, 255, 0.45)",
                  border: "1px solid rgba(0, 0, 0, 0.06)",
                  borderRadius: "18px",
                  padding: "1.2rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.4rem"
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem" }}>
                    <span style={{ color: "#8c7664" }}>Price per night ({isGroupBooking ? `${selectedRooms.length} rooms` : "1 room"})</span>
                    <span style={{ fontWeight: 600, color: "#2d231a" }}>₹{pricePerNight.toLocaleString("en-IN")}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem" }}>
                    <span style={{ color: "#8c7664" }}>Duration</span>
                    <span style={{ fontWeight: 600, color: "#2d231a" }}>{nights} night{nights !== 1 ? "s" : ""}</span>
                  </div>
                  <hr style={{ border: "none", borderTop: "1px solid rgba(0,0,0,0.08)", margin: "0.4rem 0" }} />
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "1.1rem", alignItems: "center" }}>
                    <span style={{ fontWeight: 700, color: "#2d231a" }}>Total Estimated Price</span>
                    <span style={{ fontWeight: 800, color: "#b96f4d" }}>₹{totalEst.toLocaleString("en-IN")}</span>
                  </div>
                </div>
              );
            }
            return null;
          })()}

          {/* BUTTONS */}

          <button
            onClick={openWhatsApp}
            style={{
              marginTop: "1rem",

              border: "none",

              background:
                "linear-gradient(to right, #25d366, #1faa52)",

              color: "white",

              padding: "1.1rem",

              borderRadius: "999px",

              cursor: "pointer",

              fontSize: "1rem",

              fontWeight: 600,

              transition:
                "0.3s ease",

              boxShadow:
                "0 12px 30px rgba(37,211,102,0.25)",
            }}
          >
            💬 Continue on WhatsApp
          </button>

          <button
            onClick={sendEmailInquiry}
            style={{
              border: "1px solid rgba(0,0,0,0.15)",

              background: "white",

              color: "#2d231a",

              padding: "1.1rem",

              borderRadius: "999px",

              cursor: "pointer",

              fontSize: "1rem",

              fontWeight: 600,

              transition:
                "0.3s ease",

              boxShadow:
                "0 4px 12px rgba(0,0,0,0.05)",
            }}
          >
            ✉ Send Email Inquiry
          </button>
        </div>
      </motion.div>
    </Modal>
  );
}

const inputStyle = {
  width: "100%",

  padding: "0.8rem 1rem",

  borderRadius: "18px",

  border:
    "1px solid rgba(0,0,0,0.08)",

  background:
    "rgba(255,255,255,0.7)",

  backdropFilter: "blur(10px)",

  fontSize: "1rem",

  outline: "none",
};