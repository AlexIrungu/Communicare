# app/controllers/application_controller.rb
class ApplicationController < ActionController::API
  include ActionController::Cookies
  include ActionController::MimeResponds
  respond_to :json
  
  before_action :authorize
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
rescue_from ActionController::ParameterMissing, with: :parameter_missing
  
  private

  def record_not_found
    render json: { error: 'Record not found' }, status: :not_found
  end
  
  def parameter_missing(e)
    render json: { error: e.message }, status: :unprocessable_entity
  end
  
  def authorize
    @current_user = User.find_by(id: session[:user_id])
    render json: { errors: ["Not authorized"] }, status: :unauthorized unless @current_user
  end
  
  def admin_only
    render json: { errors: ["Admin access required"] }, status: :forbidden unless @current_user&.admin?
  end
end
