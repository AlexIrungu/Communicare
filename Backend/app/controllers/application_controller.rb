# app/controllers/application_controller.rb
class ApplicationController < ActionController::API
  include ActionController::Cookies
  
  before_action :authorize
  
  private
  
  def authorize
    @current_user = User.find_by(id: session[:user_id])
    render json: { errors: ["Not authorized"] }, status: :unauthorized unless @current_user
  end
  
  def admin_only
    render json: { errors: ["Admin access required"] }, status: :forbidden unless @current_user&.admin?
  end
end
