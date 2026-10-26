"use client";

import { useEffect, useState } from "react";
import useReducedMotion from "../hooks/useReducedMotion";

const TYPE_MS = 70;
const DELETE_MS = 35;
const HOLD_MS = 1800;

// Types each role, holds it, deletes it, then moves on to the next one.
export default function TypingRoles({ roles }: { roles: string[] }) {
  const reducedMotion = useReducedMotion();
  const [roleIndex, setRoleIndex] = useState(0);
  const [length, setLength] = useState(roles[0].length);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reducedMotion) return;

    const role = roles[roleIndex];
    let delay = deleting ? DELETE_MS : TYPE_MS;
    if (!deleting && length === role.length) delay = HOLD_MS;

    const id = window.setTimeout(() => {
      if (!deleting && length === role.length) {
        setDeleting(true);
      } else if (deleting && length === 0) {
        setDeleting(false);
        setRoleIndex((roleIndex + 1) % roles.length);
      } else {
        setLength(length + (deleting ? -1 : 1));
      }
    }, delay);

    return () => window.clearTimeout(id);
  }, [deleting, length, reducedMotion, roleIndex, roles]);

  const text = reducedMotion ? roles[0] : roles[roleIndex].slice(0, length);

  return (
    <>
      <span className="sr-only">{roles.join(", ")}</span>
      <span aria-hidden="true">
        {text}
        <span className="ml-1 inline-block h-[1.1em] w-[3px] translate-y-[0.18em] rounded-full bg-cyan-300 animate-[caret-blink_1s_step-end_infinite]" />
      </span>
    </>
  );
}
