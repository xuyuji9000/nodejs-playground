FROM node:8.5-alpine

WORKDIR /usr/src/app

COPY package.json package.json

RUN npm install

COPY . . 

CMD ["npm", "start"]
