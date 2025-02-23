module Api
    module V1
      class HealthAlertsController < ApplicationController
        def index
          alerts = HealthAlert.order(created_at: :desc).limit(10)
          render json: {
            alerts: alerts.map { |alert| 
              {
                id: alert.id,
                title: alert.title,
                description: alert.description,
                severity: alert.severity,
                region: alert.region,
                date: alert.created_at,
              }
            }
          }
        end
      end
    end
  end