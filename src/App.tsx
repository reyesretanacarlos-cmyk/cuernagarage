import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import Navbar from './components/Navbar';
import CarCard from './components/CarCard';
import FinancingCalculator from './components/FinancingCalculator';
import ContactForm from './components/ContactForm';
import LoginModal from './components/LoginModal';
import AdminPanel from './components/AdminPanel';
import {
  INITIAL_CARS, TESTIMONIALS, FAQS, GESTORIA, IMAGES, SOCIAL_LINKS
} from './data';
import { Car } from './types';
import {
  CheckCircle2, ChevronDown, Sparkles, MessageSquare, Phone, Mail, MapPin, ChevronUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const supabaseUrl = 'https://uiwaildfmovzhqftqcwz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpd2FpbGRmbW92emhxZnRxY3d6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUyNTcyNDgsImV4cCI6MjEwMDgzMzI0OH0.ahTS8n-eS_MuxadjassVi3DmMe-v29JtbgUy_hjR4vw';
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function App() {
  // ✅ SIN localStorage - solo estado inicial
  const [cars, setCars] = useState<Car[]>(INITIAL_CARS);
  const [activeSection, setActiveSection] = useState('inicio');
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [inventoryFilter, setInventoryFilter] = useState('Todos');
  const [showBackToTop, setShowBackToTop] = useState(false);

  // ✅ Lee autos desde Supabase al cargar
  const fetchCars = async () => {
    try {
      if (!supabase) return;
      const { data, error } = await supabase.from('cars').select('*').order('id', { ascending: false });
      if (error) {
        console.warn('Error al leer de Supabase:', error.message);
        return;
      }
      if (data && data.length > 0) {
        setCars(data);
      }
    } catch (err) {
      console.warn('Error fetching cars:', err);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  // ✅ NUEVA: Guarda autos en Supabase (reemplaza todo el inventario)
  const saveCarsToSupabase = async (newCars: Car[]) => {
    try {
      if (!supabase) return;

      // 1. Borra todos los registros actuales
      const { error: deleteError } = await supabase.from('cars').delete().neq('id', 0);
      if (deleteError) {
        console.warn('Error limpiando autos:', deleteError.message);
      }

      // 2. Inserta los nuevos (sin id ni created_at para que Supabase los genere)
      if (newCars.length > 0) {
        const carsToInsert = newCars.map(({ id, created_at, ...rest }) => rest);
        const { error: insertError } = await supabase.from('cars').insert(carsToInsert);
        if (insertError) {
          console.warn('Error guardando autos:', insertError.message);
        } else {
          console.log('✅ Autos guardados en Supabase:', newCars.length);
        }
      }
    } catch (err) {
      console.warn('Error en saveCarsToSupabase:', err);
    }
  };

  // Autoplay testimonials carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
      const sections = ['inicio', 'nosotros', 'servicios', 'gestoria', 'financiamiento', 'inventario', 'marketplace', 'contacto'];
      const scrollPos = window.scrollY + 180;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  const filteredAvailableCars = cars.filter((c) => {
    const isAvail = c.estado === 'disponible';
    if (inventoryFilter === 'Todos') return isAvail;
    return isAvail && c.categoria === inventoryFilter;
  });

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen selection:bg-amber-500/30 selection:text-amber-200">
      <Navbar
        onAdminClick={() => {
          if (isAdmin) {
            setShowAdmin(true);
          } else {
            setShowLogin(true);
          }
        }}
        isAdmin={isAdmin}
        activeSection={activeSection}
      />

      <section id="inicio" className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={IMAGES.heroBg} alt="Cuerna Garage" className="w-full h-full object-cover object-center" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-[1px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-slate-950/70 to-slate-950" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 py-20">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-1.5">
            <Sparkles size={13} className="text-amber-500" />
            <span className="font-mono text-[10px] font-extrabold text-amber-400 uppercase tracking-widest">COMPRA, VENTA & CONSIGNACIÓN</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-sans font-black text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[1.05]">
            CUERNA <span className="text-amber-500 font-serif">GARAGE</span>
          </motion.h1>
          <motion.h2 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="font-sans text-lg sm:text-2xl text-slate-300 font-light max-w-xl mx-auto">
            Tu próximo auto te está esperando en Cuernavaca.
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="font-sans text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
            Autos seminuevos completamente verificados, gestoría vehicular integral y financiamiento accesible con Hey Banco de Banregio. Enganche desde el 20% con seguro ya incluido.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noreferrer" className="w-full sm:w-auto px-8 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-sans font-black rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/10 transition-all flex items-center justify-center gap-2">
              <MessageSquare size={16} />
              <span>Cotizar por WhatsApp</span>
            </a>
            <button onClick={() => handleScrollToSection('inventario')} className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 hover:bg-slate-850 text-slate-200 font-sans font-black rounded-xl text-xs uppercase tracking-wider border border-slate-800 hover:border-slate-700 transition-all cursor-pointer">
              Ver Inventario
            </button>
          </motion.div>
          <div className="pt-12 flex flex-col items-center gap-1.5 animate-bounce">
            <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest font-bold">Conocer más</span>
            <ChevronDown size={14} className="text-slate-500" />
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border-t border-b border-amber-600/10 py-10 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[{ num: '350+', label: 'Autos Vendidos' }, { num: '10+', label: 'Años de Experiencia' }, { num: '98%', label: 'Clientes Satisfechos' }, { num: '50+', label: 'Unidades Anuales' }].map((stat, i) => (
            <div key={i} className="space-y-1">
              <div className="font-sans font-black text-2xl sm:text-3xl text-amber-500 tracking-tight">{stat.num}</div>
              <div className="font-mono text-[9px] text-slate-500 uppercase tracking-wider font-extrabold">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="nosotros" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 relative">
            <img src={IMAGES.team} alt="Equipo de Cuerna Garage" className="w-full rounded-2xl border border-slate-900 shadow-xl" referrerPolicy="no-referrer" />
            <div className="absolute -bottom-4 -right-4 bg-amber-500 text-slate-950 p-4 rounded-xl font-sans font-black text-lg tracking-tight shadow-lg">10+ Años</div>
          </div>
          <div className="lg:col-span-7 space-y-6">
            <span className="font-mono text-xs text-amber-500 uppercase tracking-widest font-bold">Sobre Nosotros</span>
            <h2 className="font-sans font-black text-3xl sm:text-4xl text-white tracking-tight">Especialistas en Compra, Venta y <span className="text-amber-500">Gestoría</span></h2>
            <p className="font-sans text-sm sm:text-base text-slate-300 leading-relaxed">En <strong className="text-amber-500">Cuerna Garage</strong> somos líderes en la comercialización de vehículos seminuevos garantizados y en la simplificación de trámites burocráticos en Morelos. Ofrecemos un servicio premium, transparente y seguro para que no te preocupes por nada.</p>
            <p className="font-sans text-xs sm:text-sm text-slate-400 leading-relaxed">Trabajamos todos los días con la convicción de ofrecer los mejores precios de compra inmediata, comisiones competitivas en consignación y facilidades de pago para que te lleves el auto de tus sueños sin trabas administrativas.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-4">
              {['Vehículos rigurosamente inspeccionados', 'Trámites de gestoría legal rápidos', 'Enganche flexible desde el 20%', 'Atención personalizada premium'].map((point, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-300">
                  <CheckCircle2 size={16} className="text-amber-500 flex-shrink-0" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="servicios" className="py-24 bg-slate-900/20 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <span className="font-mono text-xs text-amber-500 uppercase tracking-widest font-bold">Nuestros Servicios</span>
            <h2 className="font-sans font-black text-3xl sm:text-5xl text-white tracking-tight">Todo para tu <span className="text-amber-500">Auto</span></h2>
            <p className="font-sans text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">Ya sea que busques comprar, vender, consignar o financiar un vehículo, te acompañamos con asesoría experta paso a paso.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[{ title: 'Venta de Autos', desc: 'Un catálogo dinámico de seminuevos garantizados con financiamiento adaptable.', img: IMAGES.carBuySell, tag: 'Compra' }, { title: 'Compra Directa', desc: 'Te ofrecemos la mejor tasación de mercado y te pagamos de manera inmediata y segura.', img: IMAGES.salesman, tag: 'Venta rápida' }, { title: 'Consignación Especial', desc: 'Déjanos vender tu auto bajo las mejores condiciones comerciales de Morelos.', img: IMAGES.keys, tag: 'Consigna' }, { title: 'Planes de Financiamiento', desc: 'Alianzas bancarias de primer nivel para enganches del 20% y mensualidades cómodas.', img: IMAGES.financing, tag: 'Crédito' }].map((srv, i) => (
              <div key={i} className="bg-slate-900/60 border border-slate-850 hover:border-amber-500/20 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col h-full shadow-md">
                <div className="h-40 overflow-hidden relative bg-slate-950">
                  <img src={srv.img} alt={srv.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
                  <span className="absolute bottom-3 left-4 font-mono text-[9px] text-amber-400 bg-amber-500/10 border border-amber-500/15 rounded-md px-2 py-0.5 uppercase tracking-wider font-bold">{srv.tag}</span>
                </div>
                <div className="p-5 space-y-2 flex-grow flex flex-col justify-between">
                  <div className="space-y-1">
                    <h4 className="font-sans font-bold text-base text-white">{srv.title}</h4>
                    <p className="font-sans text-xs text-slate-400 leading-relaxed">{srv.desc}</p>
                  </div>
                  <div className="pt-3">
                    <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noreferrer" className="font-mono text-[10px] text-amber-500 hover:text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1">
                      <span>Preguntar informes →</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="gestoria" className="py-24 border-t border-slate-900 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <span className="font-mono text-xs text-amber-500 uppercase tracking-widest font-bold">Trámites Oficiales</span>
          <h2 className="font-sans font-black text-3xl sm:text-5xl text-white tracking-tight">Gestoría <span className="text-amber-500">Vehicular Integral</span></h2>
          <p className="font-sans text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">Evita filas y trámites confusos. Nos encargamos de todo el papeleo legal ante las autoridades de tránsito.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {GESTORIA.map((cat, i) => (
            <div key={i} className="bg-gradient-to-b from-slate-900/60 to-slate-950/60 border border-slate-850 rounded-2xl p-6 relative overflow-hidden space-y-6">
              <div className="absolute top-4 right-4 font-serif font-black text-3xl text-slate-800 opacity-20">{cat.numero}</div>
              <h4 className="font-sans font-black text-lg text-white leading-tight">{cat.titulo}</h4>
              <div className="space-y-4">
                {cat.items.map((item, idx) => (
                  <div key={idx} className="space-y-1 border-l-2 border-amber-500/50 pl-3">
                    <h5 className="font-sans font-bold text-xs text-amber-500">{item.t}</h5>
                    <p className="font-sans text-[11px] text-slate-400 leading-normal">{item.d}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="text-center pt-4">
          <a href={`${SOCIAL_LINKS.whatsapp}?text=${encodeURIComponent('Hola Cuerna Garage! Me gustaría solicitar información y presupuesto sobre trámites de gestoría vehicular.')}`} target="_blank" rel="noreferrer" className="px-6 py-3 bg-slate-900 hover:bg-slate-850 text-amber-500 font-sans font-bold text-xs uppercase tracking-wider rounded-xl border border-slate-800 hover:border-slate-700 transition-all inline-flex items-center gap-1.5">
            <MessageSquare size={13} />
            <span>Consultar Presupuesto de Trámite</span>
          </a>
        </div>
      </section>

      <section id="financiamiento" className="py-24 bg-slate-900/20 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FinancingCalculator />
        </div>
      </section>

      <section id="inventario" className="py-24 border-t border-slate-900 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <span className="font-mono text-xs text-amber-500 uppercase tracking-widest font-bold">Catálogo Actual</span>
          <h2 className="font-sans font-black text-3xl sm:text-5xl text-white tracking-tight">Autos <span className="text-amber-500">Disponibles</span></h2>
          <p className="font-sans text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">Explora las unidades en venta. Haz clic para contactar directamente con un asesor para agendar una prueba de manejo.</p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {['Todos', 'Sedán', 'SUV', 'Pickup', 'Hatchback', 'Motocicleta'].map((cat) => (
            <button key={cat} onClick={() => setInventoryFilter(cat)} className={`px-4 py-1.5 rounded-lg font-sans text-xs font-bold tracking-wider uppercase transition-colors border cursor-pointer ${inventoryFilter === cat ? 'bg-amber-500 text-slate-950 border-amber-400' : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'}`}>
              {cat}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredAvailableCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </AnimatePresence>
        </div>
        {filteredAvailableCars.length === 0 && (
          <div className="text-center py-12 text-slate-500 font-sans text-sm">No hay unidades disponibles de esta categoría en este momento.</div>
        )}
      </section>

      <section id="marketplace" className="py-24 bg-slate-900/20 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <span className="font-mono text-xs text-blue-500 uppercase tracking-widest font-bold">Facebook Marketplace</span>
            <h2 className="font-sans font-black text-3xl sm:text-5xl text-white tracking-tight">Nuestras Publicaciones en <span className="text-blue-500">Venta</span></h2>
            <p className="font-sans text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">Consulta el catálogo que publicamos en redes sociales y mantente al tanto de los vehículos recién colocados.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cars.slice(0, 8).map((car) => (
              <div key={car.id} className="bg-slate-900/50 border border-slate-850 hover:border-slate-800 rounded-2xl overflow-hidden transition-all duration-300">
                <div className="relative h-44 bg-slate-950">
                  <img src={car.imagen} alt={car.nombre} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  {car.estado === 'vendido' ? (
                    <span className="absolute top-3 left-3 font-sans text-[9px] font-black text-white bg-rose-600 px-2 py-1 rounded-md uppercase tracking-wider">VENDIDO</span>
                  ) : (
                    <span className="absolute top-3 left-3 font-sans text-[9px] font-black text-white bg-emerald-600 px-2 py-1 rounded-md uppercase tracking-wider">DISPONIBLE</span>
                  )}
                </div>
                <div className="p-4 space-y-3">
                  <div className="space-y-0.5">
                    <h4 className="font-sans font-bold text-sm text-slate-200 truncate">{car.nombre}</h4>
                    <span className="font-mono text-[9px] text-slate-500 block uppercase">{car.anio} • {car.kilometros}</span>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-slate-850/60">
                    <span className="font-sans font-black text-sm text-white">{car.precio}</span>
                    {car.estado === 'disponible' ? (
                      <a href={`${SOCIAL_LINKS.whatsapp}?text=${encodeURIComponent(`Hola! Me interesa preguntar sobre el ${car.nombre} con precio ${car.precio} que tienen publicado.`)}`} target="_blank" rel="noreferrer" className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">Preguntar →</a>
                    ) : (
                      <span className="text-[10px] font-mono text-slate-600 font-bold uppercase tracking-wider">Vendido</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center pt-4">
            <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noreferrer" className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-sans font-bold text-xs uppercase tracking-wider rounded-xl transition-all inline-flex items-center gap-1.5">
              <span>Ver publicaciones en Facebook</span>
            </a>
          </div>
        </div>
      </section>

      <section className="py-24 border-t border-slate-900 max-w-4xl mx-auto px-4 text-center space-y-10">
        <div className="space-y-2">
          <span className="font-mono text-xs text-amber-500 uppercase tracking-widest font-bold">Testimonios</span>
          <h2 className="font-sans font-black text-3xl text-white tracking-tight">Clientes Satisfechos</h2>
        </div>
        <div className="bg-slate-900/40 border border-slate-900 rounded-3xl p-6 sm:p-10 relative">
          <div className="space-y-6">
            <div className="flex justify-center gap-1">
              {[...Array(TESTIMONIALS[activeTestimonial].rating)].map((_, i) => (
                <span key={i} className="text-amber-500 text-lg">★</span>
              ))}
            </div>
            <p className="font-sans text-sm sm:text-base text-slate-300 leading-relaxed italic">"{TESTIMONIALS[activeTestimonial].text}"</p>
            <div className="flex flex-col items-center">
              <div className="w-11 h-11 bg-amber-500/10 border border-amber-500 text-amber-400 rounded-full flex items-center justify-center font-bold text-sm tracking-tight mb-2">{TESTIMONIALS[activeTestimonial].avatar}</div>
              <span className="font-sans font-bold text-xs text-white">{TESTIMONIALS[activeTestimonial].name}</span>
              <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest mt-0.5">Compró: {TESTIMONIALS[activeTestimonial].car}</span>
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-2">
          {TESTIMONIALS.map((_, idx) => (
            <button key={idx} onClick={() => setActiveTestimonial(idx)} className={`h-2 rounded-full transition-all cursor-pointer ${activeTestimonial === idx ? 'w-6 bg-amber-500' : 'w-2 bg-slate-800'}`} />
          ))}
        </div>
      </section>

      <section className="py-24 bg-slate-900/20 border-t border-slate-900">
        <div className="max-w-3xl mx-auto px-4 space-y-10">
          <div className="text-center space-y-3">
            <span className="font-mono text-xs text-amber-500 uppercase tracking-widest font-bold">FAQ</span>
            <h2 className="font-sans font-black text-3xl text-white tracking-tight">Preguntas <span className="text-amber-500">Frecuentes</span></h2>
          </div>
          <div className="space-y-2.5">
            {FAQS.map((faq, idx) => (
              <div key={idx} className={`bg-slate-900 border rounded-xl overflow-hidden transition-colors ${activeFaq === idx ? 'border-amber-500/40' : 'border-slate-850'}`}>
                <button type="button" onClick={() => setActiveFaq(activeFaq === idx ? null : idx)} className="w-full p-4 text-left font-sans text-xs sm:text-sm font-bold text-slate-200 hover:text-white flex justify-between items-center">
                  <span>{faq.q}</span>
                  <span className={`text-amber-500 transition-transform ${activeFaq === idx ? 'rotate-180' : ''}`}>⌄</span>
                </button>
                {activeFaq === idx && (
                  <div className="px-4 pb-4 font-sans text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-slate-950/20 pt-2">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contacto" className="py-24 border-t border-slate-900 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <span className="font-mono text-xs text-amber-500 uppercase tracking-widest font-bold">Contacto</span>
          <h2 className="font-sans font-black text-3xl sm:text-5xl text-white tracking-tight">Estamos para <span className="text-amber-500">Servirte</span></h2>
          <p className="font-sans text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">Platiquemos sobre el auto que buscas comprar o el trámite que necesitas resolver.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-6">
            <h4 className="font-sans font-black text-xl text-white">Nuestra Información</h4>
            <div className="space-y-4">
              {[{ label: 'WhatsApp de contacto', val: '+52 777 453 9174', sub: 'Atención inmediata', icon: <Phone size={16} /> }, { label: 'Correo de soporte', val: 'cuernagarage@gmail.com', sub: 'Cotizaciones complejas', icon: <Mail size={16} /> }, { label: 'Ubicación física', val: 'Cuernavaca, Morelos, México', sub: 'Previa cita programada', icon: <MapPin size={16} /> }].map((item, idx) => (
                <div key={idx} className="flex gap-4 p-4 bg-slate-900/40 border border-slate-900 rounded-2xl">
                  <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-500 h-11 w-11 flex items-center justify-center flex-shrink-0">{item.icon}</div>
                  <div>
                    <span className="font-mono text-[9px] text-slate-500 uppercase tracking-wider font-bold block">{item.label}</span>
                    <span className="font-sans font-bold text-sm text-white block mt-0.5">{item.val}</span>
                    <span className="font-sans text-[11px] text-slate-400 block">{item.sub}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-7 bg-slate-900/40 border border-slate-900 rounded-3xl p-6 sm:p-8">
            <ContactForm />
          </div>
        </div>
      </section>

      <footer className="bg-slate-950 border-t border-slate-900 py-12 px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3 md:col-span-2">
            <div className="font-sans font-black text-2xl text-white tracking-tight">CUERNA <span className="text-amber-500 font-serif">GARAGE</span></div>
            <p className="font-sans text-xs text-slate-400 leading-relaxed max-w-sm">Tu agencia de confianza de seminuevos garantizados y gestoría vehicular profesional en Cuernavaca, Morelos.</p>
          </div>
          <div className="space-y-2">
            <h5 className="font-mono text-xs text-slate-300 font-bold uppercase tracking-wider">Enlaces Rápidos</h5>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li><button onClick={() => handleScrollToSection('nosotros')} className="hover:text-amber-500 cursor-pointer">Nosotros</button></li>
              <li><button onClick={() => handleScrollToSection('servicios')} className="hover:text-amber-500 cursor-pointer">Servicios</button></li>
              <li><button onClick={() => handleScrollToSection('gestoria')} className="hover:text-amber-500 cursor-pointer">Gestoría Vehicular</button></li>
              <li><button onClick={() => handleScrollToSection('inventario')} className="hover:text-amber-500 cursor-pointer">Inventario</button></li>
              <li><button onClick={() => handleScrollToSection('financiamiento')} className="hover:text-amber-500 cursor-pointer">Financiamiento</button></li>
            </ul>
          </div>
          <div className="space-y-2">
            <h5 className="font-mono text-xs text-slate-300 font-bold uppercase tracking-wider">Contacto Directo</h5>
            <p className="font-sans text-xs text-slate-400">+52 777 453 9174</p>
            <p className="font-sans text-xs text-slate-400">Cuernavaca, Morelos</p>
            <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noreferrer" className="inline-block font-sans text-xs text-amber-500 hover:underline pt-2">Facebook Marketplace</a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] text-slate-600">
          <p>© {new Date().getFullYear()} Cuerna Garage. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <span className="hover:text-amber-500 cursor-pointer" onClick={() => setShowLogin(true)}>Acceso Administrativo</span>
          </div>
        </div>
      </footer>

      {showBackToTop && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-6 right-6 z-50 p-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-full shadow-lg transition-all cursor-pointer" title="Volver arriba">
          <ChevronUp size={18} />
        </button>
      )}

      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onLogin={() => {
            setIsAdmin(true);
            setShowLogin(false);
            setShowAdmin(true);
          }}
        />
      )}

      {/* ✅ AdminPanel con saveCarsToSupabase y fetchCars al cerrar */}
      {showAdmin && (
        <AdminPanel
          cars={cars}
          setCars={(newCars) => {
            setCars(newCars);
            saveCarsToSupabase(newCars);
          }}
          onClose={() => {
            setShowAdmin(false);
            fetchCars();
          }}
        />
      )}
    </div>
  );
}
