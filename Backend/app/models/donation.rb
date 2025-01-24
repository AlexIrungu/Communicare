class Donation < ApplicationRecord
  belongs_to :user
  belongs_to :area

  validates :amount, presence: true, numericality: { greater_than_or_equal_to: 0 }
end
