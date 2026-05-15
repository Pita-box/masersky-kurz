"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getLatestQuizResult, QuizHistory } from "@/lib/supabase";

interface QuizCardProps {
  id: string;
  topic: string;
  title: string;
}

export default function QuizCard({ id, topic, title }: QuizCardProps) {
  const [history, setHistory] = useState<QuizHistory | null>(null);

  useEffect(() => {
    getLatestQuizResult(topic).then(res => setHistory(res));
  }, [topic]);

  return (
    <div className="card mobile-col mobile-stack-gap" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <h3 style={{ fontSize: '18px', margin: '0 0 4px 0' }}>{title}</h3>
        <div style={{ color: 'var(--color-stone)', fontSize: '14px', display: 'flex', gap: 'var(--spacing-12)', alignItems: 'center' }}>
          <span>Složka: {topic}</span>
          {history && (
            <span style={{ 
              backgroundColor: history.passed ? '#e6f4ea' : '#fce8e6', 
              color: history.passed ? '#137333' : '#c5221f', 
              padding: '2px 8px', 
              borderRadius: 'var(--radius-tags)',
              fontWeight: 600
            }}>
              Minule: {Math.round((history.score / history.total) * 100)}%
            </span>
          )}
        </div>
      </div>
      <div className="mobile-col mobile-w-full" style={{ display: 'flex', gap: 'var(--spacing-8)' }}>
        <Link href={`/vypisy/${topic}`} className="btn-primary mobile-text-center" style={{ padding: '6px 12px', fontSize: '14px' }}>
          Číst teorii
        </Link>
        <Link href={`/kvizy/${topic}`} className="btn-primary mobile-text-center" style={{ padding: '6px 12px', fontSize: '14px', backgroundColor: 'var(--color-parchment)', color: 'var(--color-ink)', border: '1px solid var(--color-outline-gray)' }}>
          Spustit kvíz
        </Link>
      </div>
    </div>
  );
}
