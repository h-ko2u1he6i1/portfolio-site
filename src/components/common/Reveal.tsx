"use client";

import { type CSSProperties, type ReactNode } from "react";
import { useReveal } from "@/hooks/useReveal";

interface RevealProps {
  children: ReactNode;
  /** Seconds to delay the transition (for staggering). */
  delay?: number;
  /** Travel distance in px. */
  y?: number;
  className?: string;
}

export default function Reveal({
  children,
  delay = 0,
  y = 26,
  className,
}: RevealProps) {
  const [ref, inView] = useReveal();

  return (
    <div
      ref={ref}
      className={`reveal ${inView ? "is-in" : ""} ${className ?? ""}`}
      style={
        {
          "--reveal-delay": `${delay}s`,
          "--reveal-y": `${y}px`,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}
