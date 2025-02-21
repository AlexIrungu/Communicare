class CreateOutbreakHistories < ActiveRecord::Migration[7.0]
  def change
    create_table :outbreak_histories do |t|
      t.references :communicable_disease, null: false, foreign_key: true
      t.references :area, null: false, foreign_key: true
      t.integer :cases
      t.date :outbreak_date
      t.string :severity_level
      t.string :status
      t.text :description

      t.timestamps
    end
  end
end
