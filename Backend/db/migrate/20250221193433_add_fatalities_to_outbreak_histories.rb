class AddFatalitiesToOutbreakHistories < ActiveRecord::Migration[7.0]
  def change
    add_column :outbreak_histories, :fatalities, :integer
  end
end
