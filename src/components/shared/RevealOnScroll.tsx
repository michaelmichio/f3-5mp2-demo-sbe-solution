"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function RevealOnScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");

    // 🔁 RESET state saat route berubah
    elements.forEach((el) => {
      el.classList.remove("is-visible");
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target); // animate once
          }
        });
      },
      {
        threshold: 0,
        rootMargin: "0px 0px -20% 0px",
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
