# コード仕様書 — Kohei's Portfolio

Next.js 16（App Router）で構築したポートフォリオサイトの技術仕様です。
作品の追加手順だけを知りたい場合は [作品の追加マニュアル](./ADD-WORK.md) を参照してください。

- 最終更新: 2026-09-04
- リポジトリ: `h-ko2u1he6i1/portfolio_next`（デプロイルートはこの `portfolio-site/` ディレクトリ）
- 本番: Vercel（`main` ブランチへの push で自動デプロイ）

---

## 1. 全体像

| 項目 | 内容 |
| --- | --- |
| フレームワーク | Next.js 16.1.6（App Router / Turbopack） |
| 言語 | TypeScript 5、React 19.1.0 |
| スタイル | グローバル CSS（`globals.css`）＋ CSS Modules。CSS 変数でトークン管理 |
| アニメーション | CSS 主体のリビール＋ `motion`（Framer Motion）＋ WebGL（three.js / R3F）ヒーロー背景 |
| データ | TS ファイルにベタ書き（`src/data/*.ts`）。CMS・DB なし |
| 認証 | Basic 認証（`src/proxy.ts`、環境変数で ON/OFF） |
| ホスティング | Vercel。画像は `next/image` で最適化、動画は `public/videos/` を直配信 |
| Node | v20 以上（開発時は v24 系で確認） |

**設計思想**

- **コンテンツはコード**。作品追加はデータ配列に 1 要素足すだけで、一覧・詳細・sitemap すべてに反映される。
- **JS が無くても本文は見える**。リビール演出は `<html>` に `.js` が付いたときだけ有効化する（後述）。
- **1 つのカードコンポーネントを使い回す**。Works と Study は同じ型・同じ UI を共有する。

---

## 2. ディレクトリ構成

```
portfolio-site/
├── docs/                     … 本ドキュメント群
├── public/
│   ├── img/                  … 作品サムネイル・詳細スクショ・プロフィール写真
│   └── videos/               … 作品紹介動画（mp4）
├── src/
│   ├── app/                  … App Router のルート定義
│   │   ├── layout.tsx        … 全ページ共通の <html>/<body>・フォント・メタデータ
│   │   ├── globals.css       … デザイントークン＋共通ユーティリティ＋アニメーション定義
│   │   ├── page.tsx          … トップページ（/）
│   │   ├── about/page.tsx    … About（/about）
│   │   ├── works/
│   │   │   ├── page.tsx          … Works 一覧（/works）
│   │   │   ├── page.module.css   … Works 一覧だけのレイアウト上書き
│   │   │   └── [slug]/page.tsx   … Works 詳細（/works/:slug）
│   │   ├── studies/
│   │   │   ├── page.tsx          … Study 一覧（/studies）
│   │   │   └── [slug]/page.tsx   … Study 詳細（/studies/:slug）
│   │   ├── not-found.tsx     … 404
│   │   ├── sitemap.ts        … /sitemap.xml を動的生成
│   │   └── robots.ts         … /robots.txt を生成
│   ├── components/
│   │   ├── layout/           … Header / Footer / HamburgerMenu / navLinks
│   │   ├── common/           … Logo, Kicker, SplitText, SectionTitle, PageIntro,
│   │   │                       Reveal, Button, SkillList, skillIcons
│   │   ├── home/             … HeroBackground(+Scene), HeroContent, FeaturedSection
│   │   └── works/            … WorkCardGrid, WorkCardItem, WorksBrowser, WorkDetail
│   ├── data/
│   │   ├── works.ts          … 制作実績の配列（worksData）
│   │   └── studies.ts        … 個人開発の配列（studiesData）
│   ├── hooks/                … useReveal, useHeroTilt, useReducedMotion
│   ├── types/portfolio.ts    … PortfolioItem 型（Works / Study 共通）
│   └── proxy.ts              … Basic 認証ミドルウェア（Next 16 での middleware の別名）
├── next.config.ts
├── eslint.config.mjs
├── .env.example              … 環境変数のテンプレート
└── README.md
```

パスエイリアス: `@/*` → `src/*`（`tsconfig.json`）。

---

## 3. ルーティング

| URL | ファイル | 生成方式 | 内容 |
| --- | --- | --- | --- |
| `/` | `app/page.tsx` | 静的 | ヒーロー＋ Works 抜粋 4 件＋ Study 抜粋 4 件 |
| `/about` | `app/about/page.tsx` | 静的 | プロフィール文とスキル一覧 |
| `/works` | `app/works/page.tsx` | 静的 | 全実績＋ Design / Coding フィルター |
| `/works/[slug]` | `app/works/[slug]/page.tsx` | SSG（`generateStaticParams`） | 実績の詳細 |
| `/studies` | `app/studies/page.tsx` | 静的 | 全個人開発 |
| `/studies/[slug]` | `app/studies/[slug]/page.tsx` | SSG | 個人開発の詳細 |
| `/sitemap.xml` | `app/sitemap.ts` | 動的（データ由来） | 静的 4 ページ＋全 works/studies URL |
| `/robots.txt` | `app/robots.ts` | 動的 | 全許可＋ sitemap 参照 |
| （それ以外） | `app/not-found.tsx` | — | 404 |

- 詳細ページは**ビルド時に全件生成**される。データを足したら再ビルド（＝ push して Vercel が再デプロイ）が必要。
- `[slug]` に一覧へ存在しない値が来たら `notFound()` で 404。

---

## 4. データモデル

### 4.1 型定義（`src/types/portfolio.ts`）

```ts
export interface PortfolioItem {
  id: number;                 // 一意の識別子（React key に使用。画面には出ない）
  slug: string;               // URL の末尾（/works/<slug>）。一意・URL セーフ
  title: string;              // 作品名。一覧カード・詳細見出し・OGP タイトル
  longDescription: string;    // 詳細ページの本文。"\n" は改行(<br>)になる
  image: string;              // メイン画像。"/img/xxx.jpg"（public 基準の絶対パス）
  role: string;               // 肩書き。"Design" / "Coding" / "Coding / WordPress" 等
  externalLink?: string;      // 公開 URL（https:// 必須）。あると「サイトを見る」ボタン表示
  detailImage?: string;       // 詳細ページの縦長フルスクショ（PC）
  detailImageSp?: string;     // 同（スマホ）
  movie?: string;             // 紹介動画 mp4（PC）
  movieSp?: string;           // 同（スマホ）
}
```

`Work` と `Study` はどちらも `PortfolioItem` の別名（`src/data/works.ts` / `studies.ts`）。

### 4.2 各フィールドの扱い

| フィールド | 必須 | 使われ方 / 注意 |
| --- | :-: | --- |
| `id` | ✅ | 配列内で重複させない。重複すると React の key 警告＋描画不整合。 |
| `slug` | ✅ | `/works/<slug>` の URL になる。重複禁止。日本語や空白は避け、半角英数字とハイフンを推奨（現状は `"1"`〜`"16"` の連番）。 |
| `title` | ✅ | 一覧カード見出し、詳細 `<h1>`、`<title>`、OGP に使用。 |
| `longDescription` | ✅ | 詳細本文。`\n`（バックスラッシュ n）で改行。冒頭 120 文字が meta description / OGP description に自動転用される。 |
| `image` | ✅ | 一覧カード（**3:2 で中央トリミング**）、詳細カバー（原寸表示・約 12% 拡大）、動画のポスター、OGP 画像。パスは `/img/...` から始める。ファイルが無いとビルド/描画エラー。 |
| `role` | ✅ | 一覧カードと詳細の "Role" 行に表示。**Works 一覧のフィルターは `role` に "design" / "coding" が含まれるかで判定**（大文字小文字問わず）。例: `"Coding / WordPress"` は Coding に該当。`"Design"` は Design に該当。 |
| `externalLink` | — | **`https://` から始まる絶対 URL のみ**（`new URL()` でパースするため不正だとビルド時エラー）。設定すると詳細ページに Link 行と「サイトを見る」ボタンが出る。 |
| `detailImage` / `detailImageSp` | — | 詳細ページ下部の「プレビュー」枠。縦長スクショ可（枠内が縦スクロールする、最大 78vh）。PC 用は横 1440〜1600px、SP 用は横 600〜750px 目安。 |
| `movie` / `movieSp` | — | `public/videos/` の mp4。`controls / muted / loop / playsInline / preload="none"`、ポスターは `image`。 |

`detailImage` / `detailImageSp` / `movie` / `movieSp` の**いずれか 1 つでもあると**詳細ページに「プレビュー」セクションが表示される（順に Desktop 画像 → Mobile 画像 → Desktop 動画 → Mobile 動画）。

### 4.3 表示順とデータフロー

```
src/data/works.ts (worksData 配列)
        │
        ├─▶ /            … worksData.slice(0, 4)  … 配列の先頭 4 件
        ├─▶ /works       … worksData 全件（配列順）＋ role でフィルター
        ├─▶ /works/:slug … worksData.find(slug 一致)
        └─▶ /sitemap.xml … worksData 全件の URL

src/data/studies.ts (studiesData 配列) も同じ構造（フィルターUIは無し）
```

- **配列の並び順 = 画面の表示順**。先頭に置いた作品ほど上（トップページは先頭 4 件のみ）。
- `id` は順不同でよい（現状 works.ts は `1,2,3,4,16,15,5,6,...` と並ぶ）。表示順は配列位置で決まる。

---

## 5. コンポーネント

### 5.1 レイアウト（`components/layout/`）

| コンポーネント | 種別 | 役割 |
| --- | --- | --- |
| `Header` | Server | ロゴ＋PC ナビ＋（モバイル時）`HamburgerMenu`。 |
| `Footer` | Server | ロゴ（`size="lg"`）＋肩書き＋ナビ＋コピーライト（年は自動）。 |
| `HamburgerMenu` | Client | モバイル用オーバーレイ。`createPortal` で `document.body` 直下に描画（親の `backdrop-filter` に閉じ込められないため）。`Esc` と本文スクロールロック対応。開閉トグルは 2 本線 → ×。 |
| `navLinks.ts` | — | ナビの単一ソース（About / Works / Study）。Header・Footer・HamburgerMenu が共有。 |

### 5.2 共通 UI（`components/common/`）

| コンポーネント | 種別 | 役割 / API |
| --- | --- | --- |
| `Logo` | Server | 「HK」モノグラム（シアン→ピンクのグラデタイル）＋ワードマーク。`size?: "sm" \| "lg"`、`wordmark?: string`（`""` でマークのみ）。 |
| `Kicker` | Server | 見出し上の英字ラベル（＝ eyebrow）。左のグラデ棒と文字が左→右にワイプイン。`state`（`"is-in"` で発火）、`delay?`。 |
| `SplitText` | Server | 1 文字ずつマスクめくりで出す見出しテキスト。表示用は `aria-hidden`、別に `.sr-only` のプレーンコピーを併記（読み上げ・no-JS 対策）。`text`、`state`、`startDelay?`、`stagger?`。 |
| `SectionTitle` | Client | `useReveal` ＋ `Kicker` ＋ `SplitText` をまとめた `<h2>`（`as` で `h1` も可）。トップや一覧セクションの見出し。 |
| `PageIntro` | Client | ページ冒頭の `<h1>`（`page-title`）＋ kicker ＋任意の `lede`。About / Works / Study / 404 で使用。 |
| `Reveal` | Client | 子要素を「下から出る」リビールでラップ。`delay?`、`y?`、`className?`。内部で `useReveal`。 |
| `Button` | Server | `href` が `/` 始まりなら `<Link>`、外部 URL なら `<a>`、無ければ `<button>`。`variant: "primary" \| "secondary"`、矢印アイコン付き。 |
| `SkillList` | Client | カテゴリ配列 `groups: {label, skills[]}[]` を受け取りアイコングリッド表示。アイコンは `skillIcons.ts` の SVG パス、無いものは `Xd/Ps/Ai` の文字。ホバー演出なし。 |
| `skillIcons.ts` | — | `SKILL_ICON_PATHS`（HTML/CSS/Sass/JS/TS/React/Next.js/PHP/WordPress/Gulp/Git/Figma/Claude Code）と `SKILL_MONOGRAMS`（Adobe XD/Photoshop/Illustrator）。 |

### 5.3 Works / Study（`components/works/`）

| コンポーネント | 種別 | 役割 |
| --- | --- | --- |
| `WorkCardGrid` | Server | `PortfolioItem[]` を受け取りカードを `.card-grid` に並べる。`hrefBase`（`"/works"` 等）、`half`（デスクトップ 2 列固定）、`priority`（先頭 2 枚を eager 読み込み）、`className`（gap 上書き）。各カードは `Reveal` で段階表示。 |
| `WorkCardItem` | Client | 1 枚のカード。`motion` のホバー variants（画像 1.06 倍・タイトル色変化・矢印スライドイン）。画像枠は `aspect-ratio: 3/2`・`object-fit: cover`。 |
| `WorksBrowser` | Client | `/works` 専用。`All / Design / Coding` のフィルターピル（件数バッジ、`aria-pressed`、`aria-live` で結果件数を通知）＋ `WorkCardGrid`。判定は `role.toLowerCase().includes("design"/"coding")`。 |
| `WorkDetail` | Client | Works・Study 共通の詳細ビュー。kicker ＋ タイトル ＋ Role/Link の `<dl>` ＋ 本文 ＋ カバー画像（スクロール連動パララックス）＋ プレビュー（画像/動画）＋ CTA ボタン。`item`、`kicker`、`backHref`、`backLabel`。 |

### 5.4 ホーム（`components/home/`）

| コンポーネント | 種別 | 役割 |
| --- | --- | --- |
| `HeroContent` | Client | ヒーローのテキスト。`LINES = ["Kohei's", "Portfolio"]` を 1 文字ずつ出し、`useHeroTilt` でカーソル追従の微パララックス。 |
| `HeroBackground` | Client | WebGL シーンのラッパー。`IntersectionObserver` で画面外なら描画を止める（`frameloop`）。`prefers-reduced-motion` 時は何も描画しない。 |
| `HeroBackgroundScene` | Client | `@react-three/fiber` の `<Canvas>`。フルスクリーン矩形にフラグメントシェーダ（value-noise fbm ＋ドメインワープ＋シアン/ピンクの周回する色ソース）。`dpr` は 0.65〜1.1、`powerPreference: "low-power"`、カーソルで色ソースが動く。 |
| `FeaturedSection` | Server | トップの「Works」「Study」抜粋ブロック（`SectionTitle` ＋ `WorkCardGrid half` ＋ 一覧への `Button`）。 |

---

## 6. スタイルシステム

### 6.1 トークン（`globals.css` の `:root`）

- **カラー**: `--paper` `--paper-dim` `--surface` / `--ink` `--ink-muted` `--ink-faint` / `--line` `--line-strong`。
- **アクセント**: `--accent`（#17b6ea 水色）、`--accent-ink`（#0098d4 濃）、`--accent-soft`、`--accent-pink`（#ff6bd0）。グラデは水色→ピンク。
- **タイプスケール**: `--text-xs`〜`--text-4xl`（大きいものは `clamp()` で可変）。本文は `body { font-size: 1.0625rem; line-height: 1.75 }`。
- **スペース**: `--space-1`〜`--space-32`。
- **その他**: `--radius: 2px`、`--ease: cubic-bezier(0.2,0,0,1)`、フォント変数、`--container: 1160px` / `--container-narrow: 760px`。

### 6.2 レイアウトプリミティブ

| クラス | 用途 |
| --- | --- |
| `.container` | 中央寄せ・最大幅 `--container`・左右パディング可変。`.container--narrow` で 760px。 |
| `.section` | 上下パディング `clamp(4rem, 10vw, 8rem)`。`.section--center` で中央寄せ。 |
| `.card-grid` | 1 → 2（≥720px）→ 3 列（≥1080px）。`.card-grid--half` はデスクトップも 2 列維持。 |
| `.kicker` / `.kicker::before` / `.kicker-text` | eyebrow ラベルとグラデ棒、ワイプ演出。 |
| `.page-title` / `.lede` | ページ見出しとリード文。 |
| `.button-wrapper` | CTA ボタンの並び（`margin-top` 込み）。 |
| `.split` / `.char` / `.char-line` / `.char-mask` | 1 文字リビールの土台。 |
| `.reveal` / `.is-in` | 汎用リビール（下記）。 |
| `.sr-only` / `.skip-link` | アクセシビリティ。 |

### 6.3 CSS Modules

- コンポーネント固有のスタイルは同名 `.module.css`。
- `/works` のみコンテナを 1280px に広げるなど、ページ単位の上書きは `app/works/page.module.css` のように**スコープを絞った Module** で行う（グローバルの `--container` は変えない）。

---

## 7. アニメーションシステム

### 7.1 リビール（CSS 主体）

**キモ: コンテンツはデフォルトで見えている。** `layout.tsx` のインライン `<script>` が `<html>` に `.js` クラスを付けた場合のみ、`globals.css` の `.js .reveal { opacity:0 }` が効いて「隠してから出す」状態になる。

```
1. サーバーは reveal 要素を通常表示で返す（JS 無し／読み込み失敗でも本文が見える）
2. クライアントで <script> が <html>.classList.add('js')
3. useReveal（IntersectionObserver）が可視判定したら要素に is-in を付与 → CSS transition で表示
4. 保険: 1500ms 経っても未発火なら強制的に is-in（バックグラウンドタブ対策）
5. prefers-reduced-motion 時は transition を無効化し即表示
```

- `useReveal<T>()` … `[ref, inView]` を返す。`threshold: 0.15`、`rootMargin: "0px 0px -8% 0px"`、1500ms フォールバック。
- `Reveal` … これをラップした汎用コンポーネント（`delay` / `y` / `className`）。
- 1 文字めくり（`SplitText` / `HeroContent`）… `.char` を `translateY(115%) rotate(7deg)` から `none` へ。`--reveal-delay` を 1 文字ずつずらしてスタッガー。
- `Kicker` … グラデ棒 `scaleX(0→1)`、ラベル `clip-path: inset(0 100% 0 0) → inset(0)` の左→右ワイプ。

### 7.2 motion（Framer Motion）を使っている箇所

- `WorkCardItem` … ホバー variants（画像ズーム／タイトル色／矢印）。
- `WorkDetail` … `useScroll` / `useTransform` でカバー画像の縦パララックス。
- `HamburgerMenu` … `AnimatePresence` のオーバーレイ、リンクの段階表示。

いずれも `useReducedMotion()` を尊重。

### 7.3 ヒーロー背景（WebGL）

- three.js + `@react-three/fiber`。フルスクリーン矩形＋フラグメントシェーダのみ（3D メッシュなし）。
- 画面外／`prefers-reduced-motion` で停止。低負荷設定（`dpr` 上限 1.1、`antialias:false`、`low-power`）。
- `HeroBackground.module.css` の固定レイヤーとして敷き、`globals.css` の `.site-content` グラデーションで「紙が上にせり上がる」ように境界を溶かしている。

### 7.4 その他フック

- `useHeroTilt` … カーソル位置で `--tilt-x/y/r` を更新（タッチ・reduced-motion では無効）。
- `useReducedMotion` … `useSyncExternalStore` ベースの SSR セーフ版。サーバーでは常に `false`。

---

## 8. 画像・動画

- 画像は `public/img/`、動画は `public/videos/` に置き、データからは `/img/...` `/videos/...` で参照。
- 画像は原則 `next/image` 経由（`next.config.ts` で AVIF / WebP 生成）。**Basic 認証のミドルウェア対象から `/img/` `/videos/` は除外済み**（`src/proxy.ts` の matcher）。
- 目安サイズ:
  - 一覧サムネイル用 `image`: 横 1500px 前後、**3:2**（例 1500×1000）、JPEG。
  - 詳細フルスクショ `detailImage`（PC）: 横 1440〜1600px、縦は長くて可。
  - `detailImageSp`（SP）: 横 600〜750px。
  - 動画: できるだけ 1080p 以下・数 MB に圧縮。大きい場合は外部配信（Vercel Blob 等）を検討。
- macOS でのリサイズ例: `sips --resampleWidth 1500 input.jpg --out public/img/works-imgXX.jpg`

> ローカルで `next start` すると `next/image` の最適化が環境依存で失敗し画像が出ないことがあるが、Vercel 上では問題なし（既知の挙動）。

---

## 9. Basic 認証（`src/proxy.ts`）

- Next 16 では middleware が `proxy.ts` / `export function proxy` という名前に変わっている。
- `BASIC_AUTH_USER` と `BASIC_AUTH_PASSWORD` の**両方が設定されている時だけ** 401 を返す。どちらか空なら素通し（設定漏れで全面ロックしないため）。
- matcher 除外: `api` / `_next/static` / `_next/image` / `favicon.ico` / `img/` / `videos/` / `sitemap.xml` / `robots.txt`。

---

## 10. SEO / メタデータ

- `app/layout.tsx` … サイト共通の `metadata`（`metadataBase` は `NEXT_PUBLIC_SITE_URL`、`title.template = "%s — Kohei's Portfolio"`、OGP）。
- 詳細ページ … `generateMetadata` で `title` = 作品名、`description` = `longDescription` 冒頭 120 文字、OGP 画像 = `image`。
- `app/sitemap.ts` / `app/robots.ts` … データと `NEXT_PUBLIC_SITE_URL` から動的生成。

---

## 11. 環境変数（`.env.example` 参照）

| 変数 | 用途 | 例 |
| --- | --- | --- |
| `BASIC_AUTH_USER` | Basic 認証ユーザー名（空で認証なし） | `kohei` |
| `BASIC_AUTH_PASSWORD` | Basic 認証パスワード（空で認証なし） | `********` |
| `NEXT_PUBLIC_SITE_URL` | 正規 URL。metadata / sitemap / robots に使用 | `https://example.com` |

ローカルは `.env.example` を `.env.local` にコピーして設定。`.env*` は `.env.example` を除き Git 管理外。

---

## 12. スクリプト

```bash
npm run dev     # 開発サーバー（Turbopack）http://localhost:3000
npm run build   # 本番ビルド（全詳細ページを静的生成）
npm run start   # ビルド成果物を配信
npm run lint    # ESLint（eslint-config-next）
```

型チェック単体は `npx tsc --noEmit`。

---

## 13. デプロイ（Vercel）

1. Project の **Root Directory** を `portfolio-site` に設定。
2. **Environment Variables** に上記 3 つを Production / Preview 両方へ登録。
   - Basic 認証を使わないなら `BASIC_AUTH_*` は未設定でよい。
   - `NEXT_PUBLIC_SITE_URL` は本番ドメイン。
3. `main` へ push → 自動ビルド & デプロイ。プレビューは PR / 他ブランチで自動発行。

---

## 14. 既知の注意点・ハマりどころ

- **データを足したら再デプロイが必要**。詳細ページはビルド時生成のため、`main` に反映されるまで新 URL は 404。
- `slug` / `id` の重複は不具合のもと。追加時は必ずユニークに。
- `externalLink` は `https://` を必ず含める（`http://` でも可だがスキームは必須）。省略時はキー自体を書かない。
- `longDescription` の改行は文字列内の `\n`。エディタで実際に改行しても JS 文字列としては無効なのでテンプレートリテラル（バッククォート）を使う場合は実改行 OK、通常のダブルクォートなら `\n`。
- 画像・動画のパスは**必ず `/` 始まり**（`public/` を基準にした絶対パス）。`./img/...` は不可。
- `next start` のローカル画像最適化問題は環境依存。確認は `npm run dev` か Vercel Preview で。
- `~/.git`（ホーム直下に誤って作られた空リポジトリ）には触らない。作業対象は `portfolio-site/`。

---

## 15. 参考

- 作品・個人開発の追加手順 → [ADD-WORK.md](./ADD-WORK.md)
- 開発の起動やデプロイ概要 → [../README.md](../README.md)
