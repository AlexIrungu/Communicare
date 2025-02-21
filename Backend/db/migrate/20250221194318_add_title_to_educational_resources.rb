class AddTitleToEducationalResources < ActiveRecord::Migration[7.0]
  def change
    add_column :educational_resources, :title, :string
  end
end
