class CreateListings < ActiveRecord::Migration
  def change
    create_table :listings do |t|
      t.references :user, index: true, foreign_key: true
      t.integer :square_footage
      t.integer :bedroom
      t.integer :bathroom
      t.integer :price
      t.string :address
      t.boolean :furnished
      t.boolean :pets
      t.boolean :smoking
      t.integer :floor_number
      t.boolean :parking_space
      t.boolean :storage_space
      t.boolean :balcony
      t.date :available_date
      t.integer :minimum_lease
      t.string :image
      t.string :title
      t.string :rental_type
      t.text :description

      t.timestamps null: false
    end
  end
end
