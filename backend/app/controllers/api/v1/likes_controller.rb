class Api::V1::LikesController < ApplicationController

  def show
    if current_api_v1_user
      @post = Post.find(params[:post_id])
      @like = current_api_v1_user.likes.find_by(post_id: @post.id)
      @like_count = Like.where(post_id: @post.id)
      @like_count = @like_count.length

      render json: { like: @like, like_count: @like_count }
    end
  end



  def create    
    if current_api_v1_user
      @post = Post.find(params[:post_id])
      @like = Like.create(like_params)

      if @like.save
        render json: {
        status: :created,
        like: @like,
        }
      else
        render json: { status: 500, like: @like.errors }
      end

    else
      render json: {
              status: 500,
              errors: ["LIKEできませんでした"]
            }
    end
  end

  def destroy
    @user = current_api_v1_user
    @post = Post.find(params[:post_id])
    @like = Like.find_by(post_id: @post.id, user_id: @user.id) 

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
