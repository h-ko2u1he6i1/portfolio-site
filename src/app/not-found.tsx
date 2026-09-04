import Button from "@/components/common/Button";
import PageIntro from "@/components/common/PageIntro";
import Reveal from "@/components/common/Reveal";

export default function NotFound() {
  return (
    <main className="section">
      <div className="container container--narrow">
        <PageIntro
          kicker="Error 404"
          title="ページが見つかりません"
          lede="お探しのページは移動または削除された可能性があります。"
        />
        <Reveal className="button-wrapper">
          <Button href="/" variant="primary">
            トップへ戻る
          </Button>
        </Reveal>
      </div>
    </main>
  );
}
