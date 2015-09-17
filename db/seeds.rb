# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.create(name: "Elaine Benes", email: "elaine@gmail.com", password: "1111", location: "Vancouver, BC", image: "", blurb: "Maybe the dingo ate your baby.", owner: false)

User.create(name: "Jerry Seinfeld", email: "jerry@gmail.com", password: "1111", location: "Burnaby, Bc", image: "", blurb: "Hello...Newman.", owner: true)

User.create(name: "Cosmo Kramer", email: "kramer@gmail.com", password: "1111", location: "Surry, BC", image: "", blurb: "Serenity now!", owner: false)

User.create(name: "George Costanza", email: "george@gmail.com", password: "1111", location: "Vancouver, BC", image: "", blurb: "My name is George. I'm unemployed and I live with my parents...", owner: true)

User.create(name: "Harold and Manny", email: "h&m@gmail.com", password: "1111", location: "Vancouver, BC", image: "", blurb: "We share this account! We are the managers of this building.", owner: true)


Listing.create(user_id: 2, square_footage: 1500, bedroom: 4, bathroom: 3, price: 3000, address: "402-1139 Barclay Street, Vancouver, BC, Canada", furnished: true, pets: false, smoking: false, floor_number: 6, parking_space: true, storage_space: true, balcony: true, available_date: Date.today, minimum_lease: 6, title: "Jerry's Place", rental_type: "Sublet", description: "Rent out my space while I'm on tour.")

Listing.create(user_id: 2, square_footage: 2500, bedroom: 2, bathroom: 1, price: 1000, address: "1202-2289 Yukon Crescent, Burnaby, BC, Canada", furnished: true, pets: true, smoking: false, floor_number: 4, parking_space: true, storage_space: true, balcony: true, available_date: Date.today, minimum_lease: 12, title: "Beautiful New York Home", rental_type: "Full Lease", description: "What's the deal with full leases?")

Listing.create(user_id: 3, square_footage: 50, bedroom: 6, bathroom: 1, price: 500, address: "1202-1189 Yukon Crescent, Burnaby, BC, Canada", furnished: true, pets: true, smoking: false, floor_number: 4, parking_space: true, storage_space: true, balcony: false, available_date: Date.today, minimum_lease: 12, title: "Yowza!", rental_type: "Full Lease", description: "You and five of your best friends can live in this legitimate apartment. YOU BETTER BELIEVE IT BUDDY.")

Listing.create(user_id: 4, square_footage: 500, bedroom: 2, bathroom: 1, price: 1000, address: "1202-2267 West 7th, Vancouver, BC, Canada", furnished: true, pets: true, smoking: false, floor_number: 2, parking_space: false, storage_space: true, balcony: true, available_date: Date.today, minimum_lease: 12, title: "My parents' basement", rental_type: "Full Lease", description: "I'll be your roommate. Please live with me.")

Listing.create(user_id: 5, square_footage: 1200, bedroom: 2, bathroom: 1, price: 1000, address: "128 West Hastings, Vancouver, BC, Canada", furnished: true, pets: true, smoking: false, floor_number: 4, parking_space: true, storage_space: true, balcony: true, available_date: Date.today, minimum_lease: 12, title: "The Apartment Above Jerry's", rental_type: "Full Lease", description: "Someone died in here.")










