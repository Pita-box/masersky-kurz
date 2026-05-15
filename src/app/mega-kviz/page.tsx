import { getAllQuizzes } from "@/lib/quiz";
import MegaQuizEngine from "@/components/MegaQuizEngine";

export default function MegaKvizPage() {
  const allQuestions = getAllQuizzes();

  return (
    <div>
      <div style={{ marginBottom: 'var(--spacing-32)', textAlign: 'center' }}>
        <h1>Mega Kvíz</h1>
        <p style={{ color: 'var(--color-stone)' }}>
          Trénink napříč všemi tématy. Stav kvízu se ukládá průběžně.
        </p>
      </div>
      
      <MegaQuizEngine questions={allQuestions} />
    </div>
  );
}
