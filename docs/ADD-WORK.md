# 作品の追加マニュアル

このサイトに **Works（制作実績）** や **Study（個人開発）** を追加する手順です。
プログラミングの知識がなくても、この通りに進めれば追加できます。

やることは 2 つだけ。

1. **画像を 1 枚（以上）用意してフォルダに置く**
2. **データファイルに 1 ブロック追記する**

あとは GitHub にアップすれば、数分後に本番サイトへ反映されます。

---

## 0. 事前に用意するもの

| もの | 説明 |
| --- | --- |
| このプロジェクトのフォルダ | `portfolio-site` フォルダ一式（GitHub からダウンロード or クローン済みのもの） |
| テキストエディタ | VS Code 推奨（無料）。メモ帳でも可 |
| 追加する作品の画像 | 後述のサイズで書き出したもの |
| （任意）Node.js | ローカルで見た目を確認したい場合のみ。無くても追加はできる |

---

## 1. 画像を準備する

### 1-1. 必須：サムネイル画像（`image`）

一覧ページのカードと詳細ページの大きい画像に使われます。

| 項目 | 推奨 |
| --- | --- |
| 縦横比 | **3 : 2**（横長）※カードは中央を自動トリミング |
| サイズ | 横 **1500px** 前後（例: 1500 × 1000px） |
| 形式 | JPEG（写真系）または PNG |
| 容量 | 500KB 以下が目安 |

### 1-2. 任意：詳細ページ用のスクリーンショット

詳細ページの下に「プレビュー」枠として表示できます。無くても OK。

| 種類 | 用途 | 推奨サイズ |
| --- | --- | --- |
| PC 版フルスクショ | ページ全体を上から下まで撮ったもの | 横 1440〜1600px（縦は長くて可） |
| スマホ版フルスクショ | スマホ表示のページ全体 | 横 600〜750px（縦は長くて可） |

### 1-3. 任意：紹介動画

`.mp4` 形式。1080p 以下・数 MB に圧縮しておくこと。PC 用・スマホ用を分けられます。

### 1-4. ファイル名を決める

半角英数字とハイフンのみ。既存の命名に合わせると分かりやすいです。

```
サムネイル       … works-img17.jpg
PC フルスクショ  … worksdetail-img17.jpg
スマホフルスクショ… worksdetail-img17.sp.jpg
動画（PC）       … worksdetail-movie17.mp4
動画（スマホ）    … worksdetail-movie17.sp.mp4
```

> 番号は「今ある一番大きい番号 + 1」にしておけば安全です。

---

## 2. 画像をフォルダに置く

- 画像 → `portfolio-site/public/img/` の中
- 動画 → `portfolio-site/public/videos/` の中

にコピーするだけです。

> 置いた後のパスは、データファイルでは先頭に `/` を付けて書きます。
> 例: `public/img/works-img17.jpg` → データ上は `"/img/works-img17.jpg"`

---

## 3. データファイルに追記する

### 3-1. ファイルを開く

- Works（制作実績）を追加 → `portfolio-site/src/data/works.ts`
- Study（個人開発）を追加 → `portfolio-site/src/data/studies.ts`

中身はこうなっています（`works.ts` の例、一部省略）。

```ts
export const worksData: Work[] = [
  {
    id: 1,
    slug: '1',
    title: "一般財団法人 建設業振興基金",
    longDescription: "コーポレートサイトのフロントエンド実装を担当しました。……",
    image: "/img/works-img01.jpg",
    role: "Coding / WordPress",
    externalLink: "https://www.kensetsu-kikin.or.jp/",
  },
  {
    id: 2,
    // …次の作品…
  },
];   ← この閉じカッコの「手前」に新しいブロックを足す
```

### 3-2. 雛形をコピーして貼り付ける

**一番上（＝一覧の先頭）に出したい場合**は `[` のすぐ下に、
**一番下に出したい場合**は最後の `},` と `];` の間に、次のブロックを貼り付けます。

```ts
  {
    id: 17,
    slug: "17",
    title: "ここに作品名",
    longDescription:
      "ここに説明文。改行したいところには \\n を入れる。\n\nこのように空行も作れます。",
    image: "/img/works-img17.jpg",
    role: "Coding",
    externalLink: "https://example.com/",
  },
```

> ⚠️ 貼り付けた後、**前のブロックの末尾に `,`（カンマ）があるか**必ず確認してください。
> `{ … }` と `{ … }` の間はカンマで区切ります。

### 3-3. 各項目の書き換え方

| 項目 | 必須 | 書き方・注意 |
| --- | :-: | --- |
| `id` | ✅ | **他とかぶらない数字**。普通は「今ある最大の数字 + 1」。画面には出ません。 |
| `slug` | ✅ | URL の末尾になる文字列。**他とかぶらない**。半角英数字とハイフンのみ（例 `"17"` や `"rohto-lp"`）。 |
| `title` | ✅ | 作品名。一覧・詳細・ブラウザのタブに出ます。 |
| `longDescription` | ✅ | 詳細ページの本文。改行は `\n`（バックスラッシュ + n）。冒頭 120 文字が検索結果の説明文に使われます。 |
| `image` | ✅ | 手順 2 で置いた画像のパス。`/img/` から始める。 |
| `role` | ✅ | 肩書き。**フィルターに載せるには "Design" か "Coding" を含めること**。<br>例: `"Design"` / `"Coding"` / `"Coding / WordPress"` / `"Design / Coding"` |
| `externalLink` | 任意 | 公開サイトの URL。**必ず `https://` から**。無いなら**この行ごと削除**する。 |
| `detailImage` | 任意 | PC 版フルスクショのパス。例 `"/img/worksdetail-img17.jpg"` |
| `detailImageSp` | 任意 | スマホ版フルスクショのパス。例 `"/img/worksdetail-img17.sp.jpg"` |
| `movie` | 任意 | PC 用動画のパス。例 `"/videos/worksdetail-movie17.mp4"` |
| `movieSp` | 任意 | スマホ用動画のパス。例 `"/videos/worksdetail-movie17.sp.mp4"` |

**任意の項目は「使うときだけ書く」**。使わない項目は行ごと消してください（空文字 `""` を入れない）。

### 3-4. 例：フルスクショ付きのデザイン案件

```ts
  {
    id: 18,
    slug: "18",
    title: "〇〇株式会社 採用サイト",
    longDescription:
      "採用サイトのデザインを担当しました。信頼感を伝えるため青を基調に……",
    image: "/img/works-img18.jpg",
    role: "Design",
    externalLink: "https://recruit.example.co.jp/",
    detailImage: "/img/worksdetail-img18.jpg",
    detailImageSp: "/img/worksdetail-img18.sp.jpg",
  },
```

### 例：Study（個人開発）を追加

`src/data/studies.ts` の `studiesData` に、同じ形式で追記します。
`role` は自由記述で OK（Study 一覧にはフィルターが無いため）。例: `"Next.js / React"`。

```ts
  {
    id: 2,
    slug: "2",
    title: "〇〇管理アプリ",
    longDescription:
      "△△のために作った個人開発アプリです。Next.js / React / TypeScript で……",
    image: "/img/study-img02.jpg",
    role: "Next.js / React",
    externalLink: "https://my-app.vercel.app/",
  },
```

---

## 4. ローカルで確認する（任意・推奨）

Node.js が入っていれば、アップ前に手元で見た目を確認できます。

```bash
cd portfolio-site
npm install       # 初回のみ
npm run dev
```

ブラウザで <http://localhost:3000/works> を開いて、

- [ ] 一覧に新しいカードが出ている
- [ ] カードをクリックすると詳細ページが開く
- [ ] 画像が表示される（真っ白／グレーなら画像パスかファイル名ミス）
- [ ] 説明文の改行が意図通り

を確認します。止めるときはターミナルで `Ctrl + C`。

> エラーが赤い画面で出たら、たいていは **カンマの付け忘れ**か**クォート（`"`）の閉じ忘れ**です。手順 3-2 の注意書きを見直してください。

---

## 5. GitHub にアップする（本番反映）

`main` ブランチに変更を送ると、Vercel が自動でビルドして数分で本番に反映されます。

### 方法 A：コマンドで送る

```bash
cd portfolio-site
git checkout -b add-work-17        # 作業用ブランチを作る
git add public/img/works-img17.jpg src/data/works.ts
git commit -m "作品追加: 〇〇株式会社 採用サイト"
git push -u origin add-work-17
```

その後 GitHub 上で Pull Request を作成 →「Merge」。`main` に入った時点で本番反映が始まります。

（直接 `main` に push できる運用なら、1 行目の `git checkout -b ...` を飛ばして `main` のまま `add → commit → push` で OK。）

### 方法 B：GitHub のサイト上で編集する

1. GitHub でリポジトリを開く。
2. `public/img/` に入り **「Add file」→「Upload files」** で画像をアップ。
3. `src/data/works.ts` を開き、鉛筆アイコン（Edit）で手順 3 の追記をする。
4. ページ下部 **「Commit changes」** で保存（`main` に直接、またはブランチ + PR）。

### 反映の確認

- Vercel のダッシュボードで最新デプロイが **Ready** になったら完了。
- 本番サイトの `/works`（または `/studies`）を再読み込みして確認。
- 本番が Basic 認証つきの場合は、設定済みの ID / パスワードが必要です。

---

## 6. 困ったとき

| 症状 | 原因と対処 |
| --- | --- |
| ビルド／`npm run dev` が赤いエラー | カンマ抜け・クォート閉じ忘れ・波カッコ `{}` の対応ミス。追記部分を見直す。 |
| カードは出るが画像がグレー／出ない | `image` のパス綴り間違い、または画像を `public/img/` に置き忘れ。大文字小文字も区別される。 |
| 「サイトを見る」ボタンが出したいのに出ない | `externalLink` が無い、または `https://` が抜けている。 |
| 詳細ページに「プレビュー」枠が出ない | `detailImage` / `detailImageSp` / `movie` / `movieSp` が 1 つも無いと枠自体が出ない仕様（正常）。 |
| 新しい作品ページが 404 | 本番はビルド時にページを作るため、デプロイ完了前は 404。Vercel が Ready になるまで待つ。`slug` の重複でも起きる。 |
| トップページに出ない | トップは各カテゴリ**先頭 4 件**のみ表示。5 番目以降は `/works` `/studies` の一覧のみ。 |
| 並び順を変えたい | `works.ts` / `studies.ts` の**配列の並び順**がそのまま表示順。ブロックごと上下に移動する。`id` の数字は順不同で OK。 |

---

## 7. 追加チェックリスト

- [ ] 画像を `public/img/`（動画は `public/videos/`）に置いた
- [ ] `id` は他とかぶっていない数字
- [ ] `slug` は他とかぶっていない・半角英数字
- [ ] `image` のパスがファイル名と一致（`/img/` 始まり）
- [ ] `role` に `Design` か `Coding` を含めた（Works の場合／フィルター表示したいとき）
- [ ] `externalLink` は `https://` 付き、不要なら行ごと削除
- [ ] 任意項目は使う分だけ記載（空文字を残さない）
- [ ] 直前のブロックの末尾に `,` がある
- [ ] （できれば）`npm run dev` で表示確認した
- [ ] GitHub の `main` に反映し、Vercel が Ready になった

---

技術的な詳細は [SPEC.md](./SPEC.md) を参照してください。
