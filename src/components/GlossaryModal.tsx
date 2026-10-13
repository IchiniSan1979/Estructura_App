import React, { useState } from 'react';
import { X, Search, BookOpen, Lightbulb } from 'lucide-react';
import { GLOSSARY_ITEMS, GlossaryItem } from '../data/appArchitectureData';

interface GlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlossaryModal: React.FC<GlossaryModalProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('Todos');

  if (!isOpen) return null;

  const categories = ['Todos', 'General', 'Frontend', 'Backend', 'Base de Datos', 'Infraestructura'];

  const filteredItems = GLOSSARY_ITEMS.filter(item => {
    const matchesCategory = activeCategory === 'Todos' || item.category === activeCategory;
    const matchesSearch = item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.definition.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.simpleAnalogy.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className="w-full max-w-3xl max-h-[85vh] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-scaleUp"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between gap-4 bg-slate-950/50">
          <div className="flex items-center gap-2.5 text-white">
            <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base leading-tight">Glosario de Términos de Software</h3>
              <p className="text-xs text-slate-400">Conceptos clave explicados con definiciones claras y analogías cotidianas</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="p-4 border-b border-slate-800 space-y-3 bg-slate-900">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar término (ej. API, JWT, Frontend, Caché)..."
              className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-2.5 py-1 text-[11px] font-medium rounded-lg whitespace-nowrap transition-colors ${
                  activeCategory === cat
                    ? 'bg-sky-500 text-slate-950 font-semibold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Items List */}
        <div className="p-5 overflow-y-auto space-y-3.5 flex-1 divide-y divide-slate-800/60">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-500">
              No se encontraron términos para "{searchQuery}".
            </div>
          ) : (
            filteredItems.map((item, idx) => (
              <div key={idx} className={idx > 0 ? 'pt-3.5 space-y-2' : 'space-y-2'}>
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm font-bold text-white tracking-wide">
                    {item.term}
                  </h4>
                  <span className="text-[10px] font-mono text-sky-400">
                    {item.category}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {item.definition}
                </p>
                <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80 flex items-start gap-2 text-xs text-amber-300">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <p className="text-[11px] text-slate-300">
                    <strong className="text-amber-300 font-semibold">Analogía simple: </strong>
                    {item.simpleAnalogy}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-xs text-slate-400">
          <span>{filteredItems.length} términos disponibles</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
