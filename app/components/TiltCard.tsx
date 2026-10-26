"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";
import useReducedMotion from "../hooks/useReducedMotion";

type Props = {
  children: ReactNode;
  className?: string;
  // rgb triple for the spotlight colour, e.g. "99, 102, 241"
  glow?: string;
};

const MAX_TILT_DEG = 4;

// Card that tilts slightly toward the mouse and shows a soft spotlight under the cursor.
// Only reacts to a real mouse, so touch scrolling is unaffected.
export default function TiltCard({
  children,
  className = "",
  glow = "99, 102, 241",
}: Props) {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    const node = ref.current;
    if (!node || event.pointerType !== "mouse") return;

    const rect = node.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    node.style.setProperty("--mx", `${x * 100}%`);
    node.style.setProperty("--my", `${y * 100}%`);

    if (!reducedMotion) {
      node.style.setProperty("--ry", `${(x - 0.5) * 2 * MAX_TILT_DEG}deg`);
      node.style.setProperty("--rx", `${(0.5 - y) * 2 * MAX_TILT_DEG}deg`);
    }
  };

  const onPointerLeave = () => {
    ref.current?.style.setProperty("--rx", "0deg");
    ref.current?.style.setProperty("--ry", "0deg");
  };

  return (
    <article
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={`group/tilt relative [transform:perspective(1000px)_rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))] transition-[transform,translate,border-color] duration-300 ease-out ${className}`}
    >
      <div
        aria-hidden="true"
        style={{
          background: `radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgba(${glow}, 0.16), transparent 45%)`,
        }}
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100"
      />
      {children}
    </article>
  );
}
