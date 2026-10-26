"use client";

import { useEffect, useRef } from "react";

// Thin gradient bar across the top of the window that fills as the page is scrolled.
export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      if (barRef.current)
        barRef.current.style.transform = `scaleX(${progress})`;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[3px]"
    >
      <div
        ref={barRef}
        style={{ transform: "scaleX(0)" }}
        className="h-full origin-left bg-gradient-to-r from-indigo-500 via-purple-400 to-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.6)]"
      />
    </div>
  );
}
