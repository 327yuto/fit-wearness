class Post < ApplicationRecord

  mount_uploader :picture, PictureUploader
  belongs_to :user

  validates :content, length: { maximum: 140 }
end
