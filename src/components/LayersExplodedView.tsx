import React, { useState } from 'react';
import { 
  Layers, Smartphone, Server, Database, Cloud, AlertTriangle, 
  CheckCircle2, Code2, ArrowUpRight 
} from 'lucide-react';
import { ARCHITECTURE_LAYERS, LayerInfo } from '../data/appArchitectureData';
import explodedImage from '../assets/images/diagram_app_layers_1791826210748.jpg';

export const LayersExplodedView: React.FC = () => {
  const [selectedLayerId, setSelectedLayerId] = useState<string>('frontend');
  const [imgError, setImgError] = useState<boolean>(false);

  const activeLayer: LayerInfo = ARCHITECTURE_LAYERS.find(l => l.id === selectedLayerId) || ARCHITECTURE_LAYERS[0];

  const getLayerIcon = (id: string) => {
    switch (id) {
      case 'frontend':
        return <Smartphone className="w-4 h-4" />;
      case 'backend':
        return <Server className="w-4 h-4" />;
      case 'database':
        return <Database className="w-4 h-4" />;
      default:
        return <Cloud className="w-4 h-4" />;
    }
  };

  return (
    <section id="capas" className="py-20 border-b border-slate-800/80 bg-slate-900/30 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-400 mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>Desglose Estructural</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Anatomía Capa por Capa: ¿Qué hay dentro de cada nivel?
          </h2>
          <p className="text-sm text-slate-400 mt-2 leading-relaxed">
            Una app no es un único bloque monolítico; es un ecosistema modular de componentes especializados donde cada nivel tiene una función irremplazable.
          </p>
        </div>

        {/* Visual Exploded Diagram Preview */}
        <div className="rounded-2xl border border-slate-800 overflow-hidden bg-slate-950 grid grid-cols-1 lg:grid-cols-12 shadow-xl">
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-semibold text-sky-400 uppercase tracking-wider block">
                Vista Despiezada (Exploded View)
              </span>
              <h3 className="text-xl font-bold text-white leading-snug">
                Separación de Responsabilidades en Software
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                El principio de ingeniería más importante es que <strong className="text-white">el cliente nunca manipula la base de datos directamente</strong>. El servidor actúa como aduana obligatoria que valida, encripta y controla las reglas de negocio.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 space-y-1.5">
              <span className="font-semibold text-slate-200 block">Regla de Oro de Seguridad:</span>
              <p>
                "Nunca confíes en el código que corre en la máquina del usuario (Frontend). Todo valor crítico debe ser revalidado en el Servidor (Backend)."
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 bg-slate-900/80 border-t lg:border-t-0 lg:border-l border-slate-800 flex items-center justify-center p-2">
            {!imgError ? (
              <img
                src={explodedImage}
                alt="Diagrama despiezado de las capas de una app: UI de cristal, microchips de lógica y cilindros de base de datos"
                className="w-full h-auto max-h-[380px] object-contain rounded-xl"
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="p-8 text-center text-xs text-slate-400">
                Diagrama técnico de separación de capas
              </div>
            )}
          </div>
        </div>

        {/* Layer Selector Tabs */}
        <div className="flex items-center gap-2 p-1.5 bg-slate-950 border border-slate-800 rounded-xl overflow-x-auto">
          {ARCHITECTURE_LAYERS.map((layer) => {
            const isActive = layer.id === selectedLayerId;
            return (
              <button
                key={layer.id}
                onClick={() => setSelectedLayerId(layer.id)}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                  isActive
                    ? 'bg-sky-500 text-slate-950 shadow-md font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                {getLayerIcon(layer.id)}
                <span>{layer.number}. {layer.title.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Active Layer Deep Dive Card */}
        <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-8 shadow-2xl">
          
          {/* Header of Active Layer */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-6 border-b border-slate-800/80">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-sky-400 font-semibold mb-1">
                <span>Capa {activeLayer.number}</span>
                <span aria-hidden="true">·</span>
                <span className="text-slate-400">{activeLayer.subtitle}</span>
              </div>
              <h3 className="text-2xl font-bold text-white">
                {activeLayer.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
                {activeLayer.role}
              </p>
            </div>

            {/* Metaphor pill replacement: clean unboxed callout */}
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 md:max-w-xs shrink-0">
              <span className="font-semibold text-amber-400 block mb-1">En el Restaurante:</span>
              <p className="text-slate-400">{activeLayer.analogy}</p>
            </div>
          </div>

          {/* Grid: Responsibilities & Sub-Components */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Responsibilities List */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                Responsabilidades Principales
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-300">
                {activeLayer.responsibilities.map((resp, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-900/60 border border-slate-800/60">
                    <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Key Components Breakdown */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                Bloques Internos que la componen
              </h4>
              <div className="space-y-3">
                {activeLayer.keyComponents.map((comp, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                    <span className="text-xs font-bold text-white block">
                      {comp.name}
                    </span>
                    <p className="text-xs text-slate-300">
                      {comp.description}
                    </p>
                    <div className="text-[11px] text-sky-400 font-mono pt-1">
                      Ejemplos: {comp.examples}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Popular Tech & Code Sample */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4 border-t border-slate-800">
            
            {/* Technologies */}
            <div className="lg:col-span-5 space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Tecnologías y Estándares Líderes
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {activeLayer.popularTech.map((tech, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-slate-900/70 border border-slate-800 space-y-0.5">
                    <span className="font-semibold text-slate-200 block truncate">{tech.name}</span>
                    <span className="text-[10px] text-slate-400 block truncate">{tech.category}</span>
                  </div>
                ))}
              </div>

              {/* What happens if it fails */}
              <div className="p-3.5 rounded-xl bg-red-950/20 border border-red-900/40 text-xs text-red-300 space-y-1 mt-4">
                <div className="flex items-center gap-1.5 font-bold text-red-400">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>¿Qué pasa si esta capa falla?</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  {activeLayer.failureConsequence}
                </p>
              </div>
            </div>

            {/* Code Box */}
            <div className="lg:col-span-7 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <Code2 className="w-3.5 h-3.5 text-sky-400" />
                  <span className="font-mono text-slate-300">{activeLayer.sampleCode.filename}</span>
                </div>
                <span className="text-[10px] uppercase font-mono">{activeLayer.sampleCode.language}</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/90 font-mono text-xs text-slate-300 overflow-x-auto shadow-inner leading-relaxed">
                <pre>{activeLayer.sampleCode.code}</pre>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
