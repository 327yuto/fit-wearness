FROM node:14.15.0-alpine3.10
RUN mkdir /client
WORKDIR /client

COPY package*.json ./
RUN npm install
COPY . ./
RUN yarn run build
