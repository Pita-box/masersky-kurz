"use client";

import { useEffect, useState } from "react";
import { getMegaQuizState } from "@/lib/supabase";
import Link from "next/link";

export default function MegaQuizProgress() {
  const [progress, setProgress] = useState<{ current: number; total: number } | null>(null);

  useEffect(() => {
    async function loadProgress() {
      const state = await getMegaQuizState();
      if (state && state.questionsOrder && state.questionsOrder.length > 0) {
        setProgress({
          current: state.currentIdx, // neb state.answers.length (currentIdx odráží číslo další otázky)
          total: state.questionsOrder.length
        });
      } else {
        setProgress(null); // Nezačal nebo prázdný
      }
    }

    loadProgress();

    const handleUpdate = () => {
      loadProgress();
    };

    window.addEventListener("megaQuizUpdate", handleUpdate);
    return () => window.removeEventListener("megaQuizUpdate", handleUpdate);
  }, []);

  if (!progress) return null;

  const percentage = Math.round((progress.current / progress.total) * 100);
  const strokeDasharray = 283; // 2 * pi * r (r=45) => cca 282.7
  const strokeDashoffset = strokeDasharray - (strokeDasharray * percentage) / 100;

  return (
    <Link href="/mega-kviz" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 'var(--spacing-8)' }}>
      <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-ink)' }}>
        Mega Kvíz
      </div>
      <div style={{ width: '32px', height: '32px', position: 'relative' }}>
        <svg viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)', width: '100%', height: '100%' }}>
          {/* Background circle */}
          <circle 
            cx="50" cy="50" r="45" 
            fill="none" 
            stroke="var(--color-outline-gray)" 
            strokeWidth="10" 
          />
          {/* Progress circle */}
          <circle 
            cx="50" cy="50" r="45" 
            fill="none" 
            stroke="var(--color-ink)" 
            strokeWidth="10" 
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.5s ease-in-out' }}
          />
        </svg>
        <div style={{ 
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, 
          display: 'flex', alignItems: 'center', justifyContent: 'center', 
          fontSize: '10px', fontWeight: 700, color: 'var(--color-ink)' 
        }}>
          {percentage}%
        </div>
      </div>
    </Link>
  );
}
