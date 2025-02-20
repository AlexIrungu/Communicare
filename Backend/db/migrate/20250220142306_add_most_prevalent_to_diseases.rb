class AddMostPrevalentToDiseases < ActiveRecord::Migration[7.0]
  def change
    add_column :diseases, :most_prevalent, :string
  end
end
