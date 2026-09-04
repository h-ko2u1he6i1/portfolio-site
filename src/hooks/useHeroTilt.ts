"use client";

import { useEffect, useRef } from "react";

/**
 * Subtle cursor-reactive parallax for the hero headline.
 * Writes `--tilt-x` / `--tilt-y` / `--tilt-r` custom properties (see
 * HeroContent.module.css). No-ops for touch and reduced-motion users.
 */
export function useHeroTilt<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(hover: none)").matches) return;

    let raf = 0;
    const cur = { x: 0, y: 0 };
    const tgt = { x: 0, y: 0 };

    const onMove = (e: PointerEvent) => {
      tgt.x = e.clientX / window.innerWidth - 0.5;
      tgt.y = e.clientY / window.innerHeight - 0.5;
    };

    const tick = () => {
      cur.x += (tgt.x - cur.x) * 0.05;
      cur.y += (tgt.y - cur.y) * 0.05;
      el.style.setProperty("--tilt-x", `${(cur.x * 14).toFixed(2)}px`);
      el.style.setProperty("--tilt-y", `${(cur.y * 9).toFixed(2)}px`);
      el.style.setProperty("--tilt-r", `${(cur.x * 0.7).toFixed(3)}deg`);
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return ref;
}
