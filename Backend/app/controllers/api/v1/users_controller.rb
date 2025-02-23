module Api
  module V1
    class UsersController < ApplicationController
      skip_before_action :authorize, only: [:create]
      before_action :admin_only, only: [:index, :update_role]

      def create
        user = User.new(user_params)

        # Handle admin registration
        if params[:admin_code].present?
          if params[:admin_code] == ENV['ADMIN_CODE']
            user.role = 'admin'  # Assuming you have a role field
          else
            return render json: { error: 'Invalid admin code' }, status: :unauthorized
          end
        end

        if user.save
          session[:user_id] = user.id
          render json: user, status: :created
        else
          render json: { error: user.errors.full_messages.join(', ') },
                 status: :unprocessable_entity
        end
      end

      def show
        render json: @current_user
      end

      def index
        @users = User.page(params[:page]).per(10)
        render json: @users, meta: pagination_meta(@users)
      end

      def update_role
        user = User.find(params[:id])

        # Add admin code check for promoting to admin
        if params[:role] == 'admin' && params[:admin_code] != ENV['ADMIN_CODE']
          return render json: { error: 'Invalid admin code' }, status: :unauthorized
        end

        user.update!(role: params[:role])
        render json: user
      end

      private

      def user_params
        params.permit(:first_name, :last_name, :email, :password, :password_confirmation, :role)
      end

      def pagination_meta(object)
        {
          current_page: object.current_page,
          next_page: object.next_page,
          prev_page: object.prev_page,
          total_pages: object.total_pages,
          total_count: object.total_count
        }
      end
    end
  end
end
