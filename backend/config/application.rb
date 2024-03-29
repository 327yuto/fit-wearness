require_relative "boot"

require "rails"
# Pick the frameworks you want:
require "active_model/railtie"
require "active_job/railtie"
require "active_record/railtie"
# require "active_storage/engine"
require "action_controller/railtie"
require "action_mailer/railtie"
require "action_mailbox/engine"
require "action_text/engine"
require "action_view/railtie"
require "action_cable/engine"
# require "sprockets/railtie"
# require "rails/test_unit/railtie"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Backend
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 6.1


    # 日本時間に設定
    config.time_zone = 'Tokyo'


    config.generators do |g|
     g.test_framework :rspec,
     #  fixtures: false,
     view_specs: false,
     helper_specs: false,
     routing_specs: false
     g.factory_bot false
    end

    config.middleware.use Rack::Cors do
      allow do
        origins  "https://web.fit-wearness.com" , 'localhost:3002', "https://fit-wearness-front.herokuapp.com"
        resource '*',
                 headers: :any,
                 expose: %w[access-token expiry token-type uid client],
                 methods: %i[get post put patch delete options head]
      end
    end

    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")

    # Only loads a smaller set of middleware suitable for API only apps.
    # Middleware like session, flash, cookies can be added back manually.
    # Skip views, helpers and assets when generating a new resource.
    config.api_only = true
  end
end
