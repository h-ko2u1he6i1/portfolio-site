"use client";

import { type CSSProperties, useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Button from "@/components/common/Button";
import Kicker from "@/components/common/Kicker";
import Reveal from "@/components/common/Reveal";
import { useReveal } from "@/hooks/useReveal";
import type { PortfolioItem } from "@/types/portfolio";
import styles from "./WorkDetail.module.css";

interface WorkDetailProps {
  item: PortfolioItem;
  kicker: string;
  backHref: string;
  backLabel: string;
}

export default function WorkDetail({
  item,
  kicker,
  backHref,
  backLabel,
}: WorkDetailProps) {
  const reduce = useReducedMotion();
  const descriptionLines = item.longDescription.split("\n");

  const [headRef, headIn] = useReveal<HTMLElement>();
  const headState = headIn ? "is-in" : "";

  const coverRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: coverRef,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? ["0%", "0%"] : ["-5%", "5%"],
  );

  return (
    <main className="section">
      <article className="container">
        <header className={styles.head} ref={headRef}>
          <Kicker state={headState}>{kicker}</Kicker>
          <h1
            className={`${styles.title} reveal ${headState}`}
            style={{ "--reveal-delay": "0.08s" } as CSSProperties}
          >
            {item.title}
          </h1>
          <dl
            className={`${styles.metaList} reveal ${headState}`}
            style={
              { "--reveal-delay": "0.18s", "--reveal-y": "16px" } as CSSProperties
            }
          >
            <div className={styles.metaRow}>
              <dt>Role</dt>
              <dd>{item.role}</dd>
            </div>
            {item.externalLink && (
              <div className={styles.metaRow}>
                <dt>Link</dt>
                <dd>
                  <a
                    href={item.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.extLink}
                  >
                    {new URL(item.externalLink).hostname.replace(/^www\./, "")} ↗
                  </a>
                </dd>
              </div>
            )}
          </dl>
        </header>

        <div className={styles.body}>
          <Reveal>
            <p className={styles.description}>
              {descriptionLines.map((line, index) => (
                <span key={index}>
                  {line}
                  {index < descriptionLines.length - 1 && <br />}
                </span>
              ))}
            </p>
          </Reveal>
        </div>

        <div ref={coverRef} className={styles.cover}>
          <motion.div className={styles.coverInner} style={{ y: imgY }}>
            <Image
              src={item.image}
              alt={item.title}
              width={1600}
              height={1000}
              priority
              sizes="(min-width: 1160px) 1100px, 100vw"
              className={styles.coverImage}
            />
          </motion.div>
        </div>

        {(item.detailImage ||
          item.detailImageSp ||
          item.movie ||
          item.movieSp) && (
          <section className={styles.gallery} aria-label="制作物のプレビュー">
            {item.detailImage && (
              <Reveal className={styles.shot}>
                <figure>
                  <div className={styles.shotFrame}>
                    <Image
                      src={item.detailImage}
                      alt={`${item.title} デスクトップ表示`}
                      width={1440}
                      height={2400}
                      sizes="(min-width: 1160px) 1100px, 100vw"
                      className={styles.shotImage}
                    />
                  </div>
                  <figcaption className={styles.caption}>Desktop</figcaption>
                </figure>
              </Reveal>
            )}
            {item.detailImageSp && (
              <Reveal className={`${styles.shot} ${styles.shotSp}`}>
                <figure>
                  <div className={styles.shotFrame}>
                    <Image
                      src={item.detailImageSp}
                      alt={`${item.title} モバイル表示`}
                      width={600}
                      height={1200}
                      sizes="(min-width: 600px) 420px, 100vw"
                      className={styles.shotImage}
                    />
                  </div>
                  <figcaption className={styles.caption}>Mobile</figcaption>
                </figure>
              </Reveal>
            )}
            {item.movie && (
              <Reveal className={styles.shot}>
                <figure>
                  <video
                    controls
                    playsInline
                    muted
                    loop
                    preload="none"
                    poster={item.image}
                    className={styles.video}
                  >
                    <source src={item.movie} type="video/mp4" />
                    お使いのブラウザは video タグに対応していません。
                  </video>
                  <figcaption className={styles.caption}>
                    Motion — Desktop
                  </figcaption>
                </figure>
              </Reveal>
            )}
            {item.movieSp && (
              <Reveal className={`${styles.shot} ${styles.shotSp}`}>
                <figure>
                  <video
                    controls
                    playsInline
                    muted
                    loop
                    preload="none"
                    poster={item.image}
                    className={styles.video}
                  >
                    <source src={item.movieSp} type="video/mp4" />
                    お使いのブラウザは video タグに対応していません。
                  </video>
                  <figcaption className={styles.caption}>
                    Motion — Mobile
                  </figcaption>
                </figure>
              </Reveal>
            )}
          </section>
        )}

        <Reveal className="button-wrapper">
          {item.externalLink && (
            <Button
              href={item.externalLink}
              variant="primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              サイトを見る
            </Button>
          )}
          <Button href={backHref} variant="secondary">
            {backLabel}
          </Button>
        </Reveal>
      </article>
    </main>
  );
}
