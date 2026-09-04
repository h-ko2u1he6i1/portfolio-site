import { type CSSProperties } from "react";

// Non-breaking space keeps word gaps visible inside the per-character masks.
const NBSP = String.fromCharCode(0xa0);

interface SplitTextProps {
  text: string;
  /** "is-in" once the parent has revealed. */
  state: string;
  /** Seconds before the first character animates. */
  startDelay?: number;
  /** Seconds between characters. */
  stagger?: number;
}

/**
 * Per-character mask reveal — the same motion as the hero headline.
 * The visible split is aria-hidden; a plain copy carries the text for
 * assistive tech and no-JS.
 */
export default function SplitText({
  text,
  state,
  startDelay = 0.14,
  stagger = 0.028,
}: SplitTextProps) {
  return (
    <>
      <span className={`split ${state}`} aria-hidden="true">
        {Array.from(text).map((ch, i) => (
          <span key={i} className="char-mask">
            <span
              className="char"
              style={
                {
                  "--reveal-delay": `${startDelay + i * stagger}s`,
                } as CSSProperties
              }
            >
              {ch === " " ? NBSP : ch}
            </span>
          </span>
        ))}
      </span>
      <span className="sr-only">{text}</span>
    </>
  );
}
