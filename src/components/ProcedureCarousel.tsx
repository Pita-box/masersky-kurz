"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import type { MasazniKrok } from "@/data/masaze-postupy";
import "./ProcedureCarousel.css";

interface ProcedureCarouselProps {
  kroky: MasazniKrok[];
  autoplayDuration?: number; // ms, default 15000
}

function kategorieClass(kat: string): string {
  const map: Record<string, string> = {
    'tření': 'treni',
    'hnětení': 'hneteni',
    'roztírání': 'roztirani',
    'tepání': 'tepani',
    'chvění': 'chveni',
    'pasivní pohyby': 'pasivni-pohyby',
    'příprava': 'priprava',
  };
  return map[kat] || 'priprava';
}

export default function ProcedureCarousel({ kroky, autoplayDuration = 15000 }: ProcedureCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  // Scroll to specific slide
  const scrollToSlide = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const slides = track.children;
    if (index < 0 || index >= slides.length) return;
    const slide = slides[index] as HTMLElement;
    track.scrollTo({ left: slide.offsetLeft - 16, behavior: 'smooth' });
  }, []);

  // Start progress animation
  const startProgress = useCallback(() => {
    const fill = progressRef.current;
    if (!fill) return;
    // Reset
    fill.classList.remove('animating');
    fill.style.width = '0%';
    fill.style.transitionDuration = '';
    // Force reflow
    void fill.offsetWidth;
    // Start
    fill.classList.add('animating');
    fill.style.transitionDuration = `${autoplayDuration}ms`;
  }, [autoplayDuration]);

  // Advance to next slide
  const advance = useCallback(() => {
    setActiveIndex(prev => {
      const next = prev + 1 < kroky.length ? prev + 1 : 0;
      scrollToSlide(next);
      return next;
    });
  }, [kroky.length, scrollToSlide]);

  // Autoplay management
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }
    startProgress();
    timerRef.current = setTimeout(advance, autoplayDuration);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying, activeIndex, autoplayDuration, advance, startProgress]);

  // IntersectionObserver to detect active slide
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
            const idx = Number((entry.target as HTMLElement).dataset.index);
            if (!isNaN(idx)) setActiveIndex(idx);
          }
        }
      },
      { root: track, threshold: 0.6 }
    );

    Array.from(track.children).forEach(child => observer.observe(child));
    return () => observer.disconnect();
  }, [kroky.length]);

  // Pause on interaction
  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleTogglePlay = () => {
    setIsPlaying(prev => !prev);
  };

  const handlePrev = () => {
    const prev = activeIndex > 0 ? activeIndex - 1 : kroky.length - 1;
    setActiveIndex(prev);
    scrollToSlide(prev);
    setIsPlaying(false);
  };

  const handleNext = () => {
    const next = activeIndex + 1 < kroky.length ? activeIndex + 1 : 0;
    setActiveIndex(next);
    scrollToSlide(next);
    setIsPlaying(false);
  };

  return (
    <div className="carousel-wrapper">
      {/* Header */}
      <div className="carousel-header">
        <span className="carousel-counter">
          Krok {activeIndex + 1} / {kroky.length}
        </span>
        <div className="carousel-controls">
          <button className="carousel-nav-btn" onClick={handlePrev} aria-label="Předchozí krok">
            ←
          </button>
          <button
            className={`carousel-play-btn ${!isPlaying ? 'paused' : ''}`}
            onClick={handleTogglePlay}
          >
            {isPlaying ? '⏸ Pauza' : '▶ Přehrát'}
          </button>
          <button className="carousel-nav-btn" onClick={handleNext} aria-label="Další krok">
            →
          </button>
        </div>
      </div>

      {/* Track */}
      <div
        ref={trackRef}
        className="carousel-track"
        onMouseEnter={handlePause}
        onTouchStart={handlePause}
      >
        {kroky.map((krok, i) => {
          const isActive = i === activeIndex;
          const hasPhoto = !!krok.fotka;
          const hasVideo = !!krok.videoId;
          const mediaCount = (hasPhoto ? 1 : 0) + (hasVideo ? 1 : 0);

          return (
            <div
              key={krok.id}
              data-index={i}
              className={`carousel-slide ${isActive ? 'active' : ''}`}
              onClick={() => {
                setActiveIndex(i);
                scrollToSlide(i);
                handlePause();
              }}
            >
              {/* Progress bar (only on active) */}
              {isActive && (
                <div className="slide-progress">
                  <div ref={progressRef} className="slide-progress-fill" />
                </div>
              )}

              <span className={`slide-kategorie ${kategorieClass(krok.kategorie)}`}>
                {krok.kategorie}
              </span>

              <div className="slide-step-number">Krok {i + 1}</div>
              <h3 className="slide-title">{krok.nazev}</h3>
              <p className="slide-popis">{krok.popis}</p>

              {/* Media */}
              {mediaCount > 0 && (
                <div className={`slide-media ${mediaCount === 1 ? 'only-one' : ''}`}>
                  {hasPhoto && (
                    <img
                      className="slide-image"
                      src={krok.fotka}
                      alt={krok.nazev}
                      loading="lazy"
                    />
                  )}
                  {hasVideo && (
                    <div className="slide-video-container">
                      {isActive ? (
                        <iframe
                          src={`https://www.youtube.com/embed/${krok.videoId}`}
                          title={krok.nazev}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      ) : (
                        <div className="slide-video-placeholder">▶</div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Dots */}
      <div className="carousel-dots">
        {kroky.map((_, i) => (
          <button
            key={i}
            className={`carousel-dot ${i === activeIndex ? 'active' : ''}`}
            onClick={() => {
              setActiveIndex(i);
              scrollToSlide(i);
              setIsPlaying(false);
            }}
            aria-label={`Krok ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
