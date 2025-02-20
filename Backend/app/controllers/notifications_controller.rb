# app/controllers/notifications_controller.rb
class NotificationsController < ApplicationController
    def index
      @notifications = Notification.all
      render json: @notifications
    end
  
    def create
      @notification = Notification.new(notification_params)
      if @notification.save
        render json: @notification, status: :created
      else
        render json: @notification.errors, status: :unprocessable_entity
      end
    end
  
    private
  
    def notification_params
      params.require(:notification).permit(:user_id, :message, :read)
    end
  