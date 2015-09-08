class AddColumnsToBookings < ActiveRecord::Migration
  def change
    add_column :bookings, :resource_id, :integer
    add_column :bookings, :start_time, :datetime
    add_column :bookings, :length, :integer
    add_column :bookings, :end_time, :datetime
  end
end
