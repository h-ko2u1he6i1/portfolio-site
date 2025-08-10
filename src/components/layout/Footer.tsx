import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      
      <p className={styles.footer__copyright}>
        &copy; {new Date().getFullYear()} Haraya Kohei. All rights reserved.
      </p>
    </footer>
  );
}