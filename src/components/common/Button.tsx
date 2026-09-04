import { type ReactNode } from "react";
import Link from "next/link";
import styles from "./Button.module.css";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
  onClick?: () => void;
  target?: string;
  rel?: string;
}

function Arrow() {
  return (
    <svg
      className={styles.arrow}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 8h11M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Button({
  children,
  href,
  variant = "primary",
  onClick,
  target,
  rel,
}: ButtonProps) {
  const className = `${styles.button} ${styles[variant]}`;
  const content = (
    <>
      <span>{children}</span>
      <Arrow />
    </>
  );

  if (href && href.startsWith("/")) {
    return (
      <Link href={href} className={className} onClick={onClick}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={className}
        onClick={onClick}
        target={target}
        rel={rel}
      >
        {content}
      </a>
    );
  }

  return (
    <button className={className} onClick={onClick}>
      {content}
    </button>
  );
}
