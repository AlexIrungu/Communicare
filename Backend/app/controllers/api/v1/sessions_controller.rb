# app/controllers/api/v1/sessions_controller.rb
module Api
  module V1
    class SessionsController < ApplicationController
      skip_before_action :authorize, only: [:create]
    
      def create
        user = User.find_by(email: params[:email])
    
        if user&.authenticate(params[:password])
          session[:user_id] = user.id
          render json: { message: 'Login successful', user: user }, status: :ok
        else
          render json: { message: 'Invalid email or password' }, status: :unauthorized
        end
      end
    
      def destroy
        session[:user_id] = nil
        render json: { message: 'Logged out' }, status: :ok
      end
    end
end
end