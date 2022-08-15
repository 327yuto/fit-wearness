require 'rails_helper'

RSpec.describe 'api v1 auth registration', type: :request do
   let(:email) { 'test@mail.com' }
   let(:password) { 'password' }
   let(:password_confirmation) { 'password' }
   # let(:name) { 'ユーザー' }
   let(:confirm_success_url) { "https://google.com" }
   let(:category) { 'test category' }


   let(:user) { FactoryBot.create(:user) }
    let(:auth_params) do
      login(user)
     get_auth_params_from_login_response_headers(response)
    end

  describe 'post /api_v1_user_registration_path' do
     context 'normal<正常>' do
       it 'response of singup is 200 & user records increases' do
        expect { post api_v1_user_registration_path, 
          params: {
                  email: email, 
                  password: password,
                  password_confirmation: password, 
                  confirm_success_url: confirm_success_url,
                  category: category
                  } 
                }.to change(User, :count).by(+1)
         expect(response.status).to eq 200
       end

       it 'singup uid is the same as email' do
         post(api_v1_user_registration_path, 
          params: {
                  email: email, 
                  password: password,
                  password_confirmation: password, 
                  confirm_success_url: confirm_success_url,
                  category: category
                  })
         expect(JSON.parse(response.body)['data']['uid']).to eq email
       end
     end

     context 'abnormal<異常>' do
       it 'email is incorrect' do
         expect { post(api_v1_user_registration_path, 
          params: { 
                  email: 'email', 
                  password: password,
                  password_confirmation: password, 
                  confirm_success_url: confirm_success_url,
                  category: category
                  })
                }.to change(User, :count).by 0
          expect(response.status).to eq 422
        end

       it 'password is less than 6 characters' do
         expect { post(api_v1_user_registration_path, 
          params: { 
                  email: email, 
                  password: 'passw',
                  password_confirmation: 'passw', 
                  confirm_success_url: confirm_success_url,
                  category: category
                  })
                }.to change(User, :count).by 0
        expect(response.status).to eq 422
       end
     end
   end

  describe 'delete /api_v1_user_registration_path' do
    
    context 'normal<正常>' do

      it 'delete user' do
        expect { login(user)
                 delete_user_data(auth_params) 
               }.to change(User, :count).by (0)
        expect(response.status).to eq 200
      end
    end

    context 'abnormal<異常>' do
      
      it 'not deleted user' do
        expect { login(user)
                 auth_params['access-token'] = 'no data'
                 delete_user_data(auth_params) 
               }.to change(User, :count).by (1)
        expect(response.status).to eq 404
      end
    end
  end
end
