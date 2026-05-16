import Link from "next/link";
import { notFound } from "next/navigation";
import { getSestavaBySlug, getAllSlugs } from "@/data/masaze-postupy";
import ProcedureCarousel from "@/components/ProcedureCarousel";

interface PageProps {
  params: Promise<{ sestava: string }>;
}

export function generateStaticParams() {
  return getAllSlugs().map(slug => ({ sestava: slug }));
}

export default async function SestavaPage({ params }: PageProps) {
  const { sestava: slug } = await params;
  const sestava = getSestavaBySlug(slug);

  if (!sestava) {
    notFound();
  }

  return (
    <div>
      <Link
        href="/prakticka-cast"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '14px',
          color: 'var(--color-stone)',
          marginBottom: 'var(--spacing-16)',
          textDecoration: 'none',
          fontWeight: 500,
        }}
      >
        ← Všechny sestavy
      </Link>

      <div style={{ marginBottom: 'var(--spacing-24)' }}>
        <h1 style={{ fontSize: '28px', marginBottom: 'var(--spacing-8)' }}>
          {sestava.emoji} {sestava.nazev}
        </h1>
        <p style={{
          fontSize: '15px',
          color: 'var(--color-ash)',
        }}>
          {sestava.poziceKlienta} • {sestava.kroky.length} kroků
        </p>
      </div>

      <ProcedureCarousel kroky={sestava.kroky} />
    </div>
  );
}
