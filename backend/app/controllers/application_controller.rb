class ApplicationController < ActionController::Base
        include DeviseTokenAuth::Concerns::SetUserByToken

  # def good
  #   render html: "good!API!" 
  # end

  skip_before_action :verify_authenticity_token
  helper_method :current_user, :user_signed_in?

end
