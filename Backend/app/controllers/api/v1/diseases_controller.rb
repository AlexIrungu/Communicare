module Api
  module V1
    class DiseasesController < ApplicationController
      skip_before_action :authorize, only: [:index, :show, :featured]
      before_action :admin_only, only: [:create, :update, :destroy]

      def featured
        @diseases = CommunicableDisease.where(featured: true)
        render json: @diseases
      end

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

      def show
        disease = find_disease
        render json: disease
      end

      # diseases_controller.rb
def search
  query = params[:q]
  @diseases = CommunicableDisease.where("name ILIKE ? OR description ILIKE ?", 
                                        "%#{query}%", "%#{query}%")
  render json: @diseases
end

      def create
        disease = CommunicableDisease.create!(disease_params)
        render json: disease, status: :created
      end

      def update
        disease = find_disease
        disease.update!(disease_params)
        render json: disease
      end

      def destroy
        disease = find_disease
        disease.destroy
        head :no_content
      end

      private

      def disease_params
        params.permit(:name, :description, :severity, :symptoms, :prevention, :treatment, :featured)
      end

      def find_disease
        CommunicableDisease.find(params[:id])
      end
    end
  end
end