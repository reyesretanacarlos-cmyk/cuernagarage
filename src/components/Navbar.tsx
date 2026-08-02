import React from 'react';
import { motion } from 'motion/react';

interface NavbarProps {
  onAdminClick: () => void;
  isAdmin: boolean;
  activeSection: string;
}

const navItems = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'nosotros', label: 'Nosotros' },
  { id: 'servicios', label: 'Servicios' },
  { id: 'gestoria', label: 'Gestoría' },
  { id: 'financiamiento', label: 'Financiamiento' },
  { id: 'inventario', label: 'Inventario' },
  { id: 'marketplace', label: 'Marketplace' },
  { id: 'contacto', label: 'Contacto' }
];

export default function Navbar({ onAdminClick, isAdmin, activeSection }: NavbarProps) {
  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="font-sans font-black text-lg text-white tracking-tight">
            CUERNA <span className="text-amber-500 font-serif">GARAGE</span>
          </div>
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleScroll(item.id)}
                className={`px-3 py-1.5 rounded-lg font-sans text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                  activeSection === item.id
                    ? 'text-amber-500'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <button
            onClick={onAdminClick}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-sans font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
          >
            {isAdmin ? 'Admin' : 'Login'}
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
