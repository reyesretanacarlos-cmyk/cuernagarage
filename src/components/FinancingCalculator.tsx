import React, { useState } from 'react';

export default function FinancingCalculator() {
  const [price, setPrice] = useState(350000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [months, setMonths] = useState(36);

  const downPaymentAmount = price * (downPaymentPercent / 100);
  const loanAmount = price - downPaymentAmount;
  const annualRate = 0.149; // 14.9% tasa anual
  const monthlyRate = annualRate / 12;
  
  const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
  const totalPayment = (monthlyPayment * months) + downPaymentAmount;

  return (
    <div className="bg-slate-900/40 border border-slate-900 rounded-3xl p-6 sm:p-10 space-y-8">
      <div className="text-center space-y-3">
        <span className="font-mono text-xs text-amber-500 uppercase tracking-widest font-bold">
          Simulador
        </span>
        <h3 className="font-sans font-black text-2xl sm:text-3xl text-white tracking-tight">
          Calcula tu <span className="text-amber-500">Financiamiento</span>
        </h3>
        <p className="font-sans text-xs text-slate-400 max-w-md mx-auto">
          Con Hey Banco de Banregio. Enganche desde el 20% con seguro incluido.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label className="font-mono text-[10px] text-slate-500 uppercase tracking-wider font-bold block">
            Precio del vehículo: ${price.toLocaleString()}
          </label>
          <input
            type="range"
            min="100000"
            max="1000000"
            step="10000"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full accent-amber-500"
          />
        </div>
        <div className="space-y-2">
          <label className="font-mono text-[10px] text-slate-500 uppercase tracking-wider font-bold block">
            Enganche: {downPaymentPercent}% (${downPaymentAmount.toLocaleString()})
          </label>
          <input
            type="range"
            min="20"
            max="50"
            step="5"
            value={downPaymentPercent}
            onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
            className="w-full accent-amber-500"
          />
        </div>
        <div className="space-y-2">
          <label className="font-mono text-[10px] text-slate-500 uppercase tracking-wider font-bold block">
            Plazo: {months} meses
          </label>
          <input
            type="range"
            min="12"
            max="60"
            step="6"
            value={months}
            onChange={(e) => setMonths(Number(e.target.value))}
            className="w-full accent-amber-500"
          />
        </div>
      </div>

      <div className="bg-slate-950/60 border border-slate-850 rounded-2xl p-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        <div>
          <div className="font-mono text-[9px] text-slate-500 uppercase tracking-wider font-bold">Mensualidad estimada</div>
          <div className="font-sans font-black text-2xl text-amber-500 mt-1">
            ${monthlyPayment.toLocaleString('es-MX', { maximumFractionDigits: 0 })}
          </div>
        </div>
        <div>
          <div className="font-mono text-[9px] text-slate-500 uppercase tracking-wider font-bold">Enganche</div>
          <div className="font-sans font-black text-2xl text-white mt-1">
            ${downPaymentAmount.toLocaleString()}
          </div>
        </div>
        <div>
          <div className="font-mono text-[9px] text-slate-500 uppercase tracking-wider font-bold">Total a pagar</div>
          <div className="font-sans font-black text-2xl text-white mt-1">
            ${totalPayment.toLocaleString('es-MX', { maximumFractionDigits: 0 })}
          </div>
        </div>
      </div>

      <p className="font-sans text-[10px] text-slate-500 text-center">
        * Cálculo ilustrativo con tasa anual del 14.9%. Sujeto a aprobación crediticia.
      </p>
    </div>
  );
}
