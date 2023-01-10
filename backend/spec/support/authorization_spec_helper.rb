module AuthorizationSpecHelper

  def login(user)
    post api_v1_user_session_path, params: { email: user.email, password: user.password }.to_json,
                               headers: { 'CONTENT_TYPE' => 'application/json', 'ACCEPT' => 'application/json' }
  end

  def get_auth_params_from_login_response_headers(response)
    # 対象のkeyのみを入手
    response.headers.slice('access-token', 'client', 'uid', 'expiry', 'token-type')
  end

  def get_auth_params_and_create_posts(response)
    token = response.headers['access-token']
    client = response.headers['client']
    uid = response.headers['uid']
    expiry = response.headers['expiry']
    token_type = response.headers['token-type']

    {
      'access-token' => token,
      'client' => client,
      'uid' => uid,
      'expiry' => expiry,
      'token-type' => token_type,
      'content-type' => 'multipart/form-data'
    }
  end


  def delete_user_data(auth_params)
    delete api_v1_user_registration_path, headers: auth_params 
  end
end
