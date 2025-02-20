module Api
  module V1
    class DonationsController < ApplicationController
      skip_before_action :authorize, only: [:recent]

      def index
        donations = if params[:area_id]
                      Area.find(params[:area_id]).donations
                    else
                      Donation.all
                    end
        render json: donations
      end

      def recent
        @donations = Donation.recent
        render json: @donations
      end

      def create
        donation = @current_user.donations.create!(donation_params)
        render json: donation, status: :created
      end

      def show
        donation = find_user_donation
        render json: donation
      end

      private

      def donation_params
        params.permit(:amount, :area_id, :status)
      end

      def find_user_donation
        @current_user.donations.find(params[:id])
      end
    end
  end
end