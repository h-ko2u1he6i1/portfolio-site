import Link from "next/link";
import { NAV_LINKS } from "./navLinks";
import Logo from "@/components/common/Logo";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <Logo size="lg" wordmark="Haraya Kohei" />
          <p className={styles.role}>Web Designer / Frontend Engineer</p>
        </div>

        <nav className={styles.nav} aria-label="フッターナビゲーション">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className={styles.navLink}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className={`container ${styles.baseline}`}>
        <p>&copy; {new Date().getFullYear()} Haraya Kohei</p>
        <a href="#main-content" className={styles.top}>
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
