import Image from "next/image";
import styles from "./page.module.css";
import { studiesData } from "@/data/studies"; // studiesDataをインポート
import Button from '@/components/common/Button';
import Footer from '@/components/layout/Footer';

export default async function StudyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const studyDetail = studiesData.find(study => study.slug === slug); // studiesDataから検索

  if (!studyDetail) {
    return <div>Study not found</div>;
  }

  return (
    <>
      <main className="section">
        <section className="container">
          <div className={styles['work-detail__image-wrapper']}>
            {studyDetail.externalLink ? (
              <a href={studyDetail.externalLink} target="_blank" rel="noopener noreferrer">
                <Image
                  src={studyDetail.image}
                  alt={studyDetail.title}
                  width={900}
                  height={600}
                  layout="responsive"
                  objectFit="contain"
                  className={styles['work-detail__image']}
                />
              </a>
            ) : (
              <Image
                src={studyDetail.image}
                alt={studyDetail.title}
                width={900}
                height={600}
                layout="responsive"
                objectFit="contain"
                className={styles['work-detail__image']}
              />
            )}
          </div>

          <h1 className={styles['work-detail__title']}>{studyDetail.title}</h1>

          <div className={styles['work-detail__info-grid']}>
            <div>
              <p style={{ fontWeight: 'bold', color: '#00B7CE' }}>{studyDetail.role}</p>
            </div>
          </div>

          <div className={styles['work-detail__description-section']}>
            <p className={styles['work-detail__description-text']}>
              {studyDetail.longDescription.split('\n').map((line, index) => (
                <span key={index}>
                  {line}
                  {index < studyDetail.longDescription.split('\n').length - 1 && <br />}
                </span>
              ))}
            </p>
            {studyDetail.detailImage && (
              <div className={styles['work-detail__additional-image']}>
                <Image
                  src={studyDetail.detailImage}
                  alt={`${studyDetail.title} 詳細画像`}
                  width={900}
                  height={600}
                  layout="responsive"
                  objectFit="contain"
                />
              </div>
            )}
            {studyDetail.detailImageSp && (
              <div className={styles['work-detail__additional-image-sp']}>
                <Image
                  src={studyDetail.detailImageSp}
                  alt={`${studyDetail.title} 詳細画像SP`}
                  width={500}
                  height={300} // 仮の高さ。必要に応じて調整してください
                  layout="responsive"
                  objectFit="contain"
                />
              </div>
            )}
            {studyDetail.movie && (
              <div className={styles['work-detail__movie-wrapper']}>
                <video controls playsInline muted loop className={styles['work-detail__movie']}>
                  <source src={studyDetail.movie} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
            {studyDetail.movieSp && (
              <div className={styles['work-detail__movie-sp-wrapper']}>
                <video controls playsInline muted loop className={styles['work-detail__movie-sp']}>
                  <source src={studyDetail.movieSp} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
          </div>

          <div className="button-wrapper">
            {studyDetail.externalLink && (
              <Button
                href={studyDetail.externalLink}
                variant="primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                サイトを見る
              </Button>
            )}
            <Button href="/studies" variant="secondary"> {/* hrefを/studiesに変更 */}
              Studyページに戻る
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
