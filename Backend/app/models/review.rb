# app/models/review.rb
class Review < ApplicationRecord
  belongs_to :user
  belongs_to :disease
  belongs_to :area
  enum status: { pending: 0, approved: 1, rejected: 2 }
  
  validates :comment, presence: true
  validates :rating, presence: true, inclusion: { in: 1..5 }
end