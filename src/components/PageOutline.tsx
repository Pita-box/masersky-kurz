"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Heading {
  id: string;
  text: string;
  level: number;
}

export default function PageOutline({ topic }: { topic: string }) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    let observer: IntersectionObserver;
    
    // We wait a tick for the markdown to render and DOM to update
    const timer = setTimeout(() => {
      const elements = Array.from(document.querySelectorAll('.markdown-body h2, .markdown-body h3'));
      const newHeadings: Heading[] = elements.map((el) => {
        return {
          id: el.id,
          text: el.textContent || "",
          level: el.tagName === 'H2' ? 2 : 3
        };
      }).filter(h => h.id); // Only include headings with an ID
      
      setHeadings(newHeadings);

      // Setup Intersection Observer
      observer = new IntersectionObserver((entries) => {
        // Find all intersecting elements
        const visibleEntries = entries.filter(entry => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          // If multiple are visible, pick the first one (top-most usually)
          setActiveId(visibleEntries[0].target.id);
        }
      }, {
        // Trigger when the element crosses the top 20% of the viewport
        rootMargin: '0px 0px -80% 0px'
      });

      elements.forEach(el => {
        if (el.id) observer.observe(el);
      });
      
    }, 100);

    return () => {
      clearTimeout(timer);
      if (observer) observer.disconnect();
    };
  }, [topic]);

  if (headings.length === 0) {
    return (
      <aside className="desktop-only" style={{ 
        width: '250px', 
        flexShrink: 0, 
        paddingLeft: 'var(--spacing-20)',
        position: 'sticky',
        top: '90px',
        height: 'calc(100vh - 90px)',
        overflowY: 'auto'
      }}>
         <div>
            <Link href={`/kvizy/${topic}`} className="btn-primary" style={{ display: 'block', textAlign: 'center', marginBottom: 'var(--spacing-24)', backgroundColor: 'var(--color-parchment)', color: 'var(--color-ink)', border: '1px solid var(--color-outline-gray)' }}>
              Spustit kvíz k tématu
            </Link>
         </div>
      </aside>
    );
  }

  return (
    <aside className="desktop-only" style={{ 
      width: '250px', 
      flexShrink: 0, 
      paddingLeft: 'var(--spacing-20)',
      position: 'sticky',
      top: '90px',
      height: 'calc(100vh - 90px)',
      overflowY: 'auto'
    }}>
      <div>
        <Link href={`/kvizy/${topic}`} className="btn-primary" style={{ display: 'block', textAlign: 'center', marginBottom: 'var(--spacing-24)', backgroundColor: 'var(--color-parchment)', color: 'var(--color-ink)', border: '1px solid var(--color-outline-gray)' }}>
          Spustit kvíz k tématu
        </Link>

        <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-stone)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 'var(--spacing-16)' }}>
          Obsah stránky
        </div>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {headings.map((h, i) => {
            const isActive = activeId === h.id;
            return (
              <li key={i} style={{ paddingLeft: h.level === 3 ? '16px' : '0' }}>
                <a 
                  href={`#${h.id}`}
                  style={{
                    color: isActive ? 'var(--color-ink)' : 'var(--color-ash)',
                    fontWeight: isActive ? 600 : 400,
                    textDecoration: 'none',
                    fontSize: '14px',
                    display: 'block',
                    lineHeight: 1.4,
                    transition: 'all 0.2s',
                    borderLeft: isActive ? '2px solid var(--color-ink)' : '2px solid transparent',
                    paddingLeft: isActive ? '8px' : '0'
                  }}
                  onMouseOver={(e) => { if (!isActive) e.currentTarget.style.color = 'var(--color-ink)' }}
                  onMouseOut={(e) => { if (!isActive) e.currentTarget.style.color = 'var(--color-ash)' }}
                >
                  {h.text}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
