require 'rails_helper'

RSpec.describe ' Users ', type: :request do

  let(:user) { FactoryBot.create(:user) }
  let(:user_2) { FactoryBot.create(:user, :user_2) }
  let(:auth_params) do
    login(user)
   get_auth_params_from_login_response_headers(response)
  end

  describe 'GET /users' do
    context 'normal(正常)' do
      it 'the response is 200' do
        get "/api/v1/users"
        expect(response.status).to eq 200
      end
    end
  end

  describe "GET /users/:id" do
    context 'normal(正常)' do

      it 'the response is 200' do
        get api_v1_user_path(user.id)
        expect(response.status).to eq 200
      end
    end

    context 'abnormal(異常)' do
      let(:user_id) { 1000000 }

      it 'specified id does not exist(指定したidが存在しない)' do
        expect{get api_v1_user_path(user_id)}.to raise_error ActiveRecord::RecordNotFound
      end
    end
  end
end
