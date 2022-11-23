class Post < ApplicationRecord

  mount_uploader :picture, PictureUploader
  belongs_to :user

  validates :content, length: { maximum: 140 }
  validates :user_id, presence: true
  validates :picture, presence: true
  validates :category, presence: true
end
