class ApplicationController < ActionController::API
  include ActionController::Cookies
  include ActionController::MimeResponds
  respond_to :json

  before_action :authorize
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
  rescue_from ActionController::ParameterMissing, with: :parameter_missing
  rescue_from JWT::DecodeError, with: :invalid_token

  private

  def record_not_found
    render json: { error: 'Record not found' }, status: :not_found
  end

  def parameter_missing(e)
    render json: { error: e.message }, status: :unprocessable_entity
  end

  def invalid_token
    render json: { errors: ["Invalid or expired token"] }, status: :unauthorized
  end

  def authorize
    header = request.headers['Authorization']
    if header
      token = header.split(' ').last
      begin
        decoded_token = decode_token(token)
        user_id = decoded_token["user_id"] || decoded_token[:user_id]
        @current_user = User.find_by(id: user_id)
      rescue JWT::DecodeError => e
        Rails.logger.error "JWT decode error: #{e.message}"
        raise
      end
    end
    
    unless @current_user
      Rails.logger.info "Authorization failed: User not found or token missing"
      render json: { errors: ["Not authorized"] }, status: :unauthorized
    end
  end

  def admin_only
    render json: { errors: ["Admin access required"] }, status: :forbidden unless @current_user&.admin?
  end
  def decode_token(token)
    # Make sure the decoded payload is a hash before calling with_indifferent_access
    payload = JWT.decode(token, Rails.application.credentials.secret_key_base, true, algorithm: 'HS256').first
    
    # Convert the payload to a hash with indifferent access if it's not already
    payload.is_a?(Hash) ? payload.with_indifferent_access : { user_id: payload[1] }
  end
end