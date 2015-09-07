class CreateBookings < ActiveRecord::Migration
  def change
    create_table :bookings do |t|
      t.references :listing, index: true, foreign_key: true
      t.integer :renter_id

      t.timestamps null: false
    end
  end
end
