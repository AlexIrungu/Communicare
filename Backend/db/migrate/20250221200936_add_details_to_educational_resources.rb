class AddDetailsToEducationalResources < ActiveRecord::Migration[7.0]
  def change
    # Modify the existing audience column
    change_column :educational_resources, :audience, :string

    # If you need to add any other columns, you can do so here
    # For example:
    # add_column :educational_resources, :new_column, :string
  end

  # If you need to roll back the changes, define a down method
  def down
    # Specify the original column type if you need to roll back
    change_column :educational_resources, :audience, :original_type
  end
end