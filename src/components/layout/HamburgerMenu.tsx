"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import styles from "./HamburgerMenu.module.css";
import { NAV_LINKS } from "./navLinks";

const ease = [0.2, 0, 0, 1] as const;

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const reduce = useReducedMotion();
  const close = () => setIsOpen(false);

  // Portal target only exists on the client; render inline until mounted.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const overlay = (
    <AnimatePresence>
      {isOpen && (
        <motion.nav
          id="mobile-nav"
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.32, ease }}
          aria-label="モバイルナビゲーション"
        >
          <ol className={styles.list}>
            {NAV_LINKS.map((link, i) => (
              <motion.li
                key={link.href}
                className={styles.item}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease, delay: 0.12 + i * 0.07 }}
              >
                <Link href={link.href} className={styles.link} onClick={close}>
                  <span className={styles.index}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {link.label}
                </Link>
              </motion.li>
            ))}
          </ol>
        </motion.nav>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <button
        className={`${styles.button} ${isOpen ? styles.buttonOpen : ""}`}
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? "メニューを閉じる" : "メニューを開く"}
        aria-expanded={isOpen}
        aria-controls="mobile-nav"
      >
        <span className={styles.bar} />
        <span className={styles.bar} />
      </button>

      {mounted ? createPortal(overlay, document.body) : null}
    </>
  );
}
