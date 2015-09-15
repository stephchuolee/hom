class User < ActiveRecord::Base
  has_many :bookings
  has_many :listings
  has_many :favourites
  mount_uploader :image, ImageUploader
  

  has_secure_password

  def first_name  
    name.split(" ")[0]
  end

end
