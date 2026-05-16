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
  
  // Split the file into blocks by "### "
  const blocks = content.split(/(?=### )/g);
  
  let id = 1;
  for (const block of blocks) {
    if (!block.trim() || !block.includes('### ')) continue;
    
    // Extract question text
    const qMatch = block.match(/### (?:Otázka )?\d+[:.]?\s*(.+)/);
    if (!qMatch) continue;

    // Extract options
    const aMatch = block.match(/(?:\*\*A\)\*\*|- \[.\] a\))?\s*(.+)/i) || block.match(/- a\)\s*(.+)/i);
    const bMatch = block.match(/(?:\*\*B\)\*\*|- \[.\] b\))?\s*(.+)/i) || block.match(/- b\)\s*(.+)/i);
    const cMatch = block.match(/(?:\*\*C\)\*\*|- \[.\] c\))?\s*(.+)/i) || block.match(/- c\)\s*(.+)/i);
    const dMatch = block.match(/(?:\*\*D\)\*\*|- \[.\] d\))?\s*(.+)/i) || block.match(/- d\)\s*(.+)/i);

    // Extract exact options ignoring the markdown checkbox
    const extractOpt = (letter: string) => {
      const regex = new RegExp(`(?:\\*\\*${letter}\\)\\*\\*|- \\[.\\] ${letter}\\)|- ${letter}\\))\\s*(.+)`, 'i');
      const m = block.match(regex);
      return m ? m[1].trim() : '';
    };

    const optA = extractOpt('a');
    const optB = extractOpt('b');
    const optC = extractOpt('c');
    const optD = extractOpt('d');

    if (!optA || !optB || !optC || !optD) continue;

    // Extract correct answer
    let correctLetter = '';
    const oldCorrectMatch = block.match(/\*\*Správná odpověď:\*\*\s*\*\*([A-D])\*\*/i) || block.match(/\*\*Správně:\*\*\s*([abcd])/i);
    if (oldCorrectMatch) {
      correctLetter = oldCorrectMatch[1].toLowerCase();
    } else {
      // Look for - [x]
      const checkMatch = block.match(/- \[[xX]\] ([a-d])\)/i);
      if (checkMatch) {
        correctLetter = checkMatch[1].toLowerCase();
      }
    }

    // Extract explanation
    const explMatch = block.match(/\*Vysvětlení:\*\s*([\s\S]+?)(?=<\/details>|$)/i) || block.match(/\*\*Vysvětlení:\*\*\s*([\s\S]+?)(?=### |$)/i);

    if (qMatch && correctLetter && explMatch) {
      questions.push({
        id: id++,
        topic,
        text: qMatch[1].trim(),
        options: {
          a: optA,
          b: optB,
          c: optC,
          d: optD,
        },
        correctAnswer: correctLetter as 'a' | 'b' | 'c' | 'd',
        explanation: explMatch[1].trim(),
      });
    } else {
      console.warn("Něco chybí v bloku:", {
        q: !!qMatch, opts: !!(optA && optB && optC && optD), correct: !!correctLetter, expl: !!explMatch
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
