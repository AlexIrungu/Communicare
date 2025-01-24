class CommunicableDiseasesController < ApplicationController
    # before_action :authenticate_user!
    before_action :set_communicable_disease, only: [:show, :update, :destroy]
  
    # GET /communicable_diseases
    def index
      @communicable_diseases = CommunicableDisease.all
      render json: @communicable_diseases
    end

    def generate_qr_code
      @communicable_diseases = Disease.find(params[:id])
      qr_code = RQRCode::QRCode.new("CommunibleDisease: #{CommunibleDisease.name}, ID: #{CommunibleDisease.id}")
  
      # You can customize the size, color, etc.
      png = qr_code.as_png(size: 300)
      
      send_data png.to_s, type: 'image/png', disposition: 'inline'
    end
  
    # GET /communicable_diseases/1
    def show
      @communicable_disease = CommunicableDisease.find(params[:id])
    end

    def generate_qr_code
      @communicable_disease= CommunicableDisease.find(params[:id])
      qr_code = RQRCode::QRCode.new("CommunicableDisease: #{@communicable_disease.name}, ID: #{@communicable_disease.id}")
      png = qr_code.as_png(size: 300)
      send_data png.to_s, type: 'image/png', disposition: 'inline'
    end
  
    # POST /communicable_diseases
    def create
      @communicable_disease = CommunicableDisease.new(communicable_disease_params)
  
      if @communicable_disease.save
        render json: @communicable_disease, status: :created
      else
        render json: @communicable_disease.errors, status: :unprocessable_entity
      end
    end
  
    # PATCH/PUT /communicable_diseases/1
    def update
      if @communicable_disease.update(communicable_disease_params)
        render json: @communicable_disease
      else
        render json: @communicable_disease.errors, status: :unprocessable_entity
      end
    end
  
    # DELETE /communicable_diseases/1
    def destroy
      @communicable_disease.destroy
      render json: { message: 'Communicable disease was successfully destroyed.' }
    end
  
    private
      # Use callbacks to share common setup or constraints between actions.
      def set_communicable_disease
        @communicable_disease = CommunicableDisease.find(params[:id])
      end
  
      # Only allow a trusted parameter "white list" through.
      def communicable_disease_params
        params.require(:communicable_disease).permit(:name, :image_url, :description, :symptoms, :prevention_measures, :most_prevalent)
      end
  end
  