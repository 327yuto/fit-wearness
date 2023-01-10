
FactoryBot.define do
  factory :post do
    category { "ワークアウト" }
    content { "今日のコーディネート" }
    picture { Rack::Test::UploadedFile.new(File.join(Rails.root,
    "/spec/fixtures/images/attachment.jpg")) }
    user_id { "上書き必要" }
  end
end
