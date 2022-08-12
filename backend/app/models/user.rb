# frozen_string_literal: true

class User < ActiveRecord::Base

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :confirmable # ←メール認証で追加
  
 # 下記全て、session_specにて追加(8/10)
#  after_create :skip_confirmation_email_for_some_user

#  protected
#   def skip_confirmation_email_for_some_user
#     # if self.email.include? "noconfirm"
#       self.skip_confirmation!
#       self.confirm
#     # end
#   end
  include DeviseTokenAuth::Concerns::User
end
