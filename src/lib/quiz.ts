import fs from 'fs';
import path from 'path';

const VYPISY_DIR = path.join(process.cwd(), 'Výpisy');

export interface QuizQuestion {
  id: number;
  topic?: string;
  text: string;
  options: {
    a: string;
    b: string;
    c: string;
    d: string;
  };
  correctAnswer: 'a' | 'b' | 'c' | 'd';
  explanation: string;
}

export interface Quiz {
  topic: string;
  questions: QuizQuestion[];
}

export function getQuizByTopic(topic: string): Quiz | null {
  const topicDir = path.join(VYPISY_DIR, topic);
  if (!fs.existsSync(topicDir)) return null;

  const files = fs.readdirSync(topicDir).filter(f => f.startsWith('QUIZ_') && f.endsWith('.md'));
  
  if (files.length === 0) {
    return {
      topic,
      questions: []
    };
  }
  
  const file = files[0];
  const filePath = path.join(topicDir, file);
  const content = fs.readFileSync(filePath, 'utf8');

  const questions: QuizQuestion[] = [];
  
  // Split the file into blocks by "### Otázka"
  const blocks = content.split(/(?=### Otázka)/g);
  
  let id = 1;
  for (const block of blocks) {
    if (!block.trim() || !block.includes('### Otázka')) continue;
    
    // Extract question text
    const qMatch = block.match(/### Otázka \d+:\s*(.+)/);
    if (!qMatch) continue;

    // Extract options (A, B, C, D)
    const aMatch = block.match(/\*\*A\)\*\*\s*(.+)/i) || block.match(/- a\)\s*(.+)/i);
    const bMatch = block.match(/\*\*B\)\*\*\s*(.+)/i) || block.match(/- b\)\s*(.+)/i);
    const cMatch = block.match(/\*\*C\)\*\*\s*(.+)/i) || block.match(/- c\)\s*(.+)/i);
    const dMatch = block.match(/\*\*D\)\*\*\s*(.+)/i) || block.match(/- d\)\s*(.+)/i);

    // Extract correct answer (handles both old and new formats, ignores "(Chyták!)")
    const correctMatch = block.match(/\*\*Správná odpověď:\*\*\s*\*\*([A-D])\*\*/i) || block.match(/\*\*Správně:\*\*\s*([abcd])/i);
    
    // Extract explanation
    const explMatch = block.match(/\*Vysvětlení:\*\s*([\s\S]+?)(?=<\/details>|$)/i) || block.match(/\*\*Vysvětlení:\*\*\s*([\s\S]+?)(?=\*\*Otázka:\*\*|$)/i);

    if (qMatch && aMatch && bMatch && cMatch && dMatch && correctMatch && explMatch) {
      questions.push({
        id: id++,
        topic,
        text: qMatch[1].trim(),
        options: {
          a: aMatch[1].trim(),
          b: bMatch[1].trim(),
          c: cMatch[1].trim(),
          d: dMatch[1].trim(),
        },
        correctAnswer: correctMatch[1].toLowerCase() as 'a' | 'b' | 'c' | 'd',
        explanation: explMatch[1].trim(),
      });
    } else {
      console.warn("Něco chybí v bloku:", {
        q: !!qMatch, a: !!aMatch, b: !!bMatch, c: !!cMatch, d: !!dMatch, correct: !!correctMatch, expl: !!explMatch
      });
    }
  }

  return {
    topic,
    questions
  };
}

export function getAllQuizzes(): QuizQuestion[] {
  if (!fs.existsSync(VYPISY_DIR)) return [];
  const topics = fs.readdirSync(VYPISY_DIR).filter(file => {
    return fs.statSync(path.join(VYPISY_DIR, file)).isDirectory();
  });
  
  const allQuestions: QuizQuestion[] = [];
  for (const topic of topics) {
    const quiz = getQuizByTopic(topic);
    if (quiz && quiz.questions.length > 0) {
      allQuestions.push(...quiz.questions);
    }
  }
  return allQuestions;
}
