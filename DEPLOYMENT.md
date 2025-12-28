# 総合商社ダッシュボード - デプロイメント手順

このプロジェクトは Next.js + Supabase + Vercel の構成で作成された総合商社向けデータ分析ダッシュボードです。

## 必要な手順

### 1. Supabaseプロジェクトの設定

1. [Supabase](https://supabase.com/)にログインしてプロジェクトを作成
2. SQLエディタで `database-schema.sql` の内容を実行
3. プロジェクト設定から以下の情報を取得：
   - Project URL
   - Anon Key

### 2. 環境変数の設定

`.env.local` ファイルを作成し、以下の変数を設定：

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. ローカルでの動作確認

```bash
# 依存関係のインストール
npm install

# 開発サーバー起動
npm run dev
```

ブラウザで http://localhost:3000 にアクセスしてダッシュボードが正常に表示されることを確認。

### 4. Vercelへのデプロイ

#### オプション A: Vercel CLI

```bash
# Vercel CLI インストール
npm install -g vercel

# デプロイ
vercel

# 環境変数の設定
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
```

#### オプション B: GitHub連携

1. GitHubにリポジトリをプッシュ
2. [Vercel](https://vercel.com/)にログイン
3. 「New Project」からGitHubリポジトリをインポート
4. 環境変数を設定：
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. 「Deploy」をクリック

## 機能

- 売上実績の可視化（四半期別推移）
- 地域別売上分析（円グラフ）
- 商品カテゴリ別業績（棒グラフ）
- KPIダッシュボード（目標達成率）
- レスポンシブデザイン対応

## 技術スタック

- **Frontend**: Next.js 14 (App Router)
- **Backend**: Supabase (PostgreSQL + Real-time API)
- **UI**: Tailwind CSS + Custom Components
- **Charts**: Recharts
- **Hosting**: Vercel

## トラブルシューティング

### データが表示されない場合

1. Supabaseプロジェクトが正しく設定されているか確認
2. 環境変数が正しく設定されているか確認
3. ブラウザの開発者ツールでネットワークエラーをチェック

### ビルドエラーの場合

1. TypeScriptエラーがないか確認：`npm run build`
2. 依存関係を再インストール：`rm -rf node_modules && npm install`

## パフォーマンス最適化

- 自動的にコードスプリッティングが適用
- 画像最適化（Next.js Image component使用）
- TypeScript strictモード有効
- ESLintによる品質チェック