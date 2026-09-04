"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import styles from "./WorkCardItem.module.css";

interface WorkCardItemProps {
  href: string;
  image: string;
  alt: string;
  title: string;
  role: string;
  index?: number;
  priority?: boolean;
}

const ease = [0.2, 0, 0, 1] as const;

export default function WorkCardItem({
  href,
  image,
  alt,
  title,
  role,
  index,
  priority = false,
}: WorkCardItemProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div initial="rest" whileHover="hover" animate="rest">
      <Link href={href} className={styles.card}>
        <div className={styles.frame}>
          <motion.div
            className={styles.imageWrap}
            variants={{
              rest: { scale: 1 },
              hover: { scale: reduce ? 1 : 1.06 },
            }}
            transition={{ duration: 0.8, ease }}
          >
            <Image
              src={image}
              alt={alt}
              width={600}
              height={400}
              priority={priority}
              sizes="(min-width: 900px) 45vw, 100vw"
              className={styles.image}
            />
          </motion.div>
        </div>

        <div className={styles.meta}>
          {index != null && (
            <span className={styles.index}>
              {String(index).padStart(2, "0")}
            </span>
          )}
          <h3 className={styles.title}>
            <motion.span
              variants={{
                rest: { color: "var(--ink)" },
                hover: { color: "var(--accent-ink)" },
              }}
            >
              {title}
            </motion.span>
            <motion.span
              className={styles.titleArrow}
              aria-hidden="true"
              variants={{
                rest: { opacity: 0, x: -6 },
                hover: { opacity: 1, x: 0 },
              }}
              transition={{ duration: 0.35, ease }}
            >
              →
            </motion.span>
          </h3>
          <span className={styles.role}>{role}</span>
        </div>
      </Link>
    </motion.div>
  );
}
