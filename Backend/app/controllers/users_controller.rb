class UsersController < ApplicationController

  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

  def index
      user = User.all
      render json: user;
  end

  def create
    user = User.new(user_params)
    if user.save
      render json: user, status: :created
    else
      logger.error "Failed to create user: #{user.errors.full_messages.join(", ")}"
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end
  

  def show
    user = User.find_by(id: session[:user_id])
    if user
      render json: user
    else
      render json: { error: "Not authorized" }, status: :unauthorized
    end
  end

  private

  def find_user
      User.find(params[:id])
  end

  def user_params
    params.permit(:first_name, :last_name, :email, :password, :admin)
  end
  

  def render_not_found_response
      render json: { error: "User not found" }, status: :not_found
  end

  def render_unprocessable_entity_response(invalid)
      render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
  end
  

end