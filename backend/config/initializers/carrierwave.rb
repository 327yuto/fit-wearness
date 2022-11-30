require 'carrierwave/storage/abstract'
require 'carrierwave/storage/file'
require 'carrierwave/storage/fog'

CarrierWave.configure do |config|

  if Rails.env.production?
    config.asset_host = 'https://fit-wearness.herokuapp.com'
    config.storage :fog
    config.fog_provider = 'fog/aws'
    config.fog_directory  = 'fit-wearness-app' # 作成したバケット名を記述
    config.fog_credentials = {
      provider: 'AWS',
      
      # aws_access_key_id: ENV['AWS_ACCESS_KEY_ID'],  # 環境変数
      aws_access_key_id: 'AKIA2F7A5FFQ2AL6FFSL',
      
      # aws_secret_access_key: ENV['AWS_SECRET_ACCESS_KEY'],   # 環境変数
      aws_secret_access_key: '2y28N8uPa4DOqTzujZbC6Bc3LJyy3S03ZTgxxjuq',

      region: 'ap-northeast-1',    # アジアパシフィック(東京)を選択した場合
      path_style: true
    }
  else
    config.asset_host = 'http://localhost:3020'
    config.storage = :file
    config.cache_storage = :file
  end
end 
