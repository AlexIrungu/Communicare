# app/models/subscription.rb
class Subscription < ApplicationRecord
    belongs_to :user
    belongs_to :area
    
    validates :user_id, uniqueness: { scope: :area_id, message: "is already subscribed to this area" }
  end