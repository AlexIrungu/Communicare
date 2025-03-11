class UpdateHealthAlertsTable < ActiveRecord::Migration[7.0]
  def change
    # Check if columns exist before trying to add them
    unless column_exists?(:health_alerts, :message)
      add_column :health_alerts, :message, :text
    end
    
    unless column_exists?(:health_alerts, :area_id)  
      add_column :health_alerts, :area_id, :integer
    end
    
    unless column_exists?(:health_alerts, :read)
      add_column :health_alerts, :read, :boolean, default: false
    end
    
    # Check if foreign key exists before adding it
    unless foreign_key_exists?(:health_alerts, :areas)
      add_foreign_key :health_alerts, :areas, column: :area_id
    end
    
    # Check if index exists before adding it
    unless index_exists?(:health_alerts, :area_id)
      add_index :health_alerts, :area_id
    end
  end
  
  private
  
  def foreign_key_exists?(from_table, to_table)
    foreign_keys = connection.foreign_keys(from_table)
    foreign_keys.any? { |fk| fk.to_table.to_s == to_table.to_s }
  end
end