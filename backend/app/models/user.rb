# frozen_string_literal: true

class User < ActiveRecord::Base

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :confirmable

  include DeviseTokenAuth::Concerns::User

  mount_uploader :image, ImageUploader
  has_many :posts, dependent: :destroy
  has_many :likes, dependent: :destroy

  # ゲストログイン
  # ゲストユーザーが存在しない場合、ゲストユーザーを作成
  def self.guest
    find_or_create_by!(email: "guest@example.com") do |user|
      user.password = SecureRandom.urlsafe_base64(10)
      user.name = "ゲストユーザー"
      user.category = "ゲスト"
      user.metadata = "ゲストユーザーとしてログイン中"
      user.confirmed_at = Time.now
    end
  end


end
