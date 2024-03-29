# Be sure to restart your server when you modify this file.

# Avoid CORS issues when API is called from the frontend app.
# Handle Cross-Origin Resource Sharing (CORS) in order to accept cross-origin AJAX requests.

# Read more: https://github.com/cyu/rack-cors

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins  "https://web.fit-wearness.com" , "localhost:3002", "https://fit-wearness-front.herokuapp.com"
    # Reactのポート/ HEROKUのURL / web.取得したドメイン名(形式でフロントエンドのサブドメインを設定)

    resource '*',
      headers: :any,
      expose: ["access-token", "expiry", "token-type", "uid", "client"], # 後から追記した
      methods: [:get, :post, :put, :patch, :delete, :options, :head],
      credentials: true
  end
end
