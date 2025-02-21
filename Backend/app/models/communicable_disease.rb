class CommunicableDisease < ApplicationRecord
    has_many :areas
    has_one_attached :image

    validates :name, presence: true, uniqueness: true
    
    validates :description, presence: true
    validates :symptoms, presence: true
    validates :prevention_measures, presence: true
  end
