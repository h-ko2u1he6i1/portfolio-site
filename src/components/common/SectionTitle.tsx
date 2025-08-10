import styles from './SectionTitle.module.css';

interface SectionTitleProps {
  children: React.ReactNode;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ children }) => {
  return <h2 className={styles.title}>{children}</h2>;
};

export default SectionTitle;
