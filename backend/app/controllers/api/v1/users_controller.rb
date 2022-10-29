class Api::V1::UsersController < ApplicationController
  # before_action :authenticate_api_v1_user!

  def index
    @users = User.all
    render json: @users
  end

  def show
    @user = User.find(params[:id])
    render json: @user
  end

  # def update

  #   @user.name = user_params[:name]
  #   @user.email = user_params[:email]
  #   @user.metadata = user_params[:metadata]
  #   @user.category = user_params[:category]
  #   @user.image = user_params[:image] if user_params[:image] != ""

  #   if @user.save
  #     render json: { status: 200, user: @user }
  #   else
  #     render json: { status: 500, message: "更新に失敗しました" }
  #   end
  # end

  def update
    @user = User.find_by(id: params[:id])
    # if @user.id == current_api_v1_user.id
      if @user.update(user_params)
        render json: @user, status: :ok
      else
        render json: @user.errors, status: :bad_request
      end
    # else
      # render json: {}, status: :bad_request
    # end
  end

  def post_file
    # @user = User.find_by(id: params[:id])
    @user.image = params[:image]
      # @user.id == current_api_v1_user.id
      # @user.create(image: params[:image][:data])
      @user.update(user_params)
      render status: 200
    # end
  end 

  # def post_file
  #   @user = User.find_by(id: params[:id])
  #   if params[:image]
  #     blob = ActiveStorage::Blob.create_after_upload!(
  #       io: StringIO.new(decode(params[:image][:data]) + "\n"),
  #       filename: params[:image][:filename]
  #     )
  #     @user.image.attach(blob)
  #   end
  #   @user.save!
  #   render json: @user
  # end

  private

    def user_params
      params.permit(:email, :category, :metadata, :name, :image)
    end

    # def decode(str)
    #   Base64.decode64(str.split(',').last)
    # end
end

