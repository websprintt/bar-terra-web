export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  category: 'tapas' | 'raciones' | 'bocadillos' | 'tortillas' | 'bebidas' | 'cervezas_copas';
  image?: string;
  isPopular?: boolean;
  isSpecialty?: boolean;
}

export interface BreakfastItem {
  id: string;
  name: string;
  type: 'bebida' | 'tostada' | 'combo';
  priceHalf?: string; // Media
  priceFull: string; // Entera / única
  description?: string;
}

export interface RacionItem {
  id: string;
  name: string;
  priceHalf?: string; // Media ración
  priceFull: string; // Ración entera
  isPopular?: boolean;
  isSpecialty?: boolean;
  description?: string;
}

export interface BocadilloItem {
  id: string;
  name: string;
  pricePulga: string;
  priceMontado: string;
  priceBocadillo: string;
  // If we have cheese option, we can specify details
  hasCheeseOption?: boolean;
  pricePulgaCheese?: string;
  priceMontadoCheese?: string;
  priceBocadilloCheese?: string;
  isPopular?: boolean;
  isSpecialty?: boolean;
  description?: string;
}

export interface WineBeerItem {
  id: string;
  name: string;
  type: 'cerveza' | 'vino_blanco' | 'vino_tinto';
  price: string;
  isPopular?: boolean;
  isSpecialty?: boolean;
  description?: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number; // e.g. 5
  text: string;
  date: string;
  avatarUrl?: string;
  photos?: string[];
}

export interface SportsEvent {
  id: string;
  title: string;
  category: 'F1' | 'MotoGP' | 'Fútbol' | 'Otros';
  date: string; // e.g. "Domingo, 31 de Mayo"
  time: string; // e.g. "15:00"
  location?: string; // e.g. "GP de Mónaco" or "Champions League"
  isLive?: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}
