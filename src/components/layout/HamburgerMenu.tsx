"use client";

import { useState } from "react";
import Link from "next/link";
import styles from './HamburgerMenu.module.css';

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button className={styles['hamburger-menu__button']} onClick={toggleMenu} aria-label="Toggle menu">
        <span className={`${styles['hamburger-menu__icon']} ${isOpen ? styles['hamburger-menu__icon--open'] : ''}`}></span>
        <span className={`${styles['hamburger-menu__icon']} ${isOpen ? styles['hamburger-menu__icon--open'] : ''}`}></span>
        <span className={`${styles['hamburger-menu__icon']} ${isOpen ? styles['hamburger-menu__icon--open'] : ''}`}></span>
      </button>

      <nav className={`${styles['hamburger-menu__nav']} ${isOpen ? styles['hamburger-menu__nav--open'] : ''}`}>
        <ul className={styles['hamburger-menu__list']}>
          <li className={styles['hamburger-menu__item']}>
            <Link href="/about" className={styles['hamburger-menu__link']} onClick={toggleMenu}>
              About
            </Link>
          </li>
          <li className={styles['hamburger-menu__item']}>
            <Link href="/works" className={styles['hamburger-menu__link']} onClick={toggleMenu}>
              Works
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
