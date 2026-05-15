"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface SearchResult {
  id: string;
  topic: string;
  title: string;
  snippet: string;
}

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isMac, setIsMac] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Detect OS for shortcut display
    if (typeof window !== 'undefined') {
      setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0);
    }
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const fetchResults = async () => {
      if (query.length < 2) {
        setResults([]);
        return;
      }
      
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResults(data.results);
      setIsOpen(true);
    };

    const debounce = setTimeout(fetchResults, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      <input
        ref={inputRef}
        type="text"
        placeholder={`Hledat teorii... (${isMac ? '⌘K' : 'Ctrl+K'})`}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => { if (results.length > 0) setIsOpen(true); }}
        style={{
          padding: '8px 12px',
          borderRadius: 'var(--radius-default)',
          border: '1px solid var(--color-outline-gray)',
          fontFamily: 'var(--font-inter)',
          fontSize: '14px',
          width: '250px'
        }}
      />
      
      {isOpen && results.length > 0 && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          marginTop: 'var(--spacing-8)',
          backgroundColor: 'var(--color-canvas)',
          border: '1px solid var(--color-outline-gray)',
          borderRadius: 'var(--radius-default)',
          boxShadow: 'var(--shadow-md)',
          zIndex: 10,
          maxHeight: '300px',
          overflowY: 'auto'
        }}>
          {results.map((res) => (
            <Link 
              key={res.id} 
              href={`/vypisy/${res.topic}`}
              onClick={() => { setIsOpen(false); setQuery(''); }}
              style={{
                display: 'block',
                padding: 'var(--spacing-12)',
                borderBottom: '1px solid var(--color-whisper-gray)',
              }}
            >
              <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: '4px' }}>{res.title}</div>
              <div style={{ fontSize: '12px', color: 'var(--color-stone)' }}>
                {res.snippet}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
