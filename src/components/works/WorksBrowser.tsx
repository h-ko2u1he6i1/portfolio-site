"use client";

import { useMemo, useState } from "react";
import type { PortfolioItem } from "@/types/portfolio";
import WorkCardGrid from "./WorkCardGrid";
import styles from "./WorksBrowser.module.css";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "design", label: "Design" },
  { id: "coding", label: "Coding" },
] as const;

type FilterId = (typeof FILTERS)[number]["id"];

function matches(role: string, filter: FilterId) {
  return filter === "all" || role.toLowerCase().includes(filter);
}

interface WorksBrowserProps {
  works: PortfolioItem[];
  hrefBase?: string;
}

export default function WorksBrowser({
  works,
  hrefBase = "/works",
}: WorksBrowserProps) {
  const [filter, setFilter] = useState<FilterId>("all");

  const counts = useMemo(
    () =>
      Object.fromEntries(
        FILTERS.map((f) => [
          f.id,
          works.filter((w) => matches(w.role, f.id)).length,
        ]),
      ) as Record<FilterId, number>,
    [works],
  );

  const visible = works.filter((w) => matches(w.role, filter));

  return (
    <>
      <div className={styles.filters} role="group" aria-label="実績の絞り込み">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            className={styles.filter}
            aria-pressed={filter === f.id}
            onClick={() => setFilter(f.id)}
          >
            {f.label}
            <span className={styles.count}>{counts[f.id]}</span>
          </button>
        ))}
      </div>

      <p className={styles.result} aria-live="polite">
        {visible.length} 件
      </p>

      <WorkCardGrid
        items={visible}
        hrefBase={hrefBase}
        priority
        className="card-grid--tight"
      />
    </>
  );
}
