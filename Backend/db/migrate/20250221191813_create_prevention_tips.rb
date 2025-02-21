class CreatePreventionTips < ActiveRecord::Migration[7.0]
  def change
    create_table :prevention_tips do |t|

      t.timestamps
    end
  end
end
