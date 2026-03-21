import styles from './page.module.css';
import SectionTitle from '@/components/common/SectionTitle';
import WorkCardItem from '@/components/works/WorkCardItem'; // WorkCardItemを再利用
import { studiesData } from '@/data/studies'; // studiesDataをインポート
import Button from '@/components/common/Button'; // Buttonコンポーネントをインポート

export default function Studies() {
  return (
    <main className={styles.main}>
      <section className="section section--center">
        <div className="container">
          <SectionTitle>Study</SectionTitle> {/* タイトルをStudyに変更 */}
          <div className={styles['works-grid']}>
            {studiesData.map((study) => ( // studiesDataをマップ
              <WorkCardItem
                key={study.id}
                href={`/studies/${study.slug}`} // hrefを/studiesに変更
                image={study.image}
                alt={study.title}
                title={study.title}
                role={study.role}
              />
            ))}
          </div>
          <div className="button-wrapper">
            <Button href="/" variant="secondary">
              TOPへ戻る
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
