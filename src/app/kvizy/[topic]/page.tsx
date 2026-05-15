import { getQuizByTopic } from "@/lib/quiz";
import { getAllTopics } from "@/lib/markdown";
import QuizEngine from "@/components/QuizEngine";
import { notFound } from "next/navigation";
import Link from "next/link";

export async function generateStaticParams() {
  const topics = getAllTopics();
  return topics.map((topic) => ({
    topic: topic,
  }));
}

export default async function QuizPage({ params }: { params: Promise<{ topic: string }> }) {
  const resolvedParams = await params;
  const quiz = getQuizByTopic(resolvedParams.topic);

  if (!quiz) {
    notFound();
  }

  return (
    <div>
      <div style={{ marginBottom: 'var(--spacing-20)' }}>
        <Link href="/" style={{ color: 'var(--color-stone)', fontSize: '14px', textDecoration: 'underline' }}>
          &larr; Zpět na přehled
        </Link>
      </div>
      
      <h1 style={{ marginBottom: 'var(--spacing-24)', textAlign: 'center' }}>
        Kvíz: {quiz.topic.replace(/_/g, ' ')}
      </h1>

      <QuizEngine topic={quiz.topic} questions={quiz.questions} />
    </div>
  );
}
