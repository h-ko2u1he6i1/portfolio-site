"use client";
import styles from "./page.module.css";
import SectionTitle from '@/components/common/SectionTitle';
import WorkCardItem from '@/components/works/WorkCardItem';
import { worksData } from '@/data/works';
import Button from '@/components/common/Button';
import GeometricBackground from '@/components/common/GeometricBackground';
import Footer from '@/components/layout/Footer';

export default function Home() {

  const featuredWorks = worksData.slice(0, 4);

  return (
    <main>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.hero__background}>
          <GeometricBackground />
        </div>
        <div className={styles.hero__content}>
          <h1 className={styles.hero__title}>Kohei&apos;s Portfolio</h1>
          <p className={styles.hero__subtitle}>Web Designer</p>
          <p className={styles.hero__description}>このポートフォリオサイトは<br className={styles['br-sp']} />Gemini CLIの使用して作成しました</p>
        </div>
      </section>

      <div className={styles.scrollableContent}>
        {/* Featured Works Section */}
        <section className="section section--center section--light-gray">
          <div className="container">
            <SectionTitle>Works</SectionTitle>
            <div className={styles['works-grid']}>
              {featuredWorks.map((work) => (
                <WorkCardItem
                  key={work.id}
                  href={`/works/${work.slug}`}
                  image={work.image}
                  alt={work.title}
                  title={work.title}
                  role={work.role}
                />
              ))}
            </div>
            <div className="button-wrapper">
              <Button href="/works" variant="primary">
                もっと見る
              </Button>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </main>
  );
}

