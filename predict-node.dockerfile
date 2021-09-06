FROM node:alpine

ENV NODE_ENV='development'

WORKDIR /usr/app

COPY package.json .
RUN rm -rf node_modules/bcrypt
RUN npm install 

COPY . . 

EXPOSE 3000

CMD npm start

