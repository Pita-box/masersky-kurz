import { NextResponse } from 'next/server';
import Fuse from 'fuse.js';
import { getAllVypisy } from '@/lib/markdown';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q');

  if (!q) {
    return NextResponse.json({ results: [] });
  }

  // Můžeme rozšířit i o kvízy, momentálně prohledáváme výpisy (kde je veškerá teorie)
  const data = getAllVypisy();

  const fuse = new Fuse(data, {
    keys: ['title', 'content', 'topic'],
    includeScore: true,
    threshold: 0.4,
    ignoreLocation: true
  });

  const results = fuse.search(q).map(res => ({
    id: res.item.id,
    topic: res.item.topic,
    title: res.item.title,
    // Vrátíme krátký úryvek obsahu
    snippet: res.item.content.substring(0, 100) + '...'
  }));

  return NextResponse.json({ results: results.slice(0, 5) });
}
