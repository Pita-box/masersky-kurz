import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

export interface QuestionResult {
  topic: string;
  questionId: number;
  isCorrect: boolean;
  selectedOption: string;
}

export interface QuizHistory {
  id?: number;
  topic: string;
  score: number;
  total: number;
  passed: boolean;
  created_at?: string;
  details?: QuestionResult[]; // Detailní odpovědi na jednotlivé otázky
}

export interface MegaQuizState {
  questionsOrder: { topic: string; questionId: number }[]; // Pořadí všech otázek
  currentIdx: number;
  answers: QuestionResult[];
  shuffledOptionsByQuestion: Record<string, ('a'|'b'|'c'|'d')[]>; // Klíč: `${topic}-${questionId}`
}

export async function saveQuizResult(history: QuizHistory) {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase credentials missing. Mocking save.');
    // Fallback k LocalStorage, pokud chybí DB (pro testování)
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('quiz_history') || '[]';
      const historyArr = JSON.parse(stored);
      historyArr.push({ ...history, created_at: new Date().toISOString() });
      localStorage.setItem('quiz_history', JSON.stringify(historyArr));
    }
    return;
  }

  const { error } = await supabase!
    .from('quiz_history')
    .insert([history]);

  if (error) {
    console.error('Error saving quiz result:', error);
  }
}

export async function getLatestQuizResult(topic: string): Promise<QuizHistory | null> {
  if (!supabaseUrl || !supabaseAnonKey) {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('quiz_history') || '[]';
      const historyArr: QuizHistory[] = JSON.parse(stored);
      const matches = historyArr.filter(h => h.topic === topic);
      return matches.length > 0 ? matches[matches.length - 1] : null;
    }
    return null;
  }

  const { data, error } = await supabase!
    .from('quiz_history')
    .select('*')
    .eq('topic', topic)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error) {
    return null;
  }

  return data as QuizHistory;
}

export async function saveMegaQuizState(state: MegaQuizState) {
  if (!supabaseUrl || !supabaseAnonKey) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('mega_quiz_state', JSON.stringify(state));
    }
    return;
  }

  // Assuming an 'auth' context in the future. For now, use a generic row or a local UUID if no auth.
  // Prozatím v Supabase uložíme jen jeden sdílený záznam pro ukázku (id=1), nebo použijeme UUID v session.
  // Lepší je aktuálně používat localStorage jako primary pro Mega Kvíz bez přihlášení, ale cloud fallbackujeme.
  
  // Real world implementation would tie this to user_id. 
  // Zde ukládáme do fiktivní tabulky 'mega_quiz_states'.
  const { error } = await supabase!
    .from('mega_quiz_states')
    .upsert([{ id: 1, state }]);

  if (error) {
    console.error('Error saving mega quiz state:', error);
  }
}

export async function getMegaQuizState(): Promise<MegaQuizState | null> {
  if (!supabaseUrl || !supabaseAnonKey) {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('mega_quiz_state');
      if (stored) return JSON.parse(stored) as MegaQuizState;
    }
    return null;
  }

  const { data, error } = await supabase!
    .from('mega_quiz_states')
    .select('state')
    .eq('id', 1)
    .single();

  if (error || !data) {
    // Fallback to localStorage just in case cloud is unreachable
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('mega_quiz_state');
      if (stored) return JSON.parse(stored) as MegaQuizState;
    }
    return null;
  }

  return data.state as MegaQuizState;
}
