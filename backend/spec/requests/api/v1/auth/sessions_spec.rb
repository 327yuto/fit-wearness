require 'rails_helper'

RSpec.describe 'api v1 auth session', type: :request do
  
 let(:user) { FactoryBot.create(:user) }
 let(:error_user) { FactoryBot.create(:user, :error_user) }
 let(:auth_params) do
   login(user)
  get_auth_params_from_login_response_headers(response)
 end

  describe 'post /api_v1_user_session_path' do
    context 'normal(正常)' do

      it 'the response is 200' do

        expect do
          login(user)
        end.to change(User.all, :count).by(1)
        
        #  binding.pry

        expect(response.status).to eq 200
        # expect(response).to have_http_status(:ok) #同じ意味
      end

      it 'there is confirmed_at ' do
        login(user)
          expect(user.confirmed_at).to eq Date.today
      end
    end

    context ' abnormal(異常) ' do

      it 'email do not match' do
        post(api_v1_user_session_path, params: { email: 'error@mail.com', password: user.email }.to_json,
        headers: { 'CONTENT_TYPE' => 'application/json', 'ACCEPT' => 'application/json' })
        expect(response.status).to eq 401
      end

      it ' password do not match' do

        post(api_v1_user_session_path, params: { email: user.email, password: 'wordpass' }.to_json,
        headers: { 'CONTENT_TYPE' => 'application/json', 'ACCEPT' => 'application/json' })
        expect(response.status).to eq 401
      end

      # 正しい意味は、届いたメールを認証していない場合
      it ' "confirmed_at" does not succeed without(無い時成功しない) ' do 
        expect do
          login(error_user)
        end.to change(User.all, :count).by(1)
        
        expect(error_user.confirmed_at).to eq nil
        expect(response.status).to eq 401
      end
    end
  end

  describe 'delete signout' do
    context 'normal(正常)' do
      it 'the response is 200' do
        login(user)
         delete(destroy_api_v1_user_session_path, headers: auth_params)
         expect(response.status).to eq 200
      end
    end

    context 'abnormal' do
      it '3token does not match' do
        login(user)
        #  headers = response.header.slice('access-token', 'client', 'uid')
        #  delete(destroy_api_v1_user_session_path, params: { 'access-token' => 'no data', 'client' => headers['client'], 'uid' => headers['uid'] })
         delete(destroy_api_v1_user_session_path, 
         params: { 'access-token' => 'no data', 'client' => auth_params['client'], 'uid' => auth_params['uid'] })
         expect(response.status).to eq 404
      end 
    end   
  end
  

  private
  # AuthorizationSpecHelperへ記載
end
