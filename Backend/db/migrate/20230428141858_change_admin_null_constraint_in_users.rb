class ChangeAdminNullConstraintInUsers < ActiveRecord::Migration[7.0]
  def change
    change_column_null :users, :admin, false
  end
end
