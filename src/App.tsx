import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Rooms from "./components/Rooms";
import Gallery from "./components/Gallery";
import Amenities from "./components/Amenities";
import Footer from "./components/Footer";

import RoomDetails from "./components/RoomDetails";
import Admin from "./components/Admin";

import { useEffect } from "react";

import { Toaster } from "react-hot-toast";
import { Helmet } from "react-helmet";
import { useMediaQuery } from "react-responsive";

import "swiper/css";
import "swiper/css/pagination";

function HomePage(): JSX.Element {
  return (
    <main
      style={{
        background:
          "linear-gradient(to bottom, #f7f1e8, #efe2d0)",
        overflowX: "hidden",
        width: "100%",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "100vw",
          overflowX: "hidden",
        }}
      >
        <Navbar />

        <Hero />

        <Rooms />

        <Gallery />

        <Amenities />

        <Footer />
      </div>
    </main>
  );
}

export default function App(): JSX.Element {
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  useEffect(() => {
    document.documentElement.style.scrollBehavior =
      "smooth";

    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflowX = "hidden";

    document.body.style.webkitTapHighlightColor =
      "transparent";

    const viewport =
      document.querySelector(
        'meta[name="viewport"]'
      );

    if (!viewport) {
      const meta = document.createElement("meta");

      meta.name = "viewport";

      meta.content =
        "width=device-width, initial-scale=1";

      document.head.appendChild(meta);
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>
          Euphoria Chapters • Boutique Fort Kochi Stay
        </title>

        <meta
          name="description"
          content="Euphoria Chapters is a boutique Fort Kochi stay featuring artistic shared-living chapters and private BHK residences inspired by Kerala heritage, cafés, beaches, and slow coastal living."
        />
      </Helmet>

      <Toaster
        position={
          isMobile
            ? "top-center"
            : "top-right"
        }
      />

      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<HomePage />}
          />

          <Route
            path="/rooms/:slug"
            element={<RoomDetails />}
          />

          <Route
            path="/admin"
            element={<Admin />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}