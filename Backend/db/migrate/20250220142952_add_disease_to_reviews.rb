class AddDiseaseToReviews < ActiveRecord::Migration[7.0]
  def change
    add_reference :reviews, :disease, null: false, foreign_key: true
  end
end
