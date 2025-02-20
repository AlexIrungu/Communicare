class AddFeaturedToCommunicableDiseases < ActiveRecord::Migration[7.0]
  def change
    add_column :communicable_diseases, :featured, :boolean
  end
end
