import type { Metadata } from "next";
import { worksData } from "@/data/works";
import PageIntro from "@/components/common/PageIntro";
import WorksBrowser from "@/components/works/WorksBrowser";

export const metadata: Metadata = {
  title: "Works",
  description: "これまでに手がけた Web サイト・LP の制作実績。",
};

export default function WorksPage() {
  return (
    <main className="section">
      <div className="container container--wide">
        <PageIntro
          kicker="Selected work"
          title="Works"
          lede={`コーポレートサイト・採用サイト・LP を中心に、デザインまたはフロントエンド実装で携わった ${worksData.length} 件の実績です。`}
        />

        <WorksBrowser works={worksData} />
      </div>
    </main>
  );
}
