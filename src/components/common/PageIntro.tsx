"use client";

import { type CSSProperties } from "react";
import { useReveal } from "@/hooks/useReveal";
import Kicker from "./Kicker";
import SplitText from "./SplitText";
import styles from "./PageIntro.module.css";

interface PageIntroProps {
  kicker: string;
  title: string;
  lede?: string;
}

export default function PageIntro({ kicker, title, lede }: PageIntroProps) {
  const [ref, inView] = useReveal<HTMLElement>();
  const state = inView ? "is-in" : "";

  return (
    <header className={styles.head} ref={ref}>
      <Kicker state={state}>{kicker}</Kicker>

      <h1 className={`page-title ${styles.title}`}>
        <SplitText text={title} state={state} />
      </h1>

      {lede && (
        <p
          className={`lede ${styles.lede} reveal ${state}`}
          style={
            { "--reveal-delay": "0.24s", "--reveal-y": "16px" } as CSSProperties
          }
        >
          {lede}
        </p>
      )}
    </header>
  );
}
