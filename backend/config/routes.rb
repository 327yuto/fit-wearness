Rails.application.routes.draw do

  namespace :api do
    namespace :v1 do
      resources :test, only: %i[index]
      resources :users, only: %i[update index show]   
      # get '/users/:id', to: 'users#show', as: :user_info #個人ページのみ


      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        registrations: 'api/v1/auth/registrations'
      }

      namespace :auth do
        resources :sessions, only: %i[index]
      end
    end
  end
end
