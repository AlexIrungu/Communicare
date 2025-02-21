class AddCommunicableDiseaseToPreventionTips < ActiveRecord::Migration[7.0]
  def change
    add_reference :prevention_tips, :communicable_disease, foreign_key: true
  end
end