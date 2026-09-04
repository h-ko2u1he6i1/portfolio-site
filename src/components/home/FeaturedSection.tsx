import type { PortfolioItem } from "@/types/portfolio";
import SectionTitle from "@/components/common/SectionTitle";
import Button from "@/components/common/Button";
import Reveal from "@/components/common/Reveal";
import WorkCardGrid from "@/components/works/WorkCardGrid";

interface FeaturedSectionProps {
  kicker: string;
  title: string;
  items: PortfolioItem[];
  hrefBase: string;
  ctaLabel: string;
  priority?: boolean;
}

export default function FeaturedSection({
  kicker,
  title,
  items,
  hrefBase,
  ctaLabel,
  priority = false,
}: FeaturedSectionProps) {
  return (
    <section className="section">
      <div className="container">
        <SectionTitle kicker={kicker}>{title}</SectionTitle>
        <WorkCardGrid items={items} hrefBase={hrefBase} half priority={priority} />
        <Reveal className="button-wrapper">
          <Button href={hrefBase} variant="secondary">
            {ctaLabel}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
