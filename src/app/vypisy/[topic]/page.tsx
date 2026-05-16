import { getVypisByTopic, getAllTopics } from "@/lib/markdown";
import { getQuizByTopic } from "@/lib/quiz";
import ReactMarkdown from "react-markdown";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { notFound } from "next/navigation";
import Link from "next/link";
import PageOutline from "@/components/PageOutline";
import QuizAnalysis from "@/components/QuizAnalysis";

export async function generateStaticParams() {
  const topics = getAllTopics();
  return topics.map((topic) => ({
    topic: topic,
  }));
}

export default async function VypisDetailPage({ params }: { params: Promise<{ topic: string }> }) {
  const resolvedParams = await params;
  const vypis = getVypisByTopic(resolvedParams.topic);
  const quiz = getQuizByTopic(resolvedParams.topic);

  if (!vypis) {
    notFound();
  }

  const MobileActions = () => (
    <div className="mobile-only mobile-col mobile-stack-gap" style={{ marginBottom: 'var(--spacing-20)', width: '100%', gap: 'var(--spacing-12)' }}>
      <Link href={`/kvizy/${resolvedParams.topic}`} className="btn-primary mobile-w-full mobile-text-center" style={{ backgroundColor: 'var(--color-ink)', color: 'var(--color-canvas)' }}>
        Spustit kvíz k tématu
      </Link>
      <Link href={`/mega-kviz`} className="btn-primary mobile-w-full mobile-text-center" style={{ backgroundColor: 'var(--color-parchment)', color: 'var(--color-ink)', border: '1px solid var(--color-outline-gray)' }}>
        Spustit Mega Kvíz
      </Link>
    </div>
  );

  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-20)' }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <MobileActions />

        <div className="card" style={{ backgroundColor: 'var(--color-canvas)' }}>
          <div className="markdown-body">
            <ReactMarkdown 
              rehypePlugins={[rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]]}
            >
              {vypis.content}
            </ReactMarkdown>
          </div>
        </div>

        {quiz && quiz.questions.length > 0 && (
          <div style={{ marginTop: 'var(--spacing-24)' }}>
            <QuizAnalysis topic={resolvedParams.topic} questions={quiz.questions} />
          </div>
        )}

        <div style={{ marginTop: 'var(--spacing-24)' }}>
          <MobileActions />
        </div>
      </div>
      
      <PageOutline topic={resolvedParams.topic} />
    </div>
  );
}
