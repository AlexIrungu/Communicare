# app/controllers/api/v1/sessions_controller.rb
module Api
  module V1
    class SessionsController < ApplicationController
      def create
        user = User.find_by(email: params[:email])
        if user&.authenticate(params[:password])
          token = encode_token(user_id: user.id)
          render json: { user: user, token: token }, status: :ok
        else
          render json: { error: "Invalid email or password" }, status: :unauthorized
        end
      end

      private

      def encode_token(payload)
        JWT.encode(payload, Rails.application.credentials.secret_key_base)
      end
    end
  end
end