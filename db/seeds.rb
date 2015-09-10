# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.create(name: "Judy Cha", email: "mjjcha@gmail.com", password: "1111", location: "Vancouver, BC", image: "", blurb: "Hi it'sa me, Judayyyy!", owner: false)

User.create(name: "Ryan Song", email: "yiryans@gmail.com", password: "1111", location: "Burnaby, Bc", image: "", blurb: "Ryan rocks!", owner: true)

User.create(name: "Sumit Sekhri", email: "sumitsekhri@gmail.com", password: "1111", location: "Surry, BC", image: "", blurb: "Ya lighthouse", owner: false)

User.create(name: "Stephanie Chuo-Lee", email: "schuolee@gmail.com", password: "1111", location: "Vancouver, BC", image: "", blurb: "Coolbeans", owner: true)


Listing.create(user_id: 2, square_footage: 500, bedroom: 2, bathroom: 1, price: 1000, address: "1202-2289 Yukon Crescent, Burnaby, BC, Canada", furnished: true, pets: true, smoking: false, floor_number: 4, parking_space: true, storage_space: true, balcony: true, available_date: Date.today, minimum_lease: 12, title: "Beautiful Yukon Crescent Home", rental_type: "Full Lease", description: "So much beauty in this home.")

Listing.create(user_id: 1, square_footage: 1500, bedroom: 4, bathroom: 3, price: 3000, address: "402-1139 Barclay Street, Vancouver, BC, Canada", furnished: true, pets: false, smoking: false, floor_number: 6, parking_space: true, storage_space: true, balcony: true, available_date: Date.today, minimum_lease: 6, title: "Bark-lay!", rental_type: "Sublet", description: "Eacha ma barklays! Live here!")

Listing.create(user_id: 3, square_footage: 500, bedroom: 2, bathroom: 1, price: 1000, address: "1202-1189 Yukon Crescent, Burnaby, BC, Canada", furnished: true, pets: true, smoking: false, floor_number: 4, parking_space: true, storage_space: true, balcony: true, available_date: Date.today, minimum_lease: 12, title: "Some Kind of Home", rental_type: "Full Lease", description: "Such beauty, very hom.")

Listing.create(user_id: 4, square_footage: 500, bedroom: 2, bathroom: 1, price: 1000, address: "1202-2267 West 7th, Vancouver, BC, Canada", furnished: true, pets: true, smoking: false, floor_number: 2, parking_space: false, storage_space: true, balcony: true, available_date: Date.today, minimum_lease: 12, title: "The Best Hom", rental_type: "Full Lease", description: "A very special hom.")

Listing.create(user_id: 1, square_footage: 500, bedroom: 2, bathroom: 1, price: 1000, address: "128 West Hastings, Vancouver, BC, Canada", furnished: true, pets: true, smoking: false, floor_number: 4, parking_space: true, storage_space: true, balcony: true, available_date: Date.today, minimum_lease: 12, title: "Lighthouse in the Hom", rental_type: "Full Lease", description: "type type type type.")



