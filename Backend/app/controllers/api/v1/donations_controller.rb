module Api
  module V1
    class DonationsController < ApplicationController
      skip_before_action :authorize, only: [:recent]

      def index
        @diseases = CommunicableDisease.page(params[:page]).per(10)
        render json: @diseases, meta: pagination_meta(@diseases)
      end

      def recent
        @recent_donations = Donation.order(created_at: :desc).limit(5)
        render json: @recent_donations
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

      def pagination_meta(object)
        {
          current_page: object.current_page,
          next_page: object.next_page,
          prev_page: object.prev_page,
          total_pages: object.total_pages,
          total_count: object.total_count
        }
      end

      def donation_params
        params.permit(:amount, :area_id, :status)
      end

      def find_user_donation
        @current_user.donations.find(params[:id])
      end
    end
  end
end