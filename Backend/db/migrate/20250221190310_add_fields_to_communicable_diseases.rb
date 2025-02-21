class AddFieldsToCommunicableDiseases < ActiveRecord::Migration[7.0]
  def change
    add_column :communicable_diseases, :treatment, :text
    add_column :communicable_diseases, :risk_factors, :text
    add_column :communicable_diseases, :transmission, :text
    add_column :communicable_diseases, :endemic_regions, :text
    add_column :communicable_diseases, :annual_cases, :string
  end
end
