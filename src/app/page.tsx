import { getAllVypisy } from "@/lib/markdown";
import Link from "next/link";
import QuizCard from "@/components/QuizCard";

export default function Home() {
  const vypisy = getAllVypisy();

  return (
    <div>
      <main>
        <h1>Masérský kurz</h1>
        <p style={{ color: 'var(--color-ash)', marginBottom: 'var(--spacing-32)' }}>
          Vítejte ve výukové a kvízové aplikaci.
        </p>

        <h2 style={{ marginBottom: 'var(--spacing-16)' }}>Dostupná témata</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-12)' }}>
          {vypisy.map((v) => (
            <QuizCard key={v.id} id={v.id} topic={v.topic} title={v.title} />
          ))}
        </div>
      </main>
    </div>
  );
}

