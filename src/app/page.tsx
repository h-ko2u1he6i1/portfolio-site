import styles from "./page.module.css";
import { worksData } from "@/data/works";
import { studiesData } from "@/data/studies";
import HeroBackground from "@/components/home/HeroBackground";
import HeroContent from "@/components/home/HeroContent";
import FeaturedSection from "@/components/home/FeaturedSection";

export default function Home() {
  return (
    <main>
      <section className={styles.hero}>
        <HeroBackground />
        <HeroContent />
        <span className={styles.scrollHint} aria-hidden="true">
          Scroll
        </span>
      </section>

      <FeaturedSection
        kicker="Selected work"
        title="Works"
        items={worksData.slice(0, 4)}
        hrefBase="/works"
        ctaLabel="すべての実績"
        priority
      />

      <FeaturedSection
        kicker="Personal projects"
        title="Study"
        items={studiesData.slice(0, 4)}
        hrefBase="/studies"
        ctaLabel="Study 一覧"
      />
    </main>
  );
}
