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
  
 # Then in controllers
def index
  @diseases = CommunicableDisease.page(params[:page]).per(10)
  render json: @diseases, meta: pagination_meta(@diseases)
end

private

def pagination_meta(object)
  {
    current_page: object.current_page,
    next_page: object.next_page,
    prev_page: object.prev_page,
    total_pages: object.total_pages,
    total_count: object.total_count
  }
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