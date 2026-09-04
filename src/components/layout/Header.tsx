import Link from "next/link";
import HamburgerMenu from "./HamburgerMenu";
import { NAV_LINKS } from "./navLinks";
import Logo from "@/components/common/Logo";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo} aria-label="Kohei's Portfolio — トップへ">
        <Logo />
      </Link>
      <nav className={styles.nav} aria-label="メインナビゲーション">
        <ul className={styles.navList}>
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={styles.navLink}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className={styles.mobile}>
        <HamburgerMenu />
      </div>
    </header>
  );
}
