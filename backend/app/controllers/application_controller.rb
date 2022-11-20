class ApplicationController < ActionController::Base
        include DeviseTokenAuth::Concerns::SetUserByToken

  skip_before_action :verify_authenticity_token
  helper_method :current_user, :authenticate_user!
  # , :user_signed_in?
  # devise token auth使用時は、routes.rbに合わせてmethod名を変更
  
private
  def render_json_bad_request_with_custom_errors(title, detail)
    render json: { errors: { title: title, detail: detail } }, status: :bad_request
  end

end
