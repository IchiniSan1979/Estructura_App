import React from 'react';
import { Layers, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-14 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Core Principles Summary Strip */}
        <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-1">
            <span className="font-bold text-sky-400 block text-sm">1. El Frontend es Efímero</span>
            <p className="text-slate-400 leading-relaxed text-xs">
              Muestra píxeles y escucha clics. Si el usuario cierra la pestaña, la memoria local se resetea pero el sistema central sigue vivo.
            </p>
          </div>
          <div className="space-y-1">
            <span className="font-bold text-emerald-400 block text-sm">2. El Backend es la Aduana</span>
            <p className="text-slate-400 leading-relaxed text-xs">
              Nunca permitas que el cliente toque datos directamente. Toda regla de negocio, cobro o autenticación debe validarse en el servidor.
            </p>
          </div>
          <div className="space-y-1">
            <span className="font-bold text-purple-400 block text-sm">3. La Base de Datos es la Verdad</span>
            <p className="text-slate-400 leading-relaxed text-xs">
              Las bases relacionales y transaccionales garantizan que dos usuarios no compren el mismo asiento de avión en el mismo milisegundo.
            </p>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-900">
          <div className="flex items-center gap-2.5 text-slate-300 font-semibold text-sm">
            <div className="w-6 h-6 rounded-md bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
              <Layers className="w-3.5 h-3.5" />
            </div>
            <span>Anatomía de una Aplicación Informática</span>
          </div>

          <div className="flex items-center gap-6 text-slate-400">
            <a href="#capas" className="hover:text-slate-200 transition-colors">Las Capas</a>
            <a href="#simulador" className="hover:text-slate-200 transition-colors">Simulador</a>
            <a href="#arquetipos" className="hover:text-slate-200 transition-colors">Arquetipos</a>
            <a href="#constructor" className="hover:text-slate-200 transition-colors">Stack Builder</a>
            <a href="#quiz" className="hover:text-slate-200 transition-colors">Quiz</a>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 transition-colors"
            title="Volver arriba"
          >
            <span>Subir</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
