FROM node:14.15.0-alpine3.10
WORKDIR /usr/src/app

COPY ["package.json","package-lock.json", "./"]


RUN npm install -g npm@8.19.2
RUN npm install -g react-scripts

COPY . ./

RUN yarn run build
