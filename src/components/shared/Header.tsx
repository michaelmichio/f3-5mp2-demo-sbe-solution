"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import svgPaths from "@/configs/svg-k9wnz0zy0s";

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
        fixed top-0 left-0 z-50 w-full h-16
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
                  theme === "dark" ? "bg-white/20" : "bg-white/80"
                }`
              : theme === "dark"
              ? "opacity-100 bg-white/20"
              : "opacity-100 bg-white/80"
          }
        `}
      />
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <div className="overflow-hidden">
          <Link href="/">
            <div
              className="h-[42px] relative shrink-0 w-[158.4px]"
              data-name="Logo"
            >
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 158.4 42"
              >
                <g id="Logo">
                  <path
                    d={svgPaths.p175ab700}
                    fill="var(--fill-0, white)"
                    id="Vector"
                  />
                  <path
                    d={svgPaths.p791c280}
                    fill="var(--fill-0, white)"
                    id="Vector_2"
                  />
                  <path
                    d={svgPaths.p17c72200}
                    fill="var(--fill-0, white)"
                    id="Vector_3"
                  />
                  <path
                    d={svgPaths.p2ae05200}
                    fill="var(--fill-0, white)"
                    id="Vector_4"
                  />
                  <path
                    d={svgPaths.p1d151cc0}
                    fill="var(--fill-0, white)"
                    id="Vector_5"
                  />
                  <path
                    d={svgPaths.p384c2c00}
                    fill="var(--fill-0, white)"
                    id="Vector_6"
                  />
                  <path
                    d={svgPaths.p39e42f80}
                    fill="var(--fill-0, white)"
                    id="Vector_7"
                  />
                  <path
                    d={svgPaths.p1dee0300}
                    fill="var(--fill-0, white)"
                    id="Vector_8"
                  />
                  <path
                    d={svgPaths.p33fb6300}
                    fill="var(--fill-0, white)"
                    id="Vector_9"
                  />
                  <path
                    d={svgPaths.p392740f0}
                    fill="var(--fill-0, white)"
                    id="Vector_10"
                  />
                </g>
              </svg>
            </div>
          </Link>
        </div>

        <div className="flex gap-15">
          <nav className="hidden items-center gap-10 text-sm md:flex">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.label} href={link.href} theme={theme}>
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
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
        after:h-px after:w-full after:origin-left
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
