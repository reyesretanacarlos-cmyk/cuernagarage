export interface Car {
  id: string;
  nombre: string;
  anio: number;
  kilometros: string;
  precio: string;
  estado: 'disponible' | 'vendido';
  categoria: string;
  imagen: string;
  descripcion?: string;
  transmision?: string;
  combustible?: string;
  color?: string;
  puertas?: number;
}

export interface Testimonial {
  name: string;
  avatar: string;
  text: string;
  rating: number;
  car: string;
}

export interface Faq {
  q: string;
  a: string;
}

export interface GestoriaItem {
  t: string;
  d: string;
}

export interface GestoriaCategory {
  numero: string;
  titulo: string;
  items: GestoriaItem[];
}
