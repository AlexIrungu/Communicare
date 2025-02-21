class AddPublicationDateToEducationalResources < ActiveRecord::Migration[7.0]
  def change
    add_column :educational_resources, :publication_date, :datetime
  end
end
