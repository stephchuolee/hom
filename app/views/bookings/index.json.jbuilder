json.array!(@bookings) do |booking|
  json.extract! booking, :id, :listing_id, :renter_id
  json.url booking_url(booking, format: :json)
end
