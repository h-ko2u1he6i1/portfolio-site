import type { Metadata } from "next";
import Image from "next/image";
import styles from "./page.module.css";
import SkillList from "@/components/common/SkillList";
import PageIntro from "@/components/common/PageIntro";
import Reveal from "@/components/common/Reveal";

export const metadata: Metadata = {
  title: "About",
  description: "Haraya Kohei のプロフィールとスキル。",
};

const bio = [
  "2017年に日本大学理工学部物理学科を卒業後、デジタルハリウッド専門スクールにてWEBデザインを学びました。",
  "2018年5月に株式会社ファイブスターインタラクティブへ入社し、5年間にわたりデザイナーとしてWebサイトやバナー制作などに携わりました。",
  "その後はフロントエンドエンジニアとして3年間、主に HTML / CSS / JavaScript を用いた実装業務に従事し、現在に至ります。",
  "デザインと開発の両面からサイト制作に関わることを得意としています。",
];

export default function AboutPage() {
  return (
    <main className="section">
      <div className="container">
        <PageIntro kicker="About" title="Haraya Kohei" />

        <div className={styles.grid}>
          <Reveal className={styles.photoCol} y={20}>
            <div className={styles.photoFrame}>
              <Image
                src="/img/about.jpg"
                alt="Haraya Kohei"
                fill
                priority
                sizes="(min-width: 900px) 360px, 80vw"
                className={styles.photo}
              />
            </div>
          </Reveal>

          <div className={styles.textCol}>
            <p className={styles.role}>Web Designer / Frontend Engineer</p>

            {bio.map((p, i) => (
              <Reveal key={i} delay={i * 0.05} y={18}>
                <p className={styles.paragraph}>{p}</p>
              </Reveal>
            ))}

            <Reveal className={styles.skills} y={18}>
              <SkillList
                groups={[
                  {
                    label: "Frontend",
                    skills: [
                      "HTML",
                      "CSS",
                      "Sass",
                      "JavaScript",
                      "TypeScript",
                      "React",
                      "Next.js",
                    ],
                  },
                  {
                    label: "Backend / CMS",
                    skills: ["PHP", "WordPress"],
                  },
                  {
                    label: "Tools",
                    skills: ["Gulp", "Git", "Claude Code"],
                  },
                  {
                    label: "Design",
                    skills: ["Figma", "Adobe XD", "Photoshop", "Illustrator"],
                  },
                ]}
              />
            </Reveal>
          </div>
        </div>
      </div>
    </main>
  );
}
