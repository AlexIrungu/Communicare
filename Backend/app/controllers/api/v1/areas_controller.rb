module Api
  module V1
    class AreasController < ApplicationController
      skip_before_action :authorize, only: [:index, :show, :high_risk]
      before_action :admin_only, only: [:create, :update, :destroy]

     # Then in controllers
     def index
      areas = Area.includes(:communicable_disease).all
    
      render json: areas.as_json(
        only: [:id, :name, :latitude, :longitude, :risk_level],
        include: { communicable_disease: { only: [:name] } }
      )
    end

    def high_risk
      @areas = Area.high_risk.includes(:communicable_disease)
      render json: @areas, include: ['communicable_disease']
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

      def show
        area = find_area
        render json: area
      end

      

      def create
        area = Area.create!(area_params)
        render json: area, status: :created
      end

      def update
        area = find_area
        area.update!(area_params)
        render json: area
      end

      def destroy
        area = find_area
        area.destroy
        head :no_content
      end

      private

      def area_params
        params.permit(:name, :location, :population, :risk_level, :description)
      end

      def find_area
        Area.find(params[:id])
      end
    end
  end
end