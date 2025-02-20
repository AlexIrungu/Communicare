module Api
  module V1
    class DiseasesController < ApplicationController
      skip_before_action :authorize, only: [:index, :show, :featured]
      before_action :admin_only, only: [:create, :update, :destroy]

      def featured
        @diseases = CommunicableDisease.where(featured: true)
        render json: @diseases
      end

      def index
        @diseases = CommunicableDisease.all
        render json: @diseases
      end

      def show
        disease = find_disease
        render json: disease
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