import {
  Swiper,
  SwiperSlide,
} from "swiper/react";

import {
  Navigation,
  Pagination,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Props {
  images: string[];
  title: string;
}

export default function RoomGallery({
  images,
  title,
}: Props): JSX.Element {
  return (
    <section
      style={{
        padding: "2rem 1rem",
      }}
    >
      {/* TITLE */}

      <div
        style={{
          textAlign: "center",
          marginBottom: "3rem",
        }}
      >
        <p
          style={{
            letterSpacing: "0.18em",
            fontSize: "0.82rem",
            opacity: 0.6,
            marginBottom: "0.8rem",
          }}
        >
          EUPHORIA CHAPTERS
        </p>

        <h2
          style={{
            fontSize:
              "clamp(2.2rem,6vw,4.5rem)",
            lineHeight: 1,
          }}
        >
          {title}
        </h2>
      </div>

      {/* SWIPER */}

      <Swiper
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[
          Navigation,
          Pagination,
        ]}
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        centeredSlides={true}
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                src={img}
                alt={`${title} ${
                  index + 1
                }`}
                style={{
                  // PERFECT FOR VERTICAL PHOTOS
                  width: "420px",

                  maxWidth: "100%",

                  height: "auto",

                  display: "block",

                  margin: "0 auto",

                  borderRadius: "28px",

                  background: "#efe2d0",

                  boxShadow:
                    "0 20px 50px rgba(0,0,0,0.12)",
                }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}