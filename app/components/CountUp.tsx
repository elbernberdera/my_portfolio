"use client";

import { useEffect, useRef, useState } from "react";
import useReducedMotion from "../hooks/useReducedMotion";

const DURATION_MS = 1400;

// Counts from 0 up to `value` (ease-out) the first time it scrolls into view.
export default function CountUp({ value }: { value: number }) {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node || reducedMotion) return;

    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();

      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / DURATION_MS, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCurrent(Math.round(eased * value));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    });

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [reducedMotion, value]);

  return <span ref={ref}>{reducedMotion ? value : current}</span>;
}
