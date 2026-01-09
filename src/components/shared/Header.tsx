"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SectionWrapper from "./SectionWrapper";
import { Logo } from "@/app/page";

type HeaderTheme = "light" | "dark";

export default function Header() {
  const [theme, setTheme] = useState<HeaderTheme>("dark");
  const [isOnTop, setIsOnTop] = useState<boolean>(true);
  const [hidden, setHidden] = useState<boolean>(false);

  const lastScrollY = useRef(0);

  useEffect(() => {
    const currentY = window.scrollY;
    setIsOnTop(currentY < 80);
  }, []);

  /* =========================
     HEADER THEME (SECTION BASED)
     ========================= */
  useEffect(() => {
    const sections = document.querySelectorAll("[data-header-theme]");

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          if (!(entry.target instanceof HTMLElement)) return;

          const theme = entry.target.dataset.headerTheme;
          if (theme === "light" || theme === "dark") {
            setTheme(theme);
          }
        });
      },
      {
        threshold: 0,
        rootMargin: "-64px 0px -100% 0px",
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [usePathname()]);

  /* =========================
     SCROLL DIRECTION (HIDE / SHOW)
     ========================= */
  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;

      // jangan hide di top page
      if (currentY < 80) {
        setIsOnTop(true);
        setHidden(false);
        lastScrollY.current = currentY;
        return;
      } else {
        setIsOnTop(false);
      }

      if (currentY > lastScrollY.current) {
        // scroll down
        setHidden(true);
      } else {
        // scroll up
        setHidden(false);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`
        group
        fixed top-0 left-0 z-50 w-full
        transition-transform duration-300 ease-out
        ${hidden ? "-translate-y-full" : "translate-y-0"}
        ${theme === "dark" ? "text-white" : "text-gray-900"}
      `}
    >
      <div
        className={`
          absolute inset-0 -z-10
          transition-[opacity,background-color,backdrop-filter]
          duration-300 ease-out delay-50
          backdrop-blur-md
          ${
            isOnTop
              ? `opacity-0 group-hover:opacity-100 ${
                  theme === "dark"
                    ? "bg-white/20 text-white"
                    : "bg-white/80 text-gray-900"
                }`
              : theme === "dark"
              ? "opacity-100 bg-white/20"
              : "opacity-100 bg-white/80"
          }
        `}
      />
      <div className="mx-auto max-w-7xl flex justify-between items-center py-4 px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="overflow-hidden">
          <Link href="/">
            <Logo color={theme === "dark" ? "#FFFFFF" : "#050505"} />
          </Link>
        </div>

        <nav className="hidden gap-6 items-center text-sm md:flex">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.label} href={link.href} theme={theme}>
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}

function NavLink({
  href,
  children,
  theme,
}: {
  href: string;
  children: React.ReactNode;
  theme: "dark" | "light";
}) {
  const pathname = usePathname();
  const cleanHref = href.replace(/#.*$/, "");
  const isActive =
    cleanHref === "/" ? pathname === "/" : pathname.startsWith(cleanHref);

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={`
        relative transition-colors duration-200
        ${
          theme === "dark"
            ? isActive
              ? "text-[#008b8b]" // underline underline-offset-4
              : "text-white"
            : isActive
            ? "text-[#008b8b]" // underline underline-offset-4
            : "text-gray-900"
        }
        ${
          theme === "dark"
            ? "hover:text-[#008b8b] after:bg-[#008b8b]"
            : "hover:text-[#008b8b] after:bg-[#008b8b]"
        }
        after:absolute after:left-0 after:-bottom-0.5
        _after:h-px_after:w-full_after:origin-left_
        after:scale-x-0
        after:transition-transform after:duration-300
        ${isActive ? "after:scale-x-100" : "hover:after:scale-x-100"}
      `}
    >
      {children}
    </Link>
  );
}

// 2e7d32

const NAV_LINKS = [
  { label: "Platform", href: "/platform" },
  { label: "Knowledge", href: "/knowledge" },
] as const;
