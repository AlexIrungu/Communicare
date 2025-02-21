class AddNotesToOutbreakHistories < ActiveRecord::Migration[7.0]
  def change
    add_column :outbreak_histories, :notes, :text
  end
end
