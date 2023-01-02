Rails.application.routes.draw do

 

  namespace :api do
    namespace :v1 do
      resources :test, only: %i[index]
      resources :users, only: %i[update index show]   
      resources :posts, only: %i[index show create destroy] do
        resource :likes, only: %i[show create destroy]
      end

      get '/my_liked_posts', to: 'posts#my_liked_posts', as: :my_liked_posts
      get '/my_posts', to: 'posts#my_posts', as: :my_posts

      
      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        registrations: 'api/v1/auth/registrations'
      }

      devise_scope :api_v1_user do
        post 'auth/guest_sign_in', to: 'auth/sessions#guest_sign_in'
        get 'auth/sessions', to: 'auth/sessions#index'
      end

      
      match '*path' => 'options_request#response_preflight_request', via: :options

    end
  end

  get '/health_check', to: 'health_checks#index'

end
