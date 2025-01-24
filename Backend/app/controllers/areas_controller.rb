class AreasController < ApplicationController
  before_action :set_area, only: [:show, :update, :destroy, :create]
  before_action :set_communicable_disease, only: [:destroy]
  

  # def index
  #   areas = Area.all
  #   render json: areas
  # end
  def index
    areas = Area.includes(:communicable_disease).all
    render json: areas.to_json(include: { communicable_disease: { only: [:name, :image_url] } })

  end
  

  def show
    render json: @area
  end

  def create
    area = Area.new(area_params)

    if area.save
      render json: area, status: :created
    else
      render json: area.errors, status: :unprocessable_entity
    end
  end

  def update
    if @area.update(area_params)
      render json: @area
    else
      render json: @area.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @area.destroy
    redirect_to @area.communicable_disease, notice: 'Area was successfully removed from the disease.'
  end

  private

  def set_area
    @area = Area.find(params[:id])
  end
  def set_disease
    @disease = CommunicableDisease.find(params[:disease_id])
  end

  def area_params
    params.require(:area).permit(:name, :location, :latitude, :longitude, :reported_cases, :communicable_disease_id)

  end
end
