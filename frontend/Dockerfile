FROM node:14.4.0-alpine3.10
WORKDIR /usr/src/app

COPY ["package.json","package-lock.json", "./"]


RUN yarn install -g npm@8.10.0
RUN yarn install -g react-scripts

COPY . .
