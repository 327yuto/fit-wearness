# Fit-wearness（フィットウェアネス）
**FitnessとFashionを楽しみたい方に向けた、コーディネート投稿SNSです。**

**URL: https://web.fit-wearness.com  (TOPページから、ゲストログインできます)**

<p align="center">
  <img src="https://user-images.githubusercontent.com/78023458/212503515-66b0f47b-29d4-46db-9258-a3759bdc808e.png" />
</p>


# サービスの概要と背景
## どのようなサービスか
「Fitness」と「Fashion」を楽しみたい方に向けた、コーデ投稿SNSです。

## このサービスのターゲット
* フィットネスとファッションが好きな方
* オシャレなフィットネスコーディネートに出会いたい方

## このサービスで解決できるユーザーが抱える課題
下記2つの課題に注目しました。（自身の体験から）<br>
①: フィットネスを始めたいが,"オシャレじゃない"と思われるファッションはしたくない。<br>
②: 他の人のフィットネスコーディネートを見たい、オシャレを共有したい。<br>

# 使用技術概略(詳細後述) 
## 構成<br>
``Rails × React (完全SPA) + ECS Fargate``<br>
## 技術<br>
**Back End:** ``Ruby on Rails ( APIモード ), MySQL, Nginx, AWS( S3 )``<br>
**Front End:**``React ( JavaScript )``<br>
**Infra:**    ``Docker / Docker-Compose, AWS ( ECS Fargate / ECR / ALB / RDS / S3 / CloudFront / Route53 / VPC / ACM )``<br>
**Other:**    ``CircleCI(※HEROKUデプロイ時のみ使用)``<br>


# 画面一覧

**■TOP画面**
<p align="center">
  <img src="https://user-images.githubusercontent.com/78023458/212519664-36b29def-e750-4756-b60b-55faed5ae7c8.png" />
</p>
<br>
<p align="center">
  <img src="https://user-images.githubusercontent.com/78023458/212520012-a47288ae-d09b-4c3a-97fa-4ebe26728d16.png" />
</p>
<br>
<p align="center">
  <img src="https://user-images.githubusercontent.com/78023458/212520069-160ce675-f1c2-4144-82b8-9e392e52fcac.png" />
</p>
<br>
<p align="center">
  <img src="https://user-images.githubusercontent.com/78023458/212520080-7873a84c-4c35-40fb-a6c4-ce280d2dd14c.png" />
</p>
<p align="center">
  <img src="https://user-images.githubusercontent.com/78023458/212520193-918cf1ad-fa4c-4ed3-8f0b-e969539965d7.png" width="500" />
</p>

# インフラ構成図
<br>
<p align="center">
  <img src="https://user-images.githubusercontent.com/78023458/212521390-2f377f0b-0c7e-4553-9860-186f7bf04843.png" />
</p>

# ER図
<br>
<p align="center">
  <img src="https://user-images.githubusercontent.com/78023458/212521351-334bfc93-1662-41c9-958c-8ef7929b18eb.png" />
</p>

# 機能一覧
- アカウント作成、ログイン、ログアウト機能
  - メールでの本認証
- ゲストログイン機能（一部機能制限あり）
- プロフィール編集機能
  - プロフィール画像登録
  - プロフィール内容
- 投稿作成機能
  - 画像の投稿
- 投稿削除機能
- いいね機能
- レスポンシブ対応(一部非対応)

# 使用技術詳細
## Back End
- ``Ruby 2.7.6``
- ``Ruby on Rails　6.1.4``
- ``Nginx``
### 主要gem
- ``devise / devise_token_auth`` : トークン認証, メールでの本認証
- ``carrierwave / fog-aws`` : AWSへのファイルアップロード
- ``rspec`` : テストフレームワーク
- ``pry-byebug`` : デバッグ

## Front End
- ``React 17.0.2``
- ``JavaScript``
- ``creat-react-app``
### 主要パッケージ
- ``material-ui V4`` : UIコンポーネントライブラリ
- ``chakra-ui V1`` : UIコンポーネントライブラリ
- ``React Router V5`` : UIとURLを同期
- ``Axios``: PromiseベースのHTTPクライアント

## Infra
### ``Docker / Docker Compose``
開発環境をコンテナ化（Rails,Nginx,MySQL,React）

### ``AWS``
- ``ECS Fargate``: Rails&Nginxのコンテナを実行
- ``ECR``: Rails&Nginxのコンテナイメージを保存
- ``ALB``: コンテナの負荷分散
- ``RDS``: DBエンジンはMySQLを使用
- ``S3``: Reactのホスティング、画像の保存
- ``CloudFront``: .html、.css、.js、イメージファイル等の配信
- ``Route53``: 独自ドメインでのアクセス
- ``VPC``: 個人のネットワーク領域
- ``ACM``: SSL証明書を発行

### ``CircleCI``
CI/CDパイプライン構築
ビルド、テスト、デプロイを全自動化
- テスト
  - rspec
- デプロイ（バック）
  - ※herokuへpushのみ


[TOPへ](#Fit-wearness（フィットウェアネス）)


