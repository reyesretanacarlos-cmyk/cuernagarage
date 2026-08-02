import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Car } from '../types';
import { INITIAL_CARS } from '../data';

interface AdminPanelProps {
  cars: Car[];
  setCars: React.Dispatch<React.SetStateAction<Car[]>>;
  onClose: () => void;
}

export default function AdminPanel({ cars, setCars, onClose }: AdminPanelProps) {
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Partial<Car>>({
    nombre: '',
    anio: new Date().getFullYear(),
    kilometros: '',
    precio: '',
    estado: 'disponible',
    categoria: 'Sedán',
    imagen: '',
    descripcion: '',
    transmision: 'Automática',
    combustible: 'Gasolina',
    color: '',
    puertas: 4
  });

  const resetForm = () => {
    setFormData({
      nombre: '',
      anio: new Date().getFullYear(),
      kilometros: '',
      precio: '',
      estado: 'disponible',
      categoria: 'Sedán',
      imagen: '',
      descripcion: '',
      transmision: 'Automática',
      combustible: 'Gasolina',
      color: '',
      puertas: 4
    });
    setEditingCar(null);
    setShowForm(false);
  };

  const handleAddCar = () => {
    setEditingCar(null);
    resetForm();
    setShowForm(true);
  };

  const handleEditCar = (car: Car) => {
    setEditingCar(car);
    setFormData(car);
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nombre || !formData.precio) {
      alert('Nombre y precio son obligatorios');
      return;
    }

    if (editingCar) {
      // Update existing car
      setCars(cars.map(c => c.id === editingCar.id ? { ...formData, id: editingCar.id } as Car : c));
    } else {
      // Add new car
      const newCar: Car = {
        ...formData as Car,
        id: Date.now().toString()
      };
      setCars([...cars, newCar]);
    }

    resetForm();
  };

  const handleDeleteCar = (id: string) => {
    if (confirm('¿Estás seguro de eliminar este auto?')) {
      setCars(cars.filter(c => c.id !== id));
    }
  };

  const handleToggleStatus = (car: Car) => {
    const newStatus = car.estado === 'disponible' ? 'vendido' : 'disponible';
    setCars(cars.map(c => c.id === car.id ? { ...c, estado: newStatus } : c));
  };

  const handleResetData = () => {
    if (confirm('¿Estás seguro de restaurar los datos iniciales? Se perderán todos los cambios.')) {
      setCars(INITIAL_CARS);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm"
      />
      
      {/* Panel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div>
            <h2 className="font-sans font-black text-2xl text-white tracking-tight">
              Panel de <span className="text-amber-500">Administración</span>
            </h2>
            <p className="font-sans text-xs text-slate-400 mt-1">
              Gestiona tu inventario de vehículos
            </p>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-750 text-slate-300 font-sans font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
          >
            Cerrar
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {!showForm ? (
            <>
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-slate-950/60 border border-slate-850 rounded-xl p-4">
                  <div className="font-mono text-[9px] text-slate-500 uppercase tracking-wider font-bold">Total Autos</div>
                  <div className="font-sans font-black text-2xl text-white mt-1">{cars.length}</div>
                </div>
                <div className="bg-slate-950/60 border border-slate-850 rounded-xl p-4">
                  <div className="font-mono text-[9px] text-slate-500 uppercase tracking-wider font-bold">Disponibles</div>
                  <div className="font-sans font-black text-2xl text-emerald-500 mt-1">
                    {cars.filter(c => c.estado === 'disponible').length}
                  </div>
                </div>
                <div className="bg-slate-950/60 border border-slate-850 rounded-xl p-4">
                  <div className="font-mono text-[9px] text-slate-500 uppercase tracking-wider font-bold">Vendidos</div>
                  <div className="font-sans font-black text-2xl text-rose-500 mt-1">
                    {cars.filter(c => c.estado === 'vendido').length}
                  </div>
                </div>
                <div className="bg-slate-950/60 border border-slate-850 rounded-xl p-4">
                  <div className="font-mono text-[9px] text-slate-500 uppercase tracking-wider font-bold">Valor Total</div>
                  <div className="font-sans font-black text-2xl text-amber-500 mt-1">
                    ${cars.reduce((acc, c) => acc + parseInt(c.precio.replace(/[^0-9]/g, '')), 0).toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 mb-6">
                <button
                  onClick={handleAddCar}
                  className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-sans font-black text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>+ Agregar Auto</span>
                </button>
                <button
                  onClick={handleResetData}
                  className="px-6 py-3 bg-slate-800 hover:bg-slate-750 text-slate-300 font-sans font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                >
                  Restaurar Datos
                </button>
              </div>

              {/* Cars Table */}
              <div className="bg-slate-950/40 border border-slate-850 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-950 border-b border-slate-850">
                      <tr>
                        <th className="text-left px-4 py-3 font-mono text-[9px] text-slate-500 uppercase tracking-wider font-bold">Auto</th>
                        <th className="text-left px-4 py-3 font-mono text-[9px] text-slate-500 uppercase tracking-wider font-bold">Año</th>
                        <th className="text-left px-4 py-3 font-mono text-[9px] text-slate-500 uppercase tracking-wider font-bold">Categoría</th>
                        <th className="text-left px-4 py-3 font-mono text-[9px] text-slate-500 uppercase tracking-wider font-bold">Precio</th>
                        <th className="text-left px-4 py-3 font-mono text-[9px] text-slate-500 uppercase tracking-wider font-bold">Estado</th>
                        <th className="text-right px-4 py-3 font-mono text-[9px] text-slate-500 uppercase tracking-wider font-bold">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-850">
                      {cars.map((car) => (
                        <tr key={car.id} className="hover:bg-slate-900/40 transition-colors">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <img src={car.imagen} alt={car.nombre} className="w-10 h-10 rounded-lg object-cover bg-slate-950" />
                              <div>
                                <div className="font-sans font-bold text-xs text-white">{car.nombre}</div>
                                <div className="font-mono text-[9px] text-slate-500">{car.kilometros}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 font-sans text-xs text-slate-300">{car.anio}</td>
                          <td className="px-4 py-3">
                            <span className="font-mono text-[9px] text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-md px-2 py-0.5 uppercase tracking-wider font-bold">
                              {car.categoria}
                            </span>
                          </td>
                          <td className="px-4 py-3 font-sans font-black text-xs text-white">{car.precio}</td>
                          <td className="px-4 py-3">
                            <span className={`font-sans text-[9px] font-black text-white px-2 py-1 rounded-md uppercase tracking-wider ${
                              car.estado === 'vendido' ? 'bg-rose-600' : 'bg-emerald-600'
                            }`}>
                              {car.estado}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleToggleStatus(car)}
                                className="px-2 py-1 bg-slate-800 hover:bg-slate-750 text-slate-300 font-sans font-bold text-[9px] uppercase tracking-wider rounded transition-colors cursor-pointer"
                              >
                                {car.estado === 'vendido' ? 'Disponible' : 'Vender'}
                              </button>
                              <button
                                onClick={() => handleEditCar(car)}
                                className="px-2 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-sans font-bold text-[9px] uppercase tracking-wider rounded transition-colors cursor-pointer"
                              >
                                Editar
                              </button>
                              <button
                                onClick={() => handleDeleteCar(car.id)}
                                className="px-2 py-1 bg-rose-600 hover:bg-rose-500 text-white font-sans font-bold text-[9px] uppercase tracking-wider rounded transition-colors cursor-pointer"
                              >
                                Eliminar
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          ) : (
            /* Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-sans font-black text-xl text-white">
                  {editingCar ? 'Editar Auto' : 'Agregar Nuevo Auto'}
                </h3>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-750 text-slate-300 font-sans font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] text-slate-500 uppercase tracking-wider font-bold">Nombre *</label>
                  <input
                    type="text"
                    required
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl font-sans text-sm text-white placeholder-slate-600 focus:border-amber-500 focus:outline-none transition-colors"
                    placeholder="Ej: Honda Civic 2020"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] text-slate-500 uppercase tracking-wider font-bold">Año *</label>
                  <input
                    type="number"
                    required
                    value={formData.anio}
                    onChange={(e) => setFormData({ ...formData, anio: Number(e.target.value) })}
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl font-sans text-sm text-white placeholder-slate-600 focus:border-amber-500 focus:outline-none transition-colors"
                    min="1990"
                    max={new Date().getFullYear() + 1}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] text-slate-500 uppercase tracking-wider font-bold">Precio *</label>
                  <input
                    type="text"
                    required
                    value={formData.precio}
                    onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl font-sans text-sm text-white placeholder-slate-600 focus:border-amber-500 focus:outline-none transition-colors"
                    placeholder="Ej: $320,000 MXN"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] text-slate-500 uppercase tracking-wider font-bold">Kilometros</label>
                  <input
                    type="text"
                    value={formData.kilometros}
                    onChange={(e) => setFormData({ ...formData, kilometros: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl font-sans text-sm text-white placeholder-slate-600 focus:border-amber-500 focus:outline-none transition-colors"
                    placeholder="Ej: 45,000 km"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] text-slate-500 uppercase tracking-wider font-bold">Categoría</label>
                  <select
                    value={formData.categoria}
                    onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl font-sans text-sm text-white focus:border-amber-500 focus:outline-none transition-colors"
                  >
                    <option value="Sedán">Sedán</option>
                    <option value="SUV">SUV</option>
                    <option value="Pickup">Pickup</option>
                    <option value="Hatchback">Hatchback</option>
                    <option value="Motocicleta">Motocicleta</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] text-slate-500 uppercase tracking-wider font-bold">Estado</label>
                  <select
                    value={formData.estado}
                    onChange={(e) => setFormData({ ...formData, estado: e.target.value as 'disponible' | 'vendido' })}
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl font-sans text-sm text-white focus:border-amber-500 focus:outline-none transition-colors"
                  >
                    <option value="disponible">Disponible</option>
                    <option value="vendido">Vendido</option>
                  </select>
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <label className="font-mono text-[10px] text-slate-500 uppercase tracking-wider font-bold">URL de Imagen</label>
                  <input
                    type="url"
                    value={formData.imagen}
                    onChange={(e) => setFormData({ ...formData, imagen: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl font-sans text-sm text-white placeholder-slate-600 focus:border-amber-500 focus:outline-none transition-colors"
                    placeholder="https://..."
                  />
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <label className="font-mono text-[10px] text-slate-500 uppercase tracking-wider font-bold">Descripción</label>
                  <textarea
                    rows={3}
                    value={formData.descripcion}
                    onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl font-sans text-sm text-white placeholder-slate-600 focus:border-amber-500 focus:outline-none transition-colors resize-none"
                    placeholder="Descripción del vehículo..."
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] text-slate-500 uppercase tracking-wider font-bold">Transmisión</label>
                  <select
                    value={formData.transmision}
                    onChange={(e) => setFormData({ ...formData, transmision: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl font-sans text-sm text-white focus:border-amber-500 focus:outline-none transition-colors"
                  >
                    <option value="Automática">Automática</option>
                    <option value="Manual">Manual</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] text-slate-500 uppercase tracking-wider font-bold">Combustible</label>
                  <select
                    value={formData.combustible}
                    onChange={(e) => setFormData({ ...formData, combustible: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl font-sans text-sm text-white focus:border-amber-500 focus:outline-none transition-colors"
                  >
                    <option value="Gasolina">Gasolina</option>
                    <option value="Diésel">Diésel</option>
                    <option value="Híbrido">Híbrido</option>
                    <option value="Eléctrico">Eléctrico</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] text-slate-500 uppercase tracking-wider font-bold">Color</label>
                  <input
                    type="text"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl font-sans text-sm text-white placeholder-slate-600 focus:border-amber-500 focus:outline-none transition-colors"
                    placeholder="Ej: Blanco"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] text-slate-500 uppercase tracking-wider font-bold">Puertas</label>
                  <input
                    type="number"
                    value={formData.puertas}
                    onChange={(e) => setFormData({ ...formData, puertas: Number(e.target.value) })}
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl font-sans text-sm text-white placeholder-slate-600 focus:border-amber-500 focus:outline-none transition-colors"
                    min="2"
                    max="6"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-sans font-black text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                >
                  {editingCar ? 'Guardar Cambios' : 'Agregar Auto'}
                </button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
