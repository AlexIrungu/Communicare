module Api
  module V1
    class SessionsController < ApplicationController
      before_action :authorize, only: [:destroy] # Require authentication for logout
      skip_before_action :authorize, only: [:create] # Allow login without authentication
      
      def create
        user = User.find_by(email: params[:email])
        
        if user&.valid_password?(params[:password])
          token = encode_token(user_id: user.id)
          
          # Format the user object properly for the frontend
          user_data = {
            id: user.id,
            email: user.email, 
            name: "#{user.first_name} #{user.last_name}",
            isAdmin: user.admin # Change from admin? to admin
          }
          
          # Log the response for debugging
          Rails.logger.info "Login successful for #{user.email}"
          Rails.logger.info "Returning user data: #{user_data.inspect}"
          
          # Return the expected format that matches your frontend
          render json: { 
            token: token, 
            user: user_data 
          }, status: :ok
        else
          Rails.logger.info "Login failed for #{params[:email]}"
          render json: { error: "Invalid email or password" }, status: :unauthorized
        end
      end
      
      def destroy
        user_code = params[:logout_code]
        stored_code = Rails.cache.read("logout_code_#{@current_user.id}")
        
        if stored_code.nil? || stored_code != user_code
          render json: { error: "Invalid or expired logout code" }, status: :unauthorized
          return
        end
        
        Rails.cache.delete("logout_code_#{@current_user.id}") # Remove code after use
        
        render json: { message: "Logged out successfully" }, status: :ok
      end
      
      private
      
      def encode_token(payload)
        JWT.encode(payload, Rails.application.credentials.secret_key_base, "HS256")
      end
      
      def request_logout_code
        unless @current_user
          render json: { error: "Unauthorized" }, status: :unauthorized
          return
        end
        
        @logout_code = SecureRandom.hex(3)  # Example: "a3f5c9"
        Rails.cache.write("logout_code_#{@current_user.id}", @logout_code, expires_in: 10.minutes)
        
        # Send the code to the user via email, SMS, or frontend
        render json: { message: "A logout code has been sent to your email.", logout_code: @logout_code }, status: :ok
      end
      
      def authorize
        header = request.headers["Authorization"]
        token = header.split(" ").last if header
        
        if token.nil?
          render json: { error: "Missing token" }, status: :unauthorized
          return
        end
        
        if BlacklistToken.exists?(token: token)
          render json: { error: "Token is expired" }, status: :unauthorized
          return
        end
        
        begin
          secret_key = Rails.application.credentials.secret_key_base || ENV["SECRET_KEY_BASE"]
          decoded = JWT.decode(token, secret_key, true, algorithm: "HS256")
          @current_user = User.find(decoded[0]["user_id"])
        rescue JWT::DecodeError => e
          Rails.logger.error "JWT Decode Error: #{e.message}"
          render json: { error: "Invalid token" }, status: :unauthorized
        end
      end
    end
  end
end