# app/controllers/api/v1/statistics_controller.rb
module Api
    module V1
      class StatisticsController < ApplicationController
        def index
          # Add your statistics logic here
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
            {
              name: disease.name,
              cases: disease.cases_count
            }
          end
        end
  
        def donation_stats
          Donation.group_by_month(:created_at, last: 6).sum(:amount)
            .map { |month, amount| { month: month.strftime("%B"), amount: amount } }
        end
      end
    end
  end