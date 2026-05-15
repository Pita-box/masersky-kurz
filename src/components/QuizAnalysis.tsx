"use client";

import { useEffect, useState } from "react";
import { getLatestQuizResult, QuizHistory } from "@/lib/supabase";
import type { QuizQuestion } from "@/lib/quiz";

export default function QuizAnalysis({ topic, questions }: { topic: string, questions: QuizQuestion[] }) {
  const [history, setHistory] = useState<QuizHistory | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLatestQuizResult(topic).then(res => {
      setHistory(res);
      setLoading(false);
    });
  }, [topic]);

  if (loading || !history || !history.details || history.details.length === 0) {
    return null;
  }

  const wrongAnswers = history.details.filter(d => !d.isCorrect);

  if (wrongAnswers.length === 0) {
    return (
      <div style={{ marginTop: 'var(--spacing-40)', padding: 'var(--spacing-20)', backgroundColor: '#e6f4ea', borderRadius: 'var(--radius-default)', border: '1px solid #137333' }}>
        <h3 style={{ color: '#137333', marginTop: 0 }}>Výborně! V posledním kvízu jsi neměl žádné chyby.</h3>
        <p style={{ margin: 0, color: '#137333', opacity: 0.8 }}>Znalosti z tohoto tématu máš v malíčku.</p>
      </div>
    );
  }

  return (
    <div style={{ marginTop: 'var(--spacing-40)' }}>
      <h3 style={{ fontSize: '20px', marginBottom: 'var(--spacing-16)' }}>Lektorský rozbor chyb z posledního kvízu</h3>
      <p style={{ color: 'var(--color-ash)', marginBottom: 'var(--spacing-24)' }}>
        Na základě tvého posledního pokusu (úspěšnost {Math.round((history.score / history.total) * 100)} %) doporučuje lektor zaměřit se na následující témata:
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-16)' }}>
        {wrongAnswers.map(wrong => {
          const q = questions.find(q => q.id === wrong.questionId);
          if (!q) return null;

          return (
            <div key={wrong.questionId} style={{ padding: 'var(--spacing-16)', backgroundColor: '#fce8e6', borderRadius: 'var(--radius-default)', borderLeft: '4px solid #c5221f' }}>
              <div style={{ fontWeight: 600, color: '#c5221f', marginBottom: 'var(--spacing-8)' }}>
                Nezvládnutá otázka: {q.text}
              </div>
              <div style={{ color: 'var(--color-ink)', fontSize: '14px', lineHeight: 1.5 }}>
                <strong>Vysvětlení a doporučení k doučení:</strong> {q.explanation}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
