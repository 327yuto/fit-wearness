require 'carrierwave/storage/abstract'
require 'carrierwave/storage/file'
require 'carrierwave/storage/fog'

# 画像名に日本語が使えるようにする
CarrierWave::SanitizedFile.sanitize_regexp = /[^[:word:]\.\-\+]/


CarrierWave.configure do |config|

  if Rails.env.production?
  
    config.asset_host = 'https://s3-ap-northeast-1.amazonaws.com/fit-wearness-app' 

    config.storage :fog
    config.fog_provider = 'fog/aws'
    config.fog_directory  = 'fit-wearness-app'    # 作成したバケット名
    config.fog_public = true
    config.cache_storage = :fog

    
    config.fog_credentials = {
      provider: 'AWS',
      aws_access_key_id: ENV['AWS_ACCESS_KEY_ID'],           
      aws_secret_access_key: ENV['AWS_SECRET_ACCESS_KEY'],   
      region: 'ap-northeast-1',     # アジアパシフィック(東京)
      path_style: true
    }

  else
    config.asset_host = 'http://localhost:3000'
    config.storage = :file
    config.cache_storage = :file
  end

end 
