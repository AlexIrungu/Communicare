class AddResourceTypeToEducationalResources < ActiveRecord::Migration[7.0]
  def change
    add_column :educational_resources, :resource_type, :string
  end
end
