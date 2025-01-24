class ReviewsController < ApplicationController
  before_action :authenticate_user!, only: [:new, :create]
  before_action :set_area, only: [:new, :create]

  def new
    @review = Review.new
  end
  def index
    @reviews = Review.includes(:area).all
    render json: @reviews.to_json(include: { area: { only: [:name] } })

  end

  def create
    @review = @area.reviews.build(review_params)
    @review.user = current_user

    if @review.save
      redirect_to area_path(@area), notice: "Your review has been submitted."
    else
      render :new
    end
  end

  private
  def authenticate_user!
    return render json: { errors: ["Not authorized"] }, status: :unauthorized unless session.include? :user_id
end

  def set_area
    @area = Area.find(params[:area_id])
  end

  def review_params
    params.require(:review).permit(:comment)
  end
end
