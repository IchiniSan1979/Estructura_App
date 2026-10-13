import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, XCircle, RotateCcw, Award } from 'lucide-react';
import { QUIZ_QUESTIONS, QuizQuestion } from '../data/appArchitectureData';

export const QuizSection: React.FC = () => {
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState<boolean>(false);

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    if (showResults) return;
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const answeredCount = Object.keys(userAnswers).length;
  const totalQuestions = QUIZ_QUESTIONS.length;

  // Calculate score
  const score = QUIZ_QUESTIONS.reduce((acc, q) => {
    return acc + (userAnswers[q.id] === q.correctIndex ? 1 : 0);
  }, 0);

  const handleReset = () => {
    setUserAnswers({});
    setShowResults(false);
  };

  return (
    <section id="quiz" className="py-20 border-b border-slate-800/80 bg-slate-950 scroll-mt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-400">
            <HelpCircle className="w-4 h-4" />
            <span>Autoevaluación de Conceptos</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Pon a prueba tus conocimientos sobre Apps
          </h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
            Responde 5 preguntas clave para comprobar si comprendes los principios de Frontend, Backend, Base de Datos y Seguridad en aplicaciones.
          </p>
        </div>

        {/* Score Banner when checked */}
        {showResults && (
          <div className="p-6 rounded-2xl bg-slate-900 border border-sky-500/40 text-center space-y-3 shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-sky-500/10 text-sky-400 mx-auto flex items-center justify-center border border-sky-500/20">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-semibold text-sky-400 uppercase tracking-wider block">
                Resultado Final
              </span>
              <h3 className="text-2xl font-bold text-white mt-1">
                Obtuviste <span className="text-sky-400 font-mono tabular-nums">{score}</span> de <span className="font-mono tabular-nums">{totalQuestions}</span> aciertos ({Math.round((score / totalQuestions) * 100)}%)
              </h3>
            </div>
            <p className="text-xs text-slate-300 max-w-md mx-auto">
              {score === 5 
                ? '¡Excelente! Tienes una comprensión sólida y clara de la arquitectura de software moderna.'
                : score >= 3
                ? '¡Muy bien! Comprendes los fundamentos principales de las tres capas.'
                : 'Sigue explorando las capas y el simulador para reforzar los conceptos técnicos.'}
            </p>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Intentar de nuevo</span>
            </button>
          </div>
        )}

        {/* Questions List */}
        <div className="space-y-6">
          {QUIZ_QUESTIONS.map((q, idx) => {
            const selectedOpt = userAnswers[q.id];
            const isAnswered = selectedOpt !== undefined;
            const isCorrect = isAnswered && selectedOpt === q.correctIndex;

            return (
              <div 
                key={q.id}
                className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4"
              >
                <div className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-sky-500/10 text-sky-400 font-mono text-xs font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
                    {q.question}
                  </h3>
                </div>

                {/* Options */}
                <div className="space-y-2 pl-9">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = selectedOpt === optIdx;
                    let optionStyle = 'bg-slate-950/70 border-slate-800 text-slate-300 hover:bg-slate-900 hover:text-white';

                    if (showResults) {
                      if (optIdx === q.correctIndex) {
                        optionStyle = 'bg-emerald-950/40 border-emerald-500 text-emerald-200 font-medium';
                      } else if (isSelected) {
                        optionStyle = 'bg-red-950/40 border-red-500 text-red-200';
                      } else {
                        optionStyle = 'bg-slate-950/40 border-slate-850 text-slate-500 opacity-60';
                      }
                    } else if (isSelected) {
                      optionStyle = 'bg-sky-950/50 border-sky-400 text-sky-200 font-medium ring-1 ring-sky-400';
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectOption(q.id, optIdx)}
                        disabled={showResults}
                        className={`w-full p-3 rounded-xl border text-left text-xs transition-colors flex items-center justify-between gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${optionStyle}`}
                      >
                        <span>{opt}</span>
                        {showResults && optIdx === q.correctIndex && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        )}
                        {showResults && isSelected && optIdx !== q.correctIndex && (
                          <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation Callout */}
                {showResults && (
                  <div className={`mt-3 ml-9 p-3.5 rounded-xl text-xs leading-relaxed ${isCorrect ? 'bg-emerald-950/20 text-emerald-300 border border-emerald-900/40' : 'bg-slate-950 text-slate-300 border border-slate-800'}`}>
                    <strong className="block mb-1 text-slate-200">Explicación didáctica:</strong>
                    {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Submit Bar */}
        {!showResults && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
            <span className="text-xs text-slate-400">
              Has respondido <strong className="text-white font-mono">{answeredCount}</strong> de <strong className="text-white font-mono">{totalQuestions}</strong> preguntas
            </span>
            <button
              onClick={() => setShowResults(true)}
              disabled={answeredCount < totalQuestions}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-semibold text-xs bg-sky-500 hover:bg-sky-400 disabled:opacity-40 disabled:pointer-events-none text-slate-950 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            >
              Comprobar Respuestas
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
