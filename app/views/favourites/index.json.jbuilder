json.array!(@favourites) do |favourite|
  json.extract! favourite, :id, :user_id, :listing_id
  json.url favourite_url(favourite, format: :json)
end
