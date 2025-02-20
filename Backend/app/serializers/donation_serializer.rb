# app/serializers/donation_serializer.rb
class DonationSerializer < ActiveModel::Serializer
    attributes :id, :amount, :status, :created_at
    belongs_to :user
    belongs_to :area
  end