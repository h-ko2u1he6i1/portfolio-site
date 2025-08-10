import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import { worksData } from "@/data/works";
import Button from '@/components/common/Button';
import Footer from '@/components/layout/Footer';

export default function WorkDetailPage({ params }: { params: any }) {
  const { slug } = params;

  const workDetail = worksData.find(work => work.slug === slug);

  if (!workDetail) {
    return <div>Work not found</div>;
  }

  return (
    <>
      <main className="section">
        <section className="container">
          <div className={styles['work-detail__image-wrapper']}>
            {workDetail.externalLink ? (
              <a href={workDetail.externalLink} target="_blank" rel="noopener noreferrer">
                <Image
                  src={workDetail.image}
                  alt={workDetail.title}
                  width={900}
                  height={600}
                  layout="responsive"
                  objectFit="contain"
                  className={styles['work-detail__image']}
                />
              </a>
            ) : (
              <Image
                src={workDetail.image}
                alt={workDetail.title}
                width={900}
                height={600}
                layout="responsive"
                objectFit="contain"
                className={styles['work-detail__image']}
              />
            )}
          </div>

          <h1 className={styles['work-detail__title']}>{workDetail.title}</h1>

          <div className={styles['work-detail__info-grid']}>
            <div>
              <p style={{ fontWeight: 'bold', color: '#00B7CE' }}>{workDetail.role}</p>
            </div>
          </div>

          <div className={styles['work-detail__description-section']}>
            <p className={styles['work-detail__description-text']}>{workDetail.longDescription}</p>
            {workDetail.detailImage && (
              <div className={styles['work-detail__additional-image']}>
                <Image
                  src={workDetail.detailImage}
                  alt={`${workDetail.title} 詳細画像`}
                  width={900}
                  height={600}
                  layout="responsive"
                  objectFit="contain"
                />
              </div>
            )}
            {workDetail.detailImageSp && (
              <div className={styles['work-detail__additional-image-sp']}>
                <Image
                  src={workDetail.detailImageSp}
                  alt={`${workDetail.title} 詳細画像SP`}
                  width={500}
                  height={300} // 仮の高さ。必要に応じて調整してください
                  layout="responsive"
                  objectFit="contain"
                />
              </div>
            )}
            {workDetail.movie && (
              <div className={styles['work-detail__movie-wrapper']}>
                <video controls playsInline muted loop className={styles['work-detail__movie']}>
                  <source src={workDetail.movie} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
            {workDetail.movieSp && (
              <div className={styles['work-detail__movie-sp-wrapper']}>
                <video controls playsInline muted loop className={styles['work-detail__movie-sp']}>
                  <source src={workDetail.movieSp} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
          </div>

          <div className="button-wrapper">
            {workDetail.externalLink && (
              <Button
                href={workDetail.externalLink}
                variant="primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                サイトを見る
              </Button>
            )}
            <Button href="/works" variant="secondary">
              Worksページに戻る
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}