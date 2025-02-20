# app/models/disease.rb
class Disease < ApplicationRecord
    validates :name, presence: true
    validates :description, presence: true
    
    # Add any associations if needed
    has_many :areas
    has_many :reviews
    has_many :donations
    belongs_to :area, optional: true
    
    # Scope for featured diseases
    scope :featured, -> { where(featured: true) }
  end