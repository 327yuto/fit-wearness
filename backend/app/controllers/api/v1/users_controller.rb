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

  def update
  end

  private

    def user_params
      params.permit(:email)
    end
end

