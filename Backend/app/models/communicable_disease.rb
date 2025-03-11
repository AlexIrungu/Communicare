class CommunicableDisease < ApplicationRecord
  has_many :areas
  has_one_attached :image

  validates :name, presence: true, uniqueness: true
  validates :description, presence: true
  validates :symptoms, presence: true
  validates :prevention_measures, presence: true
  
  def cases_count
    # If you have a way to count cases, implement it here
    # For example, if you have a related model for tracking cases:
    # self.disease_cases.count
    
    # Or maybe return a random number for demonstration purposes:
    rand(1000..5000)
  end
end