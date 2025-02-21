class AddResolvedToOutbreakHistories < ActiveRecord::Migration[7.0]
  def change
    add_column :outbreak_histories, :resolved, :boolean
  end
end
