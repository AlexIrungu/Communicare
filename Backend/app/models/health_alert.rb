class HealthAlert < ApplicationRecord
  belongs_to :area
  has_many :subscriptions, through: :area

  validates :title, presence: true
  validates :message, presence: true  # Changed from description
  validates :severity, presence: true
  # Removed region validation since you're using area_id instead
  
  enum severity: { low: 0, medium: 1, high: 2, critical: 3 }
  
  # Default scope to order by created_at
  default_scope { order(created_at: :desc) }
end