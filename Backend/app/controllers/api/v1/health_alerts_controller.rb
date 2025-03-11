# app/controllers/api/v1/health_alerts_controller.rb
module Api
  module V1
    class HealthAlertsController < ApplicationController
      before_action :set_health_alert, only: [:show, :update, :destroy]

      # GET /api/v1/health-alerts
      def index
        if params[:user_id]
          @health_alerts = HealthAlert.joins(:subscriptions)
                                    .where(subscriptions: { user_id: params[:user_id] })
                                    .order(created_at: :desc)
        else
          @health_alerts = HealthAlert.all.order(created_at: :desc)
        end

        render json: @health_alerts
      end

      # GET /api/v1/health-alerts/1
      def show
        render json: @health_alert
      end

      # POST /api/v1/health-alerts
      def create
        @health_alert = HealthAlert.new(health_alert_params)

        if @health_alert.save
          render json: @health_alert, status: :created
        else
          render json: @health_alert.errors, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /api/v1/health-alerts/1
      def update
        if @health_alert.update(health_alert_params)
          render json: @health_alert
        else
          render json: @health_alert.errors, status: :unprocessable_entity
        end
      end

      # DELETE /api/v1/health-alerts/1
      def destroy
        @health_alert.destroy
        head :no_content
      end

      # POST /api/v1/health-alerts/subscribe
      def subscribe
        subscription = Subscription.new(
          user_id: params[:user_id],
          area_id: params[:area_id]
        )

        if subscription.save
          render json: subscription, status: :created
        else
          render json: subscription.errors, status: :unprocessable_entity
        end
      end

      private
        def set_health_alert
          @health_alert = HealthAlert.find(params[:id])
        end

        def health_alert_params
          params.require(:health_alert).permit(:title, :message, :area_id, :severity, :read)
        end
    end
  end
end