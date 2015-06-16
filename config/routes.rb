Rails.application.routes.draw do
  root to: "static_pages#root"

  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]
  resources :notes, only: [:show]

  namespace :api do
    resources :notes, only: [:create, :show, :update, :index, :destroy]
    resources :notebooks, only: [:index, :create, :show]
    resources :tags, only: [:index, :create, :show, :destroy]
    resources :tag_assignments, only: [:index, :destroy, :create]
  end
end
