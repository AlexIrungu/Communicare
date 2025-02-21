class AddFieldsToAreas < ActiveRecord::Migration[7.0]
  def change
    add_column :areas, :risk_level, :string
    add_column :areas, :last_outbreak, :date
    add_column :areas, :healthcare_facilities, :integer
    add_column :areas, :notes, :text
  end
end
