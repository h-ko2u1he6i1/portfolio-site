"use client";

import { useReveal } from "@/hooks/useReveal";
import Kicker from "./Kicker";
import SplitText from "./SplitText";
import styles from "./SectionTitle.module.css";

interface SectionTitleProps {
  children: React.ReactNode;
  kicker?: string;
  as?: "h1" | "h2";
}

export default function SectionTitle({
  children,
  kicker,
  as: Tag = "h2",
}: SectionTitleProps) {
  const [ref, inView] = useReveal<HTMLDivElement>();
  const state = inView ? "is-in" : "";
  const text = typeof children === "string" ? children : null;

  return (
    <div className={styles.wrap} ref={ref}>
      {kicker && <Kicker state={state}>{kicker}</Kicker>}
      <Tag className={styles.title}>
        {text ? <SplitText text={text} state={state} /> : children}
      </Tag>
    </div>
  );
}
