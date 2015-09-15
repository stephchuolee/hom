class Booking < ActiveRecord::Base
  belongs_to :listing
  belongs_to :user
  
  validates :renter_id, numericality: true, on: :update
  validates :date, :start_time, :end_time, :listing_id, presence: true
end
