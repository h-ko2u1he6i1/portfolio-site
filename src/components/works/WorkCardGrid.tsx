import type { PortfolioItem } from "@/types/portfolio";
import Reveal from "@/components/common/Reveal";
import WorkCardItem from "./WorkCardItem";

interface WorkCardGridProps {
  items: PortfolioItem[];
  /** e.g. "/works" or "/studies" */
  hrefBase: string;
  /** Cap at two columns on desktop (for short featured lists). */
  half?: boolean;
  /** Eager-load the first two card images. */
  priority?: boolean;
  /** Extra class for gap / layout overrides. */
  className?: string;
}

export default function WorkCardGrid({
  items,
  hrefBase,
  half = false,
  priority = false,
  className = "",
}: WorkCardGridProps) {
  return (
    <div className={`card-grid ${half ? "card-grid--half" : ""} ${className}`}>
      {items.map((item, i) => (
        <Reveal key={item.id} delay={Math.min(i, 4) * 0.06}>
          <WorkCardItem
            href={`${hrefBase}/${item.slug}`}
            image={item.image}
            alt={item.title}
            title={item.title}
            role={item.role}
            index={i + 1}
            priority={priority && i < 2}
          />
        </Reveal>
      ))}
    </div>
  );
}
