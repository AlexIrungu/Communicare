class AddCommunicableDiseaseToEducationalResources < ActiveRecord::Migration[7.0]
  def change
    add_column :educational_resources, :communicable_disease, :boolean
  end
end
