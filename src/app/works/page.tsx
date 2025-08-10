"use client";
import styles from "./page.module.css";
import { worksData } from "@/data/works";
import WorkCardItem from "@/components/works/WorkCardItem";
import Button from '@/components/common/Button';
import Footer from '@/components/layout/Footer';

export default function WorksPage() {
  const works = worksData;

  return (
    <>
      <main className="section">
        <section className="container">
          <h1 className="page-title">Works</h1>

          <div className={styles['works-list']}>
            {works.map((work) => (
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
            <Button href="/" variant="secondary">
              トップに戻る
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

