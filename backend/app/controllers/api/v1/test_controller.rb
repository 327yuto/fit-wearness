class Api::V1::TestController < ApplicationController
  def index
    # render json: { status: 200, message: "Hello World!"}
    render json: current_api_v1_user
  end
end
