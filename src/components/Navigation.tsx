import Link from 'next/link';
import SearchBar from '@/components/SearchBar';
import MegaQuizProgress from '@/components/MegaQuizProgress';

export default function Navigation() {
  return (
    <nav style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 'var(--spacing-16) var(--spacing-20)',
      borderBottom: '1px solid var(--color-outline-gray)',
      backgroundColor: 'var(--color-canvas)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
    }}>
      <div style={{ fontWeight: 700, fontSize: '18px', fontFamily: 'var(--font-general-sans)' }}>
        <Link href="/">Masérský kurz</Link>
      </div>
      <div style={{ display: 'flex', gap: 'var(--spacing-20)', alignItems: 'center' }}>
        <SearchBar />
        <MegaQuizProgress />
      </div>
    </nav>
  );
}
