# ログイン状態確認用コントローラー
class Api::V1::Auth::SessionsController < DeviseTokenAuth::SessionsController
  def index
    if current_api_v1_user
      render json: { is_login: true, data: current_api_v1_user }
    else
      render json: { is_login: false, message: "else ユーザーが存在しません" }
    end
  end

  # ゲストユーザーでログイン  
  def guest_sign_in
    @resource = User.guest # ①
    @token = @resource.create_token # ②
    @resource.save! # ③
    render_create_success # ④
  end

end
