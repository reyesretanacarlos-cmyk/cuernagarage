import React from 'react';
import { motion } from 'motion/react';
import { Car } from '../types';
import { SOCIAL_LINKS } from '../data';

interface CarCardProps {
  car: Car;
}

export default function CarCard({ car }: CarCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="bg-slate-900/60 border border-slate-850 hover:border-amber-500/30 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col"
    >
      <div className="relative h-48 overflow-hidden bg-slate-950">
        <img
          src={car.imagen}
          alt={car.nombre}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <span className={`absolute top-3 left-3 font-sans text-[9px] font-black text-white px-2 py-1 rounded-md uppercase tracking-wider ${
          car.estado === 'vendido' ? 'bg-rose-600' : 'bg-emerald-600'
        }`}>
          {car.estado === 'vendido' ? 'VENDIDO' : 'DISPONIBLE'}
        </span>
        <span className="absolute top-3 right-3 font-mono text-[9px] text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-md px-2 py-0.5 uppercase tracking-wider font-bold">
          {car.categoria}
        </span>
      </div>
      <div className="p-5 space-y-3 flex-grow flex flex-col">
        <div>
          <h3 className="font-sans font-bold text-base text-white">{car.nombre}</h3>
          <span className="font-mono text-[10px] text-slate-500 uppercase tracking-wider">
            {car.anio} • {car.kilometros}
          </span>
        </div>
        {car.descripcion && (
          <p className="font-sans text-xs text-slate-400 leading-relaxed line-clamp-2">
            {car.descripcion}
          </p>
        )}
        <div className="mt-auto pt-3 border-t border-slate-850 flex items-center justify-between">
          <span className="font-sans font-black text-lg text-amber-500">{car.precio}</span>
          {car.estado === 'disponible' && (
            <a
              href={`${SOCIAL_LINKS.whatsapp}?text=${encodeURIComponent(`Hola! Me interesa el ${car.nombre} (${car.precio})`)}`}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-[10px] text-emerald-400 font-bold uppercase tracking-wider hover:text-emerald-300"
            >
              Contactar →
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
