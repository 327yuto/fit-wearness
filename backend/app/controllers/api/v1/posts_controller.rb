class Api::V1::PostsController < ApplicationController

  def index
    render json: Post.all
  end

  def show
    render json: Post.find(params[:id])
  end

  def create
    post = Post.new(post_params)
    if post.save
      render json: post
    else
      render json: post.erros, status: 422
    end
  end

  def destroy
    post = Post.find(params[:id])
    post.destroy
    render json: post
  end

  private
    def post_params
      params.permit(:picture, :category, :content, :user_id)
      # .merge(user_id: current_api_v1_user.id)
    end

end
