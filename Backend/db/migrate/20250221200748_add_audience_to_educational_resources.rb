class AddAudienceToEducationalResources < ActiveRecord::Migration[7.0]
  def change
    add_column :educational_resources, :audience, :string
  end
end
