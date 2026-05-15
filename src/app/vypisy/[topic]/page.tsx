import { getVypisByTopic, getAllTopics } from "@/lib/markdown";
import { getQuizByTopic } from "@/lib/quiz";
import ReactMarkdown from "react-markdown";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { notFound } from "next/navigation";
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

  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-20)' }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="card" style={{ backgroundColor: 'var(--color-canvas)', border: '1px solid var(--color-outline-gray)' }}>
          <div className="markdown-body">
            <ReactMarkdown 
              rehypePlugins={[rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]]}
            >
              {vypis.content}
            </ReactMarkdown>
          </div>
        </div>

        {quiz && quiz.questions.length > 0 && (
          <QuizAnalysis topic={resolvedParams.topic} questions={quiz.questions} />
        )}
      </div>
      
      <PageOutline topic={resolvedParams.topic} />
    </div>
  );
}
