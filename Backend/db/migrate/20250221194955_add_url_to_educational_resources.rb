class AddUrlToEducationalResources < ActiveRecord::Migration[7.0]
  def change
    add_column :educational_resources, :url, :string
  end
end
