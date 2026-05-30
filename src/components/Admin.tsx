import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./components-css/Admin.module.css";
import {
  getRooms,
  updateRoomPrice,
  addRoomPicture,
  removeRoomPicture,
  Room,
} from "../data/roomsStore";

export default function Admin(): JSX.Element {
  const navigate = useNavigate();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passcodeInput, setPasscodeInput] = useState<string>("");
  const [authError, setAuthError] = useState<string>("");

  // Rooms Data State
  const [rooms, setRooms] = useState<Room[]>([]);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);

  // Edit Room Form States
  const [editPrice, setEditPrice] = useState<string>("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Verify Auth on Mount
  useEffect(() => {
    const authStatus = sessionStorage.getItem("euphoria_admin_auth");
    if (authStatus === "true") {
      setIsAuthenticated(true);
      setRooms(getRooms());
    }
  }, []);

  // Handle Passcode Login
  const handleLogin = (e: React.FormEvent): void => {
    e.preventDefault();
    if (passcodeInput === "antony2026") {
      setIsAuthenticated(true);
      sessionStorage.setItem("euphoria_admin_auth", "true");
      setRooms(getRooms());
      setAuthError("");
    } else {
      setAuthError("Incorrect passcode. Please try again.");
    }
  };

  // Handle Logout
  const handleLogout = (): void => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("euphoria_admin_auth");
    setPasscodeInput("");
  };

  // Open Edit Modal
  const openEditPanel = (room: Room): void => {
    setEditingRoom(room);
    setEditPrice(room.price.toString());
    setPreviewImage(null);
  };

  // Close Edit Modal
  const closeEditPanel = (): void => {
    setEditingRoom(null);
    setPreviewImage(null);
  };

  // Handle Price Update
  const handleUpdatePrice = (e: React.FormEvent): void => {
    e.preventDefault();
    if (!editingRoom) return;

    const parsedPrice = parseInt(editPrice, 10);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      alert("Please enter a valid price.");
      return;
    }

    const updated = updateRoomPrice(editingRoom.slug, parsedPrice);
    setRooms(updated);
    
    // Update currently editing room reference
    const freshRoom = updated.find(r => r.slug === editingRoom.slug);
    if (freshRoom) setEditingRoom(freshRoom);

    alert("Room rate updated successfully!");
  };

  // Handle Image File Selection & Base64 Conversion
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Safety: Limit image size to 800KB to stay within localStorage constraints (5MB total)
    if (file.size > 800 * 1024) {
      alert("Image is too large! Please upload an image under 800 KB to keep the website running fast.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setPreviewImage(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  // Save Uploaded Image to Gallery
  const handleSaveImage = (): void => {
    if (!editingRoom || !previewImage) return;

    try {
      const updated = addRoomPicture(editingRoom.slug, previewImage);
      setRooms(updated);
      
      const freshRoom = updated.find(r => r.slug === editingRoom.slug);
      if (freshRoom) setEditingRoom(freshRoom);
      
      setPreviewImage(null);
      alert("Picture added to room gallery successfully!");
    } catch (error) {
      console.error(error);
      alert("Storage quota full! Try deleting some older pictures before adding new ones.");
    }
  };

  // Delete Image from Gallery
  const handleDeleteImage = (index: number): void => {
    if (!editingRoom) return;
    if (editingRoom.gallery.length <= 1) {
      alert("A room must have at least one picture in its gallery.");
      return;
    }

    if (confirm("Are you sure you want to remove this picture from the gallery?")) {
      const updated = removeRoomPicture(editingRoom.slug, index);
      setRooms(updated);
      
      const freshRoom = updated.find(r => r.slug === editingRoom.slug);
      if (freshRoom) setEditingRoom(freshRoom);
    }
  };

  // 1. Render Lock Screen if not Authenticated
  if (!isAuthenticated) {
    return (
      <div className={styles.lockScreen}>
        <div className={styles.texture}></div>
        <div className={styles.lockCard}>
          <span className={styles.lockIcon}>🗝️</span>
          <h2>Euphoria Admin</h2>
          <p>Private access panel for Antony. Enter your passcode to modify rates and room pictures.</p>
          
          <form onSubmit={handleLogin}>
            <div className={styles.inputGroup}>
              <label htmlFor="passcode">Passcode</label>
              <input
                id="passcode"
                type="password"
                className={styles.input}
                placeholder="••••••••"
                value={passcodeInput}
                onChange={(e) => setPasscodeInput(e.target.value)}
                autoFocus
              />
            </div>
            
            <button type="submit" className={styles.btnPrimary}>
              Unlock Panel
            </button>
          </form>

          {authError && <p className={styles.errorMsg}>{authError}</p>}
        </div>
      </div>
    );
  }

  // 2. Render Main Admin Dashboard
  return (
    <div className={styles.container}>
      <div className={styles.texture}></div>
      
      <main className={styles.dashboard}>
        <header className={styles.header}>
          <div className={styles.headerTitle}>
            <h1>Antony’s Dashboard</h1>
            <p>Modify nightly rates and edit room photo galleries for Euphoria Homestay.</p>
          </div>
          
          <div style={{ display: "flex", gap: "1rem" }}>
            <button className={styles.btnSecondary} onClick={() => navigate("/")}>
              ← Back to Site
            </button>
            
            <button
              className={styles.btnSecondary}
              onClick={handleLogout}
              style={{ borderColor: "#c74848", color: "#c74848" }}
            >
              Lock Panel
            </button>
          </div>
        </header>

        <section className={styles.roomGrid}>
          {rooms.map((room) => (
            <article
              key={room.slug}
              className={styles.roomCard}
              onClick={() => openEditPanel(room)}
            >
              <div className={styles.roomImage}>
                <img src={room.image} alt={room.name} />
                <span className={styles.roomType}>{room.type}</span>
              </div>
              
              <div className={styles.roomInfo}>
                <h3>{room.name}</h3>
                <p>{room.tagline}</p>
                
                <div className={styles.roomMeta}>
                  <div className={styles.roomPrice}>
                    ₹{room.price.toLocaleString("en-IN")}
                    <span> / night</span>
                  </div>
                  
                  <div className={styles.roomGalleryCount}>
                    🖼️ {room.gallery.length} Photos
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>

      {/* 3. Edit Modal Panel */}
      {editingRoom && (
        <div className={styles.editOverlay}>
          <div className={styles.editPanel}>
            <header className={styles.panelHeader}>
              <h2>Edit {editingRoom.name}</h2>
              <button className={styles.closeBtn} onClick={closeEditPanel}>
                &times;
              </button>
            </header>

            <div className={styles.panelBody}>
              {/* RATE MANAGEMENT */}
              <h3 className={styles.sectionTitle}>Nightly Room Rate</h3>
              <form onSubmit={handleUpdatePrice} className={styles.rateForm}>
                <div className={styles.flexInput}>
                  <div className={styles.inputGroup} style={{ marginBottom: 0 }}>
                    <label htmlFor="rate">Nightly Price (₹ INR)</label>
                    <input
                      id="rate"
                      type="number"
                      className={styles.input}
                      value={editPrice}
                      onChange={(e) => setEditPrice(e.target.value)}
                    />
                  </div>
                </div>
                <button type="submit" className={styles.btnPrimary}>
                  Save Rate
                </button>
              </form>

              {/* GALLERY MANAGEMENT */}
              <h3 className={styles.sectionTitle}>Room Photo Gallery</h3>
              
              <div className={styles.galleryGrid}>
                {editingRoom.gallery.map((img, idx) => (
                  <div key={idx} className={styles.galleryItem}>
                    <img src={img} alt={`Gallery room view ${idx}`} />
                    <button
                      className={styles.deleteBadge}
                      title="Remove Picture"
                      onClick={() => handleDeleteImage(idx)}
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>

              {/* UPLOAD PICTURE */}
              <h3 className={styles.sectionTitle}>Upload New Picture</h3>
              
              {!previewImage ? (
                <div className={styles.uploadZone}>
                  <input
                    type="file"
                    accept="image/*"
                    className={styles.uploadInput}
                    onChange={handleFileChange}
                  />
                  <div className={styles.uploadText}>
                    <span>📷</span>
                    <p>
                      Drag and drop, or <strong>browse computer</strong>
                    </p>
                    <p style={{ fontSize: "0.8rem", opacity: 0.6, marginTop: "0.5rem" }}>
                      JPG, PNG under 800 KB
                    </p>
                  </div>
                </div>
              ) : (
                <div className={styles.uploadPreview}>
                  <p style={{ marginBottom: "0.5rem", fontWeight: 600 }}>Preview Upload:</p>
                  <img src={previewImage} alt="Upload preview" />
                  
                  <div className={styles.previewActions}>
                    <button
                      className={styles.btnSecondary}
                      onClick={() => setPreviewImage(null)}
                    >
                      Cancel
                    </button>
                    
                    <button
                      className={styles.btnPrimary}
                      onClick={handleSaveImage}
                      style={{ padding: "0.8rem 1.6rem" }}
                    >
                      Add Picture
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
