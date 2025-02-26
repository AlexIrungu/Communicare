module Api
    module V1
      class ResourcesController < ApplicationController
        def index
          resources = Resource.all
          render json: resources
        end
      end
    end
  end
  