class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :name
      t.string :email
      t.string :password
      t.string :location
      t.string :image
      t.text :blurb
      t.boolean :owner

      t.timestamps null: false
    end
  end
end
