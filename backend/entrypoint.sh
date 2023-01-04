#!/bin/bash

set -e

# Remove a potentially pre-existing server.pid for Rails.
rm -f /backend/tmp/pids/server.pid


# デプロイ初回のみ実行
# bundle exec rails db:create
# bundle exec rails db:reset DISABLE_DATABASE_ENVIRONMENT_CHECK=1 

bundle exec rails db:migrate

# デプロイ初回のみ実行
# bundle exec rails db:seed RAILS_ENV=production


exec "$@"
