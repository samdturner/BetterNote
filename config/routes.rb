Rails.application.routes.draw do
  root to: "static_pages#root"

  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]

  namespace :api do
    resources :notes, only: [:create, :show, :update, :index]
    resources :notebooks, only: [:index, :create, :show]
    resources :tags, only: [:index, :show]
  end
end
