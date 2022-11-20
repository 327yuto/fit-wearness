FactoryBot.define do
  factory :user do
    sequence :email do |n|
      "confirm_testmail#{n}@mail.com"
    end
    password { 'password' }
    password_confirmation { 'password' }
    confirmed_at { DateTime.now } 
    category { 'test category' }
    
    # confirm_success_url { "https://google.com" } #使用できない
    # uid { email }
    # provider { 'email' }
  end

  trait :error_user do
    email { "error_user@mail.com" }
    password { 'password' }
    password_confirmation { 'password' }
    confirmed_at { '' } 
    category { 'test category' }
  end

  trait :user_2 do
    email { "user_2@mail.com" }
    password { 'password' }
    password_confirmation { 'password' }
    confirmed_at { DateTime.now  } 
    category { 'test category' }
  end
end
