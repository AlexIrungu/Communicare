module Api
  module V1
    class SessionsController < ApplicationController
      skip_before_action :authorize, only: [:create]

      def create
        user = User.find_by(email: params[:email])
        if user && user.authenticate(params[:password]) # Use `authenticate` instead of `valid_password?`
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