import { Car, Testimonial, Faq, GestoriaCategory } from './types';

export const IMAGES = {
  heroBg: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&q=80',
  team: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&q=80',
  carBuySell: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&q=80',
  salesman: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&q=80',
  keys: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600&q=80',
  financing: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80'
};

export const SOCIAL_LINKS = {
  whatsapp: 'https://wa.me/527774539174',
  facebook: 'https://facebook.com/cuernagarage'
};

export const INITIAL_CARS: Car[] = [
  {
    id: '1',
    nombre: 'Honda Civic 2020',
    anio: 2020,
    kilometros: '45,000 km',
    precio: '$320,000 MXN',
    estado: 'disponible',
    categoria: 'Sedán',
    imagen: 'https://images.unsplash.com/photo-1606611013016-969c19ba27d5?w=600&q=80',
    descripcion: 'Excelente estado, único dueño',
    transmision: 'Automática',
    combustible: 'Gasolina',
    color: 'Blanco',
    puertas: 4
  },
  {
    id: '2',
    nombre: 'Toyota RAV4 2019',
    anio: 2019,
    kilometros: '62,000 km',
    precio: '$420,000 MXN',
    estado: 'disponible',
    categoria: 'SUV',
    imagen: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=600&q=80',
    descripcion: 'SUV familiar, muy cuidada',
    transmision: 'Automática',
    combustible: 'Gasolina',
    color: 'Negro',
    puertas: 5
  },
  {
    id: '3',
    nombre: 'Ford Ranger 2021',
    anio: 2021,
    kilometros: '38,000 km',
    precio: '$580,000 MXN',
    estado: 'disponible',
    categoria: 'Pickup',
    imagen: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&q=80',
    descripcion: 'Pickup 4x4, perfecta para trabajo',
    transmision: 'Automática',
    combustible: 'Diésel',
    color: 'Gris',
    puertas: 4
  },
  {
    id: '4',
    nombre: 'Mazda 3 2018',
    anio: 2018,
    kilometros: '71,000 km',
    precio: '$245,000 MXN',
    estado: 'vendido',
    categoria: 'Hatchback',
    imagen: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=600&q=80',
    descripcion: 'Hatchback deportivo',
    transmision: 'Automática',
    combustible: 'Gasolina',
    color: 'Rojo',
    puertas: 5
  },
  {
    id: '5',
    nombre: 'VW Jetta 2022',
    anio: 2022,
    kilometros: '22,000 km',
    precio: '$385,000 MXN',
    estado: 'disponible',
    categoria: 'Sedán',
    imagen: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=600&q=80',
    descripcion: 'Casi nuevo, en garantía',
    transmision: 'Automática',
    combustible: 'Gasolina',
    color: 'Plata',
    puertas: 4
  },
  {
    id: '6',
    nombre: 'Nissan Frontier 2020',
    anio: 2020,
    kilometros: '55,000 km',
    precio: '$495,000 MXN',
    estado: 'disponible',
    categoria: 'Pickup',
    imagen: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&q=80',
    descripcion: 'Pickup robusta y confiable',
    transmision: 'Manual',
    combustible: 'Diésel',
    color: 'Blanco',
    puertas: 4
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Roberto Méndez',
    avatar: 'RM',
    text: 'Excelente atención y el auto llegó en perfectas condiciones. El trámite de gestoría fue rapidísimo. Totalmente recomendados.',
    rating: 5,
    car: 'Honda Civic 2020'
  },
  {
    name: 'Ana Lucía Torres',
    avatar: 'AT',
    text: 'Me ayudaron con el financiamiento y en menos de una semana ya tenía mi auto. El equipo de Cuerna Garage es muy profesional.',
    rating: 5,
    car: 'Toyota RAV4 2019'
  },
  {
    name: 'Jorge Hernández',
    avatar: 'JH',
    text: 'Vendí mi auto con ellos por consignación y el proceso fue transparente. Me pagaron justo lo que acordamos. Muy satisfecho.',
    rating: 5,
    car: 'Ford Ranger 2021'
  }
];

export const FAQS: Faq[] = [
  {
    q: '¿Qué documentos necesito para comprar un auto?',
    a: 'Solo necesitas tu identificación oficial (INE/Pasaporte), comprobante de domicilio reciente y, si aplicarás a financiamiento, comprobantes de ingresos de los últimos 3 meses.'
  },
  {
    q: '¿Los autos tienen garantía?',
    a: 'Sí, todos nuestros seminuevos cuentan con garantía mecánica de 3 meses o 5,000 km. Además, entregamos el auto con verificación vigente y sin adeudos.'
  },
  {
    q: '¿Cuánto tiempo tarda el trámite de gestoría?',
    a: 'Los trámites de cambio de propietario tardan entre 5 y 10 días hábiles. Nosotros nos encargamos de todo el proceso ante las autoridades de Morelos.'
  },
  {
    q: '¿Aceptan auto a cuenta?',
    a: 'Sí, aceptamos tu auto actual como parte del enganche. Realizamos una tasación justa y transparente de tu vehículo.'
  },
  {
    q: '¿Cuál es el enganche mínimo?',
    a: 'Trabajamos con Hey Banco de Banregio para ofrecer enganches desde el 20% del valor del vehículo, con mensualidades accesibles y seguro ya incluido.'
  }
];

export const GESTORIA: GestoriaCategory[] = [
  {
    numero: '01',
    titulo: 'Trámites de Propiedad',
    items: [
      { t: 'Cambio de propietario', d: 'Gestión completa ante la Secretaría de Movilidad de Morelos.' },
      { t: 'Reposición de tenencia', d: 'Trámite de documentos fiscales y tenencias extraviadas.' },
      { t: 'Baja de placas', d: 'Proceso de baja ante autoridades para vehículos vendidos o siniestrados.' }
    ]
  },
  {
    numero: '02',
    titulo: 'Verificación y Legalización',
    items: [
      { t: 'Verificación vehicular', d: 'Gestión de cita y obtención de holograma vigente.' },
      { t: 'Legalización de autos', d: 'Trámite completo para vehículos de procedencia extranjera.' },
      { t: 'Revisión de adeudos', d: 'Consulta y liquidación de multas y adeudos pendientes.' }
    ]
  },
  {
    numero: '03',
    titulo: 'Seguros y Financiamiento',
    items: [
      { t: 'Cotización de seguros', d: 'Asesoría para elegir la mejor póliza según tu vehículo.' },
      { t: 'Trámites de siniestro', d: 'Acompañamiento en procesos de aseguradora.' },
      { t: 'Gestión de crédito', d: 'Apoyo en trámites bancarios para financiamiento vehicular.' }
    ]
  }
];
