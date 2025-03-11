module Api
  module V1
    class StatisticsController < ApplicationController
      # Remove this line if statistics should be available to all authenticated users
      # before_action :admin_only
      
      # ApplicationController already has before_action :authorize
      # so all endpoints are already protected for authenticated users

      def index
        render json: {
          diseaseStats: disease_stats,
          donationStats: donation_stats,
          totalUsers: User.count,
          totalDonations: Donation.sum(:amount)
        }
      end

      private

      def disease_stats
        CommunicableDisease.all.map do |disease|
          { name: disease.name, cases: disease.cases_count }
        end
      end

      def donation_stats
        Donation.group_by_month(:created_at, last: 6).sum(:amount)
          .map { |month, amount| { month: month.strftime("%B"), amount: amount } }
      end
    end
  end
end