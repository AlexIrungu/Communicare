class RenameColumnCasesToCaseCountInOutbreakHistories < ActiveRecord::Migration[7.0]
  def change
    rename_column :outbreak_histories, :cases, :case_count
  end
end