class Listing < ActiveRecord::Base
  belongs_to :user
  has_many :listing_images
  accepts_nested_attributes_for :listing_images
  scope :city, -> (city) {where('address LIKE ?', "%#{city}%")}
  scope :min_price, -> (min_price) {where('price >= ?', min_price)}
  scope :max_price, -> (max_price) {where('price <= ?', max_price)}
  scope :number_of_bedrooms, -> (number_of_bedrooms) {where('bedroom == ?', number_of_bedrooms)}
  scope :rental_type, -> (rental_type) {where('rental_type = ?', rental_type)}
  scope :pets, -> (pets) {where('pets = ?', pets)}
  scope :parking, -> (parking) {where('parking = ?', parking)}
  scope :smoking, -> (smoking) {where('smoking = ?', smoking)}
  scope :furnished, -> (furnished) {where('furnished = ?', furnished)}
  scope :storage, -> (storage) {where('storage = ?', storage)}

  

end

