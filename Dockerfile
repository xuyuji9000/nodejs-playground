FROM node:8.5-alpine

COPY package.json package.json

RUN npm install

COPY . . 

CMD ["npm", "start"]
