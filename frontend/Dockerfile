FROM node:14.15.0-alpine3.10
RUN mkdir /client
WORKDIR /client

COPY ["package.json","package-lock.json", "./"]

# RUN yarn install -g react-scripts
# RUN npm install -g npm@8.19.2
RUN npm install -g react-scripts

COPY . ./

RUN yarn run build
# RUN heroku-postbuild
