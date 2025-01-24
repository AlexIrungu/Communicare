class DonationsController < ApplicationController
  before_action :authenticate_user!

  def new
    @area = Area.find(params[:area_id])
    @donation = Donation.new
  end
  def index
    @donation = Donation.includes(:area, :user).all
    render json: @donation.to_json(include: { area: { only: [:name] }, user: { only: [:First_name, :email] } })
  end
  

  def create
    @area = Area.find(params[:area_id])
    @donation = current_user.donations.build(donation_params)
    @donation.area = @area

    if @donation.save
      redirect_to area_path(@area), notice: "Thank you for your donation!"
    else
      render :new
    end
  end

  private
  def authenticate_user!
    return render json: { errors: ["Not authorized"] }, status: :unauthorized unless session.include? :user_id
end

  def donation_params
    params.require(:donation).permit(:amount, :area_id, :user_id)
  end
end
