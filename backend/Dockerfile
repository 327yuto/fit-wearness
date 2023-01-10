FROM ruby:2.7.6

# yarnパッケージ管理ツールをインストール
RUN apt-get update && apt-get install -y curl apt-transport-https wget && \
  curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
  echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
  apt-get update && apt-get install -y yarn

# Node.jsをインストール
ENV NODEJS_VERSION 14
RUN curl -sL https://deb.nodesource.com/setup_${NODEJS_VERSION}.x | bash - && \
  apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 1655A0AB68576280 && \
  apt-get update && \
  apt-get install -y nodejs

#backendディレクトリを作成する
RUN mkdir /backend
WORKDIR /backend

#Railsで使うGemをインストールする
COPY Gemfile /Gemfile
COPY Gemfile.lock /Gemfile.lock
RUN gem install bundler
RUN cd /backend
RUN bundle install -j4 --retry 3
COPY . /backend

# Add a script to be executed every time the container starts.
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3000

COPY start.sh /start.sh
RUN chmod 744 /start.sh
CMD ["sh", "/start.sh"]
