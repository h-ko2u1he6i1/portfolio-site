import styles from "./Logo.module.css";

interface LogoProps {
  size?: "sm" | "lg";
  /** Text shown next to the mark. Pass "" to render the mark only. */
  wordmark?: string;
  className?: string;
}

export default function Logo({
  size = "sm",
  wordmark = "Kohei's Portfolio",
  className,
}: LogoProps) {
  return (
    <span
      className={`${styles.logo} ${styles[size]} ${className ?? ""}`}
      aria-label={wordmark || "Kohei's Portfolio"}
    >
      <span className={styles.mark} aria-hidden="true">
        <span className={styles.letters}>HK</span>
      </span>
      {wordmark && (
        <span className={styles.wordmark} aria-hidden="true">
          {wordmark}
        </span>
      )}
    </span>
  );
}
