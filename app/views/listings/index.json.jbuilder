json.array!(@listings) do |listing|
  json.extract! listing, :id, :user_id, :square_footage, :bedroom, :bathroom, :price, :address, :furnished, :pets, :smoking, :floor_number, :parking_space, :storage_space, :balcony, :available_date, :minimum_lease, :image, :title, :rental_type, :description
  json.url listing_url(listing, format: :json)
end
