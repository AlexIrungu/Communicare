class Area < ApplicationRecord
  belongs_to :communicable_disease, dependent: :destroy
  has_many :reviews
  has_many :donations

  validates :name, presence: true
  validates :location, presence: true
  validates :latitude, presence: true, numericality: true
  validates :longitude, presence: true, numericality: true
  validates :reported_cases, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0 }

end
