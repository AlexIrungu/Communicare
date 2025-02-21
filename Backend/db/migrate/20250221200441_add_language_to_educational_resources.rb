class AddLanguageToEducationalResources < ActiveRecord::Migration[7.0]
  def change
    add_column :educational_resources, :language, :string
  end
end
