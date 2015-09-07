json.array!(@users) do |user|
  json.extract! user, :id, :name, :email, :password, :location, :image, :blurb, :owner
  json.url user_url(user, format: :json)
end
