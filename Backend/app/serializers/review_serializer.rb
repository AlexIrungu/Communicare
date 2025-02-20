# app/serializers/review_serializer.rb
class ReviewSerializer < ActiveModel::Serializer
    attributes :id, :content, :rating, :created_at
    belongs_to :user
    belongs_to :disease
    belongs_to :area
  end
  