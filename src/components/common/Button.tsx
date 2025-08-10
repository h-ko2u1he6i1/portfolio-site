import React from 'react';
import Link from 'next/link';
import styles from './Button.module.css';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  target?: string;
  rel?: string;
}

const Button: React.FC<ButtonProps> = ({ children, href, variant = 'primary', onClick, target, rel }) => {
  const className = `${styles.button} ${styles[variant]}`;

  if (href) {
    if (href.startsWith('/')) {
      return (
        <Link href={href} className={className} onClick={onClick}>
          {children}
        </Link>
      );
    } else {
      return (
        <a href={href} className={className} onClick={onClick} target={target} rel={rel}>
          {children}
        </a>
      );
    }
  }

  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
