require 'rails_helper'

RSpec.describe Post, type: :model do
  describe "Picture posting function<写真投稿機能>" do

   
    let(:user) { FactoryBot.create(:user) }
    let(:user_2) { FactoryBot.create(:user, :user_2) }
    let(:auth_params) do
      login(user)
      get_auth_params_and_create_posts(response)
    end
    let(:post) { ceate(:post, user_id: user.id) }
    

    context "正常<nomal>" do 
     
      it 'is valid post<投稿が有効>' do

        @user_id = user.id
        @post = Post.new(
            category: "ワークアウト",
            content: "今日のコーディネート",
            picture: Rack::Test::UploadedFile.new(File.join(Rails.root,
            "/spec/fixtures/images/attachment.jpg")),
            user_id: @user_id 
        )
        expect(@post).to be_valid
      end

      it 'is valid when content has 140 characters
          <コンテンツが 140 文字の場合に有効です>' do

        @user_id = user.id
        @post = Post.new(
            category: "ワークアウト",
            content: "A"*140,
            picture: Rack::Test::UploadedFile.new(File.join(Rails.root,
            "/spec/fixtures/images/attachment.jpg")),
            user_id: @user_id 
        )
        expect(@post).to be_valid
      end

      it 'is logically deleted when deleting
          <削除時に論理的に削除されます>' do
        post = create(:post, user_id: user.id)
        expect do
          post.destroy
        end. to change(Post.all, :count).by(-1)
      end

      it "is logically deleted when related user was logically deleted
          <userが論理的削除された時postも削除される>" do
        post = create(:post, user_id: user.id)
        expect do
          user.destroy
        end. to change(Post.all, :count).by(-1)
      end

    end

    context "異常<abnomal>" do
      
      it 'is invalid without user_id' do
        @user_id = nil
        @post = Post.new(
            category: "ワークアウト",
            content: "今日のコーディネート",
            picture: Rack::Test::UploadedFile.new(File.join(Rails.root,
            "/spec/fixtures/images/attachment.jpg")),
            user_id: @user_id
        )
        expect(@post).to_not be_valid
      end


      it 'is invalid if user_id does not match' do
        @user_id = user.id + 1
        @post = Post.new(
            category: "ワークアウト",
            content: "今日のコーディネート",
            picture: Rack::Test::UploadedFile.new(File.join(Rails.root,
            "/spec/fixtures/images/attachment.jpg")),
            user_id: @user_id
        )
        expect(@post).to_not be_valid
      end

      it 'is invalid without category' do
        @user_id = user.id
        @post = Post.new(
            category: "",
            content: "今日のコーディネート",
            picture: Rack::Test::UploadedFile.new(File.join(Rails.root,
            "/spec/fixtures/images/attachment.jpg")),
            user_id: @user_id
        )
        expect(@post).to_not be_valid
      end

      it 'is invalid without picture' do
        @user_id = user.id
        @post = Post.new(
            category: "ワークアウト",
            content: "今日のコーディネート",
            picture: nil,
            user_id: @user_id
        )
        expect(@post).to_not be_valid
      end

      it 'is invalid when content has 141 characters' do
        @user_id = user.id
        @post = Post.new(
            category: "ワークアウト",
            content: "A"*141,
            picture: Rack::Test::UploadedFile.new(File.join(Rails.root,
            "/spec/fixtures/images/attachment.jpg")),
            user_id: @user_id
        )
        expect(@post).to_not be_valid
      end
    end
  end
end
