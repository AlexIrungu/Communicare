# app/controllers/statistics_controller.rb
class StatisticsController < ApplicationController
    def index
      render json: { message: "Statistics Data" }
    end
  end