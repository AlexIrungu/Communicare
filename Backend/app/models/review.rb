class Review < ApplicationRecord
  belongs_to :user
  belongs_to :area

  validates :comment, presence: true
end
