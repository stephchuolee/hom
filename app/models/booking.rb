class Booking < ActiveRecord::Base
  belongs_to :listing
  belongs_to :user
  
  validates :renter_id, numericality: true, on: :update

end
