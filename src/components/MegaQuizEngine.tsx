"use client";

import { useState, useEffect } from "react";
import type { QuizQuestion } from "@/lib/quiz";
import { getMegaQuizState, saveMegaQuizState, MegaQuizState, QuestionResult } from "@/lib/supabase";
import Link from "next/link";

export default function MegaQuizEngine({ questions }: { questions: QuizQuestion[] }) {
  const [state, setState] = useState<MegaQuizState | null>(null);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    async function loadState() {
      const savedState = await getMegaQuizState();
      
      if (savedState) {
        // Obnovujeme uložený stav
        setState(savedState);
        
        // Zkusíme obnovit volbu, pokud jsme už na otázku odpověděli ale nešli dál?
        // Ne, stav ukazuje `currentIdx`. Pokud `answers` má délku větší než `currentIdx`, znamená to že jsme už odpověděli.
        const currentAnswer = savedState.answers.find(a => 
          a.questionId === savedState.questionsOrder[savedState.currentIdx]?.questionId &&
          a.topic === savedState.questionsOrder[savedState.currentIdx]?.topic
        );
        
        if (currentAnswer) {
          setSelected(currentAnswer.selectedOption);
          setIsSubmitted(true);
        }
      } else {
        // Inicializujeme nový mega kvíz
        if (questions.length === 0) return;
        
        // Vytvoříme náhodné pořadí otázek
        const order = questions.map(q => ({ topic: q.topic || '', questionId: q.id }));
        for (let i = order.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [order[i], order[j]] = [order[j], order[i]];
        }
        
        // Vytvoříme a uložíme si předem i zamíchané odpovědi pro každou otázku,
        // aby po refreshu měly otázky odpovědi stále stejně zpřeházené.
        const shuffledMap: Record<string, ('a'|'b'|'c'|'d')[]> = {};
        for (const q of questions) {
          const opts: ('a'|'b'|'c'|'d')[] = ['a', 'b', 'c', 'd'];
          for (let i = opts.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [opts[i], opts[j]] = [opts[j], opts[i]];
          }
          shuffledMap[`${q.topic}-${q.id}`] = opts;
        }

        const newState: MegaQuizState = {
          questionsOrder: order,
          currentIdx: 0,
          answers: [],
          shuffledOptionsByQuestion: shuffledMap
        };
        setState(newState);
        saveMegaQuizState(newState);
      }
      setLoading(false);
    }
    loadState();
  }, [questions]);

  if (loading) return <div style={{ textAlign: 'center' }}>Načítám stav Mega kvízu...</div>;
  if (!state || questions.length === 0) return <div style={{ textAlign: 'center' }}>Žádné otázky nejsou k dispozici.</div>;

  const finished = state.currentIdx >= state.questionsOrder.length;

  if (finished) {
    const score = state.answers.filter(a => a.isCorrect).length;
    const percentage = Math.round((score / state.questionsOrder.length) * 100);
    return (
      <div className="card" style={{ textAlign: 'center', padding: 'var(--spacing-40) var(--spacing-20)' }}>
        <h2>Mega Kvíz Dokončen!</h2>
        <p style={{ fontSize: '24px' }}>Tvé skóre: {percentage}%</p>
        <button 
          className="btn-primary" 
          onClick={() => {
            if (typeof window !== 'undefined') {
              localStorage.removeItem('mega_quiz_state');
              window.location.reload();
            }
          }}
        >
          Spustit nový Mega Kvíz
        </button>
      </div>
    );
  }

  const currentQOrder = state.questionsOrder[state.currentIdx];
  const question = questions.find(q => q.id === currentQOrder.questionId && q.topic === currentQOrder.topic);

  if (!question) {
    return <div>Chyba: Otázka nenalezena. Zkuste restartovat kvíz.</div>;
  }

  const shuffledOptions = state.shuffledOptionsByQuestion[`${question.topic}-${question.id}`] || ['a', 'b', 'c', 'd'];

  const handleSubmit = () => {
    if (!selected) return;
    
    const isCorrect = selected === question.correctAnswer;
    const newAnswer: QuestionResult = {
      topic: question.topic || '',
      questionId: question.id,
      isCorrect,
      selectedOption: selected
    };

    const newState = {
      ...state,
      answers: [...state.answers, newAnswer]
    };
    
    setState(newState);
    saveMegaQuizState(newState); // Hned uložíme, i když ještě nepřejdeme dál
    setIsSubmitted(true);
    
    // Pro Mega kvíz automaticky dispatchneme event pro update Progress baru v navigaci
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('megaQuizUpdate'));
    }
  };

  const handleNext = () => {
    const newState = {
      ...state,
      currentIdx: state.currentIdx + 1
    };
    setState(newState);
    saveMegaQuizState(newState);
    setSelected(null);
    setIsSubmitted(false);
  };

  return (
    <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ color: 'var(--color-stone)', fontSize: '14px', marginBottom: 'var(--spacing-16)', fontWeight: 600 }}>
        Otázka {state.currentIdx + 1} z {state.questionsOrder.length} 
        <span style={{ float: 'right', fontWeight: 400 }}>Téma: {question.topic}</span>
      </div>
      
      <h3 style={{ fontSize: '20px', marginBottom: 'var(--spacing-24)' }}>{question.text}</h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-12)' }}>
        {shuffledOptions.map((opt, index) => {
          const displayLabel = ['A', 'B', 'C', 'D'][index];
          const isSelected = selected === opt;
          const isCorrect = opt === question.correctAnswer;
          const showCorrect = isSubmitted && isCorrect;
          const showWrong = isSubmitted && isSelected && !isCorrect;

          let bgColor = 'var(--color-canvas)';
          let borderColor = 'var(--color-outline-gray)';
          
          if (showCorrect) {
            bgColor = '#e6f4ea';
            borderColor = '#137333';
          } else if (showWrong) {
            bgColor = '#fce8e6';
            borderColor = '#c5221f';
          } else if (isSelected) {
            borderColor = 'var(--color-ink)';
          }

          return (
            <button 
              key={opt}
              disabled={isSubmitted}
              onClick={() => setSelected(opt)}
              style={{
                textAlign: 'left',
                padding: 'var(--spacing-16)',
                borderRadius: 'var(--radius-default)',
                border: `2px solid ${borderColor}`,
                backgroundColor: bgColor,
                cursor: isSubmitted ? 'default' : 'pointer',
                fontFamily: 'var(--font-inter)',
                fontSize: '16px',
                color: 'var(--color-ink)',
                transition: 'all 0.2s'
              }}
            >
              <strong>{displayLabel})</strong> {question.options[opt]}
            </button>
          );
        })}
      </div>

      {isSubmitted && (
        <div style={{ marginTop: 'var(--spacing-24)', padding: 'var(--spacing-16)', backgroundColor: 'var(--color-whisper-gray)', borderRadius: 'var(--radius-default)' }}>
          <h4 style={{ marginBottom: 'var(--spacing-8)' }}>Vysvětlení lektora:</h4>
          <p style={{ margin: 0 }}>{question.explanation}</p>
        </div>
      )}

      <div style={{ marginTop: 'var(--spacing-32)', display: 'flex', justifyContent: 'flex-end' }}>
        {!isSubmitted ? (
          <button className="btn-primary" disabled={!selected} onClick={handleSubmit}>
            Zkontrolovat a uložit
          </button>
        ) : (
          <button className="btn-primary" onClick={handleNext}>
            {state.currentIdx + 1 < state.questionsOrder.length ? 'Další otázka' : 'Dokončit kvíz'}
          </button>
        )}
      </div>
    </div>
  );
}
