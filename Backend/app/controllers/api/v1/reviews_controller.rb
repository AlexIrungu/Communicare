
# app/controllers/api/v1/reviews_controller.rb
module Api
  module V1
class Api::V1::ReviewsController < ApplicationController
  def index
    reviews = if params[:disease_id]
      Disease.find(params[:disease_id]).reviews
    elsif params[:area_id]
      Area.find(params[:area_id]).reviews
    else
      Review.all
    end
    render json: reviews
  end
  
  def create
    review = @current_user.reviews.create!(review_params)
    render json: review, status: :created
  end
  
  def update
    review = find_user_review
    review.update!(review_params)
    render json: review
  end
  
  def destroy
    review = find_user_review
    review.destroy
    head :no_content
  end
  
  private
  
  def review_params
    params.permit(:content, :rating, :disease_id, :area_id)
  end
  
  def find_user_review
    @current_user.reviews.find(params[:id])
  end
end
end
end
