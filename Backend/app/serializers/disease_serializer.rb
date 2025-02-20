# app/serializers/disease_serializer.rb
class DiseaseSerializer < ActiveModel::Serializer
    attributes :id, :name, :description, :severity, :symptoms, :prevention, :treatment, :featured
    has_many :reviews
    has_many :areas
  end
  