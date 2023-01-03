#!/bin/sh

if [ "${RAILS_ENV}" = "production" ]
then
#   /bin/sh -c bundle exec rails assets:precompile
  /bin/sh -c bundle exec rails db:create && bundle exec rails db:migrate && bundle exec unicorn -p 3000 -c /backend/config/unicorn.rb -E production
else
  bundle exec rails s -p ${PORT:-3000} -b 0.0.0.0
fi


