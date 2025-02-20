class AddImageUrlToDiseases < ActiveRecord::Migration[7.0]
  def change
    add_column :diseases, :image_url, :string
  end
end
