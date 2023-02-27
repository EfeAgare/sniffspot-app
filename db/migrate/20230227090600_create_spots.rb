class CreateSpots < ActiveRecord::Migration[6.1]
  def change
    create_table :spots do |t|
      t.string :title, null: false
      t.string :description, null: false
      t.decimal :price, null: false

      t.timestamps
    end
  end
end
