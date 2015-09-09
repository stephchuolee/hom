class AddColumnsToBookings < ActiveRecord::Migration
  def change
    add_column :bookings, :date, :date
    add_column :bookings, :end_time, :time
    add_column :bookings, :start_time, :time
  end
end
