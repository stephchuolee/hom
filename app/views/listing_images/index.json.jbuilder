json.array!(@listing_images) do |listing_image|
  json.extract! listing_image, :id, :listing_id, :image
  json.url listing_image_url(listing_image, format: :json)
end
