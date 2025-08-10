import React from 'react';
import styles from './SkillList.module.css';

interface SkillListProps {
  skills: string[];
}

const SkillList: React.FC<SkillListProps> = ({ skills }) => {
  return (
    <div className={styles.skillList}>
      {skills.map((skill, index) => (
        <span key={index} className={styles.skillTag}>
          {skill}
        </span>
      ))}
    </div>
  );
};

export default SkillList;