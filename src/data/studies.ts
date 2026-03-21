export interface Study {
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

export const studiesData: Study[] = [
  {
    id: 1,
    slug: '1',
    title: "野球観戦記録アプリ",
    longDescription: "ユーザー名：baseball-app\nパスワード：auZPA9cF\n\nプロ野球ファン(自分)のための、データ連動型観戦記録Webアプリケーションです。単なるメモ帳ではなく、公式サイト（npb.jp）から試合結果を自動取得し、自身の観戦データと紐付けることで、応援球団の観戦勝率などをリアルタイムに可視化します。next.js・react・TypeScriptなどモダンな技術の勉強をするためにGemini CLIというAIを使用しながら開発しました。バックエンドにはsupabaseを採用しております。",
    image: "/img/study-img01.jpg",
    role: "next.js / react",
    externalLink: "https://baseball-app-mu.vercel.app//",
  },

];
