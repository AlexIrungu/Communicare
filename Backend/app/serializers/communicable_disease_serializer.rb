# Create app/serializers/communicable_disease_serializer.rb
class CommunicableDiseaseSerializer < ActiveModel::Serializer
    attributes :id, :name, :description, :symptoms, :prevention_measures, 
               :most_prevalent, :featured
    
    # If using Active Storage for images
    attribute :image_url do
      if object.image.attached?
        Rails.application.routes.url_helpers.rails_blob_url(object.image)
      else
        object.image_url
      end
    end
  end