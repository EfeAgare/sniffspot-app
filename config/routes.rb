Rails.application.routes.draw do

  namespace :api do
    namespace :v1 do
      resources :spots, only: [:index, :show, :create, :update, :destroy] do
        resources :reviews, only: [:create, :update, :destroy]
      end
      get '/sort_spots_by_price', to: 'spots#sort_by_price'
    end
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  root 'home#index'

  get '/*path', to: 'home#index'
end
