class CommunicableDisease < ApplicationRecord
    has_many :areas

    validates :name, presence: true, uniqueness: true
    validates :image_url, presence: true
    validates :description, presence: true
    validates :symptoms, presence: true
    validates :prevention_measures, presence: true
  end
