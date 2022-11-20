class Api::V1::PostsController < ApplicationController

  def index
    render json: Post.all
  end

  def show
    render json: Post.find(params[:id])
  end

  def create
    if current_api_v1_user
        post = Post.new(post_params)
      if post.save
        render json: post
      else
        render json: post.errors, status: 422
      end
    else
      render json: {}, status: 422
    end
  end

  def destroy
    post = Post.find_by(id: params[:id])
    if post.present? && post.user_id == current_api_v1_user.id
      post.destroy
      render json: post, status: :ok
    else
      render_json_bad_request_with_custom_errors(
        '投稿idが不正です',
        '自分の投稿のみ削除する事ができます'
      )
    end
  end


  private
    def post_params
      params.permit(:picture, :category, :content, :user_id)
      # .merge(user_id: current_api_v1_user.id)
    end

end
