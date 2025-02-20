# app/serializers/area_serializer.rb
class AreaSerializer < ActiveModel::Serializer
    attributes :id, :name, :location, :population, :risk_level, :description
    belongs_to :communicable_disease
    has_many :reviews
    has_many :donations
  end