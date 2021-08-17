FROM node:14.17-alpine

RUN apk update && apk add --upgrade lame

WORKDIR /usr/src/app

COPY package*.json ./

COPY tsconfig.json ./

RUN yarn

COPY . .

CMD [ "yarn", "start:prod" ]