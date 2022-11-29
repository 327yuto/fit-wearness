require 'rails_helper'

RSpec.describe Like, type: :model do
 
  let(:user) { FactoryBot.create(:user) }
  let(:user_2) { FactoryBot.create(:user, :user_2) }
  let(:auth_params) do
    login(user)
    get_auth_params_and_create_posts(response)
  end
  let(:post) { create(:post, user_id: user.id) }


  context "正常<nomal>" do 

    it 'is valid with related user_id and post_id
        <関連する user_id と post_id で有効>' do

      @like = Like.new(user_id: user.id, post_id: post.id)
     
      expect(@like).to be_valid
    end
  end

  context"異常<abnomal>" do

    it 'is invalid with not related user_id
        <関連付けられていない user_id では無効>' do

      @like = Like.new(user_id: user.id + 1, post_id: post.id)

      expect(@like).to be_invalid
    end

    it 'is invalid with not unique user_id and post_id
        <user_id と post_id が一意でないため無効>' do

      Like.create(user_id: user.id, post_id: post.id)
      @like = Like.new(user_id: user.id, post_id: post.id)
      @like.valid?
      
      expect(@like.errors[:post_id]).to include('has already been taken')
    end

  end



end

