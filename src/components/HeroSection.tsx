import React, { useState } from 'react';
import { ArrowRight, Utensils, Smartphone, Server, Database, Network } from 'lucide-react';
import heroImage from '../assets/images/hero_app_architecture_1791826202659.jpg';

interface HeroSectionProps {
  onScrollToSimulator: () => void;
  onScrollToLayers: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onScrollToSimulator,
  onScrollToLayers
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <section className="relative overflow-hidden pt-12 pb-20 border-b border-slate-800/80 bg-gradient-to-b from-slate-950 via-slate-900/60 to-slate-950">
      {/* Subtle background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-sky-500/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Core Explanation & Metaphor */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-sky-400">
              <span className="w-2 h-2 rounded-full bg-sky-400" />
              <span>Arquitectura & Anatomía de Software</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15] text-balance">
              ¿Cómo está compuesta realmente una aplicación?
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              Cualquier app que usas hoy en día —desde <strong className="text-white font-semibold">WhatsApp</strong> y <strong className="text-white font-semibold">Netflix</strong> hasta el banco de tu país— funciona gracias a la coordinación de <span className="text-sky-300 font-medium">tres capas fundamentales</span> conectadas a través de internet.
            </p>

            {/* The Restaurant Analogy Box */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-amber-400">
                <Utensils className="w-4 h-4" />
                <span>La famosa analogía del Restaurante:</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-300">
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <span className="font-bold text-sky-300 block mb-1">1. El Salón & La Carta</span>
                  <p className="text-slate-400">
                    <strong className="text-slate-200">Frontend (Cliente):</strong> La mesa, los cubiertos y la carta física con precios que el comensal ve y toca.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <span className="font-bold text-emerald-300 block mb-1">2. La Cocina & Los Chefs</span>
                  <p className="text-slate-400">
                    <strong className="text-slate-200">Backend (Servidor):</strong> El área cerrada donde se preparan los platos con reglas estrictas y seguridad.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <span className="font-bold text-purple-300 block mb-1">3. La Despensa / Frigo</span>
                  <p className="text-slate-400">
                    <strong className="text-slate-200">Base de Datos:</strong> El inventario donde los ingredientes y pedidos se conservan permanentemente.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onScrollToSimulator}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-sky-500 hover:bg-sky-400 text-slate-950 shadow-lg shadow-sky-500/20 transition-all hover:translate-y-[-1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
              >
                <span>Probar el Simulador Interactivo</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onScrollToLayers}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700/60 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
              >
                <span>Explorar Capa por Capa</span>
              </button>
            </div>
          </div>

          {/* Right Column: Visual Architectural Diagram Image */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl group">
              {!imgError ? (
                <img
                  src={heroImage}
                  alt="Esquema arquitectónico de las capas de una aplicación moderna"
                  className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="p-8 aspect-video flex flex-col items-center justify-center text-center bg-slate-900 space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
                    <Network className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-white text-base">Arquitectura Multicapa</h3>
                  <p className="text-xs text-slate-400 max-w-xs">
                    Frontend (Dispositivo del usuario) ↔ APIs & Red ↔ Backend (Servidor) ↔ Base de Datos
                  </p>
                </div>
              )}
              
              <div className="p-4 bg-slate-950/90 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span className="font-medium text-slate-200">Corte Transversal Arquitectónico</span>
                <div className="flex items-center gap-2">
                  <span className="text-sky-400">Cliente</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-emerald-400">API</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-purple-400">Base de Datos</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3-Pillar KPI Strip Below Split Hero */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16">
          <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800/80 hover:border-sky-500/40 transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-semibold text-sky-400 uppercase tracking-wider block">Capa 1</span>
                <h3 className="text-base font-bold text-white">Frontend (Cliente)</h3>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Lo que el usuario ve y toca. Corre en el navegador o teléfono móvil (React, Flutter, Swift). Convierte datos crudos en gráficos, botones y formularios.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800/80 hover:border-emerald-500/40 transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Server className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block">Capa 2</span>
                <h3 className="text-base font-bold text-white">Backend (Servidor)</h3>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              El cerebro seguro en la nube. Valida permisos, procesa pagos y reglas de negocio. Corre en servidores remotos (Node.js, Python, Go, Java).
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800/80 hover:border-purple-500/40 transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider block">Capa 3</span>
                <h3 className="text-base font-bold text-white">Base de Datos (Persistencia)</h3>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              La memoria permanente. Guarda usuarios, contraseñas encriptadas y compras (PostgreSQL, MongoDB, Redis) para que no se pierdan al cerrar la app.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
