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
        // === MERGE LOGIKA ===
        // Porovnáme uložený stav s aktuálními otázkami.
        // Nové otázky přidáme na konec fronty, smazané odstraníme z nezodpovězených.
        // Průběh uživatele (odpovědi, pozice) zůstane nedotčený.

        const savedKeys = new Set(
          savedState.questionsOrder.map(s => `${s.topic}-${s.questionId}`)
        );
        const currentKeys = new Set(
          questions.map(q => `${(q.topic || '')}-${q.id}`)
        );

        // Nové otázky = existují v aktuálním setu, ale NE v uloženém pořadí
        const newQuestions = questions.filter(
          q => !savedKeys.has(`${q.topic}-${q.id}`)
        );

        // Smazané otázky = jsou v uloženém pořadí, ale už neexistují v aktuálních kvízech
        const removedKeys = new Set(
          savedState.questionsOrder
            .filter(s => !currentKeys.has(`${s.topic}-${s.questionId}`))
            .map(s => `${s.topic}-${s.questionId}`)
        );

        const needsMerge = newQuestions.length > 0 || removedKeys.size > 0;

        let mergedState = savedState;

        if (needsMerge) {
          // 1) Odstraníme smazané otázky z fronty (pouze nezodpovězené)
          //    Zodpovězené zůstávají v answers pro historii.
          let updatedOrder = savedState.questionsOrder.filter(
            s => !removedKeys.has(`${s.topic}-${s.questionId}`)
          );

          // 2) Posuneme currentIdx – kolik smazaných otázek bylo PŘED aktuální pozicí?
          const removedBeforeCurrent = savedState.questionsOrder
            .slice(0, savedState.currentIdx)
            .filter(s => removedKeys.has(`${s.topic}-${s.questionId}`))
            .length;
          const adjustedIdx = Math.max(0, savedState.currentIdx - removedBeforeCurrent);

          // 3) Nové otázky zamícháme a přidáme na KONEC fronty
          const newOrder = newQuestions.map(q => ({ topic: q.topic || '', questionId: q.id }));
          for (let i = newOrder.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newOrder[i], newOrder[j]] = [newOrder[j], newOrder[i]];
          }
          updatedOrder = [...updatedOrder, ...newOrder];

          // 4) Zamícháme odpovědi pro nové otázky
          const updatedShuffledMap = { ...savedState.shuffledOptionsByQuestion };
          for (const q of newQuestions) {
            const opts: ('a'|'b'|'c'|'d')[] = ['a', 'b', 'c', 'd'];
            for (let i = opts.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [opts[i], opts[j]] = [opts[j], opts[i]];
            }
            updatedShuffledMap[`${q.topic}-${q.id}`] = opts;
          }

          // 5) Odstraníme shuffled options pro smazané otázky
          for (const key of removedKeys) {
            delete updatedShuffledMap[key];
          }

          mergedState = {
            questionsOrder: updatedOrder,
            currentIdx: adjustedIdx,
            answers: savedState.answers, // Zachováme všechny odpovědi (i pro smazané, pro historii)
            shuffledOptionsByQuestion: updatedShuffledMap
          };

          // Uložíme sloučený stav (Supabase + localStorage fallback)
          saveMegaQuizState(mergedState);
        }

        setState(mergedState);

        // Obnovíme volbu, pokud jsme na aktuální otázku už odpověděli
        const currentAnswer = mergedState.answers.find(a => 
          a.questionId === mergedState.questionsOrder[mergedState.currentIdx]?.questionId &&
          a.topic === mergedState.questionsOrder[mergedState.currentIdx]?.topic
        );
        if (currentAnswer) {
          setSelected(currentAnswer.selectedOption);
          setIsSubmitted(true);
        }

        setLoading(false);
        return;
      }

      // === INICIALIZACE NOVÉHO MEGA KVÍZU (žádný uložený stav) ===
      if (questions.length === 0) { setLoading(false); return; }
      
      const order = questions.map(q => ({ topic: q.topic || '', questionId: q.id }));
      for (let i = order.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [order[i], order[j]] = [order[j], order[i]];
      }
      
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

      <div className="mobile-w-full" style={{ marginTop: 'var(--spacing-32)', display: 'flex', justifyContent: 'flex-end' }}>
        {!isSubmitted ? (
          <button className="btn-primary mobile-w-full" disabled={!selected} onClick={handleSubmit}>
            Zkontrolovat a uložit
          </button>
        ) : (
          <button className="btn-primary mobile-w-full" onClick={handleNext}>
            {state.currentIdx + 1 < state.questionsOrder.length ? 'Další otázka' : 'Dokončit kvíz'}
          </button>
        )}
      </div>
    </div>
  );
}
