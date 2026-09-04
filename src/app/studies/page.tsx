import type { Metadata } from "next";
import { studiesData } from "@/data/studies";
import PageIntro from "@/components/common/PageIntro";
import WorkCardGrid from "@/components/works/WorkCardGrid";

export const metadata: Metadata = {
  title: "Study",
  description: "学習のために個人開発したアプリケーション。",
};

export default function StudiesPage() {
  return (
    <main className="section">
      <div className="container container--wide">
        <PageIntro
          kicker="Personal projects"
          title="Study"
          lede="モダンな技術スタックの学習を目的に、個人で企画・開発したアプリケーションです。"
        />

        <WorkCardGrid
          items={studiesData}
          hrefBase="/studies"
          priority
          className="card-grid--tight"
        />
      </div>
    </main>
  );
}
