class AddDescriptionToEducationalResources < ActiveRecord::Migration[7.0]
  def change
    add_column :educational_resources, :description, :text
  end
end
