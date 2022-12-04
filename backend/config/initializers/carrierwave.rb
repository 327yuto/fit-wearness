require 'carrierwave/storage/abstract'
require 'carrierwave/storage/file'
require 'carrierwave/storage/fog'

# 画像名に日本語が使えるようにする
CarrierWave::SanitizedFile.sanitize_regexp = /[^[:word:]\.\-\+]/


CarrierWave.configure do |config|

  # if Rails.env.production?
  
    config.asset_host = 'https://s3.amazonaws.com/fit-wearness-app'
    config.storage :fog
    config.fog_provider = 'fog/aws'
    config.fog_directory  = 'fit-wearness-app'               # 作成したバケット名
    config.fog_public = true

    # test環境のみ画像をローカルに保存している為、cacheもローカルへ保存させる
    if Rails.env.development?
      config.cache_storage = :fog
    elsif Rails.env.test?
      config.cache_storage = :file
    else
      config.cache_storage = :fog
    end
    
    config.fog_credentials = {
      provider: 'AWS',
      aws_access_key_id: ENV['AWS_ACCESS_KEY_ID'],           # 環境変数
      aws_secret_access_key: ENV['AWS_SECRET_ACCESS_KEY'],   # 環境変数
      region: 'ap-northeast-1',                              # アジアパシフィック(東京)
      path_style: true
    }

  # else
  #   config.asset_host = 'http://localhost:3020'
  #   config.storage = :file
    # config.cache_storage = :file
  # end

end 
