class Listing < ActiveRecord::Base
  belongs_to :user

  scope :city, -> (city) {where('address LIKE ?', "%#{city}%")}
end
