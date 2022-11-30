require 'rails_helper'

RSpec.describe ' Api::V1::Likes ', type: :request do
 
  let(:user) { FactoryBot.create(:user) }
  let(:user_2) { FactoryBot.create(:user) }
  let(:auth_params) do
    login(user)
    get_auth_params_and_create_posts(response)
  end
  let(:auth_params_user2) do
    login(user_2)
    get_auth_params_and_create_posts(response)
  end
  let(:new_post) { create(:post, user_id: user.id) }
  let(:post_params) do
    { post_id: new_post.id, user_id: new_post.user_id }
  end

  describe 'POST /posts/:post_id/likes' do
    context "正常<nomal>" do 
  
      it "returns 200 and successfully creation
          <200を返し、作成に成功>" do
        expect{
          post api_v1_post_likes_path(new_post.id), params: post_params, headers: auth_params
        }.to change(Like.where(user_id: user.id, post_id: new_post.id), :count).by(1)
        expect(response.status).to eq 200
        expect{
        delete api_v1_post_likes_path(new_post.id), params: {user_id: user.id}, headers: auth_params
        }.to change(Like.where(user_id: user.id, post_id: new_post.id), :count).by(-1)

      end
    end

    context "異常<abnomal>" do 
  
      it "Not created when there is no relation between user_id and post_id
          <user_idとpost_idの関連がない時作成されない>" do
        expect{
          post api_v1_post_likes_path(new_post.id), params: post_params, headers: auth_params
        }.to change(Like.where(user_id: user.id + 1, post_id: new_post.id), :count).by(0)
        expect(response.status).to eq 200
      end

      it "Not created when there is no current user information headers
          <カレントユーザー情報のheadersがない時作成されない>" do
        expect{
          post api_v1_post_likes_path(new_post.id), params: post_params
        }.to change(Like.where(user_id: user.id, post_id: new_post.id), :count).by(0)
        expect(response.status).to eq 200
      end
    
    end
  end

end
