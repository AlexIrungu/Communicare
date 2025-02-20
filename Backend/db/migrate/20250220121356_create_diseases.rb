class CreateDiseases < ActiveRecord::Migration[7.0]
  def change
    create_table :diseases do |t|
      t.string :name
      t.text :description
      t.string :severity
      t.text :symptoms
      t.text :prevention
      t.text :treatment
      t.boolean :featured

      t.timestamps
    end
  end
end
