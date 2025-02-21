
# app/controllers/api/v1/reviews_controller.rb
module Api
  module V1
class Api::V1::ReviewsController < ApplicationController
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
