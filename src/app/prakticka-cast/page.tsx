import Link from "next/link";
import { vsechnySestavy } from "@/data/masaze-postupy";

export default function PraktickaCastPage() {
  return (
    <div>
      <h1 style={{ marginBottom: 'var(--spacing-8)' }}>Praktická část</h1>
      <p style={{ color: 'var(--color-ash)', marginBottom: 'var(--spacing-32)', fontSize: '16px', lineHeight: 1.6 }}>
        Krok za krokem – procvičuj si správné pořadí hmatů. U zkoušky NSK je chyba v pořadí = okamžité selhání.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: 'var(--spacing-20)',
      }}>
        {vsechnySestavy.map((sestava) => (
          <Link
            key={sestava.slug}
            href={`/prakticka-cast/${sestava.slug}`}
            style={{
              display: 'block',
              textDecoration: 'none',
              backgroundColor: 'var(--color-parchment)',
              borderRadius: 'var(--radius-cards)',
              padding: 'var(--spacing-24)',
              border: '1px solid var(--color-outline-gray)',
              transition: 'all 0.2s ease',
              cursor: 'pointer',
            }}
            className="procedure-card"
          >
            <div style={{ fontSize: '40px', marginBottom: 'var(--spacing-12)' }}>
              {sestava.emoji}
            </div>
            <h3 style={{
              fontSize: '18px',
              fontWeight: 600,
              color: 'var(--color-ink)',
              marginBottom: 'var(--spacing-8)',
            }}>
              {sestava.nazev}
            </h3>
            <p style={{
              fontSize: '14px',
              color: 'var(--color-stone)',
              marginBottom: 'var(--spacing-12)',
            }}>
              {sestava.poziceKlienta}
            </p>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <span style={{
                fontSize: '13px',
                color: 'var(--color-ash)',
                fontWeight: 500,
              }}>
                {sestava.kroky.length} kroků
              </span>
              <span style={{
                fontSize: '13px',
                color: 'var(--color-ink)',
                fontWeight: 600,
              }}>
                Spustit →
              </span>
            </div>
          </Link>
        ))}
      </div>

      <style>{`
        .procedure-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
          border-color: var(--color-stone) !important;
        }
      `}</style>
    </div>
  );
}
