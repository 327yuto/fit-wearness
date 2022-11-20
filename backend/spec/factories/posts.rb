FactoryBot.define do
  factory :post do
    category { "ワークアウト" }
    content { "今日のコーディネート" }
    picture { "https://books.google.com/books/content?id=k-IeBAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api" }
    user_id { }
  end
end
