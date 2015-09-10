class User < ActiveRecord::Base
  has_many :bookings
  has_many :listings
  has_many :favourites


  has_secure_password

end
