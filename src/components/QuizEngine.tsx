"use client";

import { useState, useEffect } from "react";
import type { QuizQuestion } from "@/lib/quiz";
import Link from "next/link";
import { saveQuizResult } from "@/lib/supabase";

interface QuizEngineProps {
  topic: string;
  questions: QuizQuestion[];
}

export default function QuizEngine({ topic, questions }: QuizEngineProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState<('a' | 'b' | 'c' | 'd')[]>(['a', 'b', 'c', 'd']);
  const [details, setDetails] = useState<any[]>([]);

  useEffect(() => {
    // Shuffle options whenever currentIdx changes
    if (questions.length > 0) {
      const opts: ('a' | 'b' | 'c' | 'd')[] = ['a', 'b', 'c', 'd'];
      for (let i = opts.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [opts[i], opts[j]] = [opts[j], opts[i]];
      }
      setShuffledOptions(opts);
    }
  }, [currentIdx, questions.length]);

  useEffect(() => {
    if (finished) {
      const percentage = Math.round((score / questions.length) * 100);
      saveQuizResult({
        topic,
        score,
        total: questions.length,
        passed: percentage >= 60,
        details
      });
    }
  }, [finished, score, questions.length, topic, details]);

  if (questions.length === 0) {
    return (
      <div className="card">
        <h3>Kvíz zatím není k dispozici</h3>
        <p>Pro toto téma ještě nebyl vygenerován žádný kvíz, nebo má špatný formát.</p>
        <Link href="/" className="btn-primary" style={{ display: 'inline-block', marginTop: 'var(--spacing-16)' }}>Zpět domů</Link>
      </div>
    );
  }

  if (finished) {
    const percentage = Math.round((score / questions.length) * 100);
    const passed = percentage >= 60;
    
    return (
      <div className="card" style={{ textAlign: 'center', padding: 'var(--spacing-40) var(--spacing-20)' }}>
        <h2 style={{ fontSize: '32px', marginBottom: 'var(--spacing-16)' }}>Výsledek: {percentage}%</h2>
        
        {passed ? (
          <div style={{ padding: 'var(--spacing-16)', backgroundColor: '#e6f4ea', color: '#137333', borderRadius: 'var(--radius-default)', marginBottom: 'var(--spacing-24)' }}>
            <strong>Gratulace!</strong> Prošel jsi standardem NSK (min. 60 %).
          </div>
        ) : (
          <div style={{ padding: 'var(--spacing-16)', backgroundColor: '#fce8e6', color: '#c5221f', borderRadius: 'var(--radius-default)', marginBottom: 'var(--spacing-24)' }}>
            <strong>Pozor!</strong> Podle standardů NSK bys u zkoušky neprošel (potřebuješ min. 60 %). Lektor doporučuje téma znovu nastudovat.
          </div>
        )}

        <div className="mobile-col mobile-w-full" style={{ display: 'flex', gap: 'var(--spacing-12)', justifyContent: 'center' }}>
          <button className="btn-primary mobile-w-full" onClick={() => window.location.reload()}>Zkusit znovu</button>
          <Link href={`/vypisy/${topic}`} className="btn-primary mobile-w-full mobile-text-center" style={{ backgroundColor: 'var(--color-parchment)', color: 'var(--color-ink)', border: '1px solid var(--color-outline-gray)' }}>
            Zpět na teorii
          </Link>
        </div>
      </div>
    );
  }

  const question = questions[currentIdx];

  const handleSubmit = () => {
    if (!selected) return;
    
    const isCorrect = selected === question.correctAnswer;
    if (isCorrect) {
      setScore(s => s + 1);
    }
    
    setDetails(prev => [...prev, {
      topic,
      questionId: question.id,
      isCorrect,
      selectedOption: selected
    }]);

    setIsSubmitted(true);
  };

  const handleNext = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(i => i + 1);
      setSelected(null);
      setIsSubmitted(false);
    } else {
      setFinished(true);
    }
  };

  return (
    <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ color: 'var(--color-stone)', fontSize: '14px', marginBottom: 'var(--spacing-16)', fontWeight: 600 }}>
        Otázka {currentIdx + 1} z {questions.length}
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

      <div className="mobile-w-full" style={{ marginTop: 'var(--spacing-32)', display: 'flex', justifyContent: 'flex-end' }}>
        {!isSubmitted ? (
          <button className="btn-primary mobile-w-full" disabled={!selected} onClick={handleSubmit}>
            Zkontrolovat
          </button>
        ) : (
          <button className="btn-primary mobile-w-full" onClick={handleNext}>
            {currentIdx + 1 < questions.length ? 'Další otázka' : 'Dokončit kvíz'}
          </button>
        )}
      </div>
    </div>
  );
}
