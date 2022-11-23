require 'rails_helper'

RSpec.describe " Posts ", type: :request do
  
  let(:user) { FactoryBot.create(:user) }
  let(:user_2) { FactoryBot.create(:user, :user_2) }
  let(:auth_params) do
    login(user)
    get_auth_params_and_create_posts(response)
  end

  describe 'POST /posts' do
    context 'normal<正常>' do
      it '200 response on creation<作成時の応答が200>' do
        
        expect {
          post(api_v1_posts_path, 
            params:{
              category: "ワークアウト",
              content: "今日のコーディネート",
              picture: Rack::Test::UploadedFile.new(File.join(Rails.root,
              "/spec/fixtures/images/attachment.jpg")),
              user_id: user.id 
            },
            headers: auth_params
          )
        }.to change(Post, :count).by 1
        expect(response.status).to eq 200
      end
    end

    context 'abnomal<異常>' do
      it 'Not created when user_id do not match<IDが一致いない時、作成されない>' do

        expect {
          post(api_v1_posts_path, 
            params:{
              category: "ワークアウト",
              content: "今日のコーディネート",
              picture: Rack::Test::UploadedFile.new(File.join(Rails.root,
              "/spec/fixtures/images/attachment.jpg")),
              user_id: user.id + 1
            },
            headers: auth_params
          )
        }.to change(Post, :count).by 0
        expect(response.status).to eq 422
      end

      it 'Not created when content is over 140 characters<コンテンツが140文字以上の時、作成されない>' do

        expect {
          post(api_v1_posts_path, 
            params:{
              category: "ワークアウト",
              content: "A"*141,
              picture: Rack::Test::UploadedFile.new(File.join(Rails.root,
              "/spec/fixtures/images/attachment.jpg")),
              user_id: user.id
            },
            headers: auth_params
          )
        }.to change(Post, :count).by 0
        expect(response.status).to eq 422
      end
    end
  end
end
