# db/migrate/YYYYMMDDHHMMSS_create_reviews.rb
class CreateReviews < ActiveRecord::Migration[7.0]
  def change
    create_table :reviews do |t|
      t.text :content
      t.references :user, foreign_key: true
      t.integer :status, default: 0
      
      t.timestamps
    end
  end
end