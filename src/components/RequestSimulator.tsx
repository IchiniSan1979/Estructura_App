import React, { useState, useEffect } from 'react';
import { 
  Play, Pause, RotateCcw, ChevronLeft, ChevronRight, 
  Smartphone, Network, Server, Database, CheckCircle2, 
  Code2, Clock, ShieldCheck, Zap 
} from 'lucide-react';
import { REQUEST_SCENARIOS, RequestScenario, RequestScenarioStep } from '../data/appArchitectureData';

export const RequestSimulator: React.FC = () => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('login');
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(2500); // ms per step

  const activeScenario: RequestScenario = REQUEST_SCENARIOS.find(s => s.id === selectedScenarioId) || REQUEST_SCENARIOS[0];
  const totalSteps = activeScenario.steps.length;
  const currentStep: RequestScenarioStep = activeScenario.steps[currentStepIndex];

  // Auto-play timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setTimeout(() => {
        if (currentStepIndex < totalSteps - 1) {
          setCurrentStepIndex(prev => prev + 1);
        } else {
          setIsPlaying(false);
        }
      }, playbackSpeed);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStepIndex, totalSteps, playbackSpeed]);

  const handleSelectScenario = (id: string) => {
    setSelectedScenarioId(id);
    setCurrentStepIndex(0);
    setIsPlaying(false);
  };

  const handleNext = () => {
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (currentStepIndex >= totalSteps - 1) {
      setCurrentStepIndex(0);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  // Station status helper
  const getStationStatus = (stationType: 'frontend' | 'network' | 'backend' | 'database') => {
    const isCurrent = currentStep.station === stationType;
    return {
      isCurrent,
      color: isCurrent ? 'ring-2 ring-sky-400 bg-sky-950/80 border-sky-400' : 'bg-slate-900/60 border-slate-800 text-slate-400'
    };
  };

  return (
    <section id="simulador" className="py-20 border-b border-slate-800/80 bg-slate-950 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-400 mb-2">
              <Zap className="w-3.5 h-3.5" />
              <span>Simulador Interactivo en Tiempo Real</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Flujo de Vida de una Petición (Request-Response)
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Observa paso a paso qué ocurre por dentro cuando haces clic en un botón: cómo viajan los datos desde el cliente hasta el disco de la base de datos y de vuelta.
            </p>
          </div>

          {/* Scenario Selector Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl shrink-0 overflow-x-auto">
            {REQUEST_SCENARIOS.map((scenario) => {
              const active = scenario.id === selectedScenarioId;
              return (
                <button
                  key={scenario.id}
                  onClick={() => handleSelectScenario(scenario.id)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                    active 
                      ? 'bg-sky-500 text-slate-950 font-semibold shadow-sm' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {scenario.title.split(' ')[0]} {scenario.title.split(' ')[1]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Current Scenario Info Banner */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div>
            <span className="text-sky-400 font-semibold uppercase tracking-wider block mb-0.5">
              Escenario: {activeScenario.badge}
            </span>
            <p className="text-slate-200 font-medium">
              {activeScenario.description}
            </p>
          </div>
          <div className="text-slate-400 shrink-0">
            Paso <span className="text-white font-mono font-bold tabular-nums">{currentStepIndex + 1}</span> de <span className="text-white font-mono font-bold tabular-nums">{totalSteps}</span>
          </div>
        </div>

        {/* Two-Zone Sandbox Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Zone 1 (Left): Visual Interactive Pipeline Stage */}
          <div className="lg:col-span-7 bg-slate-900/50 rounded-2xl border border-slate-800 p-6 space-y-6">
            
            {/* Visual Flow Architecture Nodes */}
            <div className="relative py-4">
              {/* Connecting Pathway Line */}
              <div className="absolute top-1/2 left-8 right-8 -translate-y-1/2 h-0.5 bg-slate-800 z-0 hidden sm:block" />

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 relative z-10">
                
                {/* Station 1: Frontend */}
                {(() => {
                  const status = getStationStatus('frontend');
                  return (
                    <div className={`p-4 rounded-xl border transition-all text-center space-y-2 ${status.color}`}>
                      <div className="w-10 h-10 mx-auto rounded-lg bg-sky-500/10 flex items-center justify-center text-sky-400 border border-sky-500/20">
                        <Smartphone className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[11px] font-bold text-white block">1. Frontend</span>
                        <span className="text-[10px] text-slate-400 block">Dispositivo / UI</span>
                      </div>
                      {status.isCurrent && (
                        <span className="inline-block text-[10px] font-mono uppercase bg-sky-400/20 text-sky-300 px-2 py-0.5 rounded-full font-semibold">
                          Activo ahora
                        </span>
                      )}
                    </div>
                  );
                })()}

                {/* Station 2: Network / API */}
                {(() => {
                  const status = getStationStatus('network');
                  return (
                    <div className={`p-4 rounded-xl border transition-all text-center space-y-2 ${status.color}`}>
                      <div className="w-10 h-10 mx-auto rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 border border-amber-500/20">
                        <Network className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[11px] font-bold text-white block">2. Red / TLS</span>
                        <span className="text-[10px] text-slate-400 block">Internet / HTTPS</span>
                      </div>
                      {status.isCurrent && (
                        <span className="inline-block text-[10px] font-mono uppercase bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded-full font-semibold">
                          Activo ahora
                        </span>
                      )}
                    </div>
                  );
                })()}

                {/* Station 3: Backend */}
                {(() => {
                  const status = getStationStatus('backend');
                  return (
                    <div className={`p-4 rounded-xl border transition-all text-center space-y-2 ${status.color}`}>
                      <div className="w-10 h-10 mx-auto rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                        <Server className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[11px] font-bold text-white block">3. Backend</span>
                        <span className="text-[10px] text-slate-400 block">Servidor Cloud</span>
                      </div>
                      {status.isCurrent && (
                        <span className="inline-block text-[10px] font-mono uppercase bg-emerald-400/20 text-emerald-300 px-2 py-0.5 rounded-full font-semibold">
                          Activo ahora
                        </span>
                      )}
                    </div>
                  );
                })()}

                {/* Station 4: Database */}
                {(() => {
                  const status = getStationStatus('database');
                  return (
                    <div className={`p-4 rounded-xl border transition-all text-center space-y-2 ${status.color}`}>
                      <div className="w-10 h-10 mx-auto rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 border border-purple-500/20">
                        <Database className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[11px] font-bold text-white block">4. Base de Datos</span>
                        <span className="text-[10px] text-slate-400 block">Disco / SQL</span>
                      </div>
                      {status.isCurrent && (
                        <span className="inline-block text-[10px] font-mono uppercase bg-purple-400/20 text-purple-300 px-2 py-0.5 rounded-full font-semibold">
                          Activo ahora
                        </span>
                      )}
                    </div>
                  );
                })()}

              </div>
            </div>

            {/* Step Progress Tracker */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Progreso de la transacción</span>
                <span className="font-mono tabular-nums">{Math.round(((currentStepIndex + 1) / totalSteps) * 100)}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div 
                  className="bg-sky-500 h-full transition-all duration-300"
                  style={{ width: `${((currentStepIndex + 1) / totalSteps) * 100}%` }}
                />
              </div>
            </div>

            {/* Playback Controls Deck */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-800">
              <div className="flex items-center gap-2">
                <button
                  onClick={togglePlay}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{isPlaying ? 'Pausar' : 'Reproducir'}</span>
                </button>

                <button
                  onClick={handleReset}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
                  title="Reiniciar al inicio"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Step Navigation */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  disabled={currentStepIndex === 0}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:pointer-events-none text-slate-200 text-xs font-medium transition-colors"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Anterior</span>
                </button>

                <button
                  onClick={handleNext}
                  disabled={currentStepIndex === totalSteps - 1}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:pointer-events-none text-slate-200 text-xs font-medium transition-colors"
                >
                  <span>Siguiente</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800/80">
                <span className="text-slate-400 block text-[10px]">Latencia estimada</span>
                <span className="font-mono font-bold text-sky-400 tabular-nums">
                  {currentStep.metrics?.latency || '~10ms'}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800/80">
                <span className="text-slate-400 block text-[10px]">Protocolo en uso</span>
                <span className="font-mono font-medium text-emerald-400">
                  {currentStep.metrics?.protocol || 'HTTP/2'}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800/80 col-span-2 sm:col-span-1">
                <span className="text-slate-400 block text-[10px]">Capa actual</span>
                <span className="font-semibold text-white truncate block">
                  {currentStep.station.toUpperCase()}
                </span>
              </div>
            </div>

          </div>

          {/* Zone 2 (Right): Detail & Technical Code Inspector Deck */}
          <div className="lg:col-span-5 bg-slate-900/70 rounded-2xl border border-slate-800 p-6 space-y-5">
            
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-sky-400 uppercase tracking-wider">
                <span>{currentStep.stationLabel}</span>
              </div>
              <h3 className="text-lg font-bold text-white">
                {currentStep.title}
              </h3>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              {currentStep.description}
            </p>

            <div className="p-3.5 rounded-xl bg-slate-950/90 border border-slate-800/90 text-xs text-slate-400 leading-relaxed">
              <strong className="text-slate-200 block mb-1">Detalle arquitectónico:</strong>
              {currentStep.detail}
            </div>

            {/* Code Snippet if present */}
            {currentStep.codeSnippet && (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-slate-400 px-1">
                  <div className="flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5 text-sky-400" />
                    <span className="font-mono text-slate-300">{currentStep.codeSnippet.title}</span>
                  </div>
                  <span className="text-[10px] uppercase font-mono text-slate-400">{currentStep.codeSnippet.lang}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-400 overflow-x-auto leading-relaxed shadow-inner">
                  <pre>{currentStep.codeSnippet.code}</pre>
                </div>
              </div>
            )}

            {/* Outcome check */}
            {currentStepIndex === totalSteps - 1 && (
              <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-800/50 flex items-start gap-2.5 text-xs text-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-emerald-200 font-bold mb-0.5">Ciclo completado con éxito:</strong>
                  {activeScenario.finalResult}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
