# app/controllers/uploads_controller.rb
class UploadsController < ApplicationController
    def create
      uploaded_file = params[:file]
      # Logic to store file using Active Storage
      render json: { message: "File uploaded successfully" }
    end
  end