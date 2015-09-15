class ListingImage < ActiveRecord::Base
  belongs_to :listing
  mount_uploader :image, ImageUploader
  validates :image, presence: true
end
