Rails.application.routes.draw do

  namespace :api do
    namespace :v1 do
      resources :test, only: %i[index]
      resources :users, only: %i[update index show]   
      resources :posts, only: %i[index show create destroy] do
        resource :likes, only: %i[create destroy]
      end


      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        registrations: 'api/v1/auth/registrations'
      }

      namespace :auth do
        resources :sessions, only: %i[index]
      end
      
    end
  end
end
