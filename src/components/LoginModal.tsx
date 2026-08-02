import React, { useState } from 'react';
import { motion } from 'motion/react';

interface LoginModalProps {
  onClose: () => void;
  onLogin: () => void;
}

export default function LoginModal({ onClose, onLogin }: LoginModalProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Contraseña simple para demo (en producción usar autenticación real)
    if (password === 'cuernagarage2024') {
      onLogin();
    } else {
      setError('Contraseña incorrecta');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay oscuro */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
      />
      
      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl"
      >
        {/* Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="font-sans font-black text-2xl text-white tracking-tight">
            CUERNA <span className="text-amber-500 font-serif">GARAGE</span>
          </div>
          <p className="font-sans text-xs text-slate-400">
            Acceso Administrativo
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="font-mono text-[10px] text-slate-500 uppercase tracking-wider font-bold block">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl font-sans text-sm text-white placeholder-slate-600 focus:border-amber-500 focus:outline-none transition-colors"
              placeholder="Ingresa la contraseña"
              autoFocus
            />
          </div>

          {error && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl">
              <p className="font-sans text-xs text-rose-400 text-center">{error}</p>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-slate-800 hover:bg-slate-750 text-slate-300 font-sans font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-sans font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
            >
              Entrar
            </button>
          </div>
        </form>

        {/* Hint */}
        <p className="font-mono text-[9px] text-slate-600 text-center mt-4">
          Contraseña: cuernagarage2024
        </p>
      </motion.div>
    </div>
  );
}
