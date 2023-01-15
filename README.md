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

## このサービスで解決できるユーザーが抱える課題（ファッションが好きな方）
下記2つの課題に注目しました。（自身の体験から）<br>
①: フィットネスを始めたいが"オシャレじゃない"と思われるファッションは避けたい。<br>
②: 他の人のフィットネスコーディネートを見たい。<br>

# 使用技術概略(詳細後述) 
**Back End:** Ruby on Rails ( APIモード ), MySQL, Nginx, AWS( S3 )<br>
**Front End:** React ( JavaScript )<br>
**Infra:** Docker / Docker-Compose, AWS ( ECS Fargate / ECR / ALB / RDS / S3 / CloudFront / Route53 / VPC / ACM ) <br>
**Other:** CircleCI(※HEROKUデプロイ時のみ使用)<br>


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
  <img src="" />
</p>



