# app/controllers/api/v1/users_controller.rb
module Api
  module V1
class Api::V1::UsersController < ApplicationController
  skip_before_action :authorize, only: [:create]
  before_action :admin_only, only: [:index, :update_role]
  
  def create
    user = User.create!(user_params)
    session[:user_id] = user.id
    render json: user, status: :created
  end
  
  def show
    render json: @current_user
  end
  
  def index
    users = User.all
    render json: users
  end
  
  def update_role
    user = User.find(params[:id])
    user.update!(role: params[:role])
    render json: user
  end
  
  private
  
  def user_params
    params.permit(:username, :email, :password, :password_confirmation)
  end
end
end
end