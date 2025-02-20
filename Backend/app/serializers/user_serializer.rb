# app/serializers/user_serializer.rb
class UserSerializer < ActiveModel::Serializer
    attributes :id, :username, :email, :role
  end