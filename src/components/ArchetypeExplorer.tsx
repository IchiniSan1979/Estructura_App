import React, { useState } from 'react';
import { 
  Compass, Share2, ShoppingCart, Music, MessageSquare, 
  Workflow, AlertCircle, CheckCircle, Server, Database, Smartphone 
} from 'lucide-react';
import { APP_ARCHETYPES, ArchetypeApp } from '../data/appArchitectureData';

export const ArchetypeExplorer: React.FC = () => {
  const [selectedArchetypeId, setSelectedArchetypeId] = useState<string>('social');

  const activeApp: ArchetypeApp = APP_ARCHETYPES.find(a => a.id === selectedArchetypeId) || APP_ARCHETYPES[0];

  const getArchetypeIcon = (id: string) => {
    switch (id) {
      case 'social':
        return <Share2 className="w-4 h-4" />;
      case 'ecommerce':
        return <ShoppingCart className="w-4 h-4" />;
      case 'streaming':
        return <Music className="w-4 h-4" />;
      default:
        return <MessageSquare className="w-4 h-4" />;
    }
  };

  return (
    <section id="arquetipos" className="py-20 border-b border-slate-800/80 bg-slate-950 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-400 mb-2">
            <Compass className="w-3.5 h-3.5" />
            <span>Casos del Mundo Real</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            ¿Cómo están compuestas las apps famosas que usas?
          </h2>
          <p className="text-sm text-slate-400 mt-2 leading-relaxed">
            No todas las apps se construyen igual: una red social necesita CDNs de video ultrarrápidas, mientras que un banco o e-commerce prioriza no duplicar cobros.
          </p>
        </div>

        {/* Archetype Selector Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {APP_ARCHETYPES.map((archetype) => {
            const isSelected = archetype.id === selectedArchetypeId;
            return (
              <button
                key={archetype.id}
                onClick={() => setSelectedArchetypeId(archetype.id)}
                className={`p-4 rounded-xl border text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                  isSelected
                    ? 'bg-slate-900 border-sky-500 shadow-lg ring-1 ring-sky-500'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-2 mb-2 text-sky-400">
                  {getArchetypeIcon(archetype.id)}
                  <span className="text-xs font-bold text-white truncate block">
                    {archetype.name.split(' ')[0]}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                  {archetype.tagline}
                </p>
              </button>
            );
          })}
        </div>

        {/* Selected Archetype Deep Dive */}
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-8">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-sky-400 uppercase tracking-wider mb-1">
                <span>Arquetipo: {activeApp.category}</span>
              </div>
              <h3 className="text-2xl font-bold text-white">
                {activeApp.name}
              </h3>
              <p className="text-sm text-slate-300 mt-1 max-w-2xl">
                {activeApp.summary}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 md:max-w-xs shrink-0">
              <span className="font-semibold text-slate-200 block mb-0.5">Flujo Típico de Datos:</span>
              <p className="font-mono text-[11px] text-sky-300 leading-relaxed">
                {activeApp.dataFlowSnippet}
              </p>
            </div>
          </div>

          {/* 3 Pillars for this Archetype */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Frontend Specs */}
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800/90 space-y-3">
              <div className="flex items-center gap-2 text-sky-400 font-bold text-xs uppercase tracking-wider">
                <Smartphone className="w-4 h-4" />
                <span>Frontend en este caso</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                {activeApp.frontendSpecs.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-sky-400 font-bold">·</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Backend Specs */}
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800/90 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                <Server className="w-4 h-4" />
                <span>Backend en este caso</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                {activeApp.backendSpecs.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">·</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Database & Storage Specs */}
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800/90 space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-xs uppercase tracking-wider">
                <Database className="w-4 h-4" />
                <span>Persistencia & Datos</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                {activeApp.databaseSpecs.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-purple-400 font-bold">·</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Hardest Bottleneck Callout */}
          <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/40 text-xs text-amber-200 flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-amber-300 font-bold mb-0.5">El Mayor Desafío de Ingeniería en este tipo de App:</strong>
              <p className="text-slate-300 leading-relaxed">
                {activeApp.bottleneckChallenge}
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
