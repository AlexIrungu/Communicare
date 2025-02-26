Rails.application.routes.draw do
  devise_for :users

  namespace :api do
    namespace :v1 do
      resources :users, only: [:create, :show, :index] do
        patch 'update_role', on: :member
      end

      resources :diseases do
        get 'featured', on: :collection
      end

      resources :areas do
        get 'high_risk', on: :collection
        resources :donations, only: [:index, :create]
        resources :reviews, only: [:index, :create]
      end

      resources :reviews, only: [:index, :update, :destroy]

      resources :donations, only: [:index, :show] do
        get 'recent', on: :collection
      end

      resources :resources, only: [:index, :show, :create, :update, :destroy]  # ✅ Added

      post "/login", to: "sessions#create"
      delete "/logout", to: "sessions#destroy"
      get "/me", to: "users#show"

      get '/statistics', to: 'statistics#index'
      get '/health-alerts', to: 'health_alerts#index'
      get '/community-reviews', to: 'community_reviews#index'
      get "/current_user", to: "users#show"  # Add this line to your routes.rb
    end
  end
end
