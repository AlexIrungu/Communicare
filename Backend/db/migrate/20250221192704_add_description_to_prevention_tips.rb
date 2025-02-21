class AddDescriptionToPreventionTips < ActiveRecord::Migration[7.0]
  def change
    add_column :prevention_tips, :description, :text
  end
end
