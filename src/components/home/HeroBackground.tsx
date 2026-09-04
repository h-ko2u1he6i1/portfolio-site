"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import styles from "./HeroBackground.module.css";

const Scene = dynamic(() => import("./HeroBackgroundScene"), { ssr: false });

export default function HeroBackground() {
  const reduced = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "150px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className={styles.wrap} aria-hidden="true">
      <div className={styles.layer}>
        {!reduced && <Scene active={inView} />}
      </div>
    </div>
  );
}
