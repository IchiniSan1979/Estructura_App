/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { RequestSimulator } from './components/RequestSimulator';
import { LayersExplodedView } from './components/LayersExplodedView';
import { ArchetypeExplorer } from './components/ArchetypeExplorer';
import { ArchitectureBuilder } from './components/ArchitectureBuilder';
import { QuizSection } from './components/QuizSection';
import { GlossaryModal } from './components/GlossaryModal';
import { Footer } from './components/Footer';

export default function App() {
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);

  const scrollToSimulator = () => {
    const el = document.getElementById('simulador');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToLayers = () => {
    const el = document.getElementById('capas');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-sky-500 selection:text-slate-950">
      {/* Navigation Header */}
      <Header onOpenGlossary={() => setIsGlossaryOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero & The Restaurant Metaphor */}
        <HeroSection 
          onScrollToSimulator={scrollToSimulator}
          onScrollToLayers={scrollToLayers}
        />

        {/* 2. Interactive Request-Response Lifecycle Simulator */}
        <RequestSimulator />

        {/* 3. Deep Dive Layer-by-Layer Exploded View */}
        <LayersExplodedView />

        {/* 4. Real-world Archetypes (Instagram, Amazon, Spotify, WhatsApp) */}
        <ArchetypeExplorer />

        {/* 5. Interactive Architecture & Tech Stack Builder */}
        <ArchitectureBuilder />

        {/* 6. Diagnostic Quiz / Knowledge Test */}
        <QuizSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Technical Glossary Modal */}
      <GlossaryModal 
        isOpen={isGlossaryOpen} 
        onClose={() => setIsGlossaryOpen(false)} 
      />
    </div>
  );
}
