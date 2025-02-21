class CreateEducationalResources < ActiveRecord::Migration[7.0]
  def change
    create_table :educational_resources do |t|

      t.timestamps
    end
  end
end
