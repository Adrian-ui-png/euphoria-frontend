import green from "../assets/rooms/green-chapter.jpg";
import blue from "../assets/rooms/blue-chapter.jpg";
import red from "../assets/rooms/red-chapter.jpg";
import yellow from "../assets/rooms/yellow-chapter.jpg";
import gr1 from "../assets/rooms/gentel-rise-1.jpg";
import gr2 from "../assets/rooms/gentel-rise-2.jpg";
import gr3 from "../assets/rooms/gentel-rise-3.jpg";
import gr4 from "../assets/rooms/gentel-rise-4.jpg";
import gr5 from "../assets/rooms/gentel-rise-5.jpg";
import gr6 from "../assets/rooms/gentel-rise-6.jpg";
import gr7 from "../assets/rooms/gentel-rise-7.jpg";
import gr8 from "../assets/rooms/gentel-rise-8.jpg";
import gr9 from "../assets/rooms/gentel-rise-9.jpg";
import bc1 from "../assets/rooms/balcon/1.jpg";
import bc2 from "../assets/rooms/balcon/2.jpg";
import bc3 from "../assets/rooms/balcon/3.jpg";
import bc4 from "../assets/rooms/balcon/4.jpg";
import bc5 from "../assets/rooms/balcon/5.jpg";
import bc6 from "../assets/rooms/balcon/6.jpg";
import bc7 from "../assets/rooms/balcon/7.jpg";
import bc8 from "../assets/rooms/balcon/8.jpg";

export interface Room {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  type: string;
  price: number;
  description: string;
  amenities: string[];
  image: string; // main cover
  gallery: string[];
  color: string;
  featured?: boolean;
}

const DEFAULT_ROOMS: Room[] = [
  {
    id: "red-chapter",
    slug: "red-chapter",
    name: "Red Chapter",
    tagline: "Earthy tropical living",
    type: "Shared Living Chapter",
    price: 2200,
    description: "Inspired by Kerala greenery and slow living, Red Chapter blends tropical textures, peaceful mornings, and artistic shared spaces.",
    amenities: ["Shared kitchen", "Wi-Fi", "AC", "Community lounge"],
    image: red,
    gallery: [red],
    color: "#547c62"
  },
  {
    id: "blue-chapter",
    slug: "blue-chapter",
    name: "Blue Chapter",
    tagline: "Coastal calm & soft mornings",
    type: "Shared Living Chapter",
    price: 2200,
    description: "A calming coastal-inspired chapter with cool interiors, natural light, and peaceful Fort Kochi atmosphere.",
    amenities: ["Shared kitchen", "Wi-Fi", "AC", "Coastal interiors"],
    image: blue,
    gallery: [blue],
    color: "#55789a"
  },
  {
    id: "yellow-chapter",
    slug: "yellow-chapter",
    name: "Yellow Chapter",
    tagline: "Portuguese colonial warmth",
    type: "Shared Living Chapter",
    price: 2400,
    description: "Warm heritage textures inspired by Fort Kochi’s Portuguese architecture, artistic corners, and sunset tones.",
    amenities: ["Shared lounge", "AC", "Wi-Fi", "Heritage aesthetics"],
    image: yellow,
    gallery: [yellow],
    color: "#b96f4d",
    featured: true
  },
  {
    id: "green-chapter",
    slug: "green-chapter",
    name: "Green Chapter",
    tagline: "Minimal peaceful luxury",
    type: "Shared Living Chapter",
    price: 2400,
    description: "Soft neutral palettes, natural textures, and peaceful minimalist interiors designed for calm and comfort.",
    amenities: ["Shared kitchen", "Wi-Fi", "AC", "Minimal interiors"],
    image: green,
    gallery: [green],
    color: "#d8cbb8"
  },
  {
    id: "courtyard-residence",
    slug: "courtyard-residence",
    name: "gentle-rise",
    tagline: "Private tropical residence",
    type: "Private Full BHK",
    price: 2200,
    description: "A spacious private BHK residence perfect for long stays, families, and guests seeking privacy in Fort Kochi.",
    amenities: ["Private kitchen", "Living room", "AC", "Full BHK"],
    image: gr1,
    gallery: [gr1, gr2, gr3, gr4, gr5, gr6, gr7, gr8, gr9],
    color: "#446b58"
  },
  {
    id: "balcony-residence",
    slug: "balcony-residence",
    name: "Balcony Residence",
    tagline: "Elevated coastal living",
    type: "Private Full BHK",
    price: 2200,
    description: "A premium private residence with elegant interiors, spacious comfort, and a peaceful Fort Kochi atmosphere.",
    amenities: ["Private BHK", "Balcony", "Kitchen", "Premium interiors"],
    image: gr1,
    gallery: [bc1, bc2, bc3, bc4, bc5, bc6, bc7, bc8],
    color: "#876552"
  }
];

const LOCAL_STORAGE_KEY = "euphoria_rooms_data_v3";

export function getRooms(): Room[] {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!data) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEFAULT_ROOMS));
    return DEFAULT_ROOMS;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEFAULT_ROOMS));
    return DEFAULT_ROOMS;
  }
}

export function saveRooms(rooms: Room[]): void {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(rooms));
}

export function getRoomBySlug(slug: string): Room | undefined {
  const rooms = getRooms();
  return rooms.find(r => r.slug === slug);
}

export function updateRoomPrice(slug: string, price: number): Room[] {
  const rooms = getRooms();
  const index = rooms.findIndex(r => r.slug === slug);
  if (index !== -1) {
    rooms[index].price = price;
    saveRooms(rooms);
  }
  return rooms;
}

export function addRoomPicture(slug: string, imageBase64: string): Room[] {
  const rooms = getRooms();
  const index = rooms.findIndex(r => r.slug === slug);
  if (index !== -1) {
    rooms[index].gallery.push(imageBase64);
    saveRooms(rooms);
  }
  return rooms;
}

export function removeRoomPicture(slug: string, imageIndex: number): Room[] {
  const rooms = getRooms();
  const index = rooms.findIndex(r => r.slug === slug);
  if (index !== -1) {
    rooms[index].gallery.splice(imageIndex, 1);
    saveRooms(rooms);
  }
  return rooms;
}
