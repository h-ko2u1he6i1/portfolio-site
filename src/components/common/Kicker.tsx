import { type CSSProperties, type ReactNode } from "react";

interface KickerProps {
  children: ReactNode;
  /** "is-in" once the parent has revealed. */
  state: string;
  /** Seconds before the reveal starts. */
  delay?: number;
}

/**
 * Editorial eyebrow. The gradient bar and the label both wipe in
 * left-to-right when `state` becomes "is-in".
 */
export default function Kicker({ children, state, delay = 0 }: KickerProps) {
  return (
    <span
      className={`kicker reveal ${state}`}
      style={
        { "--reveal-y": "0px", "--reveal-delay": `${delay}s` } as CSSProperties
      }
    >
      <span className="kicker-text">{children}</span>
    </span>
  );
}
