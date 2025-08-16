export interface Work {
  id: number;
  slug: string;
  title: string;
  longDescription: string;
  image: string;
  role: string;
  externalLink?: string;
  detailImage?: string;
  detailImageSp?: string;
  movie?: string;
  movieSp?: string;
}

export const worksData: Work[] = [
  {
    id: 1,
    slug: '1',
    title: "一般財団法人 建設業振興基金",
    longDescription: "コーポレートサイトのフロントエンド実装を担当しました。開発環境には Node.js を導入し、タスクランナーとして Gulp を使用。Sass のコンパイルやブラウザの自動リロード を仕組み化することで、スムーズに作業を進められる開発環境を整えました。また、運用面では WordPress を採用し、テーマをカスタマイズ。専門的な知識がなくても、お客様が管理画面から簡単に更新・運用できる仕組みを実現しました。さらに、サイト内で共通して使われるパーツは コンポーネント化 を意識して設計し、保守しやすく長く使える構成にしています。",
    image: "/img/works-img01.jpg",
    role: "Coding / WordPress",
    externalLink: "https://www.kensetsu-kikin.or.jp/",
  },
  {
    id: 2,
    slug: '2',
    title: "アロヒラニ リゾート ワイキキ ビーチ",
    longDescription: "ホテルサイトのフロントエンド実装を担当しました。宿泊予約に直結する重要な部分として、JavaScriptを用いてカレンダーから日付を選択し、人数を指定して検索できる絞り込み機能を実装。選択内容に応じて予約サイトへスムーズに遷移できるようにし、ユーザーが直感的に操作できる UI を意識しました。",
    image: "/img/works-img02.jpg",
    role: "Coding",
    externalLink: "https://www.alohilani.jp/",
  },
  {
    id: 3,
    slug: '3',
    title: "丸紅I-DIGIOホールディングス株式会社",
    longDescription: "コーポレートサイトのフロントエンド実装を担当しました。最新情報をスムーズに更新できるよう、ニュースページやイベントページには WordPress を導入し、運用のしやすさを重視しています。さらに、TOP ページにはアニメーションを多用し、訪れたユーザーの目を惹きつけ、企業の魅力が伝わるような表現を意識しました。デザイン性と運用性を両立させたフロントエンド開発を実現しています。",
    image: "/img/works-img03.jpg",
    role: "Coding / WordPress",
    externalLink: "https://www.marubeni-idigio.com/",
  },
  {
    id: 4,
    slug: '4',
    title: "ふるさぽん",
    longDescription: "ふるさと納税サイトのフロントエンド実装を担当しました。システムやバックエンド部分は外部ベンダーが担当していたため、Git を用いたやり取りを通じて連携し、スムーズに開発を進行。フロントエンド側では、ユーザーが使いやすくわかりやすい UI を意識し、デザインの再現性と操作性の両立を実現しました。分業体制の中でも円滑なコミュニケーションを意識し、品質の高いフロントエンドを構築しています。",
    image: "/img/works-img04.jpg",
    role: "Coding",
    externalLink: "https://www.furusapon.com/",
  },
  {
    id: 5,
    slug: '5',
    title: "東京リスマチック株式会社 新卒採用サイト",
    longDescription: "東京リスマチック株式会社の採用サイトのデザインを担当しました。ユーザーに信頼感と企業の活力を伝えるため、青を基調としたクリーンなデザインにしました。また、ボタンや重要な要素には、ユーザーの行動を促す効果があるオレンジ色をアクセントとして配置し、ユーザーがスムーズに応募へと進めるよう意識しました。シンプルながらもメッセージ性の強いサイトを目指しました。",
    image: "/img/works-img05.jpg",
    role: "Design",
    externalLink: "https://recruit.lithmatic.net/",
    detailImage: "/img/worksdetail-img05.jpg",
    detailImageSp: "/img/worksdetail-img05.sp.jpg",
  },
  {
    id: 6,
    slug: '6',
    title: "Benesse ビジネスモデル分析コンクール",
    longDescription: "Benesseのコンクール受賞者発表ページのデザインを担当しました。黄色をメインに紙吹雪のイラストや手書き風のフォントを使用しカラフルでポップなデザインにしました。",
    image: "/img/works-img06.jpg",
    role: "Design",
    detailImage: "/img/worksdetail-img06.jpg",
    detailImageSp: "/img/worksdetail-img06.sp.jpg",
  },
  {
    id: 7,
    slug: '7',
    title: "Commiiit",
    longDescription: "学校と保護者間の連絡サービスサイトのフロントエンド実装を担当しました。",
    image: "/img/works-img07.jpg",
    role: "Coding",
    externalLink: "https://commiiit.jp/",
  },
  {
    id: 8,
    slug: '8',
    title: "ナノ・ユニバース Found it!!",
    longDescription: "ナノ・ユニバースのシーズン限定商品の紹介 LP のフロントエンド実装を担当しました。シーズンごとにページを流用して制作できるよう、更新しやすい構造にして、効率的な運用を実現しました。",
    image: "/img/works-img08.jpg",
    role: "Coding",
    movie: "/videos/worksdetail-movie08.mp4",
    movieSp: "/videos/worksdetail-movie08.sp.mp4",
  },
  {
    id: 9,
    slug: '9',
    title: "フコク生命 はたらくささえプラス",
    longDescription: "フコク生命のはたらくささえプラスという保険サービスの紹介＆シミュレーションページのデザインを担当しました。ピンクを基調とした、優しく親しみやすいデザインです。イラストやグラフを多用することで、難しい保険の内容を視覚的に分かりやすく伝え、ユーザーが不安なく検討できるような構成を心がけました。",
    image: "/img/works-img09.jpg",
    role: "Design",
    detailImage: "/img/worksdetail-img09.jpg",
    detailImageSp: "/img/worksdetail-img09.sp.jpg",
  },
  {
    id: 10,
    slug: '10',
    title: "Benesse 戦略立案インターン",
    longDescription: "Benesseの戦略立案インターンLPのデザインを担当しました。信頼感とプロフェッショナルな印象を与えるため、黒と赤を基調にした力強いデザインにしました。ファーストビューで「アウトプット重視型」という強みを明確に提示し、即戦力となる人材の獲得を意図しています。また、3つの理由をアイコンと簡潔な説明で示すことで、プログラムの利点を瞬時に理解できるよう工夫しました。",
    image: "/img/works-img10.jpg",
    role: "Design",
    detailImage: "/img/worksdetail-img10.jpg",
    detailImageSp: "/img/worksdetail-img10.sp.jpg",
  },
  {
    id: 11,
    slug: '11',
    title: "モンスト 年末キャンペーン",
    longDescription: "モンスト 年末キャンペーンページのデザインを担当しました。「豪華な報酬」という期待感を最大限に高めるため、黒と金を基調としたリッチで高級感あふれるデザインにしました。モンストのユーザー層に響くよう、ゲームの世界観と連動した「ビンゴ」という遊び心のある企画を視覚的に表現しています。",
    image: "/img/works-img11.jpg",
    role: "Design",
    detailImage: "/img/worksdetail-img11.jpg",
    detailImageSp: "/img/worksdetail-img11.sp.jpg",
  },
  {
    id: 12,
    slug: '12',
    title: "スタッフサービス Cheer",
    longDescription: "スタッフサービス Cheerというメディア･情報サイトのデザインを担当しました。働く女性をメインターゲットに、日々の生活に役立つ情報を提供するため、シンプルで清潔感のあるデザインにしました。ファーストビューでは、共感を呼ぶようなライフスタイル写真を大きく配置。複数の記事を一覧で表示し、関心のある記事にスムーズにアクセスできるよう配慮しています。",
    image: "/img/works-img12.jpg",
    role: "Design",
    externalLink: "https://www.staffservice.co.jp/cheer/",
    detailImage: "/img/worksdetail-img12.jpg",
    detailImageSp: "/img/worksdetail-img12.sp.jpg",
  },
  {
    id: 13,
    slug: '13',
    title: "インテグレート Disneyコラボキャンペーン",
    longDescription: "インテグレート DisneyコラボキャンペーンLPのデザインを担当しました。シンデレラの世界観を表現するため、夜空をイメージした深い青と、限定感を際立たせる赤をメインカラーにしました。きらめく星のイラストを背景に散りばめることで、幻想的な雰囲気を演出。商品情報を丁寧に解説しつつ、色の比較やメイクの仕上がり例を視覚的に提示することで、ユーザーが安心して購入を検討できるよう工夫しました。コラボレーションの特別感を最大限に引き出すデザインを目指しました。",
    image: "/img/works-img13.jpg",
    role: "Design",
    detailImage: "/img/worksdetail-img13.jpg",
    detailImageSp: "/img/worksdetail-img13.sp.jpg",
  },
  {
    id: 14,
    slug: '14',
    title: "SCUNA 12誘導心電図伝送システム",
    longDescription: "SCUNAという救急隊員が患者の心電図を病院に送るためのシステムのデザインを担当しました。命に関わる医療現場での使用を想定し、直感的で迅速な操作が可能なUIを設計しました。救急側と院内側で区別できるようなわかりやすい配色と、視認性の高いフォントを使用することで、緊急時でも正確に情報を読み取れるよう配慮しています。複雑な操作を排除し、必要な情報に最短でアクセスできるシンプルなレイアウトを追求しました。",
    image: "/img/works-img14.jpg",
    role: "Design",
    detailImage: "/img/worksdetail-img14.jpg",
  },
];
