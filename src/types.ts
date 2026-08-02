export interface Car {
  id: number;
  nombre: string;
  anio: string;
  kilometros: string;
  precio: string;
  estado: string;
  categoria: string;
  imagen: string;
  descripcion?: string;
  transmision?: string;
  motor?: string;
  color?: string;
  puertas?: number;
  fotos?: any[];
  destacado?: boolean;
  created_at?: string;
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
