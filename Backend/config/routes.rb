Rails.application.routes.draw do
  resources :users, only: [:create, :show, :update, :destroy, :index]
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  get "/me", to: "users#show"

  resources :communicable_diseases do
    member do
      get :generate_qr_code
    end
  end

  resources :areas, only: [:create, :show, :update, :destroy, :index] do
    resources :donations, only: [:create, :new]
  end
  
  resources :donations, only: [:index, :show, :create, :update]
  resources :reviews, only: [:index, :show, :create, :update, :destroy]
end
