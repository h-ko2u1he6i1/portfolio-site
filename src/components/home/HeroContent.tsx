"use client";

import { type CSSProperties } from "react";
import { useReveal } from "@/hooks/useReveal";
import { useHeroTilt } from "@/hooks/useHeroTilt";
import Kicker from "@/components/common/Kicker";
import styles from "./HeroContent.module.css";

const LINES = ["Kohei’s", "Portfolio"];

export default function HeroContent() {
  const [ref, inView] = useReveal<HTMLDivElement>();
  const titleRef = useHeroTilt<HTMLHeadingElement>();
  const state = inView ? "is-in" : "";

  const step = (i: number, y = 24): CSSProperties =>
    ({
      "--reveal-delay": `${0.45 + i * 0.08}s`,
      "--reveal-y": `${y}px`,
    }) as CSSProperties;

  return (
    <div className={`container ${styles.inner}`} ref={ref}>
      <Kicker state={state} delay={0.1}>
        Portfolio
      </Kicker>

      <h1 className={styles.title} ref={titleRef}>
        {LINES.map((line, lineIndex) => {
          const offset = LINES.slice(0, lineIndex).reduce(
            (n, l) => n + Array.from(l).length,
            0,
          );
          return (
            <span key={lineIndex} className={styles.line}>
              <span className={`char-line ${state}`}>
                {Array.from(line).map((ch, i) => (
                  <span
                    key={i}
                    className="char"
                    style={
                      {
                        "--reveal-delay": `${0.12 + (offset + i) * 0.028}s`,
                      } as CSSProperties
                    }
                  >
                    {ch}
                  </span>
                ))}
              </span>
            </span>
          );
        })}
      </h1>

      <p className={`${styles.role} reveal ${state}`} style={step(1)}>
        Web Designer / Frontend Engineer
      </p>

      <p className={`${styles.note} reveal ${state}`} style={step(2, 18)}>
        デザインと実装の両方からWeb制作に携わっています。 このサイトは Next.js /
        React / TypeScript で構築し、制作過程では Claude Code を活用しました。
      </p>
    </div>
  );
}
