"use client";

import { useEffect, useRef } from "react";

interface HorizontalScrollSectionProps {
  /** Konten horizontal (cards, sections, dll) */
  children: React.ReactNode;

  /** Tinggi viewport default: 100vh */
  viewportHeight?: string;

  /** Extra height multiplier (semakin besar → scroll makin panjang) */
  scrollMultiplier?: number;

  /** Optional className */
  className?: string;
}

export default function HorizontalScrollSection({
  children,
  viewportHeight = "100vh",
  scrollMultiplier = 1,
  className = "",
}: HorizontalScrollSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const updateSectionHeight = () => {
      const horizontalScrollLength = track.scrollWidth - window.innerWidth;

      section.style.height = `${
        horizontalScrollLength * scrollMultiplier + window.innerHeight
      }px`;
    };

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const scrollProgress = Math.min(
        Math.max(-rect.top / (section.offsetHeight - window.innerHeight), 0),
        1
      );

      const maxTranslate = track.scrollWidth - window.innerWidth;

      track.style.transform = `translate3d(-${
        scrollProgress * maxTranslate
      }px, 0, 0)`;
    };

    updateSectionHeight();
    onScroll();

    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", updateSectionHeight);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateSectionHeight);
    };
  }, [scrollMultiplier]);

  return (
    <section ref={sectionRef} className={`relative ${className}`}>
      <div
        className="sticky top-0 overflow-hidden"
        style={{ height: viewportHeight }}
      >
        <div ref={trackRef} className="flex h-full will-change-transform">
          {children}
        </div>
      </div>
    </section>
  );
}
