import Link from 'next/link';
import Image from 'next/image';
import styles from './WorkCardItem.module.css';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface WorkCardItemProps {
  href: string;
  image: string;
  alt: string;
  title: string;
  role: string;
}

const WorkCardItem: React.FC<WorkCardItemProps> = ({ href, image, alt, title, role }) => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <Link ref={ref} href={href} className={`${styles.card} fade-in-section ${isVisible ? 'is-visible' : ''}`}>
      <Image src={image} alt={alt} width={600} height={400} className={styles.cardImage} />
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardDescription}>{role}</p>
      </div>
    </Link>
  );
};

export default WorkCardItem;
