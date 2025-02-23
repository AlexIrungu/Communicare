class HealthAlert < ApplicationRecord
    validates :title, presence: true
    validates :description, presence: true
    validates :severity, presence: true
    validates :region, presence: true
  
    enum severity: { low: 0, medium: 1, high: 2, critical: 3 }
  end