class Api::V1::LikesController < ApplicationController




  def show
    if current_api_v1_user
      @post = Post.find(params[:post_id])
      @like = current_api_v1_user.likes.find_by(post_id: @post.id)
      @like_count = Like.where(post_id: @post.id)
      @like_count = @like_count.length

      # if @like
        render json: { like: @like, like_count: @like_count }
      # else
      #   render json: { data: false }
      # end
    end
  end



  def create
    # if @recipe.user_id != current_user.id # 投稿者本人以外に限定
    
    if current_api_v1_user
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
        render json: { status: 500, like: @like.errors }
      end

    else
      render json: {
              status: 500,
              errors: ["LIKEできませんでした"]
              # errors: :errors.full_messages
            }
    end
  end

  def destroy
    # if current_api_v1_user
    # @user = User.where(id: params[:user_id])
    # @user = current_api_v1_user
    # @post = Post.find_by(id: params[:post_id])
    # @like = current_api_v1_user.likes.find_by(post_id: @post.id)    
    # @like = Like.find_by(user_id: current_api_v1_user.id, post_id: @post.id)

    # render json: { like: @user, like_count: @post }
    
    # @like = current_api_v1_user.likes.find_by(post_id: @post.id)

    @user = current_api_v1_user
    @post = Post.find(params[:post_id])
    @like = Like.find_by(post_id: @post.id, user_id: @user.id) 
    #  render json: { user: @user, post: @post }
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
