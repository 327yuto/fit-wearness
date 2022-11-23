class Api::V1::LikesController < ApplicationController

  def create
    # if @recipe.user_id != current_user.id # 投稿者本人以外に限定
    
      #favoriteを作成
      @post = Post.find(params[:post_id])
      # @like = Like.create(user_id: current_api_v1_user.id, post_id: @post.id)
      # if current_api_v1_user.id  == @post.user_id 
      # @like = current_api_v1_user.likes.create(post_id: params[:post_id])

      @like = Like.create(like_params)

      if @like.save
        render json: {
        status: :created,
        like: @like,
        }
      else
        render json: @like.errors
      end
      
    # end
    # else
    #   render json: {
    #           status: 500,
    #           # errors: ["登録できませんでした"],
    #           errors: @favorite.errors.full_messages
    #         }
    # end
  end

  def destroy
    @post = Post.find_by(id: params[:id])
    # @like = current_api_v1_user.likes.find_by(post_id: @post.id)    
    # @like = Like.find_by(user_id: current_api_v1_user.id, post_id: @post.id)

    @like = Like.find_by(like_params)
    @like.destroy
      render json: {
              status: :delete,
            }
  end


  private

  def like_params
    params.permit(:post_id, :user_id)
  end

end
