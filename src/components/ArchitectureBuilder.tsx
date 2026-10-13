import React, { useState } from 'react';
import { 
  Sliders, Layers, Cpu, Server, Database, Sparkles, 
  FolderTree, Check, ArrowRight, Shield, Zap 
} from 'lucide-react';
import { STACK_BUILDER_OPTIONS } from '../data/appArchitectureData';

export const ArchitectureBuilder: React.FC = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<string>('web');
  const [selectedFrontend, setSelectedFrontend] = useState<string>('react');
  const [selectedBackend, setSelectedBackend] = useState<string>('nodejs');
  const [selectedDatabase, setSelectedDatabase] = useState<string>('postgres');
  const [selectedIntegrations, setSelectedIntegrations] = useState<string[]>(['auth', 'payments']);

  const toggleIntegration = (id: string) => {
    setSelectedIntegrations(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  // Evaluation calculation based on selection
  const getArchitectureMetrics = () => {
    let devSpeed = 'Rápida (1-2 semanas)';
    let scalability = 'Media (hasta 100k usuarios)';
    let initialCost = 'Bajo / Nivel Gratuito ($0 - $15/mes)';

    if (selectedPlatform === 'mobile_native') {
      devSpeed = 'Moderada (requiere programar iOS y Android por separado)';
    }

    if (selectedBackend === 'golang' || selectedDatabase === 'redis_sql') {
      scalability = 'Ultra Alta (millones de peticiones concurrentes)';
    } else if (selectedBackend === 'serverless') {
      scalability = 'Auto-escalable instantánea';
    }

    if (selectedDatabase === 'supabase') {
      devSpeed = 'Ultrarrápida (MVP en días)';
    }

    return { devSpeed, scalability, initialCost };
  };

  const metrics = getArchitectureMetrics();

  // Generated simulated file structure
  const getFileTree = () => {
    const isMobile = selectedPlatform === 'mobile_native';
    const isFlutter = selectedFrontend === 'flutter';
    
    if (isFlutter) {
      return `mi-app/
├── lib/
│   ├── main.dart             # Punto de entrada de la app
│   ├── screens/              # Vistas UI (Feed, Perfil, Checkout)
│   ├── services/api.dart     # Cliente HTTP hacia el Backend
│   └── models/               # Modelos de datos en Dart
├── pubspec.yaml              # Dependencias de paquetes Flutter
└── server/                   # Backend API (${selectedBackend})
    ├── src/routes/           # Endpoints REST
    └── src/db/               # Conexión a ${selectedDatabase}`;
    }

    return `mi-aplicacion/
├── src/                      # Frontend (${selectedFrontend})
│   ├── components/           # Botones, Formularios, Vistas
│   ├── hooks/                # Gestión de estado reactivo
│   ├── services/api.ts       # Llamadas Fetch/Axios a la API
│   └── App.tsx               # Enrutador principal
├── server/                   # Backend (${selectedBackend})
│   ├── routes/               # Rutas (/api/auth, /api/items)
│   ├── controllers/          # Lógica de validación
│   ├── middlewares/auth.ts   # Verificación de Token
│   └── db/schema.sql         # Esquema de ${selectedDatabase}
└── package.json              # Dependencias de la aplicación`;
  };

  return (
    <section id="constructor" className="py-20 border-b border-slate-800/80 bg-slate-900/40 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-400 mb-2">
            <Sliders className="w-3.5 h-3.5" />
            <span>Laboratorio Interactivo</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Diseñador de Arquitectura: Ensambla tu propio Stack
          </h2>
          <p className="text-sm text-slate-400 mt-2 leading-relaxed">
            Experimenta combinando distintas plataformas, librerías de cliente, lenguajes de servidor y bases de datos para ver cómo se estructuran en conjunto.
          </p>
        </div>

        {/* Builder Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column (Left) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 1. Target Platform */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <label className="text-xs font-bold text-sky-400 uppercase tracking-wider block">
                1. Plataforma Objetivo
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {STACK_BUILDER_OPTIONS.platforms.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setSelectedPlatform(p.id);
                      setSelectedFrontend(p.defaultFe);
                    }}
                    className={`p-3 rounded-xl border text-left text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                      selectedPlatform === p.id
                        ? 'bg-slate-900 border-sky-500 ring-1 ring-sky-500 text-white'
                        : 'bg-slate-950 border-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-900/50'
                    }`}
                  >
                    <span className="font-bold text-white block mb-0.5">{p.name}</span>
                    <span className="text-[11px] text-slate-400 line-clamp-1">{p.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Frontend Framework */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <label className="text-xs font-bold text-sky-400 uppercase tracking-wider block">
                2. Frontend (Capa de Cliente)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {STACK_BUILDER_OPTIONS.frontends.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setSelectedFrontend(f.id)}
                    className={`p-3 rounded-xl border text-left text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                      selectedFrontend === f.id
                        ? 'bg-slate-900 border-sky-500 ring-1 ring-sky-500 text-white'
                        : 'bg-slate-950 border-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-900/50'
                    }`}
                  >
                    <span className="font-bold text-white block mb-0.5">{f.name}</span>
                    <span className="text-[11px] text-slate-400 line-clamp-2">{f.role}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Backend Runtime */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <label className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                3. Backend (Capa de Servidor)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {STACK_BUILDER_OPTIONS.backends.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setSelectedBackend(b.id)}
                    className={`p-3 rounded-xl border text-left text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                      selectedBackend === b.id
                        ? 'bg-slate-900 border-emerald-500 ring-1 ring-emerald-500 text-white'
                        : 'bg-slate-950 border-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-900/50'
                    }`}
                  >
                    <span className="font-bold text-white block mb-0.5">{b.name}</span>
                    <span className="text-[11px] text-slate-400 line-clamp-2">{b.role}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Database */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <label className="text-xs font-bold text-purple-400 uppercase tracking-wider block">
                4. Base de Datos (Persistencia)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {STACK_BUILDER_OPTIONS.databases.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setSelectedDatabase(d.id)}
                    className={`p-3 rounded-xl border text-left text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 ${
                      selectedDatabase === d.id
                        ? 'bg-slate-900 border-purple-500 ring-1 ring-purple-500 text-white'
                        : 'bg-slate-950 border-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-900/50'
                    }`}
                  >
                    <span className="font-bold text-white block mb-0.5">{d.name}</span>
                    <span className="text-[11px] text-slate-400 line-clamp-2">{d.role}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 5. Additional Integrations */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                5. Servicios & Módulos Complementarios
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {STACK_BUILDER_OPTIONS.integrations.map((item) => {
                  const isChecked = selectedIntegrations.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      onClick={() => toggleIntegration(item.id)}
                      className={`p-3 rounded-xl border text-left text-xs flex items-start gap-2.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                        isChecked
                          ? 'bg-slate-900 border-sky-500 text-white'
                          : 'bg-slate-950 border-slate-800/80 text-slate-400 hover:text-white'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded flex items-center justify-center shrink-0 mt-0.5 border ${isChecked ? 'bg-sky-500 border-sky-400 text-slate-950' : 'border-slate-700 bg-slate-900'}`}>
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <div>
                        <span className="font-bold text-white block">{item.name}</span>
                        <span className="text-[10px] text-slate-400 leading-snug">{item.desc}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Architecture Blueprint Inspector (Right) */}
          <div className="lg:col-span-5 space-y-6 sticky top-20">
            
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-6 shadow-2xl">
              
              <div className="space-y-1">
                <span className="text-xs font-semibold text-sky-400 uppercase tracking-wider block">
                  Blueprint Arquitectónico Generado
                </span>
                <h3 className="text-lg font-bold text-white">
                  Composición del Stack Personalizado
                </h3>
              </div>

              {/* Visual Connected Stack Diagram */}
              <div className="space-y-2 text-xs">
                
                {/* Node: Client */}
                <div className="p-3.5 rounded-xl bg-slate-900 border border-sky-500/40 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-sky-400 font-mono block">CAPA 1: CLIENTE</span>
                    <span className="font-bold text-white">
                      {STACK_BUILDER_OPTIONS.frontends.find(f => f.id === selectedFrontend)?.name}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">Dispositivo</span>
                </div>

                {/* Arrow */}
                <div className="flex justify-center text-slate-600">
                  <span className="text-xs font-mono">↓ Peticiones JSON sobre HTTPS ↓</span>
                </div>

                {/* Node: Server */}
                <div className="p-3.5 rounded-xl bg-slate-900 border border-emerald-500/40 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-emerald-400 font-mono block">CAPA 2: SERVIDOR & API</span>
                    <span className="font-bold text-white">
                      {STACK_BUILDER_OPTIONS.backends.find(b => b.id === selectedBackend)?.name}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">Cloud Server</span>
                </div>

                {/* Arrow */}
                <div className="flex justify-center text-slate-600">
                  <span className="text-xs font-mono">↓ Consultas de Persistencia ↓</span>
                </div>

                {/* Node: Database */}
                <div className="p-3.5 rounded-xl bg-slate-900 border border-purple-500/40 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-purple-400 font-mono block">CAPA 3: PERSISTENCIA</span>
                    <span className="font-bold text-white">
                      {STACK_BUILDER_OPTIONS.databases.find(d => d.id === selectedDatabase)?.name}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">Storage</span>
                </div>

              </div>

              {/* Performance & Viability Assessment */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 text-xs">
                <span className="font-bold text-white block">Evaluación de la Composición:</span>
                
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Velocidad de Creación:</span>
                  <span className="font-medium text-sky-300">{metrics.devSpeed}</span>
                </div>

                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Escalabilidad de Carga:</span>
                  <span className="font-medium text-emerald-300">{metrics.scalability}</span>
                </div>

                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Costo Inicial de Infra:</span>
                  <span className="font-medium text-amber-300">{metrics.initialCost}</span>
                </div>
              </div>

              {/* Simulated Folder Tree */}
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <FolderTree className="w-3.5 h-3.5 text-sky-400" />
                  <span className="font-medium text-slate-300">Estructura típica de carpetas del proyecto:</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800/80 font-mono text-[11px] text-slate-300 overflow-x-auto leading-relaxed">
                  <pre>{getFileTree()}</pre>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
