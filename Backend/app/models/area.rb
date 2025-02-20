# app/models/area.rb
class Area < ApplicationRecord
  belongs_to :communicable_disease
  has_many :reviews
  has_many :donations

  validates :name, presence: true
  validates :location, presence: true
  validates :latitude, presence: true, numericality: true
  validates :longitude, presence: true, numericality: true
  validates :reported_cases, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0 }

  def self.high_risk
    where('reported_cases > ?', 100)
  end

  def risk_level
    case reported_cases
    when 0..100
      "low"
    when 101..500
      "medium"
    else
      "high"
    end
  end

  def description
    "#{name} is located in #{location} with #{reported_cases} reported cases."
  end
end