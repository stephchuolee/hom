# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150908000940) do

  create_table "bookings", force: :cascade do |t|
    t.integer  "listing_id"
    t.integer  "renter_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "bookings", ["listing_id"], name: "index_bookings_on_listing_id"

  create_table "favourites", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "listing_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "favourites", ["listing_id"], name: "index_favourites_on_listing_id"
  add_index "favourites", ["user_id"], name: "index_favourites_on_user_id"

  create_table "listing_images", force: :cascade do |t|
    t.integer  "listing_id"
    t.string   "image"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "listing_images", ["listing_id"], name: "index_listing_images_on_listing_id"

  create_table "listings", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "square_footage"
    t.integer  "bedroom"
    t.integer  "bathroom"
    t.integer  "price"
    t.string   "address"
    t.boolean  "furnished"
    t.boolean  "pets"
    t.boolean  "smoking"
    t.integer  "floor_number"
    t.boolean  "parking_space"
    t.boolean  "storage_space"
    t.boolean  "balcony"
    t.date     "available_date"
    t.integer  "minimum_lease"
    t.string   "image"
    t.string   "title"
    t.string   "rental_type"
    t.text     "description"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

  add_index "listings", ["user_id"], name: "index_listings_on_user_id"

  create_table "users", force: :cascade do |t|
    t.string   "name"
    t.string   "email"
    t.string   "password_digest"
    t.string   "location"
    t.text     "blurb"
    t.boolean  "owner"
    t.string   "image"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

end
