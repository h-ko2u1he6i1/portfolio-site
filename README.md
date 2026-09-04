# Kohei's Portfolio

Next.js 16 (App Router) 製のポートフォリオサイト。

## ドキュメント

- [docs/SPEC.md](docs/SPEC.md) — コード仕様書（構成・データモデル・アニメーション・デプロイ）
- [docs/ADD-WORK.md](docs/ADD-WORK.md) — 作品／個人開発の追加マニュアル（非エンジニア向け）
- [public/guide.html](public/guide.html) — 上記 2 つをまとめた閲覧用の 1 枚 HTML（配布用）。
  ファイルを直接ブラウザで開くか、デプロイ後は `https://<ドメイン>/guide.html`
  （Basic 認証がかかっている場合はその ID / パスワードが必要）。
  内容を変えるときは `docs/*.md` を直し、この HTML にも反映する。

## 開発

```bash
npm install
npm run dev
```

http://localhost:3000 を開く。

## 環境変数

`.env.example` をコピーして `.env.local` を作成する。

| 変数 | 用途 |
| --- | --- |
| `BASIC_AUTH_USER` / `BASIC_AUTH_PASSWORD` | サイト全体の Basic 認証（`src/proxy.ts`）。両方空にすると認証なしで配信される。 |
| `NEXT_PUBLIC_SITE_URL` | 正規 URL。metadata / sitemap.xml / robots.txt に使用。 |

## Vercel へのデプロイ

1. **Root Directory** を `portfolio-site` に設定（このリポジトリのルート）。
2. Project → Settings → Environment Variables に上記3つを **Production / Preview** 両方へ登録。
   - Basic 認証を使う場合のみ `BASIC_AUTH_*` を設定。公開後に外すなら削除するだけでよい。
   - `NEXT_PUBLIC_SITE_URL` は本番ドメイン（例 `https://example.com`）。
3. `main` ブランチへ push すると自動デプロイ。

## メモ

- 画像は `public/img/` に配置し `next/image` 経由で最適化。長辺の大きい画像は
  ビルド前に幅を 1600px 程度へ縮小しておくこと。
- 動画は `public/videos/`。サイズが大きい場合は Vercel Blob 等の外部配信を検討。
- `src/data/works.ts` / `src/data/studies.ts` を編集すると一覧・詳細・sitemap に反映される。
