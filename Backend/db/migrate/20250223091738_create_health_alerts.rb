class CreateHealthAlerts < ActiveRecord::Migration[7.0]
  def change
    create_table :health_alerts do |t|
      t.string :title
      t.text :description
      t.integer :severity
      t.string :region

      t.timestamps
    end
  end
end
