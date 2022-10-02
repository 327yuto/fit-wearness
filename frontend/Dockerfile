FROM node:14.15.0-alpine3.10
RUN mkdir /client
WORKDIR /client

# COPY ["package.json","package-lock.json", "./"]
COPY package*.json ./

RUN npm install
# RUN npm install -g npm@8.19.2
# RUN npm install -g react-scripts

COPY . ./

RUN yarn run build
# RUN heroku-postbuild
