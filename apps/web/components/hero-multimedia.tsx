'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import type { HeroSlide } from '../lib/types';

function nextSlideIndex(current: number, total: number) {
  return (current + 1) % total;
}

export function HeroMultimedia({ slides }: { slides: HeroSlide[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const startedAtRef = useRef(Date.now());
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const slide = slides[active];
  const media = slide.desktop;
  const duration = media.type === 'image' ? (slide.imageDurationMs ?? 6000) : null;
  const currentPoster = useMemo(() => media.type === 'video' ? (media.poster ?? slide.mobile.src) : undefined, [media, slide.mobile.src]);

  useEffect(() => {
    startedAtRef.current = Date.now();
    setProgress(0);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      if (paused) void videoRef.current.pause();
      else void videoRef.current.play().catch(() => {});
    }
  }, [active, paused]);

  useEffect(() => {
    if (paused || media.type !== 'image' || !duration) return;
    const timer = window.setInterval(() => {
      const elapsed = Date.now() - startedAtRef.current;
      const value = Math.min(1, elapsed / duration);
      setProgress(value);
      if (value >= 1) setActive((valueIndex) => nextSlideIndex(valueIndex, slides.length));
    }, 80);
    return () => window.clearInterval(timer);
  }, [paused, duration, media.type, slides.length]);

  useEffect(() => {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setPaused(true);
  }, []);

  function previous() {
    setActive((value) => (value - 1 + slides.length) % slides.length);
  }
  function next() {
    setActive((value) => nextSlideIndex(value, slides.length));
  }

  return (
    <section className="hero" aria-label="Tecnología destacada OPIMED">
      <div className="hero-media" aria-hidden="true">
        {media.type === 'video' ? (
          <video
            ref={videoRef}
            className="hero-media__asset"
            src={media.src}
            poster={currentPoster}
            muted
            playsInline
            preload="metadata"
            onTimeUpdate={(event) => {
              const video = event.currentTarget;
              if (video.duration) setProgress(video.currentTime / video.duration);
            }}
            onEnded={next}
          />
        ) : (
          <picture>
            <source media="(max-width: 780px)" srcSet={slide.mobile.src} />
            <img className="hero-media__asset" src={media.src} alt="" />
          </picture>
        )}
        <div className="hero-overlay" />
      </div>

      <div className="hero-content container">
        <div className="hero-copy">
          <p className="eyebrow">{slide.eyebrow}</p>
          <div className="hero-brand">{slide.brand}</div>
          <h1>{slide.title}</h1>
          <p className="hero-description">{slide.description}</p>
          <div className="hero-actions">
            <a className="button button--primary" href={slide.ctaHref}>{slide.ctaLabel}</a>
            <button className="button button--ghost" onClick={() => setPaused((value) => !value)} type="button">
              {paused ? 'Reproducir' : 'Pausar'}
            </button>
          </div>
        </div>

        <div className="hero-controls">
          <div className="hero-controls__arrows">
            <button className="icon-button" aria-label="Anterior" onClick={previous} type="button">←</button>
            <button className="icon-button" aria-label="Siguiente" onClick={next} type="button">→</button>
          </div>
          <div className="hero-progress" role="tablist" aria-label="Productos destacados">
            {slides.map((item, index) => (
              <button
                key={item.id}
                className={`progress-item ${index === active ? 'is-active' : ''}`}
                onClick={() => setActive(index)}
                type="button"
                aria-label={`Mostrar ${item.brand} ${item.product}`}
                role="tab"
                aria-selected={index === active}
              >
                <span className="progress-track"><span style={{ width: `${index === active ? progress * 100 : index < active ? 100 : 0}%` }} /></span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
