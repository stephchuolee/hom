class User < ActiveRecord::Base
  has_many :bookings
  has_many :listings
  has_many :favourites


  has_secure_password

  def first_name  
    name.split(" ")[0]
  end

end
