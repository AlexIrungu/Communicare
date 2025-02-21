class AddTipNumberToPreventionTips < ActiveRecord::Migration[7.0]
  def change
    add_column :prevention_tips, :tip_number, :integer
  end
end
