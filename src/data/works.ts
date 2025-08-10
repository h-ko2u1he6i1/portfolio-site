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
    longDescription: "ここに作品の説明が入ります。このプロジェクトの背景、目的、そして特に工夫した点や技術的な挑戦について詳しく記述してください。",
    image: "/img/works-img01.jpg",
    role: "Coding / WordPress",
    externalLink: "https://www.kensetsu-kikin.or.jp/",
  },
  {
    id: 2,
    slug: '2',
    title: "アロヒラニ リゾート ワイキキ ビーチ",
    longDescription: "ここに作品の説明が入ります。このプロジェクトの背景、目的、そして特に工夫した点や技術的な挑戦について詳しく記述してください。",
    image: "/img/works-img02.jpg",
    role: "Coding",
    externalLink: "https://www.alohilani.jp/",
  },
  {
    id: 3,
    slug: '3',
    title: "丸紅I-DIGIOホールディングス株式会社",
    longDescription: "ここに作品の説明が入ります。このプロジェクトの背景、目的、そして特に工夫した点や技術的な挑戦について詳しく記述してください。",
    image: "/img/works-img03.jpg",
    role: "Coding / WordPress",
    externalLink: "https://www.marubeni-idigio.com/",
  },
  {
    id: 4,
    slug: '4',
    title: "ふるさぽん",
    longDescription: "ここに作品の説明が入ります。このプロジェクトの背景、目的、そして特に工夫した点や技術的な挑戦について詳しく記述してください。",
    image: "/img/works-img04.jpg",
    role: "Coding",
    externalLink: "https://www.furusapon.com/",
  },
  {
    id: 5,
    slug: '5',
    title: "東京リスマチック株式会社 新卒採用サイト",
    longDescription: "ここに作品の説明が入ります。このプロジェクトの背景、目的、そして特に工夫した点や技術的な挑戦について詳しく記述してください。",
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
    longDescription: "ここに作品の説明が入ります。このプロジェクトの背景、目的、そして特に工夫した点や技術的な挑戦について詳しく記述してください。",
    image: "/img/works-img06.jpg",
    role: "Design",
    detailImage: "/img/worksdetail-img06.jpg",
    detailImageSp: "/img/worksdetail-img06.sp.jpg",
  },
  {
    id: 7,
    slug: '7',
    title: "Commiiit",
    longDescription: "ここに作品の説明が入ります。このプロジェクトの背景、目的、そして特に工夫した点や技術的な挑戦について詳しく記述してください。",
    image: "/img/works-img07.jpg",
    role: "Coding",
    externalLink: "https://commiiit.jp/",
  },
  {
    id: 8,
    slug: '8',
    title: "ナノ・ユニバース Found it!!",
    longDescription: "ここに作品の説明が入ります。このプロジェクトの背景、目的、そして特に工夫した点や技術的な挑戦について詳しく記述してください。",
    image: "/img/works-img08.jpg",
    role: "Coding",
    movie: "/videos/worksdetail-movie08.mp4",
    movieSp: "/videos/worksdetail-movie08.sp.mp4",
  },
  {
    id: 9,
    slug: '9',
    title: "フコク生命 はたらくささえプラス",
    longDescription: "ここに作品の説明が入ります。このプロジェクトの背景、目的、そして特に工夫した点や技術的な挑戦について詳しく記述してください。",
    image: "/img/works-img09.jpg",
    role: "Design",
    detailImage: "/img/worksdetail-img09.jpg",
    detailImageSp: "/img/worksdetail-img09.sp.jpg",
  },
  {
    id: 10,
    slug: '10',
    title: "Benesse 戦略立案インターン",
    longDescription: "ここに作品の説明が入ります。このプロジェクトの背景、目的、そして特に工夫した点や技術的な挑戦について詳しく記述してください。",
    image: "/img/works-img10.jpg",
    role: "Design",
    detailImage: "/img/worksdetail-img10.jpg",
    detailImageSp: "/img/worksdetail-img10.sp.jpg",
  },
  {
    id: 11,
    slug: '11',
    title: "モンスト 年末キャンペーン",
    longDescription: "ここに作品の説明が入ります。このプロジェクトの背景、目的、そして特に工夫した点や技術的な挑戦について詳しく記述してください。",
    image: "/img/works-img11.jpg",
    role: "Design",
    detailImage: "/img/worksdetail-img11.jpg",
    detailImageSp: "/img/worksdetail-img11.sp.jpg",
  },
  {
    id: 12,
    slug: '12',
    title: "スタッフサービス Cheer",
    longDescription: "ここに作品の説明が入ります。このプロジェクトの背景、目的、そして特に工夫した点や技術的な挑戦について詳しく記述してください。",
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
    longDescription: "ここに作品の説明が入ります。このプロジェクトの背景、目的、そして特に工夫した点や技術的な挑戦について詳しく記述してください。",
    image: "/img/works-img13.jpg",
    role: "Design",
    detailImage: "/img/worksdetail-img13.jpg",
    detailImageSp: "/img/worksdetail-img13.sp.jpg",
  },
  {
    id: 14,
    slug: '14',
    title: "SCUNA 12誘導心電図伝送システム",
    longDescription: "ここに作品の説明が入ります。このプロジェクトの背景、目的、そして特に工夫した点や技術的な挑戦について詳しく記述してください。",
    image: "/img/works-img14.jpg",
    role: "Design",
    detailImage: "/img/worksdetail-img14.jpg",
  },
];
