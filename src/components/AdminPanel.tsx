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
                  <div className="font-s
