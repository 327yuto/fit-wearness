class ApplicationController < ActionController::Base
        include DeviseTokenAuth::Concerns::SetUserByToken

  skip_before_action :verify_authenticity_token
  helper_method :current_api_v1_user, :user_signed_in?
  # devise token auth使用時は、routes.rbに合わせてmethod名を変更

end
