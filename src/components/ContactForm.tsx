import React, { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: ''
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Esto abrirá WhatsApp con el mensaje listo
    const text = `Hola Cuerna Garage, soy ${formData.nombre}. ${formData.mensaje} (Tel: ${formData.telefono}, Email: ${formData.email})`;
    const url = `https://wa.me/527774539174?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setFormData({ nombre: '', email: '', telefono: '', mensaje: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="font-mono text-[10px] text-slate-500 uppercase tracking-wider font-bold">Nombre</label>
          <input
            type="text"
            required
            value={formData.nombre}
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl font-sans text-sm text-white placeholder-slate-600 focus:border-amber-500 focus:outline-none transition-colors"
            placeholder="Tu nombre completo"
          />
        </div>
        <div className="space-y-1.5">
          <label className="font-mono text-[10px] text-slate-500 uppercase tracking-wider font-bold">Email</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl font-sans text-sm text-white placeholder-slate-600 focus:border-amber-500 focus:outline-none transition-colors"
            placeholder="tu@email.com"
          />
        </div>
      </div>
      <div className="space-y-1.5">
        <label className="font-mono text-[10px] text-slate-500 uppercase tracking-wider font-bold">Teléfono</label>
        <input
          type="tel"
          required
          value={formData.telefono}
          onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
          className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl font-sans text-sm text-white placeholder-slate-600 focus:border-amber-500 focus:outline-none transition-colors"
          placeholder="10 dígitos"
        />
      </div>
      <div className="space-y-1.5">
        <label className="font-mono text-[10px] text-slate-500 uppercase tracking-wider font-bold">Mensaje</label>
        <textarea
          required
          rows={4}
          value={formData.mensaje}
          onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
          className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl font-sans text-sm text-white placeholder-slate-600 focus:border-amber-500 focus:outline-none transition-colors resize-none"
          placeholder="¿En qué auto o trámite estás interesado?"
        />
      </div>
      <button
        type="submit"
        className="w-full px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-sans font-black text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
      >
        {sent ? '¡Abriendo WhatsApp!' : 'Enviar por WhatsApp'}
      </button>
    </form>
  );
}
