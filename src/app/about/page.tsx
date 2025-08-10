import Image from "next/image";
import styles from "./page.module.css";
import SkillList from '@/components/common/SkillList';
import Button from '@/components/common/Button';
import Footer from '@/components/layout/Footer';

export default function AboutPage() {
  return (
    <>
      <main className="section">
        <section className="container">
          <h1 className="page-title">About</h1>

          <div className={styles.profile}>
            <div className={styles['profile__photo-wrapper']}>
              <Image
                src="/img/about.png" // Replace with actual photo
                alt="Haraya Kohei"
                width={300}
                height={300}
                className={styles.profile__photo}
              />
            </div>
            <div className={styles.profile__details}>
              <h2 className={styles.profile__name}>Haraya Kohei</h2>
              <p className={styles.profile__title}>Web Designer</p>
              <p className={styles.profile__description}>2017年に日本大学理工学部物理学科を卒業後、デジタルハリウッド専門スクールにてWEBデザインを学びました。
                2018年5月に株式会社ファイブスターインタラクティブへ入社し、5年間にわたりデザイナーとしてWebサイトやバナー制作などに携わりました。
                その後はフロントエンドエンジニアとして3年間、主にHTML/CSS/JavaScriptを用いた実装業務に従事し、現在に至ります。
                デザインと開発の両面からサイト制作に関わることを得意としています。</p>
            </div>
          </div>

          <div className="section--center">
            <SkillList skills={["HTML", "CSS", "JavaScript", "PHP", "WordPress", "Figma", "XD", "Photoshop", "Illustrator"]} />
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