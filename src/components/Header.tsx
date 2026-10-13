import React from 'react';
import { Layers, BookOpen, Sparkles } from 'lucide-react';

interface HeaderProps {
  onOpenGlossary: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenGlossary }) => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 lg:px-8 h-16">
        {/* Zone 1: Single text element wordmark */}
        <a 
          href="#" 
          className="flex items-center gap-2.5 text-slate-100 font-bold tracking-tight text-lg whitespace-nowrap shrink-0 hover:text-sky-400 transition-colors"
        >
          <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
            <Layers className="w-4 h-4" />
          </div>
          <span>Anatomía de una App</span>
        </a>

        {/* Zone 2: 4-5 concise single-line nav links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-400">
          <a href="#capas" className="hover:text-slate-100 transition-colors whitespace-nowrap shrink-0">
            Las 3 Capas
          </a>
          <a href="#simulador" className="hover:text-slate-100 transition-colors whitespace-nowrap shrink-0">
            Simulador de Petición
          </a>
          <a href="#arquetipos" className="hover:text-slate-100 transition-colors whitespace-nowrap shrink-0">
            Apps Famosas
          </a>
          <a href="#constructor" className="hover:text-slate-100 transition-colors whitespace-nowrap shrink-0">
            Diseñador de Stack
          </a>
          <a href="#quiz" className="hover:text-slate-100 transition-colors whitespace-nowrap shrink-0">
            Test Interactivo
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenGlossary}
            className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-sky-300 bg-sky-950/60 border border-sky-800/60 rounded-lg hover:bg-sky-900/50 hover:border-sky-600 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Glosario Técnico</span>
          </button>
        </div>
      </div>
    </header>
  );
};
