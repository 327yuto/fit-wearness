class Post < ApplicationRecord

  mount_uploader :picture, PictureUploader
  belongs_to :user
  has_many :likes, dependent: :destroy

  validates :content, length: { maximum: 140 }
  validates :user_id, presence: true
  validates :picture, presence: true
  validates :category, presence: true
end
