import Link from "next/link";
import HamburgerMenu from "./HamburgerMenu";
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.header__logo}>
        <Link href="/">Kohei's Portfolio</Link>
      </div>
      <nav className={styles['header__nav--desktop']}>
        <ul className={styles['header__nav-list']}>
          <li className={styles['header__nav-item']}>
            <Link href="/about" className={styles['header__nav-link']}>
              About
            </Link>
          </li>
          <li className={styles['header__nav-item']}>
            <Link href="/works" className={styles['header__nav-link']}>
              Works
            </Link>
          </li>
        </ul>
      </nav>
      <div className={styles['header__nav--mobile']}>
        <HamburgerMenu />
      </div>
    </header>
  );
}