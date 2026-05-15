import fs from 'fs';
import path from 'path';

const VYPISY_DIR = path.join(process.cwd(), 'Výpisy');

export interface Vypis {
  id: string;
  topic: string;
  title: string;
  content: string;
  createdAt: number;
}

export function getAllTopics(): string[] {
  if (!fs.existsSync(VYPISY_DIR)) return [];
  return fs.readdirSync(VYPISY_DIR).filter(file => {
    return fs.statSync(path.join(VYPISY_DIR, file)).isDirectory();
  });
}

export function getVypisByTopic(topic: string): Vypis | null {
  const topicDir = path.join(VYPISY_DIR, topic);
  if (!fs.existsSync(topicDir)) return null;

  const files = fs.readdirSync(topicDir).filter(f => f.endsWith('.md') && !f.startsWith('QUIZ'));
  
  if (files.length === 0) return null;
  
  const file = files[0];
  const filePath = path.join(topicDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const stat = fs.statSync(filePath);

  const titleMatch = content.match(/^#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1] : topic.replace(/_/g, ' ');

  return {
    id: file.replace('.md', ''),
    topic,
    title,
    content,
    createdAt: stat.birthtimeMs || stat.mtimeMs // fallback to mtime if birthtime is not available
  };
}

export function getAllVypisy(): Vypis[] {
  const topics = getAllTopics();
  const vypisy: Vypis[] = [];
  
  for (const topic of topics) {
    const vypis = getVypisByTopic(topic);
    if (vypis) {
      vypisy.push(vypis);
    }
  }
  
  return vypisy.sort((a, b) => a.createdAt - b.createdAt);
}
