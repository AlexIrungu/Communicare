class AddPreventionMeasuresToDiseases < ActiveRecord::Migration[7.0]
  def change
    add_column :diseases, :prevention_measures, :text
  end
end
