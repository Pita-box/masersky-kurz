"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface VypisLink {
  id: string;
  topic: string;
  title: string;
}

export default function TopicSidebar({ vypisy }: { vypisy: VypisLink[] }) {
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  return (
    <aside style={{
      width: '280px',
      flexShrink: 0,
      borderRight: '1px solid var(--color-outline-gray)',
      padding: 'var(--spacing-20)',
      height: 'calc(100vh - 67px)',
      position: 'sticky',
      top: '67px',
      overflowY: 'auto',
      backgroundColor: 'var(--color-canvas)',
    }}>
      <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-stone)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 'var(--spacing-16)' }}>
        Témata kurzu
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)' }}>
        {vypisy.map((v, idx) => {
          const isActive = pathname.includes(`/vypisy/${v.topic}`) || pathname.includes(`/kvizy/${v.topic}`);
          return (
            <Link 
              key={v.id} 
              href={`/vypisy/${v.topic}`}
              style={{
                display: 'block',
                padding: 'var(--spacing-8) var(--spacing-12)',
                borderRadius: 'var(--radius-default)',
                backgroundColor: isActive ? 'var(--color-whisper-gray)' : 'transparent',
                color: isActive ? 'var(--color-ink)' : 'var(--color-ash)',
                fontWeight: isActive ? 600 : 400,
                fontSize: '14px',
                textDecoration: 'none',
                transition: 'all 0.2s'
              }}
            >
              <span style={{ marginRight: '8px', opacity: 0.5 }}>{idx + 1}.</span>
              {v.title}
            </Link>
          );
        })}
      </div>
      
      <div style={{ marginTop: 'var(--spacing-32)', paddingTop: 'var(--spacing-16)', borderTop: '1px solid var(--color-outline-gray)' }}>
        <Link 
          href="/mega-kviz"
          style={{
            display: 'block',
            padding: 'var(--spacing-12)',
            borderRadius: 'var(--radius-default)',
            backgroundColor: pathname === '/mega-kviz' ? 'var(--color-parchment)' : 'transparent',
            border: pathname === '/mega-kviz' ? '1px solid var(--color-outline-gray)' : '1px solid transparent',
            color: 'var(--color-ink)',
            fontWeight: 600,
            fontSize: '14px',
            textDecoration: 'none',
            textAlign: 'center'
          }}
        >
          🎓 Spustit Mega Kvíz
        </Link>
      </div>
    </aside>
  );
}
