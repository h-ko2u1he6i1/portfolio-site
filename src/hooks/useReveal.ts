"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Adds an `is-in` state once the element scrolls into view.
 * Content is styled visible by default (see `.js .reveal` in globals.css),
 * so a failed observer or background-tab load never hides anything.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);

    const t = window.setTimeout(() => setInView(true), 1500);

    return () => {
      io.disconnect();
      window.clearTimeout(t);
    };
  }, []);

  return [ref, inView] as const;
}
