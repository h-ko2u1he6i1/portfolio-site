"use client";

import { type CSSProperties } from "react";
import { useReveal } from "@/hooks/useReveal";
import { SKILL_ICON_PATHS, SKILL_MONOGRAMS } from "./skillIcons";
import styles from "./SkillList.module.css";

export interface SkillGroup {
  label: string;
  skills: string[];
}

interface SkillListProps {
  groups: SkillGroup[];
}

function SkillGlyph({ skill }: { skill: string }) {
  const path = SKILL_ICON_PATHS[skill];
  if (path) {
    return (
      <svg
        className={styles.icon}
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
      >
        <path d={path} fill="currentColor" />
      </svg>
    );
  }

  const mono = SKILL_MONOGRAMS[skill];
  return (
    <span className={styles.mono} aria-hidden="true">
      {mono ?? ""}
    </span>
  );
}

export default function SkillList({ groups }: SkillListProps) {
  const [ref, inView] = useReveal<HTMLDivElement>();
  const state = inView ? "is-in" : "";

  return (
    <div ref={ref} className={styles.groups}>
      {groups.map((group, groupIndex) => {
        const offset = groups
          .slice(0, groupIndex)
          .reduce((n, g) => n + g.skills.length, 0);

        return (
          <section key={group.label} className={styles.group}>
            <h3 className={styles.groupLabel}>{group.label}</h3>
            <ul className={styles.grid}>
              {group.skills.map((skill, skillIndex) => (
                <li
                  key={skill}
                  className={`${styles.item} reveal ${state}`}
                  style={
                    {
                      "--reveal-delay": `${Math.min(offset + skillIndex, 16) * 0.03}s`,
                      "--reveal-y": "12px",
                    } as CSSProperties
                  }
                >
                  <SkillGlyph skill={skill} />
                  <span className={styles.name}>{skill}</span>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
