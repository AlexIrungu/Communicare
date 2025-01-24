class CreateAreas < ActiveRecord::Migration[7.0]
  def change
    create_table :areas do |t|
      t.string :name
      t.string :location
      t.float :latitude
      t.float :longitude
      t.integer :reported_cases
      t.references :communicable_disease, null: false, foreign_key: true

      t.timestamps
    end
  end
end
