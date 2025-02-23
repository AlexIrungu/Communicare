module Api
    module V1
      class CommunityReviewsController < ApplicationController
        def index
          page = params[:page] || 1
          per_page = params[:limit] || 10
          
          reviews = Review.includes(:user)
                         .order(created_at: :desc)
                         .page(page)
                         .per(per_page)
  
          render json: {
            reviews: reviews.map { |review|
              {
                id: review.id,
                content: review.content,
                userName: review.user.name,
                createdAt: review.created_at,
                status: review.status
              }
            },
            meta: {
              currentPage: reviews.current_page,
              totalPages: reviews.total_pages,
              totalCount: reviews.total_count
            }
          }
        end
  
        def approve
          review = Review.find(params[:id])
          review.update(status: 'approved')
          render json: { message: 'Review approved successfully' }
        end
  
        def reject
          review = Review.find(params[:id])
          review.update(status: 'rejected')
          render json: { message: 'Review rejected successfully' }
        end
      end
    end
  end