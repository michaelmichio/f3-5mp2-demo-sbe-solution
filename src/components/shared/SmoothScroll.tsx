"use client";

import { ReactLenis } from "lenis/react";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const isDesktop = typeof window !== "undefined" && window.innerWidth >= 1024;

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  // Konfigurasi "Premium Feel"
  //   const lenisOptions = {
  //     lerp: 0.1, // Tingkat "kelicinan" (makin kecil makin halus/berat). Default biasanya 0.1
  //     duration: 1.5, // Durasi scroll berhenti (detik). Makin besar makin "melayang"
  //     smoothWheel: true, // Aktifkan untuk mouse wheel
  //     wheelMultiplier: 0.8, // Sensitivitas: < 1 terasa lebih "berat", > 1 lebih agresif
  //     touchMultiplier: 2, // Untuk touch screen
  //   };

  const lenisOptions = {
    lerp: 0.1, // smooth tapi tidak floaty
    duration: 0.9, // INI KUNCI UTAMA
    smoothWheel: true,
    wheelMultiplier: 0.9, // sedikit lebih berat dari native
    touchMultiplier: 1, // BIARKAN NATIVE
  };

  // ❗ Jangan aktifkan Lenis jika tidak perlu
  if (!isDesktop || prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={lenisOptions}>
      {children}
    </ReactLenis>
  );
}
