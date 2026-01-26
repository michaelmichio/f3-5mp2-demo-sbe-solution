"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BuildingViewer from "./BuildingViewer";
import ObjViewer from "./ObJViewer";

export default function ZoomScroll() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      const wrapper = rootRef.current!.querySelector(
        ".x-wrapper",
      ) as HTMLElement;
      const overlay = rootRef.current!.querySelector(
        ".x-image-container",
      ) as HTMLElement;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: "+=100%",
          pin: true,
          scrub: true,
          markers: false,

          onLeave: () => {
            console.log("x");
            // ✅ sudah sampai bawah → matikan overlay
            overlay?.classList.add("is-hidden");
          },
          onEnterBack: () => {
            // ✅ balik masuk ke scene zoom
            overlay?.classList.remove("is-hidden");
          },
          onLeaveBack: () => {
            // ✅ balik ke atas sebelum scene
            overlay?.classList.remove("is-hidden");
          },
        },
      });

      tl.to(".x-image-container img", {
        scale: 2,
        z: 350,
        transformOrigin: "center -0.5%",
        ease: "power1.inOut",
      }).to(
        ".x-section.x-hero",
        {
          scale: 1,
          transformOrigin: "center center",
          ease: "power1.inOut",
        },
        "<",
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>
      <div className="x-wrapper">
        <div className="x-content">
          <section className="x-section x-hero">
            <ObjViewer />
          </section>
        </div>

        <div className="x-image-container">
          <img
            // src="https://assets-global.website-files.com/63ec206c5542613e2e5aa784/643312a6bc4ac122fc4e3afa_main%20home.webp"
            src="/assets/image/desktop.png"
            alt="image"
          />
        </div>
      </div>

      {/* <div style={{ height: "100vh", background: "#f0f0f0" }}>
        Konten Selanjutnya
      </div> */}
    </div>
  );
}
