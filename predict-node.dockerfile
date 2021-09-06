FROM node:alpine

# ENV NODE_ENV='development'

WORKDIR /usr/app

COPY package.json .
RUN rm -rf node_modules/bcrypt
RUN npm install 

RUN npm audit fix

RUN npm uninstall jsonwebtoken
RUN npm install jsonwebtoken

COPY . . 

EXPOSE 3000

CMD npx sequelize-cli db:migrate && npm start

