# disease_statistics_controller.rb
class Api::V1::DiseaseStatisticsController < ApplicationController
    def overview
      @stats = {
        total_diseases: CommunicableDisease.count,
        total_areas_affected: Area.count,
        total_donations: Donation.sum(:amount),
        most_affected_area: Area.joins(:communicable_diseases)
                                .group('areas.id')
                                .order('COUNT(communicable_diseases.id) DESC')
                                .first&.name
      }
      render json: @stats
    end
  end