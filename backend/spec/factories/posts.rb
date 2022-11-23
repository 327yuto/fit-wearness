# FactoryBot.define do
#   factory :post do
#     category { "ワークアウト" }
#     content { "今日のコーディネート" }
#     picture { "https://books.google.com/books/content?id=k-IeBAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api" }
#     user_id { }
#   end
# end

# 不使用のため、コメントアウト

FactoryBot.define do
  factory :post do
    category { "ワークアウト" }
    content { "今日のコーディネート" }
    picture { Rack::Test::UploadedFile.new(File.join(Rails.root,
    "/spec/fixtures/images/attachment.jpg")) }
    user_id { "上書き必要" }
  end
end
