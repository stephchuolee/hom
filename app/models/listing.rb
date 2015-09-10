class Listing < ActiveRecord::Base
  belongs_to :user
  has_many :listing_images
  has_many :bookings
  accepts_nested_attributes_for :listing_images
  scope :city, -> (city) {where('address LIKE ?', "%#{city}%")}
end
